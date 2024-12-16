<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const showHeader = ref(true);

watch(() => route.meta, () => {
  showHeader.value = route.meta.showHeader !== false
}, { immediate: true })

</script>
<template>
  <Header v-if="showHeader"/>
  <NuxtPage />
</template>