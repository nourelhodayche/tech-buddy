import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api'
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getTutorials = () => API.get('/tutorials');
export const getTutorialById = (id) => API.get(`/tutorials/${id}`);
export const getQuizQuestions = () => API.get('/quiz');
export const sendMessage = (message, history = []) => API.post('/chat', { message, history });
export const toggleFavorite = (tutorialId) => API.post(`/user/favorites/${tutorialId}`);
export const saveQuizScore = (score, total) => API.post('/user/quiz-score', { score, total });