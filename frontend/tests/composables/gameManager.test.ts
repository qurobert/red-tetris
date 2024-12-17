import {beforeEach, describe, expect, it, vi} from "vitest";
import {createPinia, setActivePinia} from 'pinia'
import {useGameManager} from "~/composables/useGameManager";
import {useBoardStore, useGameStateStore, useTetrominoStore} from "#imports";

describe('game manager', () => {
	beforeEach(() => {
		setActivePinia(createPinia())
	})

	it('test init', () => {
		const gameManager = useGameManager();
		vi.useFakeTimers();
		gameManager.init();
		const boardStore = useBoardStore();
		expect(boardStore.board.length).toBe(200);
		const tetrominoStore = useTetrominoStore();
		expect(tetrominoStore.refName).not.toBe('');
		expect(tetrominoStore.positions).not.toBe({});
		expect(tetrominoStore.refColor).not.toBe('');
		expect(tetrominoStore.modePosition).not.toBe('');
		vi.advanceTimersByTime(1000);
		expect(tetrominoStore.rowPosition).toBe(2);
		vi.advanceTimersByTime(1000);
		expect(tetrominoStore.rowPosition).toBe(3);
		vi.advanceTimersByTime(17000);
		expect(tetrominoStore.rowPosition).toBe(1);
	})
	it('test board fill game over', () => {
		const gameManager = useGameManager();
		vi.useFakeTimers();
		gameManager.init();
		vi.advanceTimersByTime(10000000);
		const gameState = useGameStateStore();
		console.log(gameState.gameOver);
		expect(gameState.gameOver).toBe(true);
		// expect(gameState.gameOver).toBe(true);
	})
})