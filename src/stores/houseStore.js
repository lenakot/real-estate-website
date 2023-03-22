import { defineStore } from 'pinia'

export const useHousesStore = defineStore('housesStore', {
    state: () => ({
        listfOfHouses: [],
        isVisibleDeleteBlock: false,
    }),
    actions: {
        // addToCart(product, count) {
        //     const cartIndex = this.cart.findIndex(el => el.id === product.id)
        //     if (cartIndex === -1) {
        //         this.cart.push({ ...product, count })
        //     }
        //     console.log(this.cart);
        // }
        toogleDeleteBlock() {
             this.isVisibleDeleteBlock = !this.isVisibleDeleteBlock
        },
    }
})