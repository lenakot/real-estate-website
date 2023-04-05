import { defineStore } from "pinia";
import api from "@/api.js";

export const useHousesStore = defineStore("housesStore", {
  state: () => ({
    listOfHouses: [],
    search: "",
    sortParam: "price", //default param
  }),
  getters: {
    getHouseById: (state) => {
      return (id) =>
        state.listOfHouses.find((house) => {
          if (house.id == id) {
            return house;
          }
        });
    },
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
      if (this.sortParam == "") {
        return filteredHouses;
      } else {
        return this.sort(filteredHouses);
      }
    },
    sort: (state) => {
      return (listToSort = state.listOfHouses) => {
        if (state.sortParam == "price") {
          return listToSort.sort(
            (prevHouse, currHouse) => prevHouse.price - currHouse.price
          );
        } else if (state.sortParam == "size") {
          return listToSort.sort(
            (prevHouse, currHouse) => prevHouse.size - currHouse.size
          );
        }
      };
    },
    //Give max 3 reccomendation based on same city
    getRecommendations: (state) => {
      return (city, id) => {
        const reccomendationList = state.listOfHouses.filter(
          (house) => house.location.city == city && house.id != id
        );
        return reccomendationList.slice(0, 3);
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
      for (let house of this.listOfHouses) {
        if (house.id === id) {
          this.listOfHouses.splice(this.listOfHouses.indexOf(house), 1);
        }
      }
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
