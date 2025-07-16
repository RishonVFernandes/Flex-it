import { useRef } from "react";
import Cubelet from "../NewCube/Cubelet.tsx";
import { Group } from "three";

export default function CubeFace() {

    const rightLayerRef = useRef<Group>(null);
    const leftLayerRef = useRef<Group>(null);
    const centerLayerRef = useRef<Group>(null);
    const cubeRef = useRef<Group>(null);
    return (
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
        </>
    );
}
