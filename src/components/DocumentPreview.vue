<template>
  <section class="preview">
    <div v-if="!doc" class="empty">Выберите документ, чтобы посмотреть его содержимое</div>

    <div v-else class="card">
      <div class="media">
        <img v-if="doc.image" :src="doc.image" alt="preview" />
        <div v-else class="no-image">Нет изображения</div>
      </div>

      <div class="body">
        <h2 class="title">{{ doc.name }}</h2>

        <div class="controls">
          <button class="btn download" @click="download">Скачать</button>
          <button
            class="btn delete"
            :disabled="!doc.image"
            @click="onDelete"
          >
            Удалить
          </button>
        </div>

        <div class="content">
           <h2 class="title">Описание:</h2>
          <span>{{ doc.description }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDocumentsStore, type Doc } from '../stores/documents'

const store = useDocumentsStore()
const doc = computed<Doc | null>(() => store.selected)

const download = () => {
  if (!doc.value) return
  const filename = `${sanitizeFilename(doc.value.name || 'document')}.txt`
  const blob = new Blob([doc.value.description ?? ''], { type: 'text/plain;charset=utf-8' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = filename
  link.click()
  URL.revokeObjectURL(link.href)
}

const sanitizeFilename = (s: string) => s.replace(/[<>:"/\\|?*\x00-\x1F]/g, '-').slice(0, 200)

const onDelete = async () => {
  if (!doc.value) return
  const ok = confirm('Удалить документ?')
  if (!ok) return
  await store.deleteDocument(doc.value.id)
}
</script>

<style scoped lang="scss">
.preview {
  flex:1;
  padding: 20px;
  overflow: auto;
}

.empty {
  height: 100%;
  display:flex;
  align-items:center;
  justify-content:center;
  color:#777;
}

.card {
  display:flex;
  gap: 61px;
  background: var(--card);
  padding: 18px;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(34,34,34,0.04);
}

.media {
  width: 424px;
  height: 286px;
  border-radius: 8px;
  background: #fafafa;
  display:flex;
  align-items:center;
  justify-content:center;
  overflow:hidden;
  img { width:100%; height:100%; object-fit:cover; }
  .no-image { color:#bbb; }
}

.body { flex:1; display:flex; flex-direction:column; gap:12px; }
.title { margin:0; font-size:20px; }
.controls { display:flex; gap:8px; }
.btn {
  padding: 8px 14px;
  border-radius:8px;
  border:none;
  cursor:pointer;
  font-weight:600;
}
.download { background: var(--accent); color: white; }
.delete { background: var(--danger); color:white; }
.delete:disabled { background: #ddd; color: #888; cursor:not-allowed; }

.content span {
  white-space: pre-wrap;
  word-break: break-word;
  color:#333;
}
</style>
