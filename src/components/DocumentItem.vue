<template>
  <div
    class="doc-item"
    :class="{ active }"
    @click="$emit('select', document)"
  >
    <span class="icon">📄</span>
    <span class="title">{{ document.title }}</span>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import type { Document } from '../stores/documentStore'

defineProps<{
  document: Document
  active?: boolean
}>()
</script>

<style scoped lang="scss">
.doc-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
  border: 1px solid transparent;

  .icon {
    margin-right: 10px;
  }

  &:hover {
    background: #f7f7f7;
  }

  &.active {
    border-color: #007bff;
    background: #eef5ff;
  }
}
</style>
