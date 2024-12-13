<script setup lang="ts">
import {useTetrominoStore} from "~/stores/tetromino";

const tetrominoStore = useTetrominoStore();
</script>

<template>
  <div v-for="block in tetrominoStore.positions[tetrominoStore.modePosition]" class="block" :class="`col-${block.col} row-${block.row} ${tetrominoStore.refColor}`" v-if="tetrominoStore.positions"></div>
</template>

<style>
@import url("@/assets/css/position_board_tetris.css");
@import url("@/assets/css/color_board_tetris.css");
</style>