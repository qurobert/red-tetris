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
    // const keyboardManager = useKeyboardManager();

    const init = () => {
        const route = useRoute();
        socketStore.socket.emit('info-game', route.params.id_room);
    }
    const start = (game: any) => {
        tetrominoStore.updateTetrominos(game.tetrominos);
        tetrominoStore.init();
        boardStore.initBoard();
        // keyboardManager.init();
        gameState.init();
        gameState.setInfoGame(game);
        launchUpdate();
    }

    const launchUpdate = () => {
        gameState.updateIntervalId(setInterval(() => update(), 1000) as any);
    }
    const update = () => {
        if (!tetrominoStore.tryMoveDown()) {
            boardStore.updateBoardFromTetromino();
            boardStore.tryToRemoveLines();
            tetrominoStore.incrementIndexNameTetromino();
            const socketStore = useSocketStore();
            const route = useRoute();
            const userStore = useUserStore();
            socketStore.socket.emit('game-update', route.params.id_room, {
                score: userStore.score,
                board: boardStore.board,
            })

            if (!tetrominoStore.tryToSpawn()) {
                stop();
                gameState.setGameOver();
                socketStore.socket.emit('game-over', route.params.id_room)
            } else {
                tetrominoStore.restart()
            }
        } else {
            tetrominoStore.moveDown();
        }
    }

    const restart = () => {
        stop();
        launchUpdate();
    }

    const reset = () => {

        stop();
        boardStore.reset();
        tetrominoStore.reset();
        // keyboardManager.reset();
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
        update,
    }
};