import {ModePosition} from "~/stores/tetromino";

export enum NameTetromino {
    I = 'I',
    J = 'J',
    L = 'L',
    O = 'O',
    S = 'S',
    T = 'T',
    Z = 'Z',
}

export const useInfoTetromino = () => {
    const getPosition = (name: NameTetromino | null, colPosition: number, rowPosition: number) : InfoPositionTetromino => {
        if (!name) throw new Error('Invalid name');
        const infos = getPositionInfos(name);

        return formatRotatePosition(infos, colPosition, rowPosition);
    }

    const getColor = (name: NameTetromino) => {
        const infos = getPositionInfos(name);
        return infos.color;
    }

    const getPositionInfos = (name: NameTetromino) : InfoTetromino => {
        const positions = {
            'I': infoTetrominoI,
            'J': infoTetrominoJ,
            'L': infoTetrominoL,
            'O': infoTetrominoO,
            'S': infoTetrominoS,
            'T': infoTetrominoT,
            'Z': infoTetrominoZ,
        }
        const positionInfo = positions[name]

        if (!positionInfo) throw new Error('Invalid name')
        return positionInfo();
    }

    return {
        getPosition,
        getColor,
    }
}

interface InfoTetromino {
    [ModePosition.rotate0]: number[][];
    [ModePosition.rotate90]: number[][];
    [ModePosition.rotate180]: number[][];
    [ModePosition.rotate270]: number[][];
    color: string;
}

const infoTetrominoI = () : InfoTetromino => {
    return {
        rotate0: [[0, 1], [1, 1], [2, 1], [3, 1]],
        rotate90: [[2, 0], [2, 1], [2, 2], [2, 3]],
        rotate180: [[0, 2], [1, 2], [2, 2], [3, 2]],
        rotate270: [[1, 0], [1, 1], [1, 2], [1, 3]],
        color: 'bg-cyan',
    }
}

const infoTetrominoJ = () : InfoTetromino => {
    return {
        rotate0: [[0, 0], [0, 1], [1, 1], [2, 1]],
        rotate90: [[1, 2], [2, 0], [1, 0], [1, 1]],
        rotate180: [[0, 1], [1, 1], [2, 1], [2, 2]],
        rotate270: [[1, 0], [1, 1], [1, 2], [0, 2]],
        color: 'bg-blue',
    }
}
const infoTetrominoL = () : InfoTetromino => {
    return {
        rotate0: [[0, 1], [1, 1], [2, 1], [2, 0]],
        rotate90: [[1, 0], [1, 1], [1, 2], [2, 2]],
        rotate180: [[0, 2], [0, 1], [1, 1], [2, 1]],
        rotate270: [[0, 0], [1, 0], [1, 1], [1, 2]],
        color: 'bg-orange',
    }
}
const infoTetrominoO = () : InfoTetromino => {
    return {
        rotate0: [[1, 0], [1, 1], [2, 0], [2, 1]],
        rotate90: [[1, 0], [1, 1], [2, 0], [2, 1]],
        rotate180: [[1, 0], [1, 1], [2, 0], [2, 1]],
        rotate270: [[1, 0], [1, 1], [2, 0], [2, 1]],
        color: 'bg-yellow',
    }
}

const infoTetrominoS = () : InfoTetromino => {
    return {
        rotate0: [[0, 1], [1, 1], [1, 0], [2, 0]],
        rotate90: [[1, 0], [1, 1], [2, 1], [2, 2]],
        rotate180: [[0, 2], [1, 2], [1, 1], [2, 1]],
        rotate270: [[0, 0], [0, 1], [1, 1], [1, 2]],
        color: 'bg-green',
    }
}

const infoTetrominoT = () : InfoTetromino => {
    return {
        rotate0: [[0, 1], [1, 1], [1, 0], [2, 1]],
        rotate90: [[1, 0], [1, 1], [1, 2], [2, 1]],
        rotate180: [[0, 1], [1, 1], [1, 2], [2, 1]],
        rotate270: [[0, 1], [1, 0], [1, 1], [1, 2]],
        color: 'bg-purple',
    }
}

const infoTetrominoZ = () :  InfoTetromino => {
    return {
        rotate0: [[0, 0], [1, 0], [1, 1], [2, 1]],
        rotate90: [[2, 0], [2, 1], [1, 1], [1, 2]],
        rotate180: [[0, 1], [1, 1], [1, 2], [2, 2]],
        rotate270: [[1, 0], [1, 1], [0, 1], [0, 2]],
        color: 'bg-red',
    }
}


export interface InfoPositionTetromino {
    [ModePosition.rotate0]: Position[];
    [ModePosition.rotate90]: Position[];
    [ModePosition.rotate180]: Position[];
    [ModePosition.rotate270]: Position[];
}


export interface Position {
    col: number;
    row: number;
}
const formatRotatePosition = (infos : any, colPosition: number, rowPosition : number) : InfoPositionTetromino => {
    return <InfoPositionTetromino>Object.fromEntries(
      Object.entries(infos).filter(([key]) => key.startsWith('rotate'))
      // @ts-ignore
      .map(([key, value]) => [key, value.map(([x, y]) => ({
          col: x + colPosition,
          row: y + rowPosition
      }))])
    )
}