import { defineSystem } from "@etherealengine/engine/src/ecs/functions/SystemFunctions"
import { defineComponent, defineQuery, getComponent, removeComponent, setComponent } from "@etherealengine/engine/src/ecs/functions/ComponentFunctions"
import { InputComponent } from "@etherealengine/engine/src/input/components/InputComponent"
import { InputSourceComponent } from "@etherealengine/engine/src/input/components/InputSourceComponent"
import { GrabbableComponent } from "../GrabbableComponent"
import { NameComponent } from "@etherealengine/engine/src/scene/components/NameComponent"
import { LocalTransformComponent } from "@etherealengine/engine/src/transform/components/TransformComponent"
import { addObjectToGroup } from "@etherealengine/engine/src/scene/components/GroupComponent"
import { Color, Mesh, MeshBasicMaterial, SphereGeometry } from "three"
import { VisibleComponent } from "@etherealengine/engine/src/scene/components/VisibleComponent"

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

const execute = () => {

  for (const eid of namedObjects.enter()) {
    const name = getComponent(eid, NameComponent)
    if (name.endsWith('Grabbable')) {
      setComponent(eid, GrabbableComponent)
    }
  }

  for (const eid of inputSources.enter()) setComponent(eid, InteractionIndicatorComponent)

  for (const eid of inputSources()) {
    const inputSource = getComponent(eid, InputSourceComponent)
    const isActive = inputSource.assignedEntity
    const indicator = getComponent(eid, InteractionIndicatorComponent)
    const targetColor = color.set(isActive ? 'lightgreen' : 'lightgray')
    indicator.sphereMaterial.color.lerp(targetColor, 0.1)
  }

  for (const eid of grabbables()) {
    const input = getComponent(eid, InputComponent)    
    for (const sourceEid of input.inputSources) {
      const inputSource = getComponent(sourceEid, InputSourceComponent)
      if (inputSource.buttons.Trigger?.down) {
        setComponent(eid, LocalTransformComponent, {parentEntity: sourceEid})
      } else {
        removeComponent(eid, LocalTransformComponent)
      }
    }
  }
}

export default defineSystem({
  uuid: 'wip.input',
  execute
})
