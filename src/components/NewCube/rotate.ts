import { Group, Mesh, Vector3 } from "three";
import { gsap } from "gsap";

export type Axis = "x" | "y" | "z";

export default function rotate(
    cubeGroup: Group,
    rotationGroup: Group,
    axis: Axis,
    limit: number,
    dir: number
) {
    if (gsap.isTweening(rotationGroup.rotation)) return;

    // Ensure the rotation group is empty
    if (rotationGroup.children.length > 0) {
        [...rotationGroup.children].forEach((child) => cubeGroup.attach(child));
    }

    // Reset the rotation group
    rotationGroup.rotation.set(0, 0, 0);

    // Attach cubelets based on position
    const threshold = 1e-3; // Precision threshold
    cubeGroup.children.forEach((cubelet) => {
        const position = (cubelet as Mesh).position as Vector3;
        if (Math.abs(position[axis] - limit) < threshold) {
            rotationGroup.attach(cubelet);
        }
    });

    console.log("Before rotation:");
    console.log("CubeGroup children count:", cubeGroup.children.length);
    console.log("RotationGroup children count:", rotationGroup.children.length);

    // Animate the rotation
    const targetRotation = (Math.PI / 2) * dir;
    gsap.to(rotationGroup.rotation, {
        [axis]: targetRotation,
        duration: 0.4,
        ease: "power2.inOut",
        onComplete: () => {
            console.log("After rotation:");
            console.log("CubeGroup children count:", cubeGroup.children.length);
            console.log("RotationGroup children count:", rotationGroup.children.length);

            // Update cubelet positions and orientations based on the rotation
            [...rotationGroup.children].forEach((child) => {
                const cubelet = child as Mesh;

                // Apply the rotation to the position and orientation
                cubelet.position.applyEuler(rotationGroup.rotation);
                cubelet.quaternion.multiply(rotationGroup.quaternion);

                // Round the position to avoid floating-point inaccuracies
                cubelet.position.set(
                    Math.round(cubelet.position.x),
                    Math.round(cubelet.position.y),
                    Math.round(cubelet.position.z)
                );

                // Re-attach the cubelet to the cubeGroup
                cubeGroup.attach(cubelet);
            });

            // Reset the rotation group
            rotationGroup.rotation.set(0, 0, 0);
            rotationGroup.updateMatrixWorld();

            // Log updated positions
            [...cubeGroup.children].forEach((cubelet) => {
                console.log(
                    "Cubelet position after re-attachment:",
                    (cubelet as Mesh).position.toArray()
                );
            });
        },
    });
}
