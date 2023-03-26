import { defineStore } from "pinia";
import api from "@/api.js";

export const useHousesStore = defineStore("housesStore", {
  state: () => ({
    listOfHouses: [],
    search: "",
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
    filter: (state) => {
      return state.listOfHouses.filter((house) => {
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
    sortByPrice: (state) => {
      return state.listOfHouses.sort(
        (prevHouse, currHouse) => prevHouse.price - currHouse.price
      );
    },
    sortBySize: (state) => {
      return state.listOfHouses.sort(
        (prevHouse, currHouse) => prevHouse.size - currHouse.size
      );
    },
    //Give max 3 reccomendation based on same city
    getReccomendations: (state) => {
      return (city, id) => {
        // house.id != id -  exclude the same house from the reccomendation list});
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

      //  Necessary to remove the house from the main page immediately because a request for a list of houses is only sent once.
      for (let house of this.listOfHouses) {
        if (house.id === id) {
          this.listOfHouses.splice(this.listOfHouses.indexOf(house), 1);
        }
      }
    },
    async createNewHouse(house, image) {
      const newHouse = await api.createHouse(house);
      await api.uploadImage(newHouse.id, image);
      // const houseToAdd = this.getHouseById(newHouse.id);
      // // this.listOfHouses[this.listOfHouses.length] = newHouseFullInfo;
      // console.log("after-", houseToAdd);
      // // this.listOfHouses[this.listOfHouses.length].image = image;
      // console.log("after-", houseToAdd);
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
