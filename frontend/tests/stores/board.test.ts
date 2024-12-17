import {beforeEach, describe, expect, it} from "vitest";
import {createPinia, setActivePinia} from 'pinia'
import {useBoardStore} from "~/stores/board";
import {NameTetromino, useGameStateStore, useTetrominoStore, useUserStore} from "#imports";

describe('board store', () => {
	beforeEach(() => {
		// creates a fresh pinia and makes it active
		// so it's automatically picked up by any useStore() call
		// without having to pass it to it: `useStore(pinia)`
		setActivePinia(createPinia())
	})

	it('test init board', () => {
		const boardStore = useBoardStore();
		boardStore.initBoard();
		expect(boardStore.board.length).toBe(200);
		for (let i = 1; i <= 20; i++) {
			for (let j = 1; j <= 10; j++) {
				const index = i * 10 - (10 - j) - 1;
				expect(boardStore.board[index].col).toBe(j);
				expect(boardStore.board[index].row).toBe(i);
				expect(boardStore.board[index].color).toBe(null);
				expect(boardStore.board[index].isFilled).toBe(false);
			}
		}
	})

	it('test ref update', () => {
		const boardStore = useBoardStore();
		const refBoard = document.createElement('div');
		boardStore.setRefBoard(refBoard);
		expect(boardStore.refBoard).toBe(refBoard);
	})

	it('test update board from tetromino with init', () => {
		const tetrominoStore = useTetrominoStore();
		tetrominoStore.init(NameTetromino.I);
		const boardStore = useBoardStore();
		boardStore.initBoard();
		boardStore.updateBoardFromTetromino();
		expect(boardStore.board.length).toBe(200);
		const color = tetrominoStore.refColor;
		const finalPosition = tetrominoStore.getPosition();
		finalPosition.map((position) => {
			const index = position.row * 10 - (10 - position.col) - 1;
			expect(boardStore.board[index].color).toBe(color);
			expect(boardStore.board[index].isFilled).toBe(true);
		});
	})

	it('test update board from tetromino without init board need to throw', () => {
		const tetrominoStore = useTetrominoStore();
		tetrominoStore.init(NameTetromino.I);
		const boardStore = useBoardStore();
		expect(() => boardStore.updateBoardFromTetromino()).toThrow();
	})

	it('test update board from tetromino without init tetromino need to throw', () => {
		const boardStore = useBoardStore();
		boardStore.initBoard();
		expect(() => boardStore.updateBoardFromTetromino()).toThrow();
	})

	it('test try to remove first line', () => {
		const boardStore = useBoardStore();
		boardStore.initBoard();
		for (let i = 20; i > 19; i--) {
			for (let j = 1; j <= 10; j++) {
				const index = i * 10 - (10 - j) - 1;
				boardStore.board[index].isFilled = true;
			}
		}
		boardStore.tryToRemoveLines();
		expect(boardStore.board.length).toBe(200);
		for (let i = 20; i > 0; i--) {
			for (let j = 1; j <= 10; j++) {
				const index = i * 10 - (10 - j) - 1;
				expect(boardStore.board[index].isFilled).toBe(false);
				expect(boardStore.board[index].color).toBe(null);
				expect(boardStore.board[index].row).toBe(i);
				expect(boardStore.board[index].col).toBe(j);
			}
		}
	})
	it('test try to remove all lines', () => {
		const boardStore = useBoardStore();
		boardStore.initBoard();
		for (let i = 20; i > 0; i--) {
			for (let j = 1; j <= 10; j++) {
				const index = i * 10 - (10 - j) - 1;
				boardStore.board[index].isFilled = true;
			}
		}
		boardStore.tryToRemoveLines();
		expect(boardStore.board.length).toBe(200);
		for (let i = 20; i > 0; i--) {
			for (let j = 1; j <= 10; j++) {
				const index = i * 10 - (10 - j) - 1;
				expect(boardStore.board[index].isFilled).toBe(false);
				expect(boardStore.board[index].color).toBe(null);
				expect(boardStore.board[index].row).toBe(i);
				expect(boardStore.board[index].col).toBe(j);
			}
		}
	})
	it('test try to remove one line add 100 score', () => {
		const boardStore = useBoardStore();
		boardStore.initBoard();
		for (let i = 20; i > 19; i--) {
			for (let j = 1; j <= 10; j++) {
				const index = i * 10 - (10 - j) - 1;
				boardStore.board[index].isFilled = true;
			}
		}
		boardStore.tryToRemoveLines();
		const userStore = useUserStore();
		expect(userStore.score).toBe(100);
	})

	it('test try to remove no lines', () => {
		const boardStore = useBoardStore();
		boardStore.initBoard();
		boardStore.tryToRemoveLines();
		expect(boardStore.board.length).toBe(200);
		for (let i = 20; i > 0; i--) {
			for (let j = 1; j <= 10; j++) {
				const index = i * 10 - (10 - j) - 1;
				expect(boardStore.board[index].isFilled).toBe(false);
				expect(boardStore.board[index].color).toBe(null);
				expect(boardStore.board[index].row).toBe(i);
				expect(boardStore.board[index].col).toBe(j);
			}
		}
	})

	it('test try to remove no line without init', () => {
		const boardStore = useBoardStore();
		expect(() => boardStore.tryToRemoveLines()).toThrow();
	})

	it('test max is Filled', () => {
		const boardStore = useBoardStore();
		boardStore.initBoard();
		for (let i = 20; i > 19; i--) {
			for (let j = 1; j <= 10; j++) {
				const index = i * 10 - (10 - j) - 1;
				boardStore.board[index].isFilled = true;
			}
		}
		expect(boardStore.maxIsFilled()).toBe(19);
	})


	it('test reset', () => {
		const boardStore = useBoardStore();
		boardStore.initBoard();
		for (let i = 20; i > 19; i--) {
			for (let j = 1; j <= 10; j++) {
				const index = i * 10 - (10 - j) - 1;
				boardStore.board[index].isFilled = true;
			}
		}
		boardStore.reset();
		expect(boardStore.board.length).toBe(200);
		for (let i = 20; i > 0; i--) {
			for (let j = 1; j <= 10; j++) {
				const index = i * 10 - (10 - j) - 1;
				expect(boardStore.board[index].isFilled).toBe(false);
				expect(boardStore.board[index].color).toBe(null);
				expect(boardStore.board[index].row).toBe(i);
				expect(boardStore.board[index].col).toBe(j);
			}
		}
	})

	it('test add penalty lines empty board', () => {
		const boardStore = useBoardStore();
		boardStore.initBoard();
		boardStore.addPenaltyLines(2);
		expect(boardStore.board.length).toBe(200);
		for (let i = 20; i > 18; i--) {
			for (let j = 1; j <= 10; j++) {
				const index = i * 10 - (10 - j) - 1;
				expect(boardStore.board[index].isFilled).toBe(true);
				expect(boardStore.board[index].indestructible).toBe(true);
				expect(boardStore.board[index].color).toBe('bg-[#666]');
				expect(boardStore.board[index].row).toBe(i);
				expect(boardStore.board[index].col).toBe(j);
			}
		}
		for (let i = 18; i > 0; i--) {
			for (let j = 1; j <= 10; j++) {
				const index = i * 10 - (10 - j) - 1;
				expect(boardStore.board[index].isFilled).toBe(false);
				expect(boardStore.board[index].indestructible).not.toBe(true);
				expect(boardStore.board[index].color).toBe(null);
				expect(boardStore.board[index].row).toBe(i);
				expect(boardStore.board[index].col).toBe(j);
			}
		}
	})

	it('test add penalty lines with already filled board', () => {
		const boardStore = useBoardStore();
		boardStore.initBoard();
		for (let i = 20; i > 18; i--) {
			for (let j = 1; j <= 5; j++) {
				const index = i * 10 - (10 - j) - 1;
				boardStore.board[index].isFilled = true;
			}
		}
		boardStore.addPenaltyLines(2);
		expect(boardStore.board.length).toBe(200);
		for (let i = 20; i > 18; i--) {
			for (let j = 1; j <= 10; j++) {
				const index = i * 10 - (10 - j) - 1;
				expect(boardStore.board[index].isFilled).toBe(true);
				expect(boardStore.board[index].indestructible).toBe(true);
			}
		}
		for (let i = 18; i > 16; i--) {
			for (let j = 1; j <= 5; j++) {
				const index = i * 10 - (10 - j) - 1;
				expect(boardStore.board[index].isFilled).toBe(false);
			}
		}
	})

	it('test add penalty return game over', () => {
		const boardStore = useBoardStore();
		boardStore.initBoard();
		for (let i = 20; i > 1; i--) {
			for (let j = 1; j <= 10; j++) {
				const index = i * 10 - (10 - j) - 1;
				boardStore.board[index].isFilled = true;
			}
		}
		boardStore.addPenaltyLines(3);
		expect(boardStore.board.length).toBe(200);
		for (let i = 20; i > 1; i--) {
			for (let j = 1; j <= 10; j++) {
				const index = i * 10 - (10 - j) - 1;
				expect(boardStore.board[index].isFilled).toBe(true);
			}
		}
		for (let i = 1; i > 0; i--) {
			for (let j = 1; j <= 10; j++) {
				const index = i * 10 - (10 - j) - 1;
				expect(boardStore.board[index].isFilled).toBe(false);
			}
		}
		const gameState = useGameStateStore();
		expect(gameState.gameOver).toBe(true);
	})

	it('test add penalty lines without init', () => {
		const boardStore = useBoardStore();
		expect(() => boardStore.addPenaltyLines(2)).toThrow();
	})

	it('test add penalty greater than 20', () => {
		const boardStore = useBoardStore();
		boardStore.initBoard();
		expect(() => boardStore.addPenaltyLines(21)).toThrow();
	})
});