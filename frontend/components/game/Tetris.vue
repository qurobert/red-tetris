<script setup lang="ts">
import GameOverText from "~/components/game/GameOverText.vue";
import {useGameStateStore} from "~/stores/gameState";
import BlockBoard from "~/components/game/BlockBoard.vue";
import Tetromino from "~/components/game/Tetromino.vue";
import TetrisBoard from "~/components/game/utility/TetrisBoard.vue";

const gameStateStore = useGameStateStore();
</script>

<template>
  <TetrisBoard principal>
    <Tetromino />
    <BlockBoard />
    <GameOverText v-if="gameStateStore.gameOver"/>
  </TetrisBoard>
</template>

<style>
@import url("assets/css/position_board_tetris.css");
@import url("assets/css/color_board_tetris.css");
</style>