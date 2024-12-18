import {useTetrominoStore} from "~/stores/tetromino";
import {useBoardStore} from "~/stores/board";
import {useKeyboardManager} from "~/composables/useKeyboardManager";
import {useGameStateStore} from "~/stores/gameState";
import {useUserStore} from "~/stores/user";
import {useSocketStore} from "~/stores/useSocket";
import {useRoute} from "#app";

export const useGameManager = () => {
    const tetrominoStore = useTetrominoStore();
    const boardStore = useBoardStore();
    const gameState = useGameStateStore();
    const userStore = useUserStore();
    const socketStore = useSocketStore();
    const keyboardManager = useKeyboardManager();
    const beforeUnload = (e: Event) => {
        e.preventDefault();
    }

    const init = () => {
        console.log("INIT");
        const route = useRoute();
        socketStore.socket.emit('info-game', route.params.id_room, userStore.id);
    }
    const start = (game: any) => {
        console.log("START");
        gameState.updateIntervalId(setInterval(() => update(), 1000) as any);
        tetrominoStore.updateTetrominos(game.tetrominos);
        tetrominoStore.init();
        boardStore.initBoard();
        keyboardManager.init();
        gameState.reset();
        console.log(game);
        gameState.setInfoGame(game);
        window.addEventListener('beforeunload', beforeUnload);
    }

    const update = () => {
        console.log("UPDATE");
        if (!tetrominoStore.tryMoveDown()) {
            boardStore.updateBoardFromTetromino();
            boardStore.tryToRemoveLines();
            tetrominoStore.incrementIndexNameTetromino();
            // TODO: NO MORE TETROMINOS ASK FOR NEW ONES
            const socketStore = useSocketStore();
            const route = useRoute();
            const userStore = useUserStore();
            socketStore.socket.emit('game-update', route.params.id_room, userStore.id, {
                score: userStore.score,
                board: boardStore.board,
            })


            if (!tetrominoStore.tryToSpawn()) {
                stop();
                gameState.setGameOver()
            } else {
                tetrominoStore.restart()
            }
        } else {
            tetrominoStore.moveDown();
        }
    }

    const restart = () => {
        stop();
        init();
    }

    const reset = () => {
        stop();
        boardStore.reset();
        tetrominoStore.reset();
        gameState.reset();
        keyboardManager.reset();
        userStore.reset();
        window.removeEventListener('beforeunload', beforeUnload);
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
        update,
    }
};