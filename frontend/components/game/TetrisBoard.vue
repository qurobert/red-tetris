<script setup lang="ts">
import {useGameManager} from "~/composables/useGameManager";
import GameOverText from "~/components/game/GameOverText.vue";
import {useGameStateStore} from "~/stores/gameState";
import BlockBoard from "~/components/game/BlockBoard.vue";
import Tetromino from "~/components/game/Tetromino.vue";

const gameManager = useGameManager();
const gameStateStore = useGameStateStore();

function beforeUnload(e: Event) {
  e.preventDefault();
}

onMounted(() => {
  gameManager.init();
  window.addEventListener('beforeunload', beforeUnload)
})

onUnmounted(() => {
  gameManager.reset();
  window.removeEventListener('beforeunload', beforeUnload);
})

onBeforeRouteLeave((to, from, next) => {
    const confirmation = window.confirm(
        "Vous êtes sur le point de quitter la partie. Voulez-vous continuer ?"
    );
    if (confirmation) {
      gameManager.reset();
      next(); // Autorise la navigation
    } else {
      next(false); // Bloque la navigation
    }
});
</script>

<template>
  <div class="grid grid-cols-12 grid-rows-22 w-60 h-[30rem] bg-black relative">
    <!--    Header Tetris Board Game    -->
    <div v-for="index in 4" class="bg-[#666]" :class="{
      'left grid grid-rows-22 grid-cols-1': index == 1, // left
      'right grid grid-rows-22 grid-cols-1': index == 2, // right
      'top flex grid grid-cols-10 grid-rows-1': index == 3, // top
      'bottom flex grid grid-cols-10 grid-rows-1': index == 4, // bottom
    }">
      <div v-for="_ in (index === 1 || index === 2 ? 22 : 10)" class="block" :class="{
        'col-span-1 row-span-1': index === 1 || index === 2 || index === 3 || index === 4,
      }"></div>
    </div>

    <!--    Tetris Board Game    -->
    <Tetromino />

    <BlockBoard />
    <GameOverText v-if="gameStateStore.gameOver"/>
  </div>
</template>

<style>
@import url("assets/css/position_board_tetris.css");
@import url("assets/css/color_board_tetris.css");
</style>