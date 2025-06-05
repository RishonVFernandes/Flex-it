// src/components/Cubelet.tsx
type MeshProps = JSX.IntrinsicElements['mesh'];
import { JSX } from "react";
// import { MeshStandardMaterialProps } from "three";
import { BoxGeometry } from "three";

type CubeletProps = {
    position: [number, number, number];
    geometry: BoxGeometry;
} & MeshProps;

const faceColors: [number, number, string][] = [
    [0, 1, "darkorange"], // +x
    [0, -1, "red"], // -x
    [1, 1, "white"], // +y
    [1, -1, "yellow"], // -y
    [2, 1, "green"], // +z
    [2, -1, "blue"], // -z
];

const Cubelet = ({ position, geometry, ...props }: CubeletProps) => {
    return (
        <mesh position={position} geometry={geometry} {...props}>
            {[...Array(6)].map((_, i) => {
                const [axis, value, color] = faceColors[i];
                const matches = position[axis] === value;
                return (
                    <meshStandardMaterial
                        key={i}
                        attach={`material-${i}`}
                        color={matches ? color : "black"}
                        side={2}
                    />
                );
            })}
        </mesh>
    );
};

export default Cubelet;
