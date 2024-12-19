import {defineStore} from "pinia";
import {ref} from "vue";

export const useLobbyStore = defineStore('lobbyStore', () => {
  const players = ref([] as any[]);

  const updatePlayers = (value: any[]) => {
    console.log("UPDATE PLAYERS", value);
    players.value = value;
}

  return {
    players,
    updatePlayers
  }
})
