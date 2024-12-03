import {useTetriminoStore} from "~/stores/tetrimino.js";

export const useBoardStore = defineStore('boardStore', () => {
    const board = ref([]);
    const tetriminoStore = useTetriminoStore();

    const initBoard = () => {
        for (let i = 1; i <= 20; i++) {
            for (let j = 1; j <= 10; j++) {
                board.value.push({
                    col: j,
                    row: i,
                    color: null,
                    isFilled: false
                });
            }
        }
    }
    const updateBoardFromTetrimino = () => {
        const finalPosition = tetriminoStore.getPosition();
        const color = tetriminoStore.refColor;

        finalPosition.map((block) => {
            const index = block.row * 10 - (10 - block.col) - 1;

            board.value[index].color = color;
            board.value[index].isFilled = true;
        });
    }

    const maxIsFilled = () => {
        const minCol = tetriminoStore.minCol();
        const maxCol = tetriminoStore.maxCol();

        const colsGroup = Object.groupBy(board.value
            .filter((block) => !block.isFilled && block.col >= minCol && block.col <= maxCol), (block) => block.col);
        return Math.min(...Object.values(colsGroup).map((group) => group.length));
    }

    return {
        board,
        initBoard,
        updateBoardFromTetrimino,
        maxIsFilled
    }
});