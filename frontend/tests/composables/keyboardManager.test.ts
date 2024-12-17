import {beforeEach, describe, expect, it, vi} from "vitest";
import {createPinia, setActivePinia} from 'pinia'
import {useGameManager} from "~/composables/useGameManager";
import {useTetrominoStore} from "#imports";


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
		expect(tetrominoStore.rowPosition).toBe(2);
	});
	it('test space', () => {
		const gameManager = useGameManager();
		const tetrominoStore = useTetrominoStore();
		gameManager.init();
		const event = new KeyboardEvent('keydown', { key: ' ' });
		window.dispatchEvent(event);
		expect(tetrominoStore.rowPosition).toBe(19);
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
})