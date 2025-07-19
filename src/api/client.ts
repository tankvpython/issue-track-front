import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8000/api/', // Adjust the base URL as needed
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor to add JWT token to requests
apiClient.interceptors.request.use((config) => {
    const token = sessionStorage.getItem('token'); // Assuming token is stored in localStorage
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    console.log('Request error:', error);
    return Promise.reject(error);
});

// Interceptor to handle responses
apiClient.interceptors.response.use((response) => {
    return response;
}, async (error) => {
    console.error('Response error:', error);
    const originalRequest = error.config;

    // Handle token expiration and refresh logic here if needed
    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        // Implement token refresh logic here
    }

    return Promise.reject(error);
});

export default apiClient;