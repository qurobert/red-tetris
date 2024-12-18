import {io} from 'socket.io-client';
import {ref} from "vue";
import {defineStore} from "pinia";
import {useGameManager} from "~/composables/useGameManager";
import {useGameStateStore} from "~/stores/gameState";
import {useUserStore} from "~/stores/user";
import {useLobbyStore} from "~/stores/lobby";
import {useRouter} from "#app";
import {useBoardStore} from "~/stores/board";

export const useSocketStore = defineStore('socketStore', () => {
    const socket = ref(io('http://localhost:3000'));
    const router = useRouter();
    const userStore = useUserStore();

    socket.value.on('connect', () => {
        socket.value.on('info-game', (game: any) => {
            const gameManager = useGameManager();
            gameManager.start(game);
        })

        socket.value.on('error', () => {
            router.push({
                path: '/'
            });
        })

        socket.value.on('game-update', (data: any) => {
            const gameState = useGameStateStore();

            gameState.setInfoGame(data);
        })

        socket.value.on('game-started', () => {
            console.log("GAME STARTED");
            const route = router.currentRoute.value.fullPath;

            router.push(`${route}/${userStore.player_name}`);
        });

        socket.value.on('game-created', (game: any) => {
            userStore.setIsAdmin(true);

            const lobbyStore = useLobbyStore()
            lobbyStore.updatePlayers(game.players);
            router.push(game.id)
        })

        socket.value.on('game-updated', (game: any) => {
            const lobbyStore = useLobbyStore()
            lobbyStore.updatePlayers(game.players);
        });

        socket.value.on('game-joined', (game: any) => {
            const lobbyStore = useLobbyStore();
            lobbyStore.updatePlayers(game.players);
            userStore.setIsAdmin(false);
            router.push(game.id)
        });

        socket.value.on('apply-penalty', (penaltyInfo: {playerId: string;playerName:string;lines:number}) => {
            console.log("APPLY PENALTY");
            const boardStore = useBoardStore();
            boardStore.addPenalty(penaltyInfo);
        })

    })
    return {
        socket
    };
});