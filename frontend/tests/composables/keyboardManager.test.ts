import {beforeEach, describe, expect, it} from "vitest";
import {createPinia, setActivePinia} from 'pinia'
import {useGameManager} from "~/composables/useGameManager";
import {NameTetromino, useBoardStore, useKeyboardManager, useTetrominoStore} from "#imports";


describe('keyboard manager', () => {
	beforeEach(() => {
		setActivePinia(createPinia())
	})
	it('test arrow down ...', () => {
		const gameManager = useGameManager();
		const tetrominoStore = useTetrominoStore();
		gameManager.init();
		const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
		window.dispatchEvent(event);
		expect(tetrominoStore.rowPosition).not.toBe(2);
	});
	it('test space', () => {
		const gameManager = useGameManager();
		const tetrominoStore = useTetrominoStore();
		gameManager.init();
		const event = new KeyboardEvent('keydown', { key: ' ' });
		window.dispatchEvent(event);
		expect(tetrominoStore.rowPosition).not.toBe(19);
	})
	it('test swipe down', () => {
		const gameManager = useGameManager();
		const tetrominoStore = useTetrominoStore();
		gameManager.init();
		const touchStartEvent = new TouchEvent('touchstart', {
			//@ts-ignore
			touches: [{ clientX: 100, clientY: 100, force: 1, identifier: 1, pageX: 100, pageY: 100, radiusX: 11, radiusY: 11, screenX: 100, screenY: 100 }],
		});

		// Créer l'événement touchmove (mouvement vers le bas)
		const touchMoveEvent = new TouchEvent('touchmove', {
			//@ts-ignore
			touches: [{ clientX: 100, clientY: 300 }], // Y plus élevé pour simuler un mouvement vers le bas
		});

		// Créer l'événement touchend (fin du swipe)
		const touchEndEvent = new TouchEvent('touchend', {
			//@ts-ignore
			touches: [{ clientX: 100, clientY: 300 }],
		});

		// Simuler les événements sur l'élément
		window.dispatchEvent(touchStartEvent);
		window.dispatchEvent(touchMoveEvent);
		window.dispatchEvent(touchEndEvent);
		expect(tetrominoStore.rowPosition).toBe(1) // didn't work;
	})

	it('test event Listener touch', () => {
		const keyBoardManager = useKeyboardManager();
		const tetroStore = useTetrominoStore();
		const boardStore = useBoardStore();
		tetroStore.init(NameTetromino.T);
		boardStore.initBoard()

		window.addEventListener('keydown', keyBoardManager.eventListenerTouch)
		const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
		window.dispatchEvent(event);
		expect(tetroStore.rowPosition).toBe(2);
		const event2 = new KeyboardEvent('keydown', { key: 'ArrowUp' });
		window.dispatchEvent(event2);
		expect(tetroStore.modePosition).toBe('rotate90');
		const event3 = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
		window.dispatchEvent(event3);
		expect(tetroStore.colPosition).toBe(3);
		const event4 = new KeyboardEvent('keydown', { key: 'ArrowRight' });
		window.dispatchEvent(event4);
		expect(tetroStore.colPosition).toBe(4);
		const event5 = new KeyboardEvent('keydown', { key: ' ' });
		window.dispatchEvent(event5);
		expect(tetroStore.rowPosition).toBe(18);

	})
})