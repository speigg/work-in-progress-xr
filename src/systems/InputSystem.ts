import { defineSystem } from "@etherealengine/engine/src/ecs/functions/SystemFunctions"
import { Engine } from '@etherealengine/engine/src/ecs/classes/Engine'
import { ColliderComponent } from '@etherealengine/engine/src/scene/components/ColliderComponent'
import { TransformComponent } from '@etherealengine/engine/src/transform/components/TransformComponent'
import { VisibleComponent } from '@etherealengine/engine/src/scene/components/VisibleComponent'
import { RigidBodyComponent } from '@etherealengine/engine/src/physics/components/RigidBodyComponent'
import { Physics } from '@etherealengine/engine/src/physics/classes/Physics'
import { Collider, ColliderDesc, RigidBodyDesc } from '@dimforge/rapier3d-compat'
import { NameComponent } from '@etherealengine/engine/src/scene/components/NameComponent'
import { MeshBasicMaterial, BoxGeometry} from "three"
import { useEffect } from 'react'

const execute = () => {
  debugger;
  if (keys.KeyK?.down) { console.log("Key K") }
  if (keys.KeyI?.down)  { console.log("Key I") }
  if (keys.ButtonB?.down)  { console.log("Button B") }
}

export default defineSystem({
  uuid: 'ee.productivity.input',
  execute,
  reactor: () => { 
    useEffect (() => {
      debugger;
      const rightHandDynamic = createEntity()
      const rightHand = createEntity()
      const leftHandDynamic = createEntity()
      const leftHand = createEntity()
      debugger;
      const box = createEntity()
      addObjectToGroup(box, new THREE.Mesh(new BoxGeometry(), new MeshBasicMaterial()))
      setComponent(box, )
      setComponent(box, TransformComponent)
      getComponent(box, TransformComponent).position.set(0, 1.6, -1);
      setComponent(box, VisibleComponent, true)

      // const setupHand = (targetHand: Entity, targetHandDynamic: Entity) => {
      //   const handFixed = Physics.createRigidBody(
      //     targetHand,
      //     Engine.instance.physicsWorld,
      //     RigidBodyDesc.kinematicPositionBased(),
      //     []
      //   )
      //   setComponent(targetHand, NameComponent, targetHandDynamic === rightHandDynamic ? 'Right' : 'Left' + 'Hand Kinematic')
      //   setComponent(targetHand, TransformComponent)

      //   const kinematicBody = getComponent(targetHand, RigidBodyComponent)
      //   kinematicBody.targetKinematicLerpMultiplier = 50

      //   const handColliderDesc = ColliderDesc.ball(0.1)
      //   const handInteractionGroups = getInteractionGroups(BubbleCollisionGroups.Hand, BubbleCollisionGroups.Bubble)
      //   handColliderDesc.setCollisionGroups(handInteractionGroups)
      //   handColliderDesc.setActiveCollisionTypes(ActiveCollisionTypes.ALL)
      //   handColliderDesc.setActiveEvents(ActiveEvents.COLLISION_EVENTS | ActiveEvents.CONTACT_FORCE_EVENTS)
      //   handColliderDesc.setMass(0.5)

      //   const handDynamic = Physics.createRigidBody(
      //     targetHandDynamic,
      //     Engine.instance.physicsWorld,
      //     RigidBodyDesc.dynamic(),
      //     [handColliderDesc]
      //   )
      //   setComponent(targetHandDynamic, NameComponent, targetHandDynamic === rightHandDynamic ? 'Right' : 'Left' + 'Hand Dynamic')
      //   setComponent(targetHandDynamic, TransformComponent)
      //   handDynamic.enableCcd(true)
      //   setComponent(targetHandDynamic, CollisionComponent)
      //   const handToDynamicJointData = JointData.fixed(
      //     { x: 0.0, y: 0.0, z: 0.0 },
      //     { w: 1.0, x: 0.0, y: 0.0, z: 0.0 },
      //     { x: 0.0, y: 0.0, z: 0.0 },
      //     { w: 1.0, x: 0.0, y: 0.0, z: 0.0 }
      //   )
      //   Engine.instance.physicsWorld.createImpulseJoint(handToDynamicJointData, handFixed, handDynamic, true)
      // }
      // setupHand(leftHand)
      // setupHand(leftRight)
      // setupHand(leftHandDynamic)
      // setupHand(rightHandDynamic)
      return () => {
        // cleanup
      }
    }, [])
    return null; 
  }
})