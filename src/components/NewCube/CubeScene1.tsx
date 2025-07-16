import { useEffect, useRef } from "react";
import Cubelet from "./Cubelet";
import { Group } from "three";
import gsap from "gsap";

const CubeScene1 = () => {
    const rightLayerRef = useRef<Group>(null);
    const leftLayerRef = useRef<Group>(null);
    const centerLayerRef = useRef<Group>(null);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (!rightLayerRef.current) return;

            gsap.to(rightLayerRef.current.rotation, {
                x: rightLayerRef.current.rotation.x + Math.PI / 2,
                duration: 0.8,
                ease: "power2.inOut",
            });
        }, 50);

        return () => clearTimeout(timeout);
    });

    return (
        // this cubes right side is rotated R'
        <>
            <group ref={rightLayerRef}>
                {/* 9 cubelets explicitly on the right face (x = 1) */}
                <Cubelet
                    position={[1, 1, 1]}
                    colors={{
                        px: "red", // Right
                        py: "blue", // Top
                        pz: "white", // Front
                    }}
                />
                <Cubelet
                    position={[1, 1, 0]}
                    colors={{ px: "red", py: "blue" }}
                />
                <Cubelet
                    position={[1, 1, -1]}
                    colors={{ px: "red", py: "blue", nz: "yellow" }}
                />
                <Cubelet
                    position={[1, 0, 1]}
                    colors={{ px: "red", pz: "white" }}
                />
                <Cubelet position={[1, 0, 0]} colors={{ px: "red" }} />
                <Cubelet
                    position={[1, 0, -1]}
                    colors={{ px: "red", nz: "yellow" }}
                />
                <Cubelet
                    position={[1, -1, 1]}
                    colors={{ px: "red", pz: "white", ny: "green" }}
                />
                <Cubelet
                    position={[1, -1, 0]}
                    colors={{ px: "red", ny: "green" }}
                />
                <Cubelet
                    position={[1, -1, -1]}
                    colors={{ px: "red", ny: "green", nz: "yellow" }}
                />
            </group>
            <group ref={leftLayerRef} position={[0, 0, 0]}>
                <Cubelet
                    position={[-1, 1, 1]}
                    colors={{ nx: "orange", py: "yellow", pz: "blue" }}
                />
                <Cubelet
                    position={[-1, 1, 0]}
                    colors={{ nx: "orange", py: "yellow" }}
                />
                <Cubelet
                    position={[-1, 1, -1]}
                    colors={{ nx: "orange", py: "yellow", nz: "green" }}
                />
                <Cubelet
                    position={[-1, 0, 1]}
                    colors={{ nx: "orange", pz: "blue" }}
                />
                <Cubelet position={[-1, 0, 0]} colors={{ nx: "orange" }} />
                <Cubelet
                    position={[-1, 0, -1]}
                    colors={{ nx: "orange", nz: "green" }}
                />
                <Cubelet
                    position={[-1, -1, 1]}
                    colors={{ nx: "orange", pz: "blue", ny: "white" }}
                />
                <Cubelet
                    position={[-1, -1, 0]}
                    colors={{ nx: "orange", ny: "white" }}
                />
                <Cubelet
                    position={[-1, -1, -1]}
                    colors={{ nx: "orange", nz: "green", ny: "white" }}
                />
            </group>
            <group ref={centerLayerRef}>
                <Cubelet
                    position={[0, 1, 1]}
                    colors={{ py: "yellow", pz: "blue" }}
                />
                <Cubelet position={[0, 1, 0]} colors={{ py: "yellow" }} />
                <Cubelet
                    position={[0, 1, -1]}
                    colors={{ py: "yellow", nz: "green" }}
                />
                <Cubelet position={[0, 0, 1]} colors={{ pz: "blue" }} />
                <Cubelet position={[0, 0, 0]} />
                <Cubelet position={[0, 0, -1]} colors={{ nz: "green" }} />
                <Cubelet
                    position={[0, -1, 1]}
                    colors={{ pz: "blue", ny: "white" }}
                />
                <Cubelet position={[0, -1, 0]} colors={{ ny: "white" }} />
                <Cubelet
                    position={[0, -1, -1]}
                    colors={{ ny: "white", nz: "green" }}
                />
            </group>
        </>
    );
};

export default CubeScene1;
