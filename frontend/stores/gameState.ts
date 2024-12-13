export const useGameStateStore = defineStore('gameStateStore', () => {
    const score = ref(0);
    const intervalId = ref(null as string | null);
    const gameOver = ref(false);

    const updateScore = (value: number) => {
        score.value += value;
    }
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
        score,
        intervalId,
        updateScore,
        updateIntervalId
    }
})