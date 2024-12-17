import {useTetrominoStore} from "~/stores/tetromino";
import {useBoardStore} from "~/stores/board";
import {useKeyboardManager} from "~/composables/useKeyboardManager";
import {useGameStateStore} from "~/stores/gameState";
import {NameTetromino} from "~/composables/useInfoTetromino";
import {shuffle} from "~/utils";
import {useUserStore} from "~/stores/user";

export const useGameManager = () => {
    const tetrominoStore = useTetrominoStore();
    const boardStore = useBoardStore();
    const gameState = useGameStateStore();
    const userStore = useUserStore();
    const letters : NameTetromino[] = [
      NameTetromino.I,
      NameTetromino.J,
      NameTetromino.L,
      NameTetromino.O,
      NameTetromino.S,
      NameTetromino.T,
      NameTetromino.Z
    ]
    // TODO : FETCH API TO GET LETTERS IN API OR STORE
    const keyboardManager = useKeyboardManager();

    const init = () => {
        boardStore.initBoard();
        keyboardManager.init();
        tetrominoStore.init(NameTetromino.T);
        gameState.resetGameOver()
        start();
    }
    const start = () => {
        gameState.updateIntervalId(setInterval(() => update(), 1000) as any);
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

    const reset = () => {
        stop();
        boardStore.reset();
        tetrominoStore.reset();
        gameState.resetGameOver();
        keyboardManager.reset();
        userStore.reset();
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
        reset,
        restart,
        stop,
        update
    }
};