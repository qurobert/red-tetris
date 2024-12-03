import {useInfoTetrimino} from "~/composables/useInfoTetrimino.js";
import {useBoardStore} from "~/stores/board.js";

export const useTetriminoStore = defineStore('tetriminoStore', () => {
    const refName = ref('');
    const colPosition = ref(4);
    const rowPosition = ref(1);
    const positions = ref({});
    const refColor = ref('');
    const modePosition = ref('rotate0');


    const init = (name) => {
        const infoTetrimino = useInfoTetrimino();
        const position = infoTetrimino.getPosition(name, colPosition.value, rowPosition.value);
        const color = infoTetrimino.getColor(name);

        refName.value = name;
        positions.value = position;
        refColor.value = color;
    }

    const tryToSpawn = (name) => {
        const infoTetrimino = useInfoTetrimino();
        const newPositions = infoTetrimino.getPosition(name, 4, 1);
        if (!verifyNewPosition(newPositions['rotate0'])) return false;
        return true;
    }

    const restart = (newName) => {
        colPosition.value = 4;
        rowPosition.value = 1;
        modePosition.value = 'rotate0';
        init(newName);
    }


    // UTILITY
    const minCol = () => {
        if (!positions.value[modePosition.value]) return 1;
        return Math.min(...positions.value?.[modePosition.value]?.map(item => item.col));
    }

    const maxCol = () => {
        if (!positions.value[modePosition.value]) return 20;
        return Math.max(...positions.value?.[modePosition.value]?.map(item => item.col));
    }

    const minRow = () => {
        if (!positions.value[modePosition.value]) return 1;
        return Math.min(...positions.value[modePosition.value].map(item => item.row));
    }

    const maxRow = () => {
        if (!positions.value[modePosition.value]) return 20;
        return Math.max(...positions.value?.[modePosition.value]?.map(item => item.row));
    }

    const verifyNewPosition = (newPosition) => {
        const boardStore = useBoardStore();
        const board = boardStore.board;

        for (let i = 0; i < newPosition.length; i++) {
            const block = newPosition[i];
            const index = block.row * 10 - (10 - block.col) - 1;
            if (block.row > 20 || block.row < 1 ||
                block.col > 10 || block.col < 1 ||
                board[index].isFilled)
                return false;


        }
        return true;
    }

    const getPosition = () => {
        return positions.value[modePosition.value];
    }

    const setPosition = (newPosition) => {
        positions.value = newPosition;
    }


    // ACTIONS
    const tryMoveDown = () => {
        const infoTetrimino = useInfoTetrimino();
        const newRowPosition = rowPosition.value + 1;
        const newPositions = infoTetrimino.getPosition(refName.value, colPosition.value, newRowPosition);

        if (!verifyNewPosition(newPositions[modePosition.value])) return false;
        return true
    }

    const moveDown = () => {
        const infoTetrimino = useInfoTetrimino();
        const newRowPosition = rowPosition.value + 1;
        const newPositions = infoTetrimino.getPosition(refName.value, colPosition.value, newRowPosition);

        if (!verifyNewPosition(newPositions[modePosition.value])) return ;
        rowPosition.value += 1;
        setPosition(newPositions);
    }

    const moveBottom = () => {
        while (tryMoveDown())
            moveDown();
    }

    const moveLeft = () => {
        if (minCol() === 1) return;
        const newColPosition = colPosition.value - 1;
        const infoTetrimino = useInfoTetrimino();
        const newPositions = infoTetrimino.getPosition(refName.value, newColPosition, rowPosition.value);

        if (!verifyNewPosition(newPositions[modePosition.value])) return;
        colPosition.value -= 1;
        setPosition(newPositions);
    }

    const moveRight = () => {
        if (maxCol() === 10) return;
        const newColPosition = colPosition.value + 1;
        const infoTetrimino = useInfoTetrimino();
        const newPositions = infoTetrimino.getPosition(refName.value, newColPosition, rowPosition.value);

        if (!verifyNewPosition(newPositions[modePosition.value])) return;
        colPosition.value += 1;
        setPosition(newPositions);
    }

    const rotate = () => {
        let newModeRotate = getNewRotation();
        const newPosition = positions.value[newModeRotate];

        if (!verifyNewPosition(newPosition)) return;
        modePosition.value = newModeRotate;
    }

    const getNewRotation = () => {
        switch (modePosition.value) {
            case 'rotate0':
                return 'rotate90';
            case 'rotate90':
                return 'rotate180';
            case 'rotate180':
                return 'rotate270';
            case 'rotate270':
                return 'rotate0';
            default:
                return 'rotate0';
        }
    }

    return {
        refName,
        colPosition,
        rowPosition,
        refColor,
        positions,
        modePosition,

        rotate,
        moveLeft,
        moveRight,
        moveDown,
        moveBottom,
        init,
        restart,

        minRow,
        maxRow,
        minCol,
        maxCol,

        tryMoveDown,
        tryToSpawn,
        getPosition,
    }
})