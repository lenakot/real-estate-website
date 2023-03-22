<template>
    <HouseDetails :house="currentHouse" />
</template>

<script setup>
import HouseDetails from '@/components/HouseDetails.vue'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/api.js'

const route = useRoute()
const currentHouse = ref({})

onMounted(async () => {
    const housesList = await api.getListHouses();
    const houseId = route.params.id

    for (let house of housesList ) {
        if (houseId == house.id) {
            currentHouse.value = house
        }
}
})


</script>