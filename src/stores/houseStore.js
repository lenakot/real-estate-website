import { defineStore } from "pinia";
import api from "@/api.js";

export const useHousesStore = defineStore("housesStore", {
  state: () => ({
    listfOfHouses: [],
  }),
  actions: {
    async getHousesList() {
      this.listfOfHouses.value = await api.getListHouses();
      return this.listfOfHouses.value;
    },
    async deleteHouse(id) {
      await api.deleteHouse(id);
    },
    async createNewHouse(house, image) {
      const newHouse = await api.createHouse(house);
      await api.uploadImage(newHouse.id, image);
    },
  },
});
