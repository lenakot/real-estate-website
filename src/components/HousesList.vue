<template>
        <House v-for="house of houses" :key='house.id' :id="house.id" :street="house.location.street" :price="house.price" :index="house.location.zip"
            :bedroom="house.rooms.bedrooms" :bathroom="house.rooms.bathrooms" :size="house.size" :image="house.image"/>
</template>

<script setup>
import House from '@/components/House.vue'

import { ref, onMounted } from 'vue';
import api from '@/api.js';


const houses = ref([])

onMounted(async () => {
    houses.value = await api.getListHouses();
} )

</script>
