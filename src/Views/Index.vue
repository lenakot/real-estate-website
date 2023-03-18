<template>
    <HousesListHeader/>
    <SearchAndSort/>
    <HousesList :houses="houses"/>
</template>

<script setup>
import HousesListHeader from '@/components/HousesListHeader.vue'
import SearchAndSort from '@/components/SearchAndSort.vue'
import HousesList from '@/components/HousesList.vue'

import { ref, onMounted } from 'vue';
import api from '@/api.js';


const houses = ref([])

onMounted(async () => {
    houses.value = await api.getListHouses();
    console.log('azazaq - ', houses)
} )
</script>