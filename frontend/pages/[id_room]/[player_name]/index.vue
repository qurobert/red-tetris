<script setup lang="ts">
import TetrisBoard from "~/components/game/TetrisBoard.vue";
import InfoBoard from "~/components/game/InfoBoard.vue";
import ListOpponents from "~/components/game/ListOpponents.vue";

</script>

<template>
  <div class="w-full flex justify-center mt-12">
    <TetrisBoard />
    <InfoBoard />
  </div>
  <ListOpponents />
</template>