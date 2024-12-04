import {useTetrominoStore} from "~/stores/tetromino.js";
import {useBoardStore} from "~/stores/board.js";
import {useKeyboardManager} from "~/composables/useKeyboardManager.js";
import {setInterval} from "#app/compat/interval.js";
import {useGameStateStore} from "~/stores/gameState.js";

export const useGameManager = () => {
    const tetrominoStore = useTetrominoStore();
    const boardStore = useBoardStore();
    const gameState = useGameStateStore();
    const letters = ['I', 'J', 'L', 'O', 'S', 'T', 'Z']
    // TODO : FETCH API TO GET LETTERS IN API OR STORE
    const keyboardManager = useKeyboardManager();

    const init = () => {
        boardStore.initBoard();
        keyboardManager.init();
        tetrominoStore.init('O');
        gameState.resetGameOver()
        start();
    }
    const start = () => {
        gameState.updateIntervalId(setInterval(() => update(), 1000));
    }

    const update = () => {
        if (!tetrominoStore.tryMoveDown()) {
            boardStore.updateBoardFromTetromino();
            boardStore.tryToRemoveLines();
            shuffle(letters)
            if (!tetrominoStore.tryToSpawn(letters[0])) {
                stop();
                gameState.setGameOver()
            } else {
                tetrominoStore.restart(letters[0])
            }
        } else {
            tetrominoStore.moveDown();
        }
    }

    const restart = () => {
        stop();
        start();
    }

    const stop = () => {
        if (gameState.intervalId) {
            clearInterval(gameState.intervalId);
            gameState.updateIntervalId(null);
        }
    }

    return {
        init,
        start,
        restart,
        stop,
        update
    }
};