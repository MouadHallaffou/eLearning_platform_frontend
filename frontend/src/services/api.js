import axios from "axios";
import { toast } from 'react-hot-toast';

const api = axios.create({
    baseURL: "http://localhost:8000/api",
});

// Intercepteur pour FormData
api.interceptors.request.use((config) => {
    if (config.data instanceof FormData) {
        config.headers['Content-Type'] = 'multipart/form-data';
    } else {
        config.headers['Content-Type'] = 'application/json';
    }
    return config;
});

// Intercepteur pour les réponses
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.data?.message) {
            toast.error(error.response.data.message);
        } else {
            toast.error('An error occurred');
        }
        return Promise.reject(error);
    }
);

// Export des fonctions individuelles
export const getCourse = (id) => api.get(`/course/${id}`);
export const getCourses = () => api.get("/course");
export const createCourse = (data) => api.post("/course", data);
export const updateCourse = (id, data) => api.put(`/course/${id}`, data);
export const deleteCourse = (id) => api.delete(`/course/${id}`);

export const course = {
    getCourses,
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse,
};

export const category = {
    getCategories: () => api.get("/category"),
    getCategory: (id) => api.get(`/category/${id}`),
    createCategory: (data) => api.post("/category", data),
    updateCategory: (id, data) => api.put(`/category/${id}`, data),
    deleteCategory: (id) => api.delete(`/category/${id}`),
};

export const tag = {
    getTags: () => api.get("/tag"),
};

export default api;