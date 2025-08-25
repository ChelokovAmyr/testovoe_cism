<template>
  <aside class="sidebar">
    <div class="sidebar__head">
      <h3>Документы</h3>
      <input
        v-model="query"
        @input="onInput"
        class="search"
        placeholder="Поиск документа..."
        type="search"
        aria-label="search"
      />
    </div>

    <div class="sidebar__list">
      <div v-if="store.error" class="error">Ошибка: {{ store.error }}</div>
      <div v-else-if="!store.loading && store.documents.length === 0" class="empty">Документы не найдены</div>

      <DocumentItem
        v-for="d in store.documents"
        :key="d.id"
        :doc="d"
        :active="d.id === store.selected?.id"
        @select="onSelect"
      />
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import DocumentItem from './DocumentItem.vue'
import { useDocumentsStore } from '../stores/documents'

const store = useDocumentsStore()
const query = ref('')

let timer: number | undefined
const DEBOUNCE_MS = 450

const onInput = () => {
  if (timer) clearTimeout(timer)
  timer = window.setTimeout(() => {
    store.fetchDocuments(query.value || undefined)
  }, DEBOUNCE_MS)
}

const onSelect = (id: number) => {
  store.selectDocumentById(id)
}

onMounted(() => {
  store.fetchDocuments()
})
</script>

<style scoped lang="scss">
.sidebar {
  width: 320px;
  background: var(--card);
  border-right: 1px solid #e7e7e7;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.sidebar__head {
  display:flex;
  flex-direction:column;
  gap:8px;
  h3 { margin:0; font-size:18px; }
  .search {
    padding: 8px 10px;
    border-radius: 8px;
    border: 1px solid #ddd;
    width: 100%;
  }
}

.sidebar__list {
  overflow: auto;
  display:flex;
  flex-direction:column;
  gap:8px;
  padding-bottom: 16px;
}

.empty { color:#666; padding: 10px; text-align:center; }
.error { color: var(--danger); padding: 10px; text-align:center; }
</style>
