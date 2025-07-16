import { useEffect, useRef } from "react";
import Cubelet from "./Cubelet";
import { Group } from "three";
import gsap from "gsap";

const CubeScene10 = () => {
    const topLayerRef = useRef<Group>(null);
    const bottomLayerRef = useRef<Group>(null);
    const middleLayerRef = useRef<Group>(null);
    const cubeRef = useRef<Group>(null);
    // const duration = 2.0;

    useEffect(() => {
        const timeout = setTimeout(() => {
            if(!bottomLayerRef.current) return;

            gsap.to(bottomLayerRef.current.rotation, {
                y: bottomLayerRef.current.rotation.y + Math.PI / 2,
                duration: 0.4,
                ease: "power2.inOut",
            });

            if(!topLayerRef.current) return;

            gsap.to(topLayerRef.current.rotation, {
                y: topLayerRef.current.rotation.y - Math.PI / 2,
                duration: 0.4,
                ease: "power2.inOut",
            })
        }, 400)

        return () => clearTimeout(timeout)
    }, []);

    useEffect(() => {
        if(!cubeRef.current) return;
        gsap.from(cubeRef.current.rotation, {
            z: cubeRef.current.rotation.z + Math.PI * 2,
            duration: 2.0,
            ease: "power2.inOut",
        })
        // gsap.from(cubeRef.current.scale, {
        //     x: cubeRef.current.scale.x + 1,
        //     y: cubeRef.current.scale.y + 1,
        //     z: cubeRef.current.scale.z + 1,

        //     duration: 3.0,
        //     ease: "elastic"
        // })

        // gsap.from(cubeRef.current.up, {
        //     x: cubeRef.current.up.x + 2,
        //     duration: 2.0,
        //     ease: "elastic"
        // })
    })

    return (
        <>
        <group ref={cubeRef}>
            <group ref={topLayerRef}>
                {/* 9 cubelets explicitly on the right face (x = 1) */}
                <Cubelet
                    position={[1, 1, 1]}
                    colors={{
                        px: "yellow", // Right
                        py: "red", // Top
                        pz: "green", // Front
                    }}
                />
                <Cubelet
                    position={[1, 1, 0]}
                    colors={{ px: "blue", py: "orange" }}
                />
                <Cubelet
                    position={[1, 1, -1]}
                    colors={{ px: "orange", py: "green", nz: "yellow" }}
                />
                <Cubelet
                    position={[0, 1, 1]}
                    colors={{ py: "green", pz: "orange" }}
                />
                <Cubelet position={[0, 1, 0]} colors={{ py: "yellow" }} />
                <Cubelet
                    position={[0, 1, -1]}
                    colors={{ py: "green", nz: "red" }}
                />
                <Cubelet
                    position={[-1, 1, 1]}
                    colors={{ nx: "white", py: "red", pz: "green" }}
                />
                <Cubelet
                    position={[-1, 1, 0]}
                    colors={{ nx: "white", py: "blue" }}
                />
                <Cubelet
                    position={[-1, 1, -1]}
                    colors={{ nx: "white", py: "blue", nz: "orange" }}
                />
            </group>
            <group ref={middleLayerRef}>
                <Cubelet
                    position={[1, 0, 1]}
                    colors={{ px: "red", pz: "blue" }}
                />
                <Cubelet position={[1, 0, 0]} colors={{ px: "red" }} />
                <Cubelet
                    position={[1, 0, -1]}
                    colors={{ px: "orange", nz: "white" }}
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
                    colors={{ nx: "green", nz: "white" }}
                />
            </group>
            <group ref={bottomLayerRef} position={[0, 0, 0]}>
                <Cubelet
                    position={[1, -1, 1]}
                    colors={{ px: "white", pz: "orange", ny: "green" }}
                />
                <Cubelet
                    position={[1, -1, 0]}
                    colors={{ px: "red", ny: "yellow" }}
                />
                <Cubelet
                    position={[1, -1, -1]}
                    colors={{ px: "blue", ny: "red", nz: "yellow" }}
                />

                <Cubelet
                    position={[0, -1, 1]}
                    colors={{ pz: "yellow", ny: "blue" }}
                />
                <Cubelet position={[0, -1, 0]} colors={{ ny: "white" }} />
                <Cubelet
                    position={[0, -1, -1]}
                    colors={{ ny: "green", nz: "yellow" }}
                />

                <Cubelet
                    position={[-1, -1, 1]}
                    colors={{ nx: "orange", pz: "yellow", ny: "blue" }}
                />
                <Cubelet
                    position={[-1, -1, 0]}
                    colors={{ nx: "red", ny: "white" }}
                />
                <Cubelet
                    position={[-1, -1, -1]}
                    colors={{ nx: "blue", nz: "white", ny: "red" }}
                />
            </group>
            
            {/* <mesh position={[0, -3, 0]} onClick={rotateRight}>
                <boxGeometry args={[2, 1, 0.2]} />
                <meshStandardMaterial color="black" />
            </mesh> */}
        </group>
        </>
    );
};

export default CubeScene10;