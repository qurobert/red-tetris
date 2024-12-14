export const useUserStore = defineStore('userStore', () => {
	const player_name = ref(localStorage.getItem('player_name') as string | null);
	const score = ref(0);
	const highScore = ref(localStorage.getItem('highScore') as number | null || 0);
	const rank = ref(1);
	const isAdmin = ref(true);

	const updateScore = (value: number) => {
		score.value += value;
	};

	const updateHighscore = (value: number) => {
		highScore.value = value;
		localStorage.setItem('highScore', value.toString());
	}

	const updateRank = (value: number) => {
		rank.value += value;
	};

	const updatePlayerName = (name: string) => {
		player_name.value = name;
		localStorage.setItem('player_name', name);
	}

	const resetScore = () => {
		score.value = 0;
	}

	const init = (player_name: string, score: number) => {
		updatePlayerName(player_name);
		updateScore(score);
	}

	const setIsAdmin = (value: boolean) => {
		isAdmin.value = value;
	}

	return {
		player_name,
		isAdmin,
		setIsAdmin,
		highScore,
		updateHighscore,
		rank,
		updateRank,
		score,
		updateScore,
		resetScore,
		updatePlayerName,
		init,
	}
})
