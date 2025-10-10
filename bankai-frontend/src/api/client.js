import axios from 'axios';

const Client = axios.create({ 
    baseURL: 'http://localhost:3333',
    headers: {
        'Content-Type': 'application/json',
    },
})

// Função para obter o token do localStorage
const getToken = () => {
  return localStorage.getItem('access_token')
}

// Função para salvar o token no localStorage
const setToken = (token) => {
  localStorage.setItem('access_token', token)
}

// Função para remover o token do localStorage
const removeToken = () => {
  localStorage.removeItem('access_token')
}

// Interceptador de requisição para adicionar o token automaticamente
Client.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
)

// Interceptador de resposta para tratar erros de autenticação
Client.interceptors.response.use(
  (response) => {
    // Log de sucesso para debug
    console.log(`✅ ${response.config.method?.toUpperCase()} ${response.config.url} - ${response.status}`)
    return response
  },
  (error) => {
    // Log de erro para debug
    const method = error.config?.method?.toUpperCase() || 'UNKNOWN'
    const url = error.config?.url || 'unknown'
    const status = error.response?.status || 'No Response'
    
    console.error(`❌ ${method} ${url} - ${status}`, error.response?.data)

    if (error.response?.status === 401) {
      // Token expirado ou inválido
      console.warn('Token inválido ou expirado. Redirecionando para login...')
      removeToken()
      
      // Evitar redirecionamento em loop se já estiver na página de login
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login'
      }
    }

    // Adicionar informações extras ao erro para melhor debugging
    if (error.response) {
      error.message = `API Error ${error.response.status}: ${error.response.data?.message || error.message}`;
    } else if (error.request) {
      error.message = 'Erro de rede: Não foi possível conectar ao servidor';
    }

    return Promise.reject(error)
  }
);


export { Client, getToken, setToken, removeToken }