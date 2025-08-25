<template>
  <transition name="fade">
    <div v-if="visible" class="loader-overlay">
      <div class="spinner" />
    </div>
  </transition>
</template>

<script setup lang="ts">
const { visible } = defineProps<{ visible: boolean }>()
</script>

<style scoped lang="scss">
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.fade-enter-to, .fade-leave-from {
  opacity: 1;
}

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
