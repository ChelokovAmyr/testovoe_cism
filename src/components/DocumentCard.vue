<template>
  <div class="doc-card" @click="$emit('select', document)">
    <h3>{{ document.title }}</h3>
    <p>{{ document.content.slice(0, 50) }}...</p>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import type { Document } from '../stores/documentStore'

const props = defineProps<{ document: Document }>()
</script>

<style scoped>
.doc-card {
  border: 1px solid #ddd;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
}
.doc-card:hover {
  background-color: #f5f5f5;
}
</style>
