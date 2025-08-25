<template>
  <aside class="sidebar">
    <h2 class="logo">MyApp</h2>

    <div class="search">
      <input
        v-model="search"
        type="text"
        placeholder="Поиск документа"
        @input="onSearch"
      />
    </div>

    <nav class="doc-list">
      <DocumentItem
        v-for="doc in store.documents"
        :key="doc.id"
        :document="doc"
        :active="doc.id === store.selectedDocument?.id"
        @select="store.selectDocument"
      />
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useDocumentStore } from '../stores/documentStore'
import DocumentItem from './DocumentItem.vue'

const store = useDocumentStore()
const search = ref('')

const onSearch = () => {
  store.fetchDocuments(search.value)
}
</script>

<style scoped lang="scss">
.sidebar {
  width: 280px;
  border-right: 1px solid #ddd;
  padding: 16px;
  display: flex;
  flex-direction: column;
}

.logo {
  font-weight: 700;
  font-size: 20px;
  margin-bottom: 20px;
}

.search input {
  width: 100%;
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  margin-bottom: 20px;
}

.doc-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
