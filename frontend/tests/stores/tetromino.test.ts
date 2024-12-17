import {beforeEach, describe, expect, it} from "vitest";
import {createPinia, setActivePinia} from 'pinia'
import {useTetrominoStore} from "~/stores/tetromino";
import {NameTetromino} from "~/composables/useInfoTetromino";
import exp from "node:constants";
import {useBoardStore} from "#imports";

describe('board store', () => {
	beforeEach(() => {
		setActivePinia(createPinia())
	})

	it('test init tetromino', () => {
		const tetrominoStore = useTetrominoStore();
		tetrominoStore.init(NameTetromino.I);
		expect(tetrominoStore.refName).toBe(NameTetromino.I);
		expect(tetrominoStore.positions).not.toBe({});
		expect(tetrominoStore.refColor).toBe('bg-cyan');
		expect(tetrominoStore.modePosition).toBe('rotate0');
		expect(tetrominoStore.colPosition).toBe(4);
		expect(tetrominoStore.rowPosition).toBe(1);
		expect(tetrominoStore.positions).toStrictEqual({
			rotate0: [
				{ col: 4, row: 2 },
				{ col: 5, row: 2 },
				{ col: 6, row: 2 },
				{ col: 7, row: 2 }
			],
			rotate90: [
				{ col: 6, row: 1 },
				{ col: 6, row: 2 },
				{ col: 6, row: 3 },
				{ col: 6, row: 4 }
			],
			rotate180: [
				{ col: 4, row: 3 },
				{ col: 5, row: 3 },
				{ col: 6, row: 3 },
				{ col: 7, row: 3 }
			],
			rotate270: [
				{ col: 5, row: 1 },
				{ col: 5, row: 2 },
				{ col: 5, row: 3 },
				{ col: 5, row: 4 }
			]
		})
	})
	it('test try to spawn without init board need to throw', () => {
		const tetrominoStore = useTetrominoStore();
		tetrominoStore.init(NameTetromino.I);
		expect(() => tetrominoStore.tryToSpawn(NameTetromino.I)).toThrow('Board is empty');
	})

	it('test try to spawn', () => {
		const tetrominoStore = useTetrominoStore();
		tetrominoStore.init(NameTetromino.I);
		const boardStore = useBoardStore();
		boardStore.initBoard();
		expect(tetrominoStore.tryToSpawn(NameTetromino.I)).toBe(true);
	})
	it('test try to spawn false', () => {
		const tetrominoStore = useTetrominoStore();
		tetrominoStore.init(NameTetromino.I);
		const boardStore = useBoardStore();
		boardStore.initBoard();
		for (let i = 20; i > 0; i--) {
			for (let j = 1; j <= 10; j++) {
				const index = i * 10 - (10 - j) - 1;
				boardStore.board[index].isFilled = true;
			}
		}
		expect(tetrominoStore.tryToSpawn(NameTetromino.I)).toBe(false);
	})

	it('test get position', () => {
		const tetrominoStore = useTetrominoStore();
		tetrominoStore.init(NameTetromino.I);
		expect(tetrominoStore.getPosition()).toStrictEqual([
			{ col: 4, row: 2 },
			{ col: 5, row: 2 },
			{ col: 6, row: 2 },
			{ col: 7, row: 2 }
		])
	})

	it('test tryMoveDown', () => {
		const tetrominoStore = useTetrominoStore();
		tetrominoStore.init(NameTetromino.I);
		const boardStore = useBoardStore();
		boardStore.initBoard();
		expect(tetrominoStore.tryMoveDown()).toBe(true);
	})
	it('test tryMoveDown false', () => {
		const tetrominoStore = useTetrominoStore();
		tetrominoStore.init(NameTetromino.I);
		const boardStore = useBoardStore();
		boardStore.initBoard();
		for (let i = 20; i > 0; i--) {
			for (let j = 1; j <= 10; j++) {
				const index = i * 10 - (10 - j) - 1;
				boardStore.board[index].isFilled = true;
			}
		}
		expect(tetrominoStore.tryMoveDown()).toBe(false);
	})

	it('test moveDown', () => {
		const tetrominoStore = useTetrominoStore();
		tetrominoStore.init(NameTetromino.I);
		const boardStore = useBoardStore();
		boardStore.initBoard();
		tetrominoStore.moveDown();
		expect(tetrominoStore.getPosition()).toStrictEqual([
			{ col: 4, row: 3 },
			{ col: 5, row: 3 },
			{ col: 6, row: 3 },
			{ col: 7, row: 3 }
		])
	})
	it('test moveBottom', () => {
		const tetrominoStore = useTetrominoStore();
		const boardStore = useBoardStore();
		boardStore.initBoard();
		tetrominoStore.init(NameTetromino.I);
		tetrominoStore.moveBottom();
		expect(tetrominoStore.getPosition()).toStrictEqual([
			{ col: 4, row: 20 },
			{ col: 5, row: 20 },
			{ col: 6, row: 20 },
			{ col: 7, row: 20 }
		])
	})
	it('test moveDown and moveBottom after', () => {
		const tetrominoStore = useTetrominoStore();
		const boardStore = useBoardStore();
		boardStore.initBoard();
		tetrominoStore.init(NameTetromino.I);
		tetrominoStore.moveDown();
		tetrominoStore.moveDown();
		tetrominoStore.moveDown();
		tetrominoStore.moveBottom();
		expect(tetrominoStore.getPosition()).toStrictEqual([
			{ col: 4, row: 20 },
			{ col: 5, row: 20 },
			{ col: 6, row: 20 },
			{ col: 7, row: 20 }
		])
	})
	it('test moveBottom with some blocks', () => {
		const tetrominoStore = useTetrominoStore();
		tetrominoStore.init(NameTetromino.I);
		const boardStore = useBoardStore();
		boardStore.initBoard();
		for (let i = 20; i > 17; i--) {
			for (let j = 1; j <= 5; j++) {
				const index = i * 10 - (10 - j) - 1;
				boardStore.board[index].isFilled = true;
			}
		}
		tetrominoStore.moveBottom();
		expect(tetrominoStore.getPosition()).toStrictEqual([
			{ col: 4, row: 17 },
			{ col: 5, row: 17 },
			{ col: 6, row: 17 },
			{ col: 7, row: 17 }
		])
	})

	it('test moveLeft', () => {
		const tetrominoStore = useTetrominoStore();
		tetrominoStore.init(NameTetromino.I);
		const boardStore = useBoardStore();
		boardStore.initBoard();
		tetrominoStore.moveLeft();
		expect(tetrominoStore.getPosition()).toStrictEqual([
			{ col: 3, row: 2 },
			{ col: 4, row: 2 },
			{ col: 5, row: 2 },
			{ col: 6, row: 2 }
		])
	})
	it('test move right', () => {
		const tetrominoStore = useTetrominoStore();
		tetrominoStore.init(NameTetromino.I);
		const boardStore = useBoardStore();
		boardStore.initBoard();
		tetrominoStore.moveRight();
		expect(tetrominoStore.getPosition()).toStrictEqual([
			{ col: 5, row: 2 },
			{ col: 6, row: 2 },
			{ col: 7, row: 2 },
			{ col: 8, row: 2 }
		])
	})
	it('test rotate', () => {
		const tetrominoStore = useTetrominoStore();
		tetrominoStore.init(NameTetromino.I);
		const boardStore = useBoardStore();
		boardStore.initBoard();
		tetrominoStore.rotate();
		expect(tetrominoStore.getPosition()).toStrictEqual([
			{ col: 6, row: 1 },
			{ col: 6, row: 2 },
			{ col: 6, row: 3 },
			{ col: 6, row: 4 }
		])
	})

});