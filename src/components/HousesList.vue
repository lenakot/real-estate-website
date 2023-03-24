<template>
    <House v-for="house of housesStore.listOfHouses" :key='house.id' :house="house" />
</template>

<script setup>
import House from '@/components/House.vue'
import { useHousesStore } from '@/stores/houseStore.js'
const housesStore = useHousesStore()

</script>
