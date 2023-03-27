import axios from "axios";
import config from "@/config.js";

export const HTTP = axios.create({
  baseURL: config.MOCK,
  headers: {
    "X-Api-Key": "m2iAlTKO3NCSI81c64GHasdzQEyXq5-U",
  },
});

export default {
  async getListHouses() {
    const response = await HTTP.get("/houses");
    return response.data;
  },
  async createHouse(house) {
    const response = await HTTP.post(`/houses`, house);
    return response.data;
  },
  async deleteHouse(id) {
    await HTTP.delete(`/houses/${id}`);
  },
  async uploadImage(id, image) {
    const formData = new FormData();
    formData.append("image", image);
    await HTTP.post(`/houses/${id}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  async editHouse(id, house) {
    const response = await HTTP.post(`/houses/${id}`, house);
    return response.data;
  },
};
