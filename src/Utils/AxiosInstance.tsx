/**
 * Axios instance with default configuration
 * with base URL and credentials
 * and intercepts requests and responses
 */

import axios from "axios";
import { toast } from "react-toastify";

// navigation object

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL_PRODUCTION,
    withCredentials: true,
    // ...other config
});

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        // Handle errors globally
        if (error.response) {

            const status = error.response.status;

            if (status === 401) {
                toast.error("Unauthorized! Please log in again.", {
                    onClose: () => { window.location.href = '/login'; },
                    autoClose: 1500, // 1.5 seconds delay
                });

            } else if (status === 403) {
                toast.error("Forbidden! You don't have permission to access this resource.", {
                    autoClose: 2000,
                });

            } else if (status === 400) {
                toast.error( `${error.response?.data?.non_field_errors?.[0]}` , {
                    autoClose: 2000,
                });

            } else if (status === 404) {
                toast.error("Resource not found!", {
                    autoClose: 2000,
                });

            } else if (status === 500) {
                toast.error("Server error! Please try again later.", {
                    autoClose: 2000,
                });
            } else {
                toast.error(`Error: ${error.response.data.message || 'An error occurred'}`, {
                    autoClose: 2000,
                });
            }

        return Promise.reject(error);
        }
    }
);

export default axiosInstance;