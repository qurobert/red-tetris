import {useTetrominoStore} from "~/stores/tetromino";
import {useGameManager} from "~/composables/useGameManager";
import {useSwipe} from "@vueuse/core";
import {useBoardStore} from "#build/imports";
import {ref, watch} from "vue";

export const useKeyboardManager = () => {
    const intervalIdIfTouch = ref(null as any);
    const eventListenerRef = ref<((e: KeyboardEvent) => void) | null>(null);

    const createEventListener = () => {
        const handler = (e: KeyboardEvent) => {
            const gameManager = useGameManager();
            const tetrominoStore = useTetrominoStore();
            const boardStore = useBoardStore();
            if (e.key === 'ArrowUp') {
                console.log("ROTATE");
                tetrominoStore.rotate();
                e.preventDefault()
            } else if (e.key === 'ArrowDown') {
                tetrominoStore.moveDown();
                console.log("MOVE DOWN");
                if (tetrominoStore.maxRow() < boardStore.maxIsFilled())
                    gameManager.restart();
                e.preventDefault()
            } else if (e.key === 'ArrowLeft') {
                console.log("MOVE LEFT");
                tetrominoStore.moveLeft();
                e.preventDefault()
            } else if (e.key === 'ArrowRight') {
                console.log("MOVE RIGHT");
                tetrominoStore.moveRight();
                e.preventDefault()
            } else if (e.key === " ") {
                console.log("SPACE");
                tetrominoStore.moveBottom();
                if (tetrominoStore.maxRow() < boardStore.maxIsFilled())
                    gameManager.restart();
                e.preventDefault()
            }
        }
        eventListenerRef.value = handler;
        console.log("eventListenerRef is now:", !!eventListenerRef.value); // Ajout de log
        return handler;
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
        const handler = createEventListener();
        window.addEventListener('keydown', handler);
        console.log("Init - handler created:", !!handler);
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

        console.log("RESET");
        console.log("eventListenerRef is now:", !!eventListenerRef.value); // Ajout de log
        if (eventListenerRef.value) {
            console.log("REMOVE KEYDOWN");
            window.removeEventListener('keydown', eventListenerRef.value);
        }
        boardStore.refBoard?.removeEventListener('touchstart', handleTouchStart);
        boardStore.refBoard?.removeEventListener('touchend', handleTouchEnd);
    }

    return {
        init,
        reset,
        eventListenerRef
    }

}