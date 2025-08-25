<template>
  <div class="dashboard">
    <Sidebar />

    <main class="main-area">
      <DocumentPreview />
    </main>

    <Loader :visible="store.loading" />

    <div class="error-toast" v-if="store.error">
      Ошибка: {{ store.error }}
      <button @click="store.fetchDocuments()">ПОВТОРИТЬ</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from '../components/Sidebar.vue'
import DocumentPreview from '../components/DocumentPreview.vue'
import Loader from '../components/Loader.vue'
import { useDocumentsStore } from '../stores/documents'

const store = useDocumentsStore()
</script>

<style scoped lang="scss">
.dashboard {
  display: flex;
  height: 100vh;
}

.main-area {
  flex: 1;
  padding: 20px;
  overflow: auto;
}

/* простой toast ошибки */
.error-toast {
  position: fixed;
  bottom: 18px;
  right: 18px;
  background: #fff6f6;
  color: var(--danger);
  border: 1px solid rgba(255,77,77,0.15);
  padding: 12px 16px;
  border-radius: 8px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.06);
  display:flex;
  gap:8px;
  align-items:center;
}
</style>
