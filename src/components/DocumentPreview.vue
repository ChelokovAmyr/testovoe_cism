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
          <div class="w-[424px] h-[286px] rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
            <img v-if="doc.image" :src="doc.image" alt="Нет изображения" class="w-full h-full object-cover" />
            <div v-else class="text-gray-400">Нет изображения</div>
          </div>

          <div class="flex-1 flex flex-col gap-3">
            <h2 class="text-xl font-semibold">{{ doc.name }}</h2>

            <div class="flex gap-[17px]">
              <button
                @click="download"
                class="w-[114px] h-[31px] flex items-center justify-center
                       border border-[#0D6EFD] text-[#0D6EFD]
                       bg-transparent hover:bg-[#0D6EFD]/10 active:bg-[#0D6EFD]/20
                       rounded-[8px] opacity-100 transition-colors duration-150"
              >
                Скачать
              </button>

              <button
                @click="onDelete"
                :disabled="!doc.image"
                class="w-[114px] h-[31px] flex items-center justify-center
                       border border-[#DC3545] text-[#DC3545]
                       bg-transparent hover:bg-[#DC3545]/10 active:bg-[#DC3545]/20
                       rounded-[8px] opacity-100
                       disabled:border-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed
                       transition-colors duration-150"
              >
                Удалить
              </button>
            </div>

            <div>
              <h3 class="text-lg font-medium mt-4">Описание:</h3>
              <p
                class="mt-1 bg-[#6C757D] text-white px-3 py-2 rounded
                       font-[Montserrat] font-normal text-[14px] leading-[100%] tracking-[0px]
                       whitespace-pre-wrap break-words"
              >
                {{ doc.description }}
              </p>
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

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
