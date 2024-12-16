import {useTetrominoStore} from "~/stores/tetromino.js";
import type {Position} from "~/composables/useInfoTetromino";
import {useGameStateStore} from "~/stores/gameState";

export const useBoardStore = defineStore('boardStore', () => {
    const board = ref([] as Board[]);
    const tetrominoStore = useTetrominoStore();

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
    const updateBoardFromTetromino = () => {
        const finalPosition = tetrominoStore.getPosition();
        const color = tetrominoStore.refColor;

        finalPosition.map((position: Position) => {
            const index = position.row * 10 - (10 - position.col) - 1;

            board.value[index].color = color;
            board.value[index].isFilled = true;
        });
    }

    const tryToRemoveLines =  () => {
        const rowsGroup = Object.groupBy(board.value
        .filter((block) => block.isFilled && !block.indestructible),
          (block) => block.row);

        Object.keys(rowsGroup).forEach((row: any) => {
            if (rowsGroup[row]?.length === 10) {
                board.value.forEach((block) => {
                    if (block.row == row) {
                        block.isFilled = false;
                        block.color = null;
                        block.row = 0;
                    }
                });

                board.value.forEach((block) => {
                    if (block.row < parseInt(row)) {
                        block.row += 1;
                    }
                });

                recalculateColAndRowValue()
            }
        });
    }

    const recalculateColAndRowValue = () => {
        const newBoard = [] as Board[];
        for (let i = 1; i <= 20; i++) {
            for (let j = 1; j <= 10; j++) {
                const block : Board | undefined = board.value.find((block) => block.row === i && block.col === j);
                if (block)
                    newBoard.push(block);
            }
        }
        board.value = newBoard;
    }

    const maxIsFilled = () => {
        const minCol = tetrominoStore.minCol();
        const maxCol = tetrominoStore.maxCol();

        const colsGroup = Object.groupBy(board.value
        .filter((block) => !block.isFilled && block.col >= minCol && block.col <= maxCol), (block) => block.col);
        return Math.min(...Object.values(colsGroup).map((group) => group?.length ?? -1) );
    }

    const reset = () => {
        board.value = [];
    }

    const addPenaltyLines = (n_lines: number) => {
        if (n_lines > 20) {
            throw new Error("You cannot have penality lines greater than 20");
        }
        let linesRestant = 20;

        const newBoard = [] as Board[];
        for (let i = 20; i > 20 - n_lines ; i--) {
            linesRestant--;
            for (let j = 10; j >= 1; j--) {
                newBoard.unshift({
                    row: i,
                    col: j,
                    isFilled: true,
                    color: 'bg-[#666]',
                    indestructible: true
                })
            }
        }
        const firstLineFilled = board.value.find((block: Board) => block.isFilled)?.row;

        // Copy if exist
        if (firstLineFilled) {
            for (let i = 20; i >= firstLineFilled ; i--) {
                linesRestant--;
                for (let j = 10; j >= 1; j--) {
                    const block = board.value[i * 10 - j];
                    newBoard.unshift({
                        row: block.row - n_lines,
                        col: block.col,
                        color: block.color,
                        isFilled: block.isFilled,
                        indestructible: block.indestructible
                    })
                }
            }
        }

        if (linesRestant <= 0) {
            const gameState = useGameStateStore();
            gameState.setGameOver();
            return ;
        }


        // Fill to have 20 * 10 elements
        for (let i = linesRestant; i > 0 ; i--) {
            for (let j = 10; j >= 1; j--) {
                newBoard.unshift({
                    row: i,
                    col: j,
                    isFilled: false,
                    color: null
                })
            }
        }
        board.value = newBoard;
    }

    return {
        board,
        initBoard,
        tryToRemoveLines,
        updateBoardFromTetromino,
        maxIsFilled,
        reset,
        addPenalityLine: addPenaltyLines,
    }
});