import { api } from "src/boot/axios";

export default {
  async getAll() {
    const response = await api.get("/person");
    return response.data;
  },
  async register(body) {
    const response = await api.post("/person", body);
    return response.data;
  },
};
