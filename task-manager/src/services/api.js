import axios from 'axios';

const API_ID = '484657ed5d12441d8a03c5fd87cc4aaa';
const BASE_URL = `https://crudcrud.com/api/${API_ID}`;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const taskService = {
  async getAll() {
    const response = await api.get('/tasks');
    return response.data;
  },

  async getById(id) {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },

  async create(task) {
    const response = await api.post('/tasks', task);
    return response.data;
  },

  async update(id, task) {
    const { _id, ...taskWithoutId } = task;
    await api.put(`/tasks/${id}`, taskWithoutId);
    return { _id: id, ...taskWithoutId };
  },

  async delete(id) {
    await api.delete(`/tasks/${id}`);
    return true;
  },
};

export default api;
