<template>
  <div class="loader" v-if="visible">Loading...</div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{ visible: boolean }>()
</script>

<style scoped>
.loader {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255,255,255,0.6);
  font-size: 1.5rem;
}
</style>
