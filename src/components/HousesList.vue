<template>
    <div class="container">
        <House v-for="house of houses" :key='house.id' :id="house.id" :street="house.location.street" :price="house.price" :index="house.location.zip"
            :bedroom="house.rooms.bedrooms" :bathroom="house.rooms.bathrooms" :size="house.size" :image="house.image"/>
    </div>
</template>

<script setup>
import House from '@/components/House.vue'

const props = defineProps({
    houses: {
        requred: true,
    }
})

</script>

<style lang="scss">
.container {
    width: auto;
    height: auto;

}
</style>