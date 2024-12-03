<script setup>
import {useTetriminoStore} from "~/stores/tetrimino.js";

const tetriminoStore = useTetriminoStore();
</script>

<template>
  <div v-for="block in tetriminoStore.positions[tetriminoStore.modePosition]" class="block" :class="`col-${block.col} row-${block.row} ${tetriminoStore.refColor}`" v-if="tetriminoStore.positions"></div>
</template>

<style>
@import url("@/assets/css/position_board_tetris.css");
@import url("@/assets/css/color_board_tetris.css");
</style>