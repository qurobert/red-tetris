<script setup>
import {useGameManager} from "~/composables/useGameManager.js";

const {tetrimino } = useGameManager();
</script>

<template>
  <div class="grid grid-cols-12 grid-rows-22 w-60 h-[30rem] bg-black">
    <!--    Header Tetris Board Game    -->
    <div v-for="index in 4" class="bg-[#666]" :class="{
      'left grid grid-rows-22 grid-cols-1': index == 1, // left
      'right grid grid-rows-22 grid-cols-1': index == 2, // right
      'top flex grid grid-cols-10 grid-rows-1': index == 3, // top
      'bottom flex grid grid-cols-10 grid-rows-1': index == 4, // bottom
    }">
      <div v-for="_ in (index === 1 || index === 2 ? 22 : 10)" class="block" :class="{
        'col-span-1 row-span-1': index === 1 || index === 2,
        'col-span-1 row-span-1': index === 3 || index === 4,
      }"></div>
    </div>

    <!--    Tetris Board Game    -->
    <Tetrimino :rotatePosition="tetrimino.rotatePosition.value" :mode="tetrimino.modeRotate.value" :color="tetrimino.color.value"/>
  </div>
</template>

<style>
@import url("@/assets/css/position_board_tetris.css");
@import url("@/assets/css/color_board_tetris.css");
</style>