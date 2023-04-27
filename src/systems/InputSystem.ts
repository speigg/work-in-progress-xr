import { defineSystem } from "@etherealengine/engine/src/ecs/functions/SystemFunctions"
import { defineComponent, defineQuery, getComponent, removeComponent, setComponent } from "@etherealengine/engine/src/ecs/functions/ComponentFunctions"
import { InputComponent } from "@etherealengine/engine/src/input/components/InputComponent"
import { InputSourceComponent } from "@etherealengine/engine/src/input/components/InputSourceComponent"
import { GrabbableComponent } from "../GrabbableComponent"
import { NameComponent } from "@etherealengine/engine/src/scene/components/NameComponent"
import { LocalTransformComponent, TransformComponent } from "@etherealengine/engine/src/transform/components/TransformComponent"
import { addObjectToGroup } from "@etherealengine/engine/src/scene/components/GroupComponent"
import { Color, Mesh, MeshBasicMaterial, SphereGeometry } from "three"
import { VisibleComponent } from "@etherealengine/engine/src/scene/components/VisibleComponent"
import { BoundingBoxDynamicTag } from "@etherealengine/engine/src/interaction/components/BoundingBoxComponents"
import { ComputedTransformComponent } from "@etherealengine/engine/src/transform/components/ComputedTransformComponent"
import { Entity } from "@etherealengine/engine/src/ecs/classes/Entity"

const namedObjects = defineQuery([NameComponent])
const grabbables = defineQuery([GrabbableComponent, InputComponent])
const inputSources = defineQuery([InputSourceComponent])

const sphereGeometry = new SphereGeometry(0.1, 32, 32)
const color = new Color

const InteractionIndicatorComponent = defineComponent({
  name: 'InteractionIndicatorComponent',
  onInit: () => {
    return {
      sphereMaterial: new MeshBasicMaterial({color: 'lightgray', transparent: true, opacity: 0.5})
    }
  },
  onSet: (eid, component) => {
    addObjectToGroup(eid, new Mesh(sphereGeometry, component.sphereMaterial.value))
    setComponent(eid, VisibleComponent)
  }
})

const followInputSource = (grabbableEid:Entity, sourceEid: Entity) => {
  const grabbableTransform = getComponent(grabbableEid, TransformComponent)
  const sourceTransform = getComponent(sourceEid, TransformComponent)
  grabbableTransform.position.copy(sourceTransform.position)
  grabbableTransform.rotation.copy(sourceTransform.rotation)
}

const execute = () => {

  for (const eid of namedObjects.enter()) {
    const name = getComponent(eid, NameComponent)
    if (name.endsWith('Grabbable')) {
      setComponent(eid, GrabbableComponent)
      setComponent(eid, BoundingBoxDynamicTag)
    }
  }

  for (const eid of inputSources.enter()) setComponent(eid, InteractionIndicatorComponent)

  for (const eid of inputSources()) {
    const inputSource = getComponent(eid, InputSourceComponent)
    const assignedEntity = inputSource.assignedEntity
    const indicator = getComponent(eid, InteractionIndicatorComponent)
    const targetColor = color.set(assignedEntity ? 'lightgreen' : 'lightgray')
    indicator.sphereMaterial.color.lerp(targetColor, 0.1)
  }

  for (const eid of grabbables()) {
    const input = getComponent(eid, InputComponent)    
    for (const sourceEid of input.inputSources) {
      const inputSource = getComponent(sourceEid, InputSourceComponent)
      if (inputSource.source.gamepad?.buttons[0].pressed || inputSource.source.gamepad?.buttons[1].pressed) {
        setComponent(eid, ComputedTransformComponent, {referenceEntity: sourceEid, computeFunction:followInputSource })
        const indicator = getComponent(sourceEid, InteractionIndicatorComponent)
        const targetColor = color.set('red')
        indicator.sphereMaterial.color.set(targetColor)
      } else {
        removeComponent(eid, ComputedTransformComponent)
      }
    }
    if (input.inputSources.length === 0) removeComponent(eid, ComputedTransformComponent)
  }
}

export default defineSystem({
  uuid: 'wip.input',
  execute
})
