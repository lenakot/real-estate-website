<template>
    <House v-for="house of houses" :key='house.id' :house="house" />
</template>

<script setup>
import House from '@/components/House.vue'
import { useHousesStore } from '@/stores/houseStore.js'
import { ref, onMounted } from 'vue';

const housesStore = useHousesStore()
const houses = ref([])

onMounted(async () => {
    houses.value = await housesStore.getHousesList()
})

</script>
