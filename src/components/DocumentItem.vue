<template>
  <div class="doc-item" :class="{ active }" @click="$emit('select', doc.id)">
    <div class="left">
      <div class="thumb">
        <img v-if="doc.image" :src="doc.image" alt="" />
        <div v-else class="no-thumb">📄</div>
      </div>
    </div>
    <div class="right">
      <div class="title">{{ doc.name }}</div>
      <div class="meta">{{ doc.size ?? '12МБ' }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Doc } from '../stores/documents'

const props = defineProps<{
  doc: Doc
  active?: boolean
}>()

const active = props.active ?? false
</script>

<style scoped lang="scss">
.doc-item {
  display: flex;
  gap: 12px;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
  border: 1px solid transparent;
  align-items: flex-start;

  &:hover {
    background: #fafbff;
  }

  &.active {
    border-color: var(--accent);
    background: #eef5ff;
    box-shadow: 0 2px 6px rgba(0,123,255,0.06);
  }
}

.thumb {
  width: 48px;
  height: 48px;
  border-radius: 6px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.title {
  font-weight: 600;
  font-size: 14px;
}

.meta {
  font-size: 12px;
  color: #777;
  margin-top: 4px;
}
</style>
