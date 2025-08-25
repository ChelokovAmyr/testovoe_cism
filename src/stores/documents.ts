import { defineStore } from 'pinia'
import axios from 'axios'

const API_URL = (import.meta.env.VITE_API_URL as string) || ''

export interface Doc {
  id: number
  title: string
  content: string
  image?: string | null
  // любая доп. информация с API
  [key: string]: any
}

interface State {
  documents: Doc[]
  selected: Doc | null
  loading: boolean
  error: string | null
}

export const useDocumentsStore = defineStore('documents', {
  state: (): State => ({
    documents: [],
    selected: null,
    loading: false,
    error: null
  }),
  actions: {
    async fetchDocuments(search?: string) {
      this.loading = true
      this.error = null
      try {
        const res = await axios.get(`${API_URL}/user/docs`, {
          params: search ? { search } : {}
        })
        // предполагаем что API возвращает массив документов в теле
        this.documents = Array.isArray(res.data) ? res.data : []
      } catch (e: any) {
        this.error = e.response?.data?.message ?? e.message ?? 'Ошибка при загрузке'
      } finally {
        this.loading = false
      }
    },

    selectDocumentById(id: number | null) {
      if (id === null) {
        this.selected = null
        return
      }
      const doc = this.documents.find((d) => d.id === id) ?? null
      this.selected = doc
    },

    async deleteDocument(id: number) {
      const doc = this.documents.find((d) => d.id === id)
      if (!doc) return false
      if (!doc.image) return false

      // Пробуем удалить на сервере, но если сервер не поддерживает - удаляем локально
      try {
        await axios.delete(`${API_URL}/user/docs/${id}`)
        // успешно удалили на сервере — обновляем локально
      } catch (e) {
        // если удаление на сервере не поддерживается/ошибка — graceful fallback
        console.warn('Delete on server failed, removing locally', e)
      } finally {
        this.documents = this.documents.filter((d) => d.id !== id)
        if (this.selected?.id === id) this.selected = null
        return true
      }
    }
  }
})
