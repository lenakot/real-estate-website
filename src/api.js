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
    async getHouse(id) {
        try {
            const response = await HTTP.get(`/houses/${id}`, {
                headers: {
                    Prefer: `code=200, example=Example ${id}`
                }
            })
            console.log(response.data)
            return response.data
        } catch (e) {
            console.log(e)
        }
    }
}