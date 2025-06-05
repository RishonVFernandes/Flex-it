// src/components/rotate.ts
import { Group } from "three";
import gsap from "gsap";

export type Axis = "x" | "y" | "z";

export default function rotate(
  cubeGroup: Group,
  rotationGroup: Group,
  axis: Axis,
  limit: number,
  dir: number
) {
  if (gsap.isTweening(rotationGroup.rotation)) return;

  // Reset rotation and clear previous children
  rotationGroup.rotation.set(0, 0, 0);

  // Attach matching cubelets to the rotationGroup
  const targets = cubeGroup.children.filter((cubelet) => {
    const pos = cubelet.position as { x: number; y: number; z: number };
    return Math.round(pos[axis]) === limit;
  });

  if (targets.length === 0) {
    console.warn("No cubelets found to rotate on axis", axis, "at", limit);
    return;
  }

  targets.forEach((cubelet) => {
    rotationGroup.attach(cubelet);
  });

  const targetRotation = (Math.PI / 2) * dir;

  gsap.to(rotationGroup.rotation, {
    [axis]: targetRotation,
    duration: 0.4,
    ease: "power2.inOut",
    onComplete: () => {
      // Detach rotated cubelets and reattach to cubeGroup
      [...rotationGroup.children].forEach((child) => {
        cubeGroup.attach(child);
      });

      rotationGroup.rotation.set(0, 0, 0); // Reset for next use
    },
  });
}
