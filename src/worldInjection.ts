import { InputSystemGroup } from "@etherealengine/engine/src/ecs/functions/EngineFunctions"
import { startSystem } from "@etherealengine/engine/src/ecs/functions/SystemFunctions"
import GrabbableScreenshareSystem from "./systems/GrabbableScreenshareSystem"

export default async function worldInjection() {
  startSystem(GrabbableScreenshareSystem, {after: InputSystemGroup})
}
