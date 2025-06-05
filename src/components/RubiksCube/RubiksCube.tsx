import React, { JSX, useEffect, useRef, useState } from "react";
import Cubelet from "./Cubelet.tsx";
import { Group } from "three";
import {CubeletData} from '../../types/cubeTypes.ts';

const RubiksCube = () => {
    const [rotating, setRotating] = useState(false);
    const groupRef = useRef<Group>(null);
    const [angle, setAngle] = useState(0);
    const cubelets: JSX.Element[] = [];
    // const faceRefs = useRef<React.RefObject<Group>[][][]>([]);
    const faceRefs : React.RefObject<Group | null>[] = [];

    for (let x = -1; x <= 1; x++) {
        // if (!faceRefs.current[x + 1]) faceRefs.current[x + 1] = [];
        for (let y = -1; y <= 1; y++) {
            // if (!faceRefs.current[x + 1][y + 1]) faceRefs.current[x + 1][y + 1] = [];
            for (let z = -1; z <= 1; z++) {
                const ref = React.createRef<Group>();
                // faceRefs.current[x + 1][y + 1][z + 1] = ref;
                faceRefs.push(ref);
                cubelets.push(
                    // <group ref={ref} key={`${x}${y}${z}`} position={[x, y, z]}>
                        <Cubelet position={[x, y, z]} key={`${x}${y}${z}`}/>
                    // </group>
                );
            }
        }
    }

    useEffect(() => {
        if (!rotating) return;

        const interval = setInterval(() => {
            setAngle((prev) => {
                const next = prev + Math.PI / 30;
                if (next >= Math.PI / 2) {
                    setRotating(false);
                    return 0;
                }
                return next;
            });

            faceRefs.forEach((ref) => {
                const pos = ref.current?.position;
                if (pos?.x === 1 && ref.current) {
                    ref.current.rotation.x = angle;
                }
            });
        }, 16);

        return () => clearInterval(interval);
    }, [rotating, angle]);

    useEffect(()=> {
            const handleRotate = () => setRotating(true);
            window.addEventListener("rotateRight", handleRotate);
            return () => window.removeEventListener("rotateRight", handleRotate)
    }, [])

    return (
        <>
            <group ref={groupRef}>{cubelets}</group>;
            {/* <Html position={[0, 0, 4]}>
                <button onClick={() => setRotating(true)}>Rotate Right</button>
            </Html> */}
        </>
    );
};

export default RubiksCube;
