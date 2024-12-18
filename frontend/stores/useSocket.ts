import {io} from 'socket.io-client';
import {ref} from "vue";
import {defineStore} from "pinia";
import {useRoute, useRouter} from "#app";
import {useGameManager} from "~/composables/useGameManager";
import {useGameStateStore} from "~/stores/gameState";
import {useUserStore} from "~/stores/user";
import {useLobbyStore} from "~/stores/lobby";

export const useSocketStore = defineStore('socketStore', () => {
    const socket = ref(io('http://localhost:3000'));


    socket.value.on('connect', () => {
        socket.value.on('info-game', (game: any) => {
            console.log("INFO GAME");
            const gameManager = useGameManager();
            gameManager.start(game);
        })

        socket.value.on('error', () => {
            console.log("ERROR");
            const router = useRouter();
            router.push('/');
        })

        socket.value.on('game-update', (data: any) => {
            console.log("GAME UPDATE");
            const gameState = useGameStateStore();

            gameState.setInfoGame(data);
            console.log('data', data);
        })

        socket.value.on('game-started', () => {
            console.log("GAME STARTED");
            const router = useRouter();
            const userStore = useUserStore();
            const route = router.currentRoute.value.fullPath;

            router.push(`${route}/${userStore.player_name}`);
        });

        socket.value.on('game-updated', (game: any) => {
            console.log("GAME UPDATED");
            const lobbyStore = useLobbyStore()
            lobbyStore.updatePlayers(game.players);
        });

    })
    return {
        socket
    };
});