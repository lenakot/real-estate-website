import { defineStore } from "pinia";
import api from "@/api.js";

export const useHousesStore = defineStore("housesStore", {
  state: () => ({
    listOfHouses: [],
    search: "",
    sortParam: "price", // Default param
  }),
  getters: {
    getHouseById: (state) => {
      return (id) => state.listOfHouses.find((house) => house.id == id);
    },

    // Return filtered houses list based on house address and city name.
    // The result list is sorted according to sorting params
    filter() {
      const filteredHouses = this.listOfHouses.filter(
        (house) =>
          house.location.city
            .toLowerCase()
            .includes(this.search.toLowerCase()) ||
          house.location.street
            .toLowerCase()
            .includes(this.search.toLowerCase())
      );
      return this.sort(filteredHouses);
    },

    // Return sorted houses list according to sorting params
    sort: (state) => {
      return (houses = state.listOfHouses) => {
        if (state.sortParam == "price") {
          return houses.sort(
            (prevHouse, currHouse) => prevHouse.price - currHouse.price
          );
        } else if (state.sortParam == "size") {
          return houses.sort(
            (prevHouse, currHouse) => prevHouse.size - currHouse.size
          );
        } else {
          return houses;
        }
      };
    },

    // Return up to 3 recommendations based on the same city
    getRecommendations: (state) => {
      return (city, id) => {
        const recommendationList = state.listOfHouses.filter(
          (house) => house.location.city == city && house.id != id
        );
        return recommendationList.slice(0, 3);
      };
    },
  },

  actions: {
    async getHousesList() {
      this.listOfHouses = await api.getListHouses();
      return this.listOfHouses;
    },
    async deleteHouse(id) {
      await api.deleteHouse(id);
      this.listOfHouses.forEach((house, index) => {
        if (house.id === id) {
          this.listOfHouses.splice(index, 1);
        }
      });
    },
    async createNewHouse(house, image) {
      const newHouse = await api.createHouse(house);
      await api.uploadImage(newHouse.id, image);
      await this.getHousesList();
      return newHouse.id;
    },
    async editHouse(houseId, house, image) {
      await api.editHouse(houseId, house);
      if (image !== null) {
        await api.uploadImage(houseId, image);
      }
      await this.getHousesList();
    },
  },
});
