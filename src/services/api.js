/**
 * Service API pour l'intégration avec le backend Léo
 */

const API_BASE_URL = 'https://leo-backend-n4vs.onrender.com/api'

class ApiService {
  constructor() {
    this.token = localStorage.getItem('leo_token')
  }

  // Configuration des headers par défaut
  getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    }
    
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`
    }
    
    return headers
  }

  // Gestion des erreurs API
  async handleResponse(response) {
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Erreur API')
    }
    return response.json()
  }

  // Authentification
  async login(email, password) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ email, password })
    })
    
    const data = await this.handleResponse(response)
    
    if (data.access_token) {
      this.token = data.access_token
      localStorage.setItem('leo_token', this.token)
    }
    
    return data
  }

  async register(userData) {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(userData)
    })
    
    const data = await this.handleResponse(response)
    
    if (data.access_token) {
      this.token = data.access_token
      localStorage.setItem('leo_token', this.token)
    }
    
    return data
  }

  async logout() {
    this.token = null
    localStorage.removeItem('leo_token')
  }

  async getProfile() {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      headers: this.getHeaders()
    })
    
    return this.handleResponse(response)
  }

  // Modules IA
  async analyzeSentiment(message) {
    const response = await fetch(`${API_BASE_URL}/ai/analyze-sentiment`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ message })
    })
    
    return this.handleResponse(response)
  }

  async rephraseMessage(message, context = null, saveToHistory = false) {
    const response = await fetch(`${API_BASE_URL}/ai/rephrase-message`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ 
        message, 
        context, 
        save_to_history: saveToHistory 
      })
    })
    
    return this.handleResponse(response)
  }

  async generateResponses(receivedMessage, context = null) {
    const response = await fetch(`${API_BASE_URL}/ai/generate-responses`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ 
        received_message: receivedMessage, 
        context 
      })
    })
    
    return this.handleResponse(response)
  }

  async getMirrorFeedback(message) {
    const response = await fetch(`${API_BASE_URL}/ai/mirror-mode`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ message })
    })
    
    return this.handleResponse(response)
  }

  async processLegalDocument(documentText, documentPath = null) {
    const response = await fetch(`${API_BASE_URL}/ai/process-legal-document`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ 
        document_text: documentText,
        document_path: documentPath
      })
    })
    
    return this.handleResponse(response)
  }

  async uploadLegalDocument(file) {
    const formData = new FormData()
    formData.append('file', file)
    
    const headers = {}
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`
    }
    
    const response = await fetch(`${API_BASE_URL}/ai/upload-legal-document`, {
      method: 'POST',
      headers,
      body: formData
    })
    
    return this.handleResponse(response)
  }

  // Gestion des données
  async getJudgments() {
    const response = await fetch(`${API_BASE_URL}/ai/get-judgments`, {
      headers: this.getHeaders()
    })
    
    return this.handleResponse(response)
  }

  async getMessageHistory() {
    const response = await fetch(`${API_BASE_URL}/ai/get-message-history`, {
      headers: this.getHeaders()
    })
    
    return this.handleResponse(response)
  }

  async deleteMessageHistory() {
    const response = await fetch(`${API_BASE_URL}/ai/delete-message-history`, {
      method: 'DELETE',
      headers: this.getHeaders()
    })
    
    return this.handleResponse(response)
  }

  // Vérification de la santé de l'API
  async healthCheck() {
    const response = await fetch(`${API_BASE_URL}/health`)
    return this.handleResponse(response)
  }

  // Utilitaires
  isAuthenticated() {
    return !!this.token
  }

  getToken() {
    return this.token
  }
}

// Instance singleton
const apiService = new ApiService()

export default apiService

