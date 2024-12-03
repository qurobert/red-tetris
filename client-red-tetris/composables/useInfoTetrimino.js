export const useInfoTetrimino = (colPosition, rowPosition, name) => {
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
    if (!positionInfo) {
        throw new Error('Invalid name')
    }
    const infos = positionInfo()
    return {
        rotatePosition: Object.fromEntries(
            Object.entries(infos).filter(([key]) => key.startsWith('rotate'))
                .map(([key, value]) => [key, value.map(([x, y]) => ({
                    col: x + colPosition,
                    row: y + rowPosition
                }))])
        ),
        color: infos.color,
        size: infos.size
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