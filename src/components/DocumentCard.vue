<template>
  <transition name="fade">
    <div class="doc-card" @click="$emit('select', document)">
      <h3>{{ document.title }}</h3>
      <p>{{ document.description.slice(0, 50) }}...</p>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import type { Doc } from '../stores/documents'

const { document } = defineProps<{ document: Doc }>()
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
.fade-enter-to, .fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.doc-card {
  border: 1px solid #ddd;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  background-color: #fff;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.doc-card:hover {
  background-color: #f5f5f5;
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>
