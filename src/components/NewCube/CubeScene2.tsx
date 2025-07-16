import { useEffect, useRef } from "react";
import Cubelet from "./Cubelet";
import { Group } from "three";
import gsap from "gsap";

const CubeScene2 = () => {
    const topLayerRef = useRef<Group>(null);
    const bottomLayerRef = useRef<Group>(null);
    const middleLayerRef = useRef<Group>(null);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if(!topLayerRef.current) return;

            gsap.to(topLayerRef.current.rotation, {
                y: topLayerRef.current.rotation.y + Math.PI / 2,
                duration: 0.8,
                ease: "power2.inOut",
            });
        }, 50)

        return () => clearTimeout(timeout)
    }, []);
    return (
        <>
            <group ref={topLayerRef}>
                <Cubelet
                    position={[1, 1, 1]}
                    colors={{
                        px: "yellow", // Right
                        py: "blue", // Top
                        pz: "red", // Front
                    }}
                />
                <Cubelet position={[1, 1, 0]} colors={{px: "green", py: "yellow"}} />
                <Cubelet position={[1, 1, -1]} colors={{px: "green", py: "yellow", nz: "orange"}} />
                <Cubelet position={[0, 1, 1]} colors={{py: "blue", pz: "red"}} />
                <Cubelet position={[0, 1, 0]} colors={{py: "yellow"}}/>
                <Cubelet position={[0, 1, -1]} colors={{py: "yellow", nz: "orange"}} />
                <Cubelet position={[-1, 1, 1]} colors={{nx: "white", py: "blue", pz:"red"}} />
                <Cubelet position={[-1, 1, 0]} colors={{nx: "blue", py: "yellow"}} />
                <Cubelet position={[-1, 1, -1]} colors={{nx: "blue", py: "yellow", nz: "orange"}} />
            </group>
            <group ref={bottomLayerRef} position={[0, 0, 0]}>
            <Cubelet position={[1, -1, 1]} colors={{px:"red", pz: "white", ny: "green"}} />
                <Cubelet position={[1, -1, 0]} colors={{px:"red", ny: "green"}} />
                <Cubelet position={[1, -1, -1]} colors={{px:"red", ny: "green", nz: "yellow"}} />

                <Cubelet position={[0, -1, 1]} colors={{pz: "blue", ny: "white"}} />
                <Cubelet position={[0, -1, 0]} colors={{ny: "white"}} />
                <Cubelet position={[0, -1, -1]} colors={{ny: "white", nz: "green"}} />

                <Cubelet position={[-1, -1, 1]} colors={{nx: "orange", pz: "blue", ny: "white"}}/>
                <Cubelet position={[-1, -1, 0]} colors={{nx: "orange", ny: "white"}}/>
                <Cubelet position={[-1, -1, -1]} colors={{nx: "orange", nz: "green", ny: "white"}}/>
            </group>
            <group ref={middleLayerRef} >
            <Cubelet position={[1, 0, 1]} colors={{px:"red", pz:"white"}} />
                <Cubelet position={[1, 0, 0]} colors={{px:"red"}} />
                <Cubelet position={[1, 0, -1]} colors={{px:"red", nz: "yellow"}} />

                <Cubelet position={[0, 0, 1]} colors={{pz: "blue"}} />
                <Cubelet position={[0, 0, 0]} />
                <Cubelet position={[0, 0, -1]} colors={{nz: "green"}} />

                <Cubelet position={[-1, 0, 1]} colors={{nx: "orange", pz: "blue"}}/>
                <Cubelet position={[-1, 0, 0]} colors={{nx: "orange"}}/>
                <Cubelet position={[-1, 0, -1]} colors={{nx: "orange", nz: "green"}}/>
                
            </group>
        </>
    );
};

export default CubeScene2;
