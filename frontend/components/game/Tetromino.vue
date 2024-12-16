<script setup lang="ts">
import {useTetrominoStore} from "~/stores/tetromino";
import Blocks from "~/components/game/utility/Blocks.vue";

const tetrominoStore = useTetrominoStore();
</script>

<template>
  <Blocks :color="tetrominoStore.refColor" :positions="tetrominoStore.positions[tetrominoStore.modePosition]" />
</template>

<style>
@import url("assets/css/position_board_tetris.css");
@import url("assets/css/color_board_tetris.css");
</style>