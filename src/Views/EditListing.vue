<template>
    <div class="container">
        <EditListing :houseId="route.params.id" />
        <ListingForm :houseId="route.params.id" />
    </div>
</template>

<script setup>
import EditListing from '@/components/EditListing.vue'
import ListingForm from '@/components/ListingForm.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<style lang="scss" scoped>
.container {
    background-image: url(/png/img_background@3x.png);
    background-repeat: no-repeat;
    background-size: cover;
}
</style>