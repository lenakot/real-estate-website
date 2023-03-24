import { defineStore } from "pinia";
import api from "@/api.js";

export const useHousesStore = defineStore("housesStore", {
  state: () => ({
    listOfHouses: [],
    search: "",
  }),
  getters: {
    getHouseById: (state) => {
      // const theHouse = [];
      // theHouse.value = state.listOfHouses.filter((house) =>
      //   theHouse.push(house)
      // );
      // console.log("theHouse-", theHouse);
      return (id) =>
        state.listOfHouses.find((house) => {
          if (house.id == id) {
            return house;
          }
        });
    },
    filter: (state) => {
      return state.listOfHouses.filter((house) => {
        console.log("state.search ", state.search);
        if (
          house.location.city
            .toLowerCase()
            .includes(state.search.toLowerCase()) ||
          house.location.street
            .toLowerCase()
            .includes(state.search.toLowerCase())
        ) {
          return house;
        }
      });
    },
  },

  actions: {
    async getHousesList() {
      this.listOfHouses = await api.getListHouses();
      return this.listOfHouses;
    },
    async deleteHouse(id) {
      //  Necessary to remove the house from the main page immediately because a request for a list of houses is only sent once.
      for (let house of this.listOfHouses) {
        if (house.id === id) {
          this.listOfHouses.splice(this.listOfHouses.indexOf(house), 1);
        }
      }
      await api.deleteHouse(id);
    },
    async createNewHouse(house, image) {
      const newHouse = await api.createHouse(house);
      await api.uploadImage(newHouse.id, image);
    },
    async editHouse(houseId, house, image) {
      await api.editHouse(houseId, house);

      if (image !== null) {
        await api.uploadImage(houseId, image);
      }
    },
    changeSearchField() {
      // this.search =
    },
  },
});
