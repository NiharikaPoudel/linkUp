// Import axios library
import axios from 'axios';

// Create an axios instance with a base URL
const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api', // This is the root URL for all API requests
});

// ==========================
// REQUEST INTERCEPTOR
// ==========================

// This interceptor runs **before** every request is sent
axiosInstance.interceptors.request.use(
    (config) => {
        // Get the token from localStorage
        const token = localStorage.getItem("token");

        // If token exists, attach it to request headers
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // Always return the config so the request can continue
        return config;
    },
    (error) => {
        // If there’s an error before the request is sent, reject the promise
        return Promise.reject(error);
    }
);

// ==========================
// RESPONSE INTERCEPTOR
// ==========================

axiosInstance.interceptors.response.use(
    // If response is successful, just return it
    (response) => response,

    // If there’s an error response (like 401 unauthorized), handle it
    (error) => {
        // Check if the error response exists and has status 401
        if (error.response?.status === 401) {
            alert("Unauthorized. Please login again");

            // Clear all saved data from localStorage (logout)
            localStorage.clear();

            // Redirect the user to home/login page after 1.5 seconds
            setTimeout(() => {
                window.location.href = "/"; // Redirect to homepage or login
            }, 1500);
        }

        // Reject the promise to pass the error to the component that made the request
        return Promise.reject(error);
    }
);

// ==========================
// EXPORT AXIOS INSTANCE
// ==========================

// This customized instance will be used everywhere in your app for API calls
export default axiosInstance;
