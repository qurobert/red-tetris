<script setup>
import {useBoardStore} from "~/stores/board";

const boardStore = useBoardStore();
const filledBoard = computed(() => boardStore.board.filter(block => block.isFilled));
</script>

<template>
  <div v-for="block in filledBoard" :key="block.col + ' ' + block.row" class="block" :class="`col-${block.col} row-${block.row} ${block.color}`"></div>
</template>

<style>
@import url("@/assets/css/position_board_tetris.css");
@import url("@/assets/css/color_board_tetris.css");
</style>
