<script setup lang="ts">
import Tetris from "~/components/game/Tetris.vue";
import InfoBoard from "~/components/game/InfoBoard.vue";
import ListOpponents from "~/components/game/ListOpponents.vue";
import MessagePenalty from "~/components/game/MessagePenalty.vue";
import {useGameManager, useGameStateStore} from "#imports";
import {onMounted, onUnmounted} from "vue";
import {onBeforeRouteLeave} from "#app";

const gameManager = useGameManager();

onMounted(() => {
  gameManager.init();
})

onUnmounted(() => {
  gameManager.reset();
})

onBeforeRouteLeave((to, from, next) => {
  const confirmation = window.confirm(
      "Vous êtes sur le point de quitter la partie. Voulez-vous continuer ?"
  );
  if (confirmation) {
    gameManager.reset();
    next();
  } else {
    next(false); // Bloque la navigation
  }
});
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