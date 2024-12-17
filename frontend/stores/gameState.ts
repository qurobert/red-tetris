import {defineStore} from "pinia";
import {ref} from "vue";

export const useGameStateStore = defineStore('gameStateStore', () => {
    const intervalId = ref(null as string | null);
    const gameOver = ref(false);

    const updateIntervalId = (newIntervalId: string | null)=> {
        intervalId.value = newIntervalId;
    }
    const setGameOver = () => {
        gameOver.value = true;
    }

    const resetGameOver = () => {
        gameOver.value = false;
    }

    return {
        gameOver,
        setGameOver,
        resetGameOver,
        intervalId,
        updateIntervalId
    }
})