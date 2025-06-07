import { useEffect, useRef } from "react";
import Cubelet from "./Cubelet";
import { Group } from "three";
import gsap from "gsap";

const CubeScene5 = () => {
    const frontLayerRef = useRef<Group>(null);
    const backLayerRef = useRef<Group>(null);
    const centerLayerRef = useRef<Group>(null);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (!frontLayerRef.current) return;

            gsap.to(frontLayerRef.current.rotation, {
                z: frontLayerRef.current.rotation.z + Math.PI / 2,
                duration: 0.4,
                ease: "power2.inOut",
            });
        }, 400);

        return () => clearTimeout(timeout);
    });
    return (
        <>
            <group ref={frontLayerRef}>
                {/* 9 cubelets explicitly on the right face (x = 1) */}
                <Cubelet
                    position={[1, 1, 1]}
                    colors={{
                        px: "yellow", // Right
                        py: "orange", // Top
                        pz: "blue", // Front
                    }}
                />
                <Cubelet
                    position={[1, 0, 1]}
                    colors={{ px: "yellow", pz: "blue" }}
                />
                <Cubelet
                    position={[1, -1, 1]}
                    colors={{ px: "blue", pz: "white", ny: "red" }}
                />
                <Cubelet
                    position={[0, 1, 1]}
                    colors={{ py: "orange", pz: "blue" }}
                />
                <Cubelet position={[0, 0, 1]} colors={{ pz: "blue" }} />
                <Cubelet
                    position={[0, -1, 1]}
                    colors={{ pz: "yellow", ny: "green" }}
                />
                <Cubelet
                    position={[-1, 1, 1]}
                    colors={{ nx: "white", py: "orange", pz: "blue" }}
                />
                <Cubelet
                    position={[-1, 0, 1]}
                    colors={{ nx: "white", pz: "blue" }}
                />
                <Cubelet
                    position={[-1, -1, 1]}
                    colors={{ nx: "red", pz: "blue", ny: "yellow" }}
                />
            </group>
            <group ref={centerLayerRef}>
                <Cubelet
                    position={[1, 1, 0]}
                    colors={{ px: "red", py: "blue" }}
                />
                <Cubelet position={[1, 0, 0]} colors={{ px: "red" }} />
                <Cubelet
                    position={[1, -1, 0]}
                    colors={{ px: "red", ny: "white" }}
                />
                <Cubelet position={[0, 1, 0]} colors={{ py: "yellow" }} />
                <Cubelet position={[0, 0, 0]} />
                <Cubelet position={[0, -1, 0]} colors={{ ny: "white" }} />
                <Cubelet
                    position={[-1, 1, 0]}
                    colors={{ nx: "orange", py: "yellow" }}
                />
                <Cubelet position={[-1, 0, 0]} colors={{ nx: "orange" }} />
                <Cubelet
                    position={[-1, -1, 0]}
                    colors={{ nx: "orange", ny: "white" }}
                />
            </group>
            <group ref={backLayerRef} position={[0, 0, 0]}>
                <Cubelet
                    position={[1, 1, -1]}
                    colors={{ px: "yellow", py: "orange", nz: "green" }}
                />
                <Cubelet
                    position={[1, 0, -1]}
                    colors={{ px: "red", nz: "green" }}
                />
                <Cubelet
                    position={[1, -1, -1]}
                    colors={{ px: "red", ny: "white", nz: "green" }}
                />
                <Cubelet
                    position={[0, 1, -1]}
                    colors={{ py: "yellow", nz: "red" }}
                />
                <Cubelet position={[0, 0, -1]} colors={{ nz: "green" }} />
                <Cubelet
                    position={[0, -1, -1]}
                    colors={{ ny: "white", nz: "green" }}
                />
                <Cubelet
                    position={[-1, 1, -1]}
                    colors={{ nx: "green", py: "yellow", nz: "red" }}
                />
                <Cubelet
                    position={[-1, 0, -1]}
                    colors={{ nx: "orange", nz: "green" }}
                />
                <Cubelet
                    position={[-1, -1, -1]}
                    colors={{ nx: "orange", nz: "green", ny: "white" }}
                />
            </group>
        </>
    );
};

export default CubeScene5;
