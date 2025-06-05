import { useFrame } from '@react-three/fiber';
import React, {useRef, useMemo} from 'react';
import { RoundedBoxGeometry } from 'three/examples/jsm/Addons.js';

const Cube = () => {
    const ref = useRef()

                const roundedBoxGeometry = useMemo(() => {
                    return new RoundedBoxGeometry(1, 1, 1, 3, 0.1)
                }, [])

                useFrame(() => {
                    JEASINGS.update()
                })

                return (
                    <>
                        <group ref={ref}>
                            {[...Array(3).keys()].map((x) =>
                                [...Array(3).keys()].map((y) =>
                                    [...Array(3).keys()].map((z) => (
                                        <Cubelet key={x + y * 3 + z * 9} position={[x - 1, y - 1, z - 1]} geometry={roundedBoxGeometry} />
                                    ))
                                )
                            )}
                        </group>
                        <Buttons cubeGroup={ref} />
                    </>
                )
                function Cubelet({ position, geometry }) {
                    return (
                        <>
                            <mesh position={position} geometry={geometry}>
                                {[...Array(6).keys()].map((i) => (
                                    <meshStandardMaterial
                                        key={i}
                                        attach={`material-${i}`}
                                        color={position[colorSides[i][0]] === colorSides[i][1] ? colorSides[i][2] : `black`}
                                    />
                                ))}
                            </mesh>
                        </>
                    )
                }
  return (
    <>
      
    </>
  );
};

export default Cube;