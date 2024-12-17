import {ref} from "vue";
import {defineStore} from "pinia";

export const useUserStore = defineStore('userStore', () => {
	const player_name = ref(localStorage.getItem('player_name') as string | null);
	const score = ref(0);
	const highScore = ref(localStorage.getItem('highScore') as number | null || 0);
	const rank = ref(1);
	const isAdmin = ref(true);

	const incrementScore = (value: number) => {
		score.value += value;
		if (score.value > highScore.value) {
			updateHighscore(score.value);
		}
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

	const init = (player_name: string, init_score: number) => {
		updatePlayerName(player_name);
		score.value = init_score;
	}
	const reset = () => {
		score.value = 0
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
		incrementScore,
		reset,
		updatePlayerName,
		init,
	}
})
