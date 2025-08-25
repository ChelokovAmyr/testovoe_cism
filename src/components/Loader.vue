<template>
  <div v-if="visible" class="loader-overlay">
    <div class="spinner" />
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
const props = defineProps<{ visible: boolean }>()
</script>

<style scoped lang="scss">
.loader-overlay {
  position: fixed;
  inset: 0;
  background: rgba(255,255,255,0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 60;
}

.spinner {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 4px solid rgba(0,0,0,0.12);
  border-left-color: var(--accent);
  animation: spin 0.9s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
