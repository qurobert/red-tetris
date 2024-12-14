import {useTetrominoStore} from "~/stores/tetromino";
import {useGameManager} from "~/composables/useGameManager";

export const useKeyboardManager = () => {
    const eventListener = (e: KeyboardEvent) => {
        const gameManager = useGameManager();
        const tetrominoStore = useTetrominoStore();
        const boardStore = useBoardStore();

        if (e.key === 'ArrowUp') {
            tetrominoStore.rotate();
        } else if (e.key === 'ArrowDown') {
            tetrominoStore.moveDown();
            if (tetrominoStore.maxRow() < boardStore.maxIsFilled())
                gameManager.restart();
        } else if (e.key === 'ArrowLeft') {
            tetrominoStore.moveLeft();
        } else if (e.key === 'ArrowRight') {
            tetrominoStore.moveRight();
        } else if (e.key === " ") {
            tetrominoStore.moveBottom();
            if (tetrominoStore.maxRow() < boardStore.maxIsFilled())
                gameManager.restart();
        }
    }
    const init = () => {
        window.addEventListener('keydown', eventListener);
    }

    const reset = () => {
        window.removeEventListener('keydown', eventListener);
    }

    return {
        init,
        reset
    }

}