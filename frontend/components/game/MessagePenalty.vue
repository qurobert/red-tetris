<script setup lang="ts">
// const penalty = {
//   player: "John",
//   lines: 2
// }
const penalty = null as {
  player: string,
  lines: number
} | null;

</script>

<template>
  <p class="text-muted-foreground max-w-60 text-sm text-center mt-2" v-if="!penalty">
    Tips: Clear multiples lines to send <br/> n - 1 penalty lines to opponents !
  </p>
  <p v-else class="max-w-60 text-sm text-center mt-2 text-red-600 font-bold">
    {{ penalty.lines + (penalty.lines > 1 ? ' penalty lines' : ' penalty line')}} from {{penalty.player}} !
  </p>
</template>