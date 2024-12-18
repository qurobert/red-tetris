<script setup lang="ts">
import {useLobbyStore} from "~/stores/lobby";
import ListPlayersWithPagination from "~/components/lobby/ListPlayersWithPagination.vue";
import ActionsLobby from "~/components/lobby/ActionsLobby.vue";
import DialogEndGame from "~/components/lobby/DialogEndGame.vue";
import {onMounted} from "vue";
import {useRouter} from "#app";

const lobbyStore = useLobbyStore();

onMounted(() => {
  const router = useRouter();

  if (!lobbyStore.players.length) {
    router.push('/');
  }
})
</script>

<template>
  <div>
    <h1 class="text-xl font-bold text-center my-4">
      Lobby
    </h1>
    <ListPlayersWithPagination />
    <ActionsLobby />
    <DialogEndGame />
  </div>
</template>
