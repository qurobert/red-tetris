export const useGameStateStore = defineStore('gameStateStore', () => {
    const score = ref(0);
    const intervalId = ref(null);
    const gameOver = ref(false);

    const updateScore = (value) => {
        score.value += value;
    }
    const updateIntervalId = (value) => {
        intervalId.value = value;
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