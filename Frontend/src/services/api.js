const API_BASE_URL = 'http://localhost:3000/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = localStorage.getItem('token');
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  removeToken() {
    this.token = null;
    localStorage.removeItem('token');
  }

  isTokenExpired(token) {
    if (!token) return true;
    const parts = token.split('.');
    if (parts.length !== 3) return true;
    try {
      const payloadJson = atob(parts[1].replace(/-/g, '+').replace(/_/g, '/'));
      const payload = JSON.parse(payloadJson);
      if (!payload?.exp) return false; // if no exp, don't treat as expired
      return Date.now() >= payload.exp * 1000;
    } catch {
      return true;
    }
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    if (this.token && this.isTokenExpired(this.token)) {
      this.removeToken();
      throw new Error('Session expired. Please log in again.');
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        if (
          (response.status === 401 || response.status === 403) &&
          (data?.error === 'Token expired' || data?.error === 'Access token required' || data?.error === 'Invalid token')
        ) {
          this.removeToken();
          throw new Error('Session expired. Please log in again.');
        }
        throw new Error(data.error || 'API request failed');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Authentication
  async login(email, password) {
    const data = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    if (data.token) {
      this.setToken(data.token);
    }
    
    return data;
  }

  async register(name, email, password, role = 'user') {
    const data = await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, role }),
    });
    
    return data;
  }

  async getProfile() {
    return this.request('/auth/profile');
  }

  async updateProfile(name, email) {
    return this.request('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify({ name, email }),
    });
  }

  // Bins
  async getBins(status = null) {
    const query = status ? `?status=${status}` : '';
    return this.request(`/bins${query}`);
  }

  async getBin(id) {
    return this.request(`/bins/${id}`);
  }

  async createBin(binData) {
    return this.request('/bins', {
      method: 'POST',
      body: JSON.stringify(binData),
    });
  }

  async updateBinStatus(id, status, currentFill) {
    return this.request(`/bins/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status, current_fill: currentFill }),
    });
  }

  async deleteBin(id) {
    return this.request(`/bins/${id}`, {
      method: 'DELETE',
    });
  }

  // Tasks
  async getTasks(binId = null, userId = null) {
    const params = new URLSearchParams();
    if (binId) params.append('bin_id', binId);
    if (userId) params.append('user_id', userId);
    
    const query = params.toString() ? `?${params.toString()}` : '';
    return this.request(`/tasks${query}`);
  }

  async getMyTasks() {
    return this.request('/tasks/my-tasks');
  }

  async getTasksByBin(binId) {
    return this.request(`/tasks/bin/${binId}`);
  }

  async createTask(formData) {
    if (this.token && this.isTokenExpired(this.token)) {
      this.removeToken();
      throw new Error('Session expired. Please log in again.');
    }
    const config = {
      method: 'POST',
      headers: {
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
      },
      body: formData,
    };

    const url = `${this.baseURL}/tasks`;
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      if (
        (response.status === 401 || response.status === 403) &&
        (data?.error === 'Token expired' || data?.error === 'Access token required' || data?.error === 'Invalid token')
      ) {
        this.removeToken();
        throw new Error('Session expired. Please log in again.');
      }
      throw new Error(data.error || 'Task creation failed');
    }

    return data;
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }

  async initDatabase() {
    return this.request('/database/init');
  }
}

export default new ApiService();
