<template>
  <section class="preview">
    <div v-if="!document" class="empty">
      Выберите документ, чтобы посмотреть его содержимое
    </div>

    <div v-else class="content">
      <div class="image">
        <img v-if="document.image" :src="document.image" alt="preview" />
        <div v-else class="placeholder">Нет изображения</div>
      </div>

      <div class="info">
        <h3>{{ document.title }}</h3>

        <div class="buttons">
          <button class="download" @click="download">Скачать</button>
          <button
            class="delete"
            :disabled="!document.image"
            @click="$emit('delete', document)"
          >
            Удалить
          </button>
        </div>

        <p class="description">
          {{ document.content }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import type { Document } from '../stores/documentStore'

const props = defineProps<{ document: Document | null }>()

const download = () => {
  if (!props.document) return
  const blob = new Blob([props.document.content], { type: 'text/plain' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = `${props.document.title}.txt`
  link.click()
}
</script>

<style scoped lang="scss">
.preview {
  flex: 1;
  padding: 20px;
}

.empty {
  color: #999;
  font-size: 16px;
  text-align: center;
  margin-top: 50px;
}

.content {
  display: flex;
  gap: 20px;
}

.image {
  width: 180px;
  height: 180px;
  border: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    max-width: 100%;
    max-height: 100%;
  }

  .placeholder {
    color: #bbb;
    font-size: 14px;
  }
}

.info {
  flex: 1;

  h3 {
    margin: 0 0 10px;
    font-size: 20px;
  }

  .buttons {
    margin: 10px 0;

    button {
      padding: 8px 12px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      margin-right: 10px;
    }

    .download {
      background: #007bff;
      color: #fff;
    }

    .delete {
      background: #ff4d4d;
      color: #fff;
    }

    .delete:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
  }

  .description {
    font-size: 14px;
    color: #333;
  }
}
</style>
