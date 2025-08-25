import { defineStore } from 'pinia'
import axios from 'axios'

export interface Document {
  id: number
  title: string
  content: string
  image?: string | null
}

interface State {
  documents: Document[]
  selectedDocument: Document | null
  loading: boolean
  error: string | null
}

export const useDocumentStore = defineStore('documents', {
  state: (): State => ({
    documents: [],
    selectedDocument: null,
    loading: false,
    error: null,
  }),
  actions: {
    async fetchDocuments(search: string) {
      this.loading = true
      this.error = null
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/docs`, {
          params: { search },
        })
        this.documents = response.data
      } catch (e: any) {
        this.error = e.response?.data?.message || e.message
      } finally {
        this.loading = false
      }
    },
    selectDocument(doc: Document) {
      this.selectedDocument = doc
    },
    deleteDocument(doc: Document) {
      if (!doc.image) return
      this.documents = this.documents.filter(d => d.id !== doc.id)
    },
  },
})
