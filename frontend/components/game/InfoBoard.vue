<script setup lang="ts">
import {NameTetromino, useInfoTetromino} from "~/composables/useInfoTetromino";
import {ModePosition} from "~/stores/tetromino";
import Blocks from "~/components/game/utility/Blocks.vue";

const userStore = useUserStore();
const infoTetromino = useInfoTetromino();
const nameTetromino = NameTetromino.Z
const positionsTetromino = infoTetromino.getPosition(nameTetromino, 0, 0)[ModePosition.rotate0];
const color = infoTetromino.getColor(nameTetromino);
</script>

<template>
  <div class="ml-8 h-[30rem] flex flex-col items-center justify-evenly">
    <div class="text-center">
      <h2 class="text-lg mb-2 text-center font-bold">
        Next
      </h2>
      <div class="grid grid-cols-4 grid-rows-4 w-20 h-20 bg-black">
        <Blocks :positions="positionsTetromino" :color="color" />
      </div>
    </div>
    <div class="text-center">
      <h2 class="text-lg mb-2 text-center font-bold">
        Score
      </h2>
      {{userStore.score}}
    </div>
    <div class="text-center">
      <h2 class="text-lg mb-2 text-center font-bold">
        Rank
      </h2>
      #{{userStore.rank}}
    </div>
    <div class="text-center">
      <h2 class="text-lg mb-2 text-center font-bold">
        High Score
      </h2>
      {{userStore.highScore}}
    </div>
  </div>
</template>