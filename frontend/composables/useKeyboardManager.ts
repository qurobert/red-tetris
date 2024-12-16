import {useTetrominoStore} from "~/stores/tetromino";
import {useGameManager} from "~/composables/useGameManager";
import {useSwipe} from "@vueuse/core";
import {sleep} from "@antfu/utils";

export const useKeyboardManager = () => {
    const intervalIdIfTouch = ref(null as any);
    const eventListener = (e: KeyboardEvent) => {
        const gameManager = useGameManager();
        const tetrominoStore = useTetrominoStore();
        const boardStore = useBoardStore();
        if (e.key === 'ArrowUp') {
            tetrominoStore.rotate();
            e.preventDefault()
        } else if (e.key === 'ArrowDown') {
            tetrominoStore.moveDown();
            if (tetrominoStore.maxRow() < boardStore.maxIsFilled())
                gameManager.restart();
            e.preventDefault()
        } else if (e.key === 'ArrowLeft') {
            tetrominoStore.moveLeft();
            e.preventDefault()
        } else if (e.key === 'ArrowRight') {
            tetrominoStore.moveRight();
            e.preventDefault()
        } else if (e.key === " ") {
            tetrominoStore.moveBottom();
            if (tetrominoStore.maxRow() < boardStore.maxIsFilled())
                gameManager.restart();
            e.preventDefault()
        }
    }

    const handleTouchStart = () => {
        intervalIdIfTouch.value = setInterval(goDown, 100)
    }

    const goDown = () => {
        const tetrominoStore = useTetrominoStore();
        const gameManager = useGameManager();
        const boardStore = useBoardStore();

        tetrominoStore.moveDown();
        if (tetrominoStore.maxRow() < boardStore.maxIsFilled())
            gameManager.restart();
    }

    const handleTouchEnd = () => {
        clearInterval(intervalIdIfTouch.value)
    }

    const init = () => {
        window.addEventListener('keydown', eventListener);
        const boardStore = useBoardStore();
        const tetrominoStore = useTetrominoStore();
        const gameManager = useGameManager();
        const { direction } = useSwipe(boardStore.refBoard, {
            onSwipeStart(e) {
                e.preventDefault();
            },
            passive: false
        });

        watch(direction, () => {
            switch (direction.value) {
                case "down":
                    tetrominoStore.moveBottom();
                    if (tetrominoStore.maxRow() < boardStore.maxIsFilled())
                        gameManager.restart();
                    break;
                case "up":
                    tetrominoStore.rotate();
                    break;
                case "right":
                    tetrominoStore.moveRight();
                    break;
                case "left":
                    tetrominoStore.moveLeft();
                    break;
            }
        })

        boardStore.refBoard?.addEventListener('touchstart', handleTouchStart, { passive: false });
        boardStore.refBoard?.addEventListener('touchend', handleTouchEnd, { passive: false });
    }

    const reset = () => {
        const boardStore = useBoardStore();

        window.removeEventListener('keydown', eventListener);
        boardStore.refBoard?.removeEventListener('touchstart', handleTouchStart);
        boardStore.refBoard?.removeEventListener('touchend', handleTouchEnd);
    }

    return {
        init,
        reset
    }

}