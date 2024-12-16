<script setup lang="ts">
import TetrisBoard from "~/components/game/Tetris.vue";
import InfoBoard from "~/components/game/InfoBoard.vue";
import ListOpponents from "~/components/game/ListOpponents.vue";

definePageMeta({
  showHeader: false
})

</script>

<template>
  <div class="w-full flex justify-center mt-12">
    <TetrisBoard />
    <InfoBoard />
  </div>
  <ListOpponents />
</template>