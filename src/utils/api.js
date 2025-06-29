const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export const apiConfig = {
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};

export const createCourse = async (courseData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/courses/`, {
      method: 'POST',
      headers: apiConfig.headers,
      body: JSON.stringify(courseData),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating course:', error);
    throw error;
  }
};

export const getCourses = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/courses/`, {
      method: 'GET',
      headers: apiConfig.headers,
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
};

export const getCourse = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/courses/${id}/`, {
      method: 'GET',
      headers: apiConfig.headers,
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching course:', error);
    throw error;
  }
};