<script setup lang="ts">
withDefaults(defineProps<{
  size?: 'sm' | 'default';
}>(), {
  size: 'default',
})
</script>

<template>
  <div class="grid grid-cols-12 grid-rows-22 bg-black relative"
       :class="{
          'w-[7.5rem] h-[15rem]': size === 'sm',
          'w-60 h-[30rem]': size === 'default',
       }"
  >
    <!--    Header Tetris Board Game    -->
    <div v-for="index in 4" class="bg-[#666]" :class="{
      'left grid grid-rows-22 grid-cols-1': index == 1, // left
      'right grid grid-rows-22 grid-cols-1': index == 2, // right
      'top flex grid grid-cols-10 grid-rows-1': index == 3, // top
      'bottom flex grid grid-cols-10 grid-rows-1': index == 4, // bottom
    }">
      <div v-for="_ in (index === 1 || index === 2 ? 22 : 10)" class="block" :class="{
        'col-span-1 row-span-1': index === 1 || index === 2 || index === 3 || index === 4,
      }"></div>
    </div>
    <slot />
  </div>
</template>