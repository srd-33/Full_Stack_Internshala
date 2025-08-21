import axios from 'axios'

const API = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'
export const AUTH_LOGIN_PATH = '/api/auth/login' 

export const api = axios.create({
  baseURL: API,
})

// attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers = config.headers || {}
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)

export async function login({ email, password }) {
  const { data } = await api.post(AUTH_LOGIN_PATH, { email, password })
  return data
}

export async function getAgents() {
  const { data } = await api.get('/api/agents')
  return data
}

export async function createAgent(payload) {
  const { data } = await api.post('/api/agents', payload)
  return data
}

export async function uploadList(file) {
  const fd = new FormData()
  fd.append('file', file)
  const { data } = await api.post('/api/records/upload', fd, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return data
}

export async function getRecords() {
  const { data } = await api.get('/api/records')
  return data
}

export async function assignRecord(recordId, agentId) {
  const { data } = await api.put(`/api/records/${recordId}/assign`, { agentId });
  return data;
}