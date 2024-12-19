<script setup lang="ts">
import {useInfoTetromino} from "~/composables/useInfoTetromino";
import {ModePosition, useTetrominoStore} from "~/stores/tetromino";
import Blocks from "~/components/game/utility/Blocks.vue";
import {useUserStore} from "~/stores/user";
import {computed} from "vue";

const userStore = useUserStore();
const tetrominoStore = useTetrominoStore();
const infoTetromino = useInfoTetromino();
const tetromino = computed(() => {
  if (!tetrominoStore.nextTetrominoLetter) return ;
  return {
    position: infoTetromino.getPosition(tetrominoStore.nextTetrominoLetter, 0, 0)[ModePosition.rotate0],
    color: infoTetromino.getColor(tetrominoStore.nextTetrominoLetter)
  }
});
</script>

<template>
  <div class="ml-4 md:ml-8 h-[30rem] flex flex-col items-center justify-evenly">
    <div class="text-center">
      <h2 class="text-lg mb-2 text-center font-bold">
        Next
      </h2>
      <div class="grid grid-cols-4 grid-rows-4 w-20 h-20">
        <Blocks :positions="tetromino?.position" :color="tetromino?.color ?? ''" />
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
        High Score
      </h2>
      {{userStore.highScore}}
    </div>
  </div>
</template>