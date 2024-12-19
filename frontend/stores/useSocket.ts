import {io} from 'socket.io-client';
import {ref} from "vue";
import {defineStore} from "pinia";
import {useGameManager} from "~/composables/useGameManager";
import {useGameStateStore} from "~/stores/gameState";
import {useUserStore} from "~/stores/user";
import {useLobbyStore} from "~/stores/lobby";
import {useRoute, useRouter} from "#app";
import {useBoardStore} from "~/stores/board";

export const useSocketStore = defineStore('socketStore', () => {
    const socket = ref(io('http://localhost:3000'));
    const router = useRouter();
    const userStore = useUserStore();

    socket.value.on('connect', () => {
        socket.value.on('info-game', (game: any) => {
            console.log("INFO GAME");
            const gameManager = useGameManager();
            gameManager.start(game);
        })

        socket.value.on('error', (msg: any) => {
            console.log("ERROR", msg);
            router.push({
                path: '/'
            });
        })

        socket.value.on('game-update', (game: any) => {
            console.log("GAME UPDATE", game);
            const gameState = useGameStateStore();

            gameState.setInfoGame(game);
        })

        socket.value.on('game-started', (game: any) => {
            console.log("GAME STARTED");
            const route = router.currentRoute.value.fullPath;
            const gameState = useGameStateStore();

            router.push(`${route}/${userStore.player_name}`);

            gameState.setInfoGame(game);
        });

        socket.value.on('game-created', (game: any) => {
            console.log("GAME CREATED", game.id);
            userStore.setIsAdmin(true);

            const lobbyStore = useLobbyStore()
            lobbyStore.updatePlayers(game.players);
            router.push(game.id)
        })

        socket.value.on('game-updated', (game: any) => {
            console.log("UPDATED GAME", game);

            if (game.players.find((p: any) => p.id === socket.value.id && p.isHost)) {
                userStore.setIsAdmin(true);
            } else {
                userStore.setIsAdmin(false);
            }
            const lobbyStore = useLobbyStore();
            const gameStateStore = useGameStateStore();

            gameStateStore.setInfoGame(game);
            lobbyStore.updatePlayers(game.players);
        });

        socket.value.on('game-joined', (game: any) => {
            console.log("JOINED GAME");
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

        socket.value.on('game-over', () => {
            console.log("GAME OVER");
            const gameStateStore = useGameStateStore();
            const route = useRoute();

            gameStateStore.setIsEndGame(true);
            router.push({
                name: 'id_room',
                params: {
                    id_room: route.params.id_room
                }
            })
        })

    })
    return {
        socket
    };
});