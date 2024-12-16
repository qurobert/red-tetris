<script setup lang="ts">
withDefaults(defineProps<{
  col: number,
  row: number,
  color: string;
  isBorder?: boolean;
}>(), {
  isBorder: true,
})
</script>

<template>
  <div :class="`col-${col} row-${row} ${color} ${isBorder ? 'block' : ''}`"></div>
</template>