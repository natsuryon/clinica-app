import axios from 'axios'

// Em produção, a API fica no Render (não no localhost).
// Ajuste esta URL se você mudar o deploy da API.
const DEFAULT_API_URL = 'https://clinica-app-5fec.onrender.com'

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ||
    (import.meta.env.MODE === 'production' ? DEFAULT_API_URL : 'http://localhost:3000'),
})

export default api
