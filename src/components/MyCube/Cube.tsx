// src/components/Cube.tsx
import { useRef, useEffect, useMemo } from "react";
import { Group } from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/Addons.js";
import Cubelet from "./Cubelet";
import rotate, { Axis } from "./rotate.ts";

const Cube = () => {
  const cubeGroup = useRef<Group>(null!);
  const rotationGroup = useRef<Group>(null!);

  const geometry = useMemo(() => new RoundedBoxGeometry(1, 1, 1, 3, 0.1), []);

  useEffect(() => {
    return () => geometry.dispose(); // Clean up geometry
  }, [geometry]);

  // Scramble and Scroll Solve Logic
  const scrambleMoves: { axis: Axis; limit: number; dir: number }[] = useMemo(() => {
    const moves: { axis: Axis; limit: number; dir: number }[] = [];
    const axes: Axis[] = ["x", "y", "z"];
    for (let i = 0; i < 10; i++) {
      const axis = axes[Math.floor(Math.random() * 3)];
      const limit = [-1, 0, 1][Math.floor(Math.random() * 3)];
      const dir = Math.random() > 0.5 ? 1 : -1;
      moves.push({ axis, limit, dir });
    }
    return moves;
  }, []);

  useEffect(() => {
    // Scramble on startup
    scrambleMoves.forEach((move, i) => {
      setTimeout(() => {
        rotate(cubeGroup.current, rotationGroup.current, move.axis, move.limit, move.dir);
      }, i * 500);
    });

    // Scroll-to-solve logic
    const solveMoves = [...scrambleMoves].reverse().map(({ axis, limit, dir }) => ({
      axis,
      limit,
      dir: -dir,
    }));

    let moveIndex = 0;
    let ticking = false;

    const onScroll = () => {
      if (ticking || moveIndex >= solveMoves.length) return;
      ticking = true;

      const { axis, limit, dir } = solveMoves[moveIndex];
      rotate(cubeGroup.current, rotationGroup.current, axis, limit, dir);
      moveIndex++;

      setTimeout(() => {
        ticking = false;
      }, 500);
    };

    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [scrambleMoves]);

  // Generate 27 cubelets in a 3x3x3 grid
  const cubelets = [];
  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 3; y++) {
      for (let z = 0; z < 3; z++) {
        cubelets.push(
          <Cubelet
            key={`${x}-${y}-${z}`}
            position={[x - 1, y - 1, z - 1]}
            geometry={geometry}
          />
        );
      }
    }
  }

  return (
    <group ref={cubeGroup}>
      {cubelets}
      <group ref={rotationGroup} />
    </group>
  );
};

export default Cube;
