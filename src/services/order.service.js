import { api } from "src/boot/axios"

export default {
  async getAll() {
    const response = await api.get('/orders');
    return response.data;
  },

  async register() {
    const response = await api.post('/orders');
    return response.data;
  }
}