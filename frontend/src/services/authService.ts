import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  login: async (email: string, password: string) => {
    const response = await api.post('/api/auth/login', { email, password });
    return response.data;
  },
  register: async (email: string, password: string, userType: string, firstName: string, lastName: string) => {
    const response = await api.post('/api/auth/register', { email, password, userType, firstName, lastName });
    return response.data;
  },
  logout: async () => {
    return api.post('/api/auth/logout');
  }
};

export const athleteService = {
  getAthletes: async (params?: any) => {
    const response = await api.get('/api/athletes', { params });
    return response.data;
  },
  getAthlete: async (id: number) => {
    const response = await api.get(`/api/athletes/${id}`);
    return response.data;
  },
  createProfile: async (data: any) => {
    const response = await api.post('/api/athletes', data);
    return response.data;
  },
  updateProfile: async (id: number, data: any) => {
    const response = await api.put(`/api/athletes/${id}`, data);
    return response.data;
  }
};

export const teamService = {
  getTeams: async (params?: any) => {
    const response = await api.get('/api/teams', { params });
    return response.data;
  },
  getTeam: async (id: number) => {
    const response = await api.get(`/api/teams/${id}`);
    return response.data;
  },
  createProfile: async (data: any) => {
    const response = await api.post('/api/teams', data);
    return response.data;
  },
  updateProfile: async (id: number, data: any) => {
    const response = await api.put(`/api/teams/${id}`, data);
    return response.data;
  }
};

export const jobService = {
  getJobs: async (params?: any) => {
    const response = await api.get('/api/jobs', { params });
    return response.data;
  },
  getJob: async (id: number) => {
    const response = await api.get(`/api/jobs/${id}`);
    return response.data;
  },
  createJob: async (data: any) => {
    const response = await api.post('/api/jobs', data);
    return response.data;
  },
  updateJob: async (id: number, data: any) => {
    const response = await api.put(`/api/jobs/${id}`, data);
    return response.data;
  },
  deleteJob: async (id: number) => {
    return api.delete(`/api/jobs/${id}`);
  }
};

export const applicationService = {
  submitApplication: async (data: any) => {
    const response = await api.post('/api/applications', data);
    return response.data;
  },
  getApplication: async (id: number) => {
    const response = await api.get(`/api/applications/${id}`);
    return response.data;
  },
  updateStatus: async (id: number, status: string) => {
    const response = await api.put(`/api/applications/${id}`, { status });
    return response.data;
  },
  withdrawApplication: async (id: number) => {
    return api.delete(`/api/applications/${id}`);
  }
};

export const messageService = {
  getMessages: async (params?: any) => {
    const response = await api.get('/api/messages', { params });
    return response.data;
  },
  getMessage: async (id: number) => {
    const response = await api.get(`/api/messages/${id}`);
    return response.data;
  },
  sendMessage: async (data: any) => {
    const response = await api.post('/api/messages', data);
    return response.data;
  },
  markAsRead: async (id: number) => {
    const response = await api.put(`/api/messages/${id}/read`);
    return response.data;
  }
};

export default api;
