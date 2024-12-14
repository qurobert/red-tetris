<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/utils'

const props = defineProps<{
  class?: HTMLAttributes['class'],
  center?: boolean
}>()
</script>

<template>
  <div class="relative w-full overflow-auto" :class="{
    'flex justify-center': props.center
  }">
    <table :class="cn('w-full caption-bottom text-sm', props.class)">
      <slot />
    </table>
  </div>
</template>
