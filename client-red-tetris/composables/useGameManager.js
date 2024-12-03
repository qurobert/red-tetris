import {useTetriminoStore} from "~/stores/tetrimino.js";
import {useBoardStore} from "~/stores/board.js";
import {useKeyboardManager} from "~/composables/useKeyboardManager.js";
import {setInterval} from "#app/compat/interval.js";
import {useGameStateStore} from "~/stores/gameState.js";

export const useGameManager = () => {
    const tetriminoStore = useTetriminoStore();
    const boardStore = useBoardStore();
    const gameState = useGameStateStore();
    const letters = ['I', 'J', 'L', 'O', 'S', 'T', 'Z']
    // TODO : FETCH API TO GET LETTERS IN API OR STORE
    const keyboardManager = useKeyboardManager();

    const init = () => {
        boardStore.initBoard();
        keyboardManager.init();
        tetriminoStore.init('O');
        gameState.resetGameOver()
        start();
    }
    const start = () => {
        gameState.updateIntervalId(setInterval(() => update(), 1000));
    }

    const update = () => {
        if (!tetriminoStore.tryMoveDown()) {
            boardStore.updateBoardFromTetrimino();
            shuffle(letters)
            if (!tetriminoStore.tryToSpawn(letters[0])) {
                stop();
                console.log("GAME OVER");
                gameState.setGameOver()
            } else {
                tetriminoStore.restart(letters[0])
            }
        } else {
            tetriminoStore.moveDown();
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