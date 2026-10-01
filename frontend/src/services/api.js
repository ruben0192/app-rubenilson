const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

export async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {})
    },
    ...options
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Erro ao processar a requisição');
  }

  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    return response.json();
  }

  return response.text();
}

export const api = {
  auth: {
    register: (payload) => apiRequest('/auth/register', { method: 'POST', body: JSON.stringify(payload) }),
    login: (payload) => apiRequest('/auth/login', { method: 'POST', body: JSON.stringify(payload) })
  },
  profile: {
    get: () => apiRequest('/perfil'),
    update: (payload) => apiRequest('/perfil', { method: 'PUT', body: JSON.stringify(payload) })
  },
  knowledge: {
    list: () => apiRequest('/conhecimentos'),
    create: (payload) => apiRequest('/conhecimentos', { method: 'POST', body: JSON.stringify(payload) }),
    update: (id, payload) => apiRequest(`/conhecimentos/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
    remove: (id) => apiRequest(`/conhecimentos/${id}`, { method: 'DELETE' })
  },
  search: {
    list: (query) => apiRequest(`/busca?query=${encodeURIComponent(query || '')}`)
  },
  connections: {
    list: () => apiRequest('/conexoes'),
    send: (payload) => apiRequest('/conexoes', { method: 'POST', body: JSON.stringify(payload) })
  },
  ai: {
    interpret: (payload) => apiRequest('/ia/interpretar', { method: 'POST', body: JSON.stringify(payload) })
  }
};
