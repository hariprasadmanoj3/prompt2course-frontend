// Create a robust API service with multiple fallbacks
const API_ENDPOINTS = [
  'https://prompt2course-backend-1.onrender.com',
  'https://prompt2course-backend.onrender.com',
];

class APIService {
  constructor() {
    this.baseURL = null;
    this.isConnected = false;
    this.testConnection();
  }

  async testConnection() {
    for (const endpoint of API_ENDPOINTS) {
      try {
        const response = await fetch(`${endpoint}/health/`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });
        
        if (response.ok) {
          this.baseURL = endpoint;
          this.isConnected = true;
          console.log(`✅ Connected to API: ${endpoint}`);
          return;
        }
      } catch (error) {
        console.log(`❌ Failed to connect to: ${endpoint}`);
        continue;
      }
    }
    console.error('❌ Unable to connect to any API endpoint');
  }

  async request(endpoint, options = {}) {
    if (!this.baseURL) {
      await this.testConnection();
    }

    if (!this.baseURL) {
      throw new Error('No API connection available');
    }

    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`API Request failed: ${url}`, error);
      throw error;
    }
  }

  async getCourses() {
    return this.request('/api/courses/');
  }

  async createCourse(courseData) {
    return this.request('/api/courses/', {
      method: 'POST',
      body: JSON.stringify(courseData),
    });
  }

  async getCourse(id) {
    return this.request(`/api/courses/${id}/`);
  }
}

export const apiService = new APIService();
export default apiService;