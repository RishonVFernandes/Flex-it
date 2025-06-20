import { useEffect, useRef } from "react";
import Cubelet from "./Cubelet";
import { Group } from "three";
import gsap from "gsap";

const CubeScene6 = () => {
    const rightLayerRef = useRef<Group>(null);
    const leftLayerRef = useRef<Group>(null);
    const centerLayerRef = useRef<Group>(null);

    useEffect(() => {
        const timeout = setTimeout(() => {

            if (!leftLayerRef.current) return;
        
            gsap.to(leftLayerRef.current.rotation, {
                x: leftLayerRef.current.rotation.x - Math.PI / 2,
                duration: 0.8,
                ease: "power2.inOut",
            });
        }, 50)

        return () => clearTimeout(timeout)
    })

    return (
        <>
            <group ref={rightLayerRef}>
                {/* 9 cubelets explicitly on the right face (x = 1) */}
                <Cubelet
                    position={[1, 1, 1]}
                    colors={{
                        px: "yellow", // Right
                        py: "orange", // Top
                        pz: "blue", // Front
                    }}
                />
                <Cubelet position={[1, 1, 0]} colors={{px: "red", py: "blue"}} />
                <Cubelet position={[1, 1, -1]} colors={{px: "yellow", py: "orange", nz: "green"}} />
                <Cubelet position={[1, 0, 1]} colors={{px:"yellow", pz:"blue"}} />
                <Cubelet position={[1, 0, 0]} colors={{px:"red"}} />
                <Cubelet position={[1, 0, -1]} colors={{px:"red", nz: "green"}} />
                <Cubelet position={[1, -1, 1]} colors={{px:"blue", pz: "white", ny: "red"}} />
                <Cubelet position={[1, -1, 0]} colors={{px:"red", ny: "white"}} />
                <Cubelet position={[1, -1, -1]} colors={{px:"red", ny: "white", nz: "green"}} />
            </group>
            <group ref={centerLayerRef} >
                <Cubelet position={[0, 1, 1]} colors={{py: "orange", pz: "blue"}} />
                <Cubelet position={[0, 1, 0]} colors={{py: "yellow"}}/>
                <Cubelet position={[0, 1, -1]} colors={{py: "yellow", nz: "red"}} />
                <Cubelet position={[0, 0, 1]} colors={{pz: "blue"}} />
                <Cubelet position={[0, 0, 0]} />
                <Cubelet position={[0, 0, -1]} colors={{nz: "green"}} />
                <Cubelet position={[0, -1, 1]} colors={{pz: "yellow", ny: "green"}} />
                <Cubelet position={[0, -1, 0]} colors={{ny: "white"}} />
                <Cubelet position={[0, -1, -1]} colors={{ny: "white", nz: "green"}} />
            </group>
            <group ref={leftLayerRef} position={[0, 0, 0]}>
                <Cubelet position={[-1, 1, 1]} colors={{nx: "green", py: "red", pz:"yellow"}} />
                <Cubelet position={[-1, 1, 0]} colors={{nx: "orange", py: "green"}} />
                <Cubelet position={[-1, 1, -1]} colors={{nx: "orange", py: "green", nz: "white"}} />
                <Cubelet position={[-1, 0, 1]} colors={{nx: "orange", pz: "yellow"}}/>
                <Cubelet position={[-1, 0, 0]} colors={{nx: "orange"}}/>
                <Cubelet position={[-1, 0, -1]} colors={{nx: "orange", nz: "white"}}/>
                <Cubelet position={[-1, -1, 1]} colors={{nx: "white", pz: "orange", ny: "blue"}}/>
                <Cubelet position={[-1, -1, 0]} colors={{nx: "white", ny: "blue"}}/>
                <Cubelet position={[-1, -1, -1]} colors={{nx: "red", nz: "yellow", ny: "blue"}}/>
            </group>
            
            {/* <mesh position={[0, -3, 0]} onClick={rotateRight}>
                <boxGeometry args={[2, 1, 0.2]} />
                <meshStandardMaterial color="black" />
            </mesh> */}
        </>
    );
};

export default CubeScene6;