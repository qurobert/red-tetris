import {useTetrominoStore} from "~/stores/tetromino";
import {useGameManager} from "~/composables/useGameManager";

export const useKeyboardManager = () => {
    const init = () => {
        const gameManager = useGameManager();
        const tetrominoStore = useTetrominoStore();
        const boardStore = useBoardStore();

        window.addEventListener('keydown', (e) => {
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
        });
    }

    const remove = () => {
        window.removeEventListener('keydown', () => {});
    }

    return {
        init,
        remove
    }

}