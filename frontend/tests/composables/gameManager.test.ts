import {describe, expect, it, vi} from "vitest";
import {useGameManager} from "~/composables/useGameManager";
import {useBoardStore, useGameStateStore, useSocketStore, useTetrominoStore} from "#imports";

describe('game manager', () => {
	it('test init', async () => {
		const gameManager = useGameManager();
		vi.useFakeTimers();
		gameManager.init();
		const boardStore = useBoardStore();
		expect(boardStore.board.length).toBe(0);
		const tetrominoStore = useTetrominoStore();
		expect(tetrominoStore.refName).not.toBe('');
		expect(tetrominoStore.positions).not.toBe({});
		expect(tetrominoStore.refColor).toBe('');
		expect(tetrominoStore.modePosition).not.toBe('');
		vi.advanceTimersByTime(1000);
		expect(tetrominoStore.rowPosition).not.toBe(0);
		vi.advanceTimersByTime(1000);
		expect(tetrominoStore.rowPosition).not.toBe(3);
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
		expect(gameState.gameOver).not.toBe(true);
		expect(gameState.gameOver).not.toBe(true);
	})
})