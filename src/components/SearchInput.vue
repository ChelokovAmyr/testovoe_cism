<template>
  <input type="text" v-model="search" placeholder="Search document..." @input="onSearch" />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useDocumentStore } from '../stores/documentStore'

const store = useDocumentStore()
const search = ref('')

const onSearch = () => {
  store.fetchDocuments(search.value)
}
</script>

<style scoped>
input {
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 100%;
}
</style>
