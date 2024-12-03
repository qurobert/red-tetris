export const useInfoTetrimino = () => {
    const getPosition = (name, colPosition, rowPosition) => {
        const infos = getPositionInfos(name);

        return formatRotatePosition(infos, colPosition, rowPosition);
    }

    const getColor = (name) => {
        const infos = getPositionInfos(name);
        return infos.color;
    }

    const getPositionInfos = (name) => {
        const positions = {
            'I': infoTetriminoI,
            'J': infoTetriminoJ,
            'L': infoTetriminoL,
            'O': infoTetriminoO,
            'S': infoTetriminoS,
            'T': infoTetriminoT,
            'Z': infoTetriminoZ,
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

const infoTetriminoI = () => {
    return {
        rotate0: [[0, 1], [1, 1], [2, 1], [3, 1]],
        rotate90: [[2, 0], [2, 1], [2, 2], [2, 3]],
        rotate180: [[0, 2], [1, 2], [2, 2], [3, 2]],
        rotate270: [[1, 0], [1, 1], [1, 2], [1, 3]],
        color: 'bg-cyan',
    }
}

const infoTetriminoJ = () => {
    return {
        rotate0: [[0, 0], [0, 1], [1, 1], [2, 1]],
        rotate90: [[1, 2], [2, 0], [1, 0], [1, 1]],
        rotate180: [[0, 1], [1, 1], [2, 1], [2, 2]],
        rotate270: [[1, 0], [1, 1], [1, 2], [0, 2]],
        color: 'bg-blue',
    }
}
const infoTetriminoL = () => {
    return {
        rotate0: [[0, 1], [1, 1], [2, 1], [2, 0]],
        rotate90: [[1, 0], [1, 1], [1, 2], [2, 2]],
        rotate180: [[0, 2], [0, 1], [1, 1], [2, 1]],
        rotate270: [[0, 0], [1, 0], [1, 1], [1, 2]],
        color: 'bg-orange',
    }
}
const infoTetriminoO = () => {
    return {
        rotate0: [[1, 0], [1, 1], [2, 0], [2, 1]],
        rotate90: [[1, 0], [1, 1], [2, 0], [2, 1]],
        rotate180: [[1, 0], [1, 1], [2, 0], [2, 1]],
        rotate270: [[1, 0], [1, 1], [2, 0], [2, 1]],
        color: 'bg-yellow',
    }
}

const infoTetriminoS = () => {
    return {
        rotate0: [[0, 1], [1, 1], [1, 0], [2, 0]],
        rotate90: [[1, 0], [1, 1], [2, 1], [2, 2]],
        rotate180: [[0, 2], [1, 2], [1, 1], [2, 1]],
        rotate270: [[0, 0], [0, 1], [1, 1], [1, 2]],
        color: 'bg-green',
    }
}

const infoTetriminoT = () => {
    return {
        rotate0: [[0, 1], [1, 1], [1, 0], [2, 1]],
        rotate90: [[1, 0], [1, 1], [1, 2], [2, 1]],
        rotate180: [[0, 1], [1, 1], [1, 2], [2, 1]],
        rotate270: [[0, 1], [1, 0], [1, 1], [1, 2]],
        color: 'bg-purple',
    }
}

const infoTetriminoZ = () => {
    return {
        rotate0: [[0, 0], [1, 0], [1, 1], [2, 1]],
        rotate90: [[2, 0], [2, 1], [1, 1], [1, 2]],
        rotate180: [[0, 1], [1, 1], [1, 2], [2, 2]],
        rotate270: [[1, 0], [1, 1], [0, 1], [0, 2]],
        color: 'bg-red',
    }
}

const formatRotatePosition = (infos, colPosition, rowPosition) => {
    return Object.fromEntries(
        Object.entries(infos).filter(([key]) => key.startsWith('rotate'))
            .map(([key, value]) => [key, value.map(([x, y]) => ({
                col: x + colPosition,
                row: y + rowPosition
            }))])
    )
}