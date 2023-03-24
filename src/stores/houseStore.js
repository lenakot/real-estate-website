import { defineStore } from "pinia";
import api from "@/api.js";

export const useHousesStore = defineStore("housesStore", {
  state: () => ({
    listOfHouses: [],
    search: "kek",
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
      let filteredList = state.listOfHouses.filter((house) => {
        if (house.location.city.includes(state.search)) {
          console.log("yes");
        } else {
          console.log("no");
        }
      });
      console.log(filteredList);
    },
    // Object.value(house).includes(this.search)
    // return (this.search) => state.listOfHouses.find((house) => {
    //   for (let keys of house) {

    //   } (house.id == id) {
    //     return house;
    //   }
    // });
  },

  actions: {
    async getHousesList() {
      this.listOfHouses = await api.getListHouses();
      return this.listOfHouses;
    },
    async deleteHouse(id) {
      //   for (let house of this.listOfHouses.value) {
      //     if (house.id === id) {
      //     this.listOfHouses.value.splice(this.listOfHouses.value.indexOf(house), 1)
      //     }
      //   }
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
