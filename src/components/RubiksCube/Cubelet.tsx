import React, { useRef } from "react";
import { Mesh, Vector3 } from "three";
import { useFrame } from "@react-three/fiber";

interface CubeletProps {
    position: [number, number, number];
}

const faceColors: { [key: string]: string } = {
    px: "red", //+X
    nx: "orange", //-X
    py: "yellow", //+Y
    ny: "white", //-Y
    pz: "blue", //+Z
    nz: "green", //-Z
};

const faceDirections: [string, Vector3][] = [
    ["px", new Vector3(0.51, 0, 0)],
    ["nx", new Vector3(-0.51, 0, 0)],
    ["py", new Vector3(0, 0.51, 0)],
    ["ny", new Vector3(0, -0.51, 0)],
    ["pz", new Vector3(0, 0, 0.51)],
    ["nz", new Vector3(0, 0, -0.51)],
];
const Cubelet = ({ position }: CubeletProps) => {
    const ref = useRef<Mesh>(null!);
    const isOuter = (axis: number) => Math.abs(axis) === 1;

    useFrame(() => {});
    return (
        <>
            <group position={position} ref={ref}>
                <mesh>
                    <boxGeometry args={[0.95, 0.95, 0.95]} />
                    <meshStandardMaterial color="black" />
                </mesh>
                {faceDirections.map(([key, offset]) => {
                    const show =
                        (key === "px" && isOuter(position[0])) ||
                        (key === "nx" && isOuter(position[0])) ||
                        (key === "py" && isOuter(position[1])) ||
                        (key === "ny" && isOuter(position[1])) ||
                        (key === "pz" && isOuter(position[2])) ||
                        (key === "nz" && isOuter(position[2]));

                    if (!show) return null;

                    return (
                        <mesh
                            key={key}
                            position={offset.toArray()}
                            rotation={
                                key === "px"
                                    ? [0, Math.PI / 2, 0] // +X face
                                    : key === "nx"
                                    ? [0, -Math.PI / 2, 0] // -X face
                                    : key === "py"
                                    ? [-Math.PI / 2, 0, 0] // +Y face
                                    : key === "ny"
                                    ? [Math.PI / 2, 0, 0] // -Y face
                                    : key === "pz"
                                    ? [0, 0, 0] // +Z face
                                    : [0, Math.PI, 0] // -Z face
                            }
                        >
                            <planeGeometry args={[0.9, 0.9]} />
                            <meshStandardMaterial color={faceColors[key]} side={2} />
                        </mesh>
                    );
                })}
            </group>
        </>
    );
};

export default Cubelet;
