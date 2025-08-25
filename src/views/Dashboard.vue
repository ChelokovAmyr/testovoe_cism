<template>
  <div class="dashboard">
    <Sidebar />

    <DocumentPreview
      :document="store.selectedDocument"
      @delete="store.deleteDocument"
    />

    <Loader :visible="store.loading" />
  </div>

  <p v-if="store.error" class="error">{{ store.error }}</p>
</template>

<script setup lang="ts">
import Sidebar from '../components/Sidebar.vue'
import DocumentPreview from '../components/DocumentPreview.vue'
import Loader from '../components/Loader.vue'
import { useDocumentStore } from '../stores/documentStore'

const store = useDocumentStore()
</script>

<style scoped lang="scss">
.dashboard {
  display: flex;
  height: calc(100vh - 60px);
  background: #fff;
}

.error {
  color: red;
  text-align: center;
  margin-top: 10px;
}
</style>
