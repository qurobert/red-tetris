import {defineStore} from "pinia";
import {ref} from "vue";
import {NameTetromino} from "~/composables/useInfoTetromino";

export interface Game {
    id: string;
    tetrominos: NameTetromino[];
    currentPenalties?: {
        playerId: string;
        lines: number;
    };
    status: 'waiting' | 'playing' | 'finished';
    players: {
        currentScore: number;
        highScore: number;
        id: string;
        isHost: boolean;
        name: string;
        board: Board[];
    }[];
}

export const useGameStateStore = defineStore('gameStateStore', () => {
    const intervalId = ref(null as string | null);
    const gameOver = ref(false);
    const infoGame = ref({} as Game)
    const updateIntervalId = (newIntervalId: string | null)=> {
        intervalId.value = newIntervalId;
    }
    const setGameOver = () => {
        gameOver.value = true;
    }

    const setInfoGame = (game: Game) => {
        infoGame.value = game;
    }
    const reset = () => {
        gameOver.value = false;
        infoGame.value = {} as Game;
    }

    return {
        gameOver,
        setGameOver,
        setInfoGame,
        infoGame,
        reset,
        intervalId,
        updateIntervalId
    }
})