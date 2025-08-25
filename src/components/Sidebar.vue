<template>
  <aside class="sidebar">
    <div class="sidebar__head">
      <h3>Поиск документа</h3>
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

      <transition-group name="fade" tag="div" class="doc-list">
        <DocumentItem
          v-for="d in store.documents"
          :key="d.id"
          :doc="d"
          :active="d.id === store.selected?.id"
          @select="onSelect"
        />
      </transition-group>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import DocumentItem from '../components/DocumentItem.vue'
import { useDocumentsStore } from '../stores/documents'

const store = useDocumentsStore()
const query = ref('')

// Дебаунс функция
function debounce<T extends (...args: any[]) => any>(fn: T, delay = 450) {
  let timeout: ReturnType<typeof setTimeout>
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => fn(...args), delay)
  }
}

const fetchDebounced = debounce((value: string) => {
  store.fetchDocuments(value || undefined)
})

const onInput = () => fetchDebounced(query.value)

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
    transition: border-color 0.2s ease;
  }
  .search:focus { border-color: var(--accent); outline: none; }
}

.sidebar__list {
  overflow: auto;
  display:flex;
  flex-direction:column;
  gap:8px;
  padding-bottom: 16px;
}

.doc-list > * {
  transition: all 0.3s ease;
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
.fade-enter-to, .fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.empty { color:#666; padding: 10px; text-align:center; }
.error { color: var(--danger); padding: 10px; text-align:center; }
</style>
