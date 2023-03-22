<template>
    <EditListing />
    <ListingForm :house="currentHouse" />
</template>

<script setup>
import EditListing from '@/components/EditListing.vue'
import ListingForm from '@/components/ListingForm.vue'

import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/api.js'

const route = useRoute()
const currentHouse = ref({})

const regEx = /^(.+?)\s+(\d+)(\w*)$/

function parseAddress(address) {
    const matches = address.match(regEx)
    if (!matches) {
        return null
    }

    const street = matches[1]
    const number = parseInt(matches[2])
    const additional = matches[3]

    return { street, number, additional }
}

onMounted(async () => {
    const housesList = await api.getListHouses();
    const houseId = route.params.id
    for (let house of housesList) {
        if (houseId == house.id) {
            const adress = parseAddress(house.location.street)
            currentHouse.value = {
                price: house.price,
                bedrooms: house.rooms.bedrooms,
                bathrooms: house.rooms.bathrooms,
                size: house.size,
                streetName: adress.street,
                houseNumber: adress.number,
                numberAddition: adress.additional,
                zip: house.location.zip,
                city: house.location.city,
                constructionYear: house.constructionYear,
                hasGarage: house.hasGarage,
                description: house.description,
                image: house.image,
            }
            break
        }
    }
})
</script>