<template>
    <EditListing :houseId="route.params.id" />
    <ListingForm :houseId="route.params.id" />
</template>

<script setup>
import EditListing from '@/components/EditListing.vue'
import ListingForm from '@/components/ListingForm.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
</script>