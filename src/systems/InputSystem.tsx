import { defineSystem, QueryReactor } from "@etherealengine/engine/src/ecs/functions/SystemFunctions"
import { defineComponent, defineQuery, getComponent, setComponent, useComponent } from "@etherealengine/engine/src/ecs/functions/ComponentFunctions"
import { InputComponent } from "@etherealengine/engine/src/input/components/InputComponent"
import { InputSourceComponent } from "@etherealengine/engine/src/input/components/InputSourceComponent"
import { BoundingBoxComponent } from "@etherealengine/engine/src/interaction/components/BoundingBoxComponents"
import { GrabbableComponent } from "../GrabbableComponent"
import { NameComponent } from "@etherealengine/engine/src/scene/components/NameComponent"

const namedObjects = defineQuery([NameComponent])

const grabbables = defineQuery([GrabbableComponent, InputComponent])

const execute = () => {

  for (const eid of namedObjects.enter()) {
    const name = getComponent(eid, NameComponent)
    if (name.endsWith('Grabbable')) {
      setComponent(eid, GrabbableComponent)
    }
  }

  for (const eid of grabbables()) {
    const input = getComponent(eid, InputComponent)
    const inputSources = input.inputSources.map((eid) => getComponent(eid, InputSourceComponent))
    
    for (const inputSource of inputSources) {
      if (inputSource.buttons.LeftTrigger?.down || inputSource.buttons.RightTrigger?.down) {
        console.log('grabbing')
      }
    }
  }
}

export default defineSystem({
  uuid: 'wip.input',
  execute
})
