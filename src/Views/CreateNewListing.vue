<template>
    <CreateNewListingHeader />
    <ListingForm :house="currentHouse" />
</template>

<script setup>
import CreateNewListingHeader from '@/components/NewListingHeader.vue'
import ListingForm from '@/components/ListingForm.vue'

import { ref, onMounted } from 'vue'

const currentHouse = ref({})
onMounted(async () => {
    currentHouse.value = {
        price: '',
        bedrooms: '',
        bathrooms: '',
        size: '',
        streetName: '',
        houseNumber: '',
        numberAddition: '',
        zip: '',
        city: '',
        constructionYear: '',
        hasGarage: '',
        description: '',
        image: '',
    }
})
</script>