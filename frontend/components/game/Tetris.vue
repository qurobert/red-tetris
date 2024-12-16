<script setup lang="ts">
import {useGameManager} from "~/composables/useGameManager";
import GameOverText from "~/components/game/GameOverText.vue";
import {useGameStateStore} from "~/stores/gameState";
import BlockBoard from "~/components/game/BlockBoard.vue";
import Tetromino from "~/components/game/Tetromino.vue";
import TetrisBoard from "~/components/game/utility/TetrisBoard.vue";

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
  <TetrisBoard>
    <Tetromino />
    <BlockBoard />
    <GameOverText v-if="gameStateStore.gameOver"/>
  </TetrisBoard>
</template>

<style>
@import url("assets/css/position_board_tetris.css");
@import url("assets/css/color_board_tetris.css");
</style>