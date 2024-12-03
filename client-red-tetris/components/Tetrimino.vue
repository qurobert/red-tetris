<script setup>
defineProps({
  rotatePosition: Object,
  color: String,
  mode: String,
})
</script>

<template>
  <div v-for="block in rotatePosition[mode]" class="block" :class="`col-${block.col} row-${block.row} ${color}`"></div>
</template>

<style>
@import url("@/assets/css/position_board_tetris.css");
@import url("@/assets/css/color_board_tetris.css");
</style>