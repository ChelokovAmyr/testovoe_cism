<template>
  <section class="flex-1 p-5 overflow-auto">
    <transition name="fade" mode="out-in">
      <template v-if="!doc">
        <div class="h-full flex items-center justify-center text-gray-500">
          Выберите документ, чтобы посмотреть его содержимое
        </div>
      </template>

      <template v-else>
        <div class="flex gap-[60px] bg-white p-5 rounded-xl shadow-md" :key="doc.id">
          <!-- Медиа -->
          <div class="w-[424px] h-[286px] rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
            <img v-if="doc.image" :src="doc.image" alt="Нет изображения" class="w-full h-full object-cover" />
            <div v-else class="text-gray-400">Нет изображения</div>
          </div>

          <!-- Содержимое -->
          <div class="flex-1 flex flex-col gap-3">
            <h2 class="text-xl font-semibold">{{ doc.name }}</h2>

            <div class="flex gap-2">
              <button
                @click="download"
                class="px-4 py-2 rounded border border-blue-500 text-blue-500
                    hover:bg-blue-50 active:bg-blue-100 transition-colors duration-150"
                >
                    Скачать
             </button>

              <button
                @click="onDelete"
                :disabled="!doc.image"
                class="px-4 py-2 rounded border border-red-500 text-red-500 hover:bg-red-50 active:bg-red-100 disabled:border-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed transition"
              >
                Удалить
              </button>
            </div>

            <div>
              <h3 class="text-lg font-medium mt-4">Описание:</h3>
              <p class="whitespace-pre-wrap break-words text-gray-700 mt-1">{{ doc.description }}</p>
            </div>
          </div>
        </div>
      </template>
    </transition>
  </section>
</template>


<script setup lang="ts">
import { computed } from 'vue'
import { useDocumentsStore, type Doc } from '../stores/documents'

const store = useDocumentsStore()
const doc = computed<Doc | null>(() => store.selected)

// Скачать документ
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

// Удаление документа
const onDelete = async () => {
  if (!doc.value) return
  const ok = confirm('Удалить документ?')
  if (!ok) return
  await store.deleteDocument(doc.value.id)
}
</script>

<style scoped>
/* Плавный fade для смены документа */
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.fade-enter-to, .fade-leave-from { opacity: 1; }
</style>
