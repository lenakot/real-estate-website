import axios from "axios";
import config from "@/config.js";

export const HTTP = axios.create({
    baseURL: config.MOCK,
    headers: {
        "X-Api-Key": "m2iAlTKO3NCSI81c64GHasdzQEyXq5-U",
    }
});

export default {
    async getListHouses() {
        try {
            const response = await HTTP.get('/houses')
            return response.data
        } catch (e) {
            console.log(e)
        }
    },
    async editHouse(id, house) {
        console.log(id, house )
        // try {
        //     const response = await HTTP.get(`/houses`)
        //     console.log(response.data)
            
        //     return response.data
        // } catch (e) {
        //     console.log(e)
        // }
    }
}