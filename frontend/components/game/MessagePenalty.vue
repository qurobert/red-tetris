<script setup lang="ts">
import {useBoardStore} from "~/stores/board";
import {useSocketStore} from "#imports";

const boardStore = useBoardStore()
const socketStore = useSocketStore();
</script>

<template>
  <p class="text-muted-foreground max-w-60 text-sm text-center mt-2" v-if="!boardStore.penaltyMessage?.playerName">
    Tips: Clear multiples lines to send <br/> n - 1 penalty lines to opponents !
  </p>
  <p v-else class="max-w-60 text-sm text-center mt-2 font-bold">
    <span v-if="socketStore.socket.id === boardStore.penaltyMessage.playerId" class="text-green-600">
      Well done ! You sent {{ boardStore.penaltyMessage.lines + (boardStore.penaltyMessage.lines > 1 ? ' penalty lines' : ' penalty line')}} to opponents !
    </span>
    <span v-else class="text-red-600">
    {{ boardStore.penaltyMessage.lines + (boardStore.penaltyMessage.lines > 1 ? ' penalty lines' : ' penalty line')}} from {{boardStore.penaltyMessage.playerName}} !
    </span>
  </p>
</template>