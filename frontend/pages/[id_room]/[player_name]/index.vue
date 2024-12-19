<script setup lang="ts">
import Tetris from "~/components/game/Tetris.vue";
import InfoBoard from "~/components/game/InfoBoard.vue";
import ListOpponents from "~/components/game/ListOpponents.vue";
import MessagePenalty from "~/components/game/MessagePenalty.vue";
import {useGameManager, useKeyboardManager, useSocketStore} from "#imports";
import {onMounted, onBeforeUnmount} from "vue";
import {onBeforeRouteLeave, useRoute} from "#app";

const gameManager = useGameManager();
const keyboardManager = useKeyboardManager();

onMounted(() => {
  gameManager.init();
  keyboardManager.init()
})

onBeforeUnmount(() => {
  gameManager.reset();
  keyboardManager.reset();
})

onBeforeRouteLeave((to, from, next) => {
  const socketStore = useSocketStore();
  const route = useRoute();
  if (to.path === '/') {
    console.log("go to home");
    socketStore.socket.emit('leave-lobby', route.params.id_room);
  }
  next();
})

</script>

<template>
  <div class="md:flex md:justify-evenly md:items-center">
    <div class="flex justify-center mt-12 md:mt-8">
      <div>
        <Tetris />
        <MessagePenalty />
      </div>
      <InfoBoard />
    </div>

    <ListOpponents />
  </div>
</template>