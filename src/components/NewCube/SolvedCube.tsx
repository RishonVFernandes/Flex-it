import { useEffect, useRef } from "react";
import Cubelet from "./Cubelet";
import { Group } from "three";
import gsap from "gsap";

const SolvedCube = () => {
    const rightLayerRef = useRef<Group>(null);
    const leftLayerRef = useRef<Group>(null);
    const centerLayerRef = useRef<Group>(null);
    const cubeRef = useRef<Group>(null);
    const lastScrollY = useRef<number>(0);

    useEffect(() => {
        const handleScroll = () => {
            const delta = lastScrollY.current - window.scrollY;
            lastScrollY.current = window.scrollY;
            if (!cubeRef.current) return;

            if(delta > 0 && cubeRef.current){
                gsap.to(cubeRef.current.rotation, {
                    // x: cubeRef.current.rotation.x + Math.PI / 2,
                    // y: cubeRef.current.rotation.y + Math.PI ,
                    x: cubeRef.current.rotation.x + Math.PI / 2,
                    // z: cubeRef.current.rotation.z + Math.PI / 2,
                    duration: 0.4,
                    ease: "power2.inOut",
                });
                gsap.to(cubeRef.current.rotation, {
                    // x: cubeRef.current.rotation.x + Math.PI / 2,
                    y: cubeRef.current.rotation.y + Math.PI /5,
                    // x: cubeRef.current.rotation.x + Math.PI / 2,
                    // z: cubeRef.current.rotation.z + Math.PI / 2,
                    duration: 1.0,
                    ease: "power2.inOut",
                });
                gsap.to(cubeRef.current.rotation, {
                    // x: cubeRef.current.rotation.x + Math.PI / 2,
                    // y: cubeRef.current.rotation.y + Math.PI ,
                    // x: cubeRef.current.rotation.x + Math.PI / 2,
                    z: cubeRef.current.rotation.z + Math.PI / 2,
                    duration: 0.4,
                    ease: "power2.inOut",
                });
            }
        }

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    })

    useEffect(() => {
        const timeout = setTimeout(() => {

            if (!cubeRef.current) return;
        
            gsap.to(cubeRef.current.rotation, {
                y: cubeRef.current.rotation.y - Math.PI * 2,
                duration: 0.8,
                ease: "power2.inOut",
            });
        }, 50)

        return () => clearTimeout(timeout)
    })

    return (
        // This cube is correct
        <>
        <group ref={cubeRef}>
            <group ref={rightLayerRef}>
                {/* 9 cubelets explicitly on the right face (x = 1) */}
                <Cubelet
                    position={[1, 1, 1]}
                    colors={{
                        px: "red", // Right
                        py: "yellow", // Top
                        pz: "blue", // Front
                    }}
                />
                <Cubelet position={[1, 1, 0]} colors={{px: "red", py: "yellow"}} />
                <Cubelet position={[1, 1, -1]} colors={{px: "red", py: "yellow", nz: "green"}} />
                <Cubelet position={[1, 0, 1]} colors={{px:"red", pz:"blue"}} />
                <Cubelet position={[1, 0, 0]} colors={{px:"red"}} />
                <Cubelet position={[1, 0, -1]} colors={{px:"red", nz: "green"}} />
                <Cubelet position={[1, -1, 1]} colors={{px:"red", pz: "blue", ny: "white"}} />
                <Cubelet position={[1, -1, 0]} colors={{px:"red", ny: "white"}} />
                <Cubelet position={[1, -1, -1]} colors={{px:"red", ny: "white", nz: "green"}} />
            </group>
            <group ref={leftLayerRef} position={[0, 0, 0]}>
                <Cubelet position={[-1, 1, 1]} colors={{nx: "orange", py: "yellow", pz:"blue"}} />
                <Cubelet position={[-1, 1, 0]} colors={{nx: "orange", py: "yellow"}} />
                <Cubelet position={[-1, 1, -1]} colors={{nx: "orange", py: "yellow", nz: "green"}} />
                <Cubelet position={[-1, 0, 1]} colors={{nx: "orange", pz: "blue"}}/>
                <Cubelet position={[-1, 0, 0]} colors={{nx: "orange"}}/>
                <Cubelet position={[-1, 0, -1]} colors={{nx: "orange", nz: "green"}}/>
                <Cubelet position={[-1, -1, 1]} colors={{nx: "orange", pz: "blue", ny: "white"}}/>
                <Cubelet position={[-1, -1, 0]} colors={{nx: "orange", ny: "white"}}/>
                <Cubelet position={[-1, -1, -1]} colors={{nx: "orange", nz: "green", ny: "white"}}/>
            </group>
            <group ref={centerLayerRef} >
                <Cubelet position={[0, 1, 1]} colors={{py: "yellow", pz: "blue"}} />
                <Cubelet position={[0, 1, 0]} colors={{py: "yellow"}}/>
                <Cubelet position={[0, 1, -1]} colors={{py: "yellow", nz: "green"}} />
                <Cubelet position={[0, 0, 1]} colors={{pz: "blue"}} />
                <Cubelet position={[0, 0, 0]} />
                <Cubelet position={[0, 0, -1]} colors={{nz: "green"}} />
                <Cubelet position={[0, -1, 1]} colors={{pz: "blue", ny: "white"}} />
                <Cubelet position={[0, -1, 0]} colors={{ny: "white"}} />
                <Cubelet position={[0, -1, -1]} colors={{ny: "white", nz: "green"}} />
            </group>
        </group>
            {/* <mesh position={[0, -3, 0]} onClick={rotateRight}>
                <boxGeometry args={[2, 1, 0.2]} />
                <meshStandardMaterial color="black" />
            </mesh> */}
        </>
    );
};

export default SolvedCube;
