<template>
  <input
    type="text"
    v-model="search"
    placeholder="Поиск документа..."
  />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useDocumentsStore } from '../stores/documents'

const store = useDocumentsStore()
const search = ref('')

function debounce<T extends (...args: any[]) => any>(fn: T, delay = 300) {
  let timeout: ReturnType<typeof setTimeout>
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => fn(...args), delay)
  }
}

const onSearch = debounce((value: string) => {
  store.fetchDocuments(value)
}, 300)

watch(search, (val) => {
  onSearch(val)
})
</script>

<style scoped>
input {
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 100%;
  transition: border-color 0.2s ease;
}

input:focus {
  border-color: var(--accent);
  outline: none;
}
</style>
