<script setup lang="ts">
import Block from "~/components/game/utility/Block.vue";

defineProps<{
  positions: { col: number; row: number }[] | null | undefined;
  color: string;
}>()
</script>

<template>
  <Block :color="color" :col="position.col" :row="position.row" v-for="position in positions" />
</template>