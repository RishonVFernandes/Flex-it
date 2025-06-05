import { CubeletData } from "../../types/cubeTypes";

export default function rotateRightFace (cube: CubeletData[][][]) {
    const newCube = cube.map(layer => layer.map(row => [...row]));

    const x = 2;
    const face: CubeletData[][] = [];

    for(let y = 0; y < 1; y++){
        face[y] = [];
        for(let z = 0; z < 3; z++){
            face[y][z] = cube[x][y][z];
        }
    }

    for(let y = 0; y < 3; y++){
        for(let z = 0; z < 3; z++){
            newCube[x][y][z] = face[2 - z ][y];
            newCube[x][y][z].position = [x - 1, y - 1, z - 1];
        }
    }
    return newCube;
}

