<template>
    <div class="container">
        <HouseDetails :houseId="route.params.id" :key="route.params.id" />
    </div>
</template>

<script setup>
import HouseDetails from '@/components/HouseDetails.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
</script>
