import { useState, useRef } from "react";
// import { CubeletData } from "../../types/cubeTypes.ts";
import Cubelet from "./Cubelet";
import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Group } from "three";

/*
function rotateRightFace(cube: CubeletData[][][]) {
    // Deep clone the cube to ensure immutability
    const newCube = cube.map((layer) =>
        layer.map((row) => row.map((cubelet) => ({ ...cubelet })))
    );

    const x = 2;
    const face: CubeletData[][] = [];

    // Extract the face
    for (let y = 0; y < 3; y++) {
        face[y] = [];
        for (let z = 0; z < 3; z++) {
            face[y][z] = cube[x][y][z];
        }
    }

    // Rotate the face
    for (let y = 0; y < 3; y++) {
        for (let z = 0; z < 3; z++) {
            newCube[x][y][z] = { ...face[2 - z][y] }; // Ensure immutability
            newCube[x][y][z].position = [x - 1, y - 1, z - 1];
        }
    }

    return newCube; // Return a new reference
}
*/
const NewRubiksCube = () => {
    // const [cubelets, setCubelets] = useState<CubeletData[][][]>(() => {
    //     const cube: CubeletData[][][] = [];
    //     let id = 0;
    //     for (let x = 0; x < 3; x++) {
    //         cube[x] = [];
    //         for (let y = 0; y < 3; y++) {
    //             cube[x][y] = [];
    //             for (let z = 0; z < 3; z++) {
    //                 cube[x][y][z] = {
    //                     id: `c-${id++}`,
    //                     position: [x - 1, y - 1, z - 1],
    //                 };
    //             }
    //         }
    //     }
    //     return cube;
    // });
    const [cubelets, setCubelets] = useState(() => {
        const cube = [];
        let id = 0;
        for (let x = 0; x < 3; x++) {
            for (let y = 0; y < 3; y++) {
                for (let z = 0; z < 3; z++) {
                    cube.push({ id: `c-${id++}`, position: [x, y, z] as [number, number, number] });
                }
            }
        }
        return cube;
    });

    const rightFaceRef = useRef<Group>(null);
    const [isRotating, setIsRotating] = useState(false);
    const [rotationProgress, setRotationProgress] = useState(0);

    // Animate the right face rotation using useFrame
    useFrame((_, delta) => {
        if (isRotating && rightFaceRef.current) {
            const rotationSpeed = Math.PI / 2; // 90 degrees per second
            const step = rotationSpeed * delta;
            console.log(rightFaceRef);

            if (rotationProgress + step >= Math.PI / 2) {
                // Complete the rotation
                rightFaceRef.current.rotation.x +=
                    Math.PI / 2 - rotationProgress;
                setRotationProgress(0);
                setIsRotating(false);
                // setCubelets((c) => rotateRightFace(c));
                setCubelets((prev) =>
                    prev.map((c) => {
                        const [x, y, z] = c.position;
                        if (x === 1) {
                            return {
                                ...c,
                                position: [x, -z as number, y as number] as [number, number, number],
                            };
                        }
                        return c;
                    })
                );
            } else {
                // Continue the rotation
                rightFaceRef.current.rotation.x += step;
                setRotationProgress((prev) => prev + step);
            }
        }
    });

    const handleRotateRight = () => {
        if (!isRotating) {
            setIsRotating(true);
        }
    };

    return (
        <>
            {/* <group>
                {cubelets.flat(2).map((c) => {
                    const isRightFace = c.position[0] === 1; // Right face (x = 1)
                    return (
                        <group
                            key={c.id}
                            ref={isRightFace ? rightFaceRef : null} // Attach ref to right face
                        >
                            <Cubelet position={c.position} />
                        </group>
                    );
                })}
            </group> */}
            <group>
                {cubelets
                    .filter((c) => c.position[0] !== 1)
                    .map((c) => (
                        <Cubelet key={c.id} position={c.position} />
                    ))}

                <group ref={rightFaceRef}>
                    {cubelets
                        .filter((c) => c.position[0] === 1)
                        .map((c) => (
                            <Cubelet key={c.id} position={c.position} />
                        ))}
                </group>
            </group>
            <Html>
                <button
                    onClick={handleRotateRight}
                    style={{
                        position: "absolute",
                        top: 20,
                        left: 20,
                        zIndex: 10,
                    }}
                >
                    Rotate right
                </button>
            </Html>
        </>
    );
};

export default NewRubiksCube;
