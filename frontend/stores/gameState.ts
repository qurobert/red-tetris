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
    const isEndGame = ref(false);
    const infoGame = ref({} as Game);

    const updateIntervalId = (newIntervalId: string | null)=> {
        intervalId.value = newIntervalId;
    }
    const init = () => {
        gameOver.value = false;
        isEndGame.value = false;
    }

    const setGameOver = () => {
        gameOver.value = true;
    }

    const setIsEndGame = (newIsEndGame: boolean) => {
        isEndGame.value = newIsEndGame;
    }

    const setInfoGame = (game: Game) => {
        infoGame.value = game;
    }
    return {
        init,
        gameOver,
        setGameOver,
        setInfoGame,
        infoGame,
        intervalId,
        updateIntervalId,
        isEndGame,
        setIsEndGame,
    }
})