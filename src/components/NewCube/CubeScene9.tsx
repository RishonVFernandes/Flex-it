import { useEffect, useRef } from "react";
import Cubelet from "./Cubelet";
import { Group } from "three";
import gsap from "gsap";

const CubeScene9 = () => {
    const frontLayerRef = useRef<Group>(null);
    const backLayerRef = useRef<Group>(null);
    const centerLayerRef = useRef<Group>(null);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (!backLayerRef.current) return;

            gsap.to(backLayerRef.current.rotation, {
                z: backLayerRef.current.rotation.z + Math.PI,
                duration: 0.8,
                ease: "power2.inOut",
            });
        }, 50);

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
                        py: "green", // Top
                        pz: "orange", // Front
                    }}
                />
                <Cubelet
                    position={[1, 0, 1]}
                    colors={{ px: "red", pz: "blue" }}
                />
                <Cubelet
                    position={[1, -1, 1]}
                    colors={{ px: "yellow", pz: "orange", ny: "blue" }}
                />
                <Cubelet
                    position={[0, 1, 1]}
                    colors={{ py: "orange", pz: "blue" }}
                />
                <Cubelet position={[0, 0, 1]} colors={{ pz: "blue" }} />
                <Cubelet
                    position={[0, -1, 1]}
                    colors={{ pz: "red", ny: "white" }}
                />
                <Cubelet
                    position={[-1, 1, 1]}
                    colors={{ nx: "green", py: "red", pz: "yellow" }}
                />
                <Cubelet
                    position={[-1, 0, 1]}
                    colors={{ nx: "orange", pz: "yellow" }}
                />
                <Cubelet
                    position={[-1, -1, 1]}
                    colors={{ nx: "white", pz: "blue", ny: "red" }}
                />
            </group>
            <group ref={centerLayerRef}>
                <Cubelet
                    position={[1, 1, 0]}
                    colors={{ px: "red", py: "green" }}
                />
                <Cubelet position={[1, 0, 0]} colors={{ px: "red" }} />
                <Cubelet
                    position={[1, -1, 0]}
                    colors={{ px: "yellow", ny: "blue" }}
                />
                <Cubelet position={[0, 1, 0]} colors={{ py: "yellow" }} />
                <Cubelet position={[0, 0, 0]} />
                <Cubelet position={[0, -1, 0]} colors={{ ny: "white" }} />
                <Cubelet
                    position={[-1, 1, 0]}
                    colors={{ nx: "orange", py: "green" }}
                />
                <Cubelet position={[-1, 0, 0]} colors={{ nx: "orange" }} />
                <Cubelet
                    position={[-1, -1, 0]}
                    colors={{ nx: "yellow", ny: "green" }}
                />
            </group>
            <group ref={backLayerRef} position={[0, 0, 0]}>
                <Cubelet
                    position={[1, 1, -1]}
                    colors={{ px: "orange", py: "blue", nz: "white" }}
                />
                <Cubelet
                    position={[1, 0, -1]}
                    colors={{ px: "orange", nz: "white" }}
                />
                <Cubelet
                    position={[1, -1, -1]}
                    colors={{ px: "orange", ny: "green", nz: "white" }}
                />
                <Cubelet
                    position={[0, 1, -1]}
                    colors={{ py: "blue", nz: "white" }}
                />
                <Cubelet position={[0, 0, -1]} colors={{ nz: "green" }} />
                <Cubelet
                    position={[0, -1, -1]}
                    colors={{ ny: "yellow", nz: "red" }}
                />
                <Cubelet
                    position={[-1, 1, -1]}
                    colors={{ nx: "green", py: "red", nz: "white" }}
                />
                <Cubelet
                    position={[-1, 0, -1]}
                    colors={{ nx: "green", nz: "white" }}
                />
                <Cubelet
                    position={[-1, -1, -1]}
                    colors={{ nx: "yellow", nz: "blue", ny: "red" }}
                />
            </group>
        </>
    );
};

export default CubeScene9;
