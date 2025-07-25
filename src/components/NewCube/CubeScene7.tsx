import { useEffect, useRef } from "react";
import Cubelet from "./Cubelet";
import { Group } from "three";
import gsap from "gsap";

const CubeScene7 = () => {
    const topLayerRef = useRef<Group>(null);
    const bottomLayerRef = useRef<Group>(null);
    const middleLayerRef = useRef<Group>(null);
    // const duration = 2.0;

    useEffect(() => {
        const timeout = setTimeout(() => {
            if(!bottomLayerRef.current) return;

            gsap.to(bottomLayerRef.current.rotation, {
                y: bottomLayerRef.current.rotation.y + Math.PI / 2,
                duration: 0.8,
                ease: "power2.inOut",
            });
        }, 50)

        return () => clearTimeout(timeout)
    }, []);

    return (
        <>
            <group ref={topLayerRef}>
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
                    position={[1, 1, 0]}
                    colors={{ px: "red", py: "blue" }}
                />
                <Cubelet
                    position={[1, 1, -1]}
                    colors={{ px: "yellow", py: "orange", nz: "green" }}
                />
                <Cubelet
                    position={[0, 1, 1]}
                    colors={{ py: "orange", pz: "blue" }}
                />
                <Cubelet position={[0, 1, 0]} colors={{ py: "yellow" }} />
                <Cubelet
                    position={[0, 1, -1]}
                    colors={{ py: "yellow", nz: "red" }}
                />
                <Cubelet
                    position={[-1, 1, 1]}
                    colors={{ nx: "green", py: "red", pz: "yellow" }}
                />
                <Cubelet
                    position={[-1, 1, 0]}
                    colors={{ nx: "orange", py: "green" }}
                />
                <Cubelet
                    position={[-1, 1, -1]}
                    colors={{ nx: "orange", py: "green", nz: "white" }}
                />
            </group>
            <group ref={middleLayerRef}>
                <Cubelet
                    position={[1, 0, 1]}
                    colors={{ px: "yellow", pz: "blue" }}
                />
                <Cubelet position={[1, 0, 0]} colors={{ px: "red" }} />
                <Cubelet
                    position={[1, 0, -1]}
                    colors={{ px: "red", nz: "green" }}
                />
                <Cubelet position={[0, 0, 1]} colors={{ pz: "blue" }} />
                <Cubelet position={[0, 0, 0]} />
                <Cubelet position={[0, 0, -1]} colors={{ nz: "green" }} />
                <Cubelet
                    position={[-1, 0, 1]}
                    colors={{ nx: "orange", pz: "yellow" }}
                />
                <Cubelet position={[-1, 0, 0]} colors={{ nx: "orange" }} />
                <Cubelet
                    position={[-1, 0, -1]}
                    colors={{ nx: "orange", nz: "white" }}
                />
            </group>
            <group ref={bottomLayerRef} position={[0, 0, 0]}>
                <Cubelet
                    position={[1, -1, 1]}
                    colors={{ px: "green", pz: "red", ny: "white" }}
                />
                <Cubelet
                    position={[1, -1, 0]}
                    colors={{ px: "green", ny: "white" }}
                />
                <Cubelet
                    position={[1, -1, -1]}
                    colors={{ px: "yellow", ny: "blue", nz: "red" }}
                />

                <Cubelet
                    position={[0, -1, 1]}
                    colors={{ pz: "red", ny: "white" }}
                />
                <Cubelet position={[0, -1, 0]} colors={{ ny: "white" }} />
                <Cubelet
                    position={[0, -1, -1]}
                    colors={{ ny: "blue", nz: "white" }}
                />

                <Cubelet
                    position={[-1, -1, 1]}
                    colors={{ nx: "white", pz: "blue", ny: "red" }}
                />
                <Cubelet
                    position={[-1, -1, 0]}
                    colors={{ nx: "yellow", ny: "green" }}
                />
                <Cubelet
                    position={[-1, -1, -1]}
                    colors={{ nx: "orange", nz: "white", ny: "blue" }}
                />
            </group>
            
        </>
    );
};

export default CubeScene7;
