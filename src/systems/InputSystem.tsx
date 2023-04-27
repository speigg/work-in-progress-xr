import { defineSystem, QueryReactor } from "@etherealengine/engine/src/ecs/functions/SystemFunctions"
import { defineComponent, defineQuery, getComponent, setComponent, useComponent } from "@etherealengine/engine/src/ecs/functions/ComponentFunctions"
import { InputComponent } from "@etherealengine/engine/src/input/components/InputComponent"
import { InputSourceComponent } from "@etherealengine/engine/src/input/components/InputSourceComponent"

const GrabbableComponent = defineComponent({
  name: 'GrabbableComponent',
  onInit: (eid) => {
    setComponent(eid, InputComponent)
    return true
  }
})

const grabbables = defineQuery([GrabbableComponent, InputComponent])

const execute = () => {
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
