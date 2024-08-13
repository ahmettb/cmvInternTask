import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api",
});

axiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('jwtToken');
        if (
            config.url === '/news/get-all-news' ||
            config.url === '/notice/get-all' ||
            config.url === '/auth/login'
        ) {
            return config;
        } else {
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
            return config;
        }
    },
    error => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response && error.response.status === 403) {
            const navigate = useNavigate();
            navigate('/unauthorized');
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
