<template>
    <div class="container">
        <House v-for="house of houses" :id="house.id" :street="house.street" :price="house.price" :index="house.index"
            :bedroom="house.bedroom" :bathroom="house.bathroom" :size="house.size" />
    </div>
</template>

<script setup>
import House from './House.vue'

import { ref } from 'vue'

const houses = ref([
    {
        id: 1,
        street: 'azaza 1',
        price: 555.555,
        index: 123,
        bedroom: 2,
        bathroom: 1,
        size: 83,
    },
    {
        id: 2,
        street: 'azaza 2',
        price: 800.000,
        index: 456,
        bedroom: 1,
        bathroom: 5,
        size: 63,
    },
    {
        id: 3,
        street: 'azaza 3',
        price: 100.000,
        index: 789,
        bedroom: 8,
        bathroom: 4,
        size: 15,
    },
    {
        id: 4,
        street: 'azaza 4',
        price: 350.000,
        index: 147,
        bedroom: 2,
        bathroom: 1,
        size: 90,
    },
])

</script>

<style lang="scss">
.container {
    width: auto;
    height: auto;
}
</style>