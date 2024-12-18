<script setup lang="ts">
import {onMounted} from "vue";
import {useRouter} from "#app";
import {useLobbyStore} from "~/stores/lobby";
import ListPlayersWithPagination from "~/components/lobby/ListPlayersWithPagination.vue";
import ActionsLobby from "~/components/lobby/ActionsLobby.vue";

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
  </div>
</template>
