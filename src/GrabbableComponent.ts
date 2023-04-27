import { defineComponent, setComponent } from "@etherealengine/engine/src/ecs/functions/ComponentFunctions"
import { InputComponent } from "@etherealengine/engine/src/input/components/InputComponent"
import { BoundingBoxComponent } from "@etherealengine/engine/src/interaction/components/BoundingBoxComponents"

export const GrabbableComponent = defineComponent({
  name: 'GrabbableComponent',
  onInit: (eid) => {
    setComponent(eid, InputComponent)
    setComponent(eid, BoundingBoxComponent)
    return true
  }
})