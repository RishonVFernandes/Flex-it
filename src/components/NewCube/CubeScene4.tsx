// import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import Cubelet from "./Cubelet";
import { Group } from "three";
import gsap from "gsap";

const CubeScene4 = () => {
    const topLayerRef = useRef<Group>(null);
    const bottomLayerRef = useRef<Group>(null);
    const middleLayerRef = useRef<Group>(null);
    // const duration = 2.0;

    useEffect(() => {
        const timeout = setTimeout(() => {
            if(!topLayerRef.current) return;

            gsap.to(topLayerRef.current.rotation, {
                y: topLayerRef.current.rotation.y - Math.PI / 2,
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
                        px: "red", // Right
                        py: "blue", // Top
                        pz: "white", // Front
                    }}
                />
                <Cubelet position={[1, 1, 0]} colors={{px: "red", py: "blue"}} />
                <Cubelet position={[1, 1, -1]} colors={{px: "yellow", py: "orange", nz: "green"}} />
                <Cubelet position={[-1, 1, 1]} colors={{nx: "orange", py: "yellow", pz:"blue"}} />
                <Cubelet position={[-1, 1, 0]} colors={{nx: "orange", py: "yellow"}} />
                <Cubelet position={[-1, 1, -1]} colors={{nx: "green", py: "yellow", nz: "red"}} />
                <Cubelet position={[0, 1, 1]} colors={{py: "yellow", pz: "blue"}} />
                <Cubelet position={[0, 1, 0]} colors={{py: "yellow"}}/>
                <Cubelet position={[0, 1, -1]} colors={{py: "yellow", nz: "red"}} />

                

                
            </group>
            <group ref={bottomLayerRef} position={[0, 0, 0]}>
            <Cubelet position={[1, -1, 1]} colors={{px:"yellow", pz: "blue", ny: "red"}} />
                <Cubelet position={[1, -1, 0]} colors={{px:"red", ny: "white"}} />
                <Cubelet position={[1, -1, -1]} colors={{px:"red", ny: "white", nz: "green"}} />
            
                <Cubelet position={[0, -1, 1]} colors={{pz: "blue", ny: "white"}} />
                <Cubelet position={[0, -1, 0]} colors={{ny: "white"}} />
                <Cubelet position={[0, -1, -1]} colors={{ny: "white", nz: "green"}} />
                

                <Cubelet position={[-1, -1, 1]} colors={{nx: "orange", pz: "blue", ny: "white"}}/>
                <Cubelet position={[-1, -1, 0]} colors={{nx: "orange", ny: "white"}}/>
                <Cubelet position={[-1, -1, -1]} colors={{nx: "orange", nz: "green", ny: "white"}}/>
            </group>
            <group ref={middleLayerRef} >
            <Cubelet position={[1, 0, 1]} colors={{px:"green", pz:"yellow"}} />
                <Cubelet position={[1, 0, 0]} colors={{px:"red"}} />
                <Cubelet position={[1, 0, -1]} colors={{px:"red", nz: "green"}} />
                <Cubelet position={[-1, 0, 1]} colors={{nx: "orange", pz: "blue"}}/>
                <Cubelet position={[-1, 0, 0]} colors={{nx: "orange"}}/>
                <Cubelet position={[-1, 0, -1]} colors={{nx: "orange", nz: "green"}}/>

                <Cubelet position={[0, 0, 1]} colors={{pz: "blue"}} />
                <Cubelet position={[0, 0, 0]} />
                <Cubelet position={[0, 0, -1]} colors={{nz: "green"}} />

                
            </group>
            {/* <mesh position={[0, -3, 0]} onClick={rotateRight}>
                <boxGeometry args={[2, 1, 0.2]} />
                <meshStandardMaterial color="black" />
            </mesh> */}
        </>
    );
};

export default CubeScene4;
