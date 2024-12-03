import {useTetriminoStore} from "~/stores/tetrimino.js";
import {useGameManager} from "~/composables/useGameManager.js";

export const useKeyboardManager = () => {
    const init = () => {
        const gameManager = useGameManager();
        const tetriminoStore = useTetriminoStore();
        const boardStore = useBoardStore();

        window.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowUp') {
                tetriminoStore.rotate();
            } else if (e.key === 'ArrowDown') {
                tetriminoStore.moveDown();
                if (tetriminoStore.maxRow() < boardStore.maxIsFilled())
                    gameManager.restart();
            } else if (e.key === 'ArrowLeft') {
                tetriminoStore.moveLeft();
            } else if (e.key === 'ArrowRight') {
                tetriminoStore.moveRight();
            } else if (e.key === " ") {
                tetriminoStore.moveBottom();
                if (tetriminoStore.maxRow() < boardStore.maxIsFilled())
                    gameManager.restart();
            }
        });
    }

    const remove = () => {
        window.removeEventListener('keydown');
    }

    return {
        init,
        remove
    }

}