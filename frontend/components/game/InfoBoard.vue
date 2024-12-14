<script setup lang="ts">
const userStore = useUserStore();

</script>

<template>
  <div class="ml-8 h-[30rem] flex flex-col items-center justify-evenly">
    <div class="text-center">
      <h2 class="text-lg mb-2 text-center font-bold">
        Next
      </h2>
      Tetromino
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