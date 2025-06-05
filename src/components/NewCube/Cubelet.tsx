// import { Mesh } from "three";
import { useMemo } from "react";
// import { useFrame } from "@react-three/fiber";

type CubeletProps = {
  position: [number, number, number];
  colors?: Partial<{
    px: string; // +X (right)
    nx: string; // -X (left)
    py: string; // +Y (top)
    ny: string; // -Y (bottom)
    pz: string; // +Z (front)
    nz: string; // -Z (back)
  }>;
};

export default function Cubelet({ position, colors = {} }: CubeletProps) {
  const materials = useMemo(() => {
    const defaultColor = "#222"; // dark gray
    const faceColors = {
      px: colors.px || defaultColor,
      nx: colors.nx || defaultColor,
      py: colors.py || defaultColor,
      ny: colors.ny || defaultColor,
      pz: colors.pz || defaultColor,
      nz: colors.nz || defaultColor,
    };

    return [
      <meshStandardMaterial attach="material-0" key={0} color={faceColors.px} />, // +X
      <meshStandardMaterial attach="material-1" key={1} color={faceColors.nx} />, // -X
      <meshStandardMaterial attach="material-2" key={2} color={faceColors.py} />, // +Y
      <meshStandardMaterial attach="material-3" key={3} color={faceColors.ny} />, // -Y
      <meshStandardMaterial attach="material-4" key={4} color={faceColors.pz} />, // +Z
      <meshStandardMaterial attach="material-5" key={5} color={faceColors.nz} />, // -Z
    ];
  }, [colors]);

  return (
    <mesh position={position}>
      <boxGeometry args={[0.9, 0.9, 0.9]} />
      {materials}
    </mesh>
  );
}
