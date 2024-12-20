import {beforeEach, expect, it, describe} from "vitest";
import {createPinia, setActivePinia} from "pinia";
import {useLobbyStore} from "~/stores/lobby";

describe('keyboard manager', () => {
	beforeEach(() => {
		setActivePinia(createPinia())
	})
	it('test getting started', () => {
		const lobbyStore = useLobbyStore();
		lobbyStore.updatePlayers([{
			id: '1',
			username: 'test',
			isReady: false
		}])
		expect(lobbyStore.players).toStrictEqual([{
			id: '1',
			username: 'test',
			isReady: false
		}]);
	});
})