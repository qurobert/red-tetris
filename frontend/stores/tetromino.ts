import {
    type InfoPositionTetromino,
    NameTetromino, type Position,
    useInfoTetromino
} from "~/composables/useInfoTetromino.js";
import {useBoardStore} from "~/stores/board";
import {defineStore} from "pinia";
import {computed, ref} from "vue";
import {useUserStore} from "~/stores/user";

export enum ModePosition {
    rotate0 = 'rotate0',
    rotate90 = 'rotate90',
    rotate180 = 'rotate180',
    rotate270 = 'rotate270',
}

export const useTetrominoStore = defineStore('tetrominoStore', () => {
    const refName = ref(null as NameTetromino | null );
    const colPosition = ref(4);
    const rowPosition = ref(1);
    const positions = ref({} as InfoPositionTetromino);
    const refColor = ref('');
    const modePosition  = ref(ModePosition.rotate0);
    const lettersTetrominos = ref([] as NameTetromino[]);
    const indexNameTetromino = ref(0);

    const currentTetrominoLetter = computed(() => {
        return lettersTetrominos.value[indexNameTetromino.value];
    })

    const nextTetrominoLetter = computed(() => {
        return lettersTetrominos.value[indexNameTetromino.value + 1];
    });

    const updateTetrominos = (newLetters: NameTetromino[]) => {
        lettersTetrominos.value = newLetters;
    }

    const incrementIndexNameTetromino = () => {
        indexNameTetromino.value++;
        if (indexNameTetromino.value >= lettersTetrominos.value.length) {
            indexNameTetromino.value = 0;
        }
    }
    const init = (default_name?: NameTetromino ) => {
        const name = default_name ? default_name : lettersTetrominos.value[indexNameTetromino.value];
        const infoTetromino = useInfoTetromino();
        const position = infoTetromino.getPosition(name, colPosition.value, rowPosition.value);
        const color = infoTetromino.getColor(name);

        refName.value = name;
        positions.value = position;
        refColor.value = color;
    }

    const tryToSpawn = (defaultName?: NameTetromino) => {
        const name = defaultName ? defaultName : lettersTetrominos.value[indexNameTetromino.value];
        const infoTetromino = useInfoTetromino();
        const newPositions = infoTetromino.getPosition(name, 4, 1);
        if (!verifyNewPosition(newPositions['rotate0'])) return false;
        return true;
    }

    const restart = () => {
        colPosition.value = 4;
        rowPosition.value = 1;
        modePosition.value = ModePosition.rotate0;
        init();
    }
    const reset = () => {
        refName.value = null;
        colPosition.value = 4;
        rowPosition.value = 1;
        positions.value = {} as InfoPositionTetromino;
        refColor.value = '';
        modePosition.value = ModePosition.rotate0;
        indexNameTetromino.value = 0;
        lettersTetrominos.value = [];
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

    const verifyNewPosition = (newPosition : Position[]) => {
        const boardStore = useBoardStore();
        const board = boardStore.board;

        if (!board.length) {
            throw new Error('Board is empty');
        }
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

    const setPosition = (newPosition: InfoPositionTetromino) => {
        positions.value = newPosition;
    }


    // ACTIONS
    const tryMoveDown = () => {
        const infoTetromino = useInfoTetromino();
        const newRowPosition = rowPosition.value + 1;
        const newPositions = infoTetromino.getPosition(refName.value, colPosition.value, newRowPosition);

        if (!verifyNewPosition(newPositions[modePosition.value])) return false;
        return true
    }

    const moveDown = () => {
        const infoTetromino = useInfoTetromino();
        const newRowPosition = rowPosition.value + 1;
        const newPositions = infoTetromino.getPosition(refName.value, colPosition.value, newRowPosition);

        if (!verifyNewPosition(newPositions[modePosition.value])) return ;
        rowPosition.value += 1;
        setPosition(newPositions);
    }

    const moveBottom = () => {
        const userStore = useUserStore();
        let addScore = 0;

        while (tryMoveDown()) {
            moveDown();
            addScore++;
        }
        userStore.incrementScore(addScore)
    }

    const moveLeft = () => {
        if (minCol() === 1) return;
        const newColPosition = colPosition.value - 1;
        const infoTetromino = useInfoTetromino();
        const newPositions = infoTetromino.getPosition(refName.value, newColPosition, rowPosition.value);

        if (!verifyNewPosition(newPositions[modePosition.value])) return;
        colPosition.value -= 1;
        setPosition(newPositions);
    }

    const moveRight = () => {
        if (maxCol() === 10) return;
        const newColPosition = colPosition.value + 1;
        const infoTetromino = useInfoTetromino();
        const newPositions = infoTetromino.getPosition(refName.value, newColPosition, rowPosition.value);

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

    const getNewRotation = () : ModePosition => {
        switch (modePosition.value) {
            case ModePosition.rotate0:
                return ModePosition.rotate90;
            case ModePosition.rotate90:
                return ModePosition.rotate180;
            case ModePosition.rotate180:
                return ModePosition.rotate270;
            case ModePosition.rotate270:
                return ModePosition.rotate0;
            default:
                return ModePosition.rotate0;
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
        reset,

        minRow,
        maxRow,
        minCol,
        maxCol,

        tryMoveDown,
        tryToSpawn,
        getPosition,

        currentTetrominoLetter,
        nextTetrominoLetter,
        incrementIndexNameTetromino,
        updateTetrominos
    }
})