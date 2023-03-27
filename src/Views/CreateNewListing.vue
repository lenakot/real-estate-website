<template>
    <div class="container">
        <CreateNewListingHeader />
        <ListingForm />
    </div>
</template>

<script setup>
import CreateNewListingHeader from '@/components/NewListingHeader.vue'
import ListingForm from '@/components/ListingForm.vue'
</script>

<style lang="scss" scoped>
.container {
    background-image: url(/png/img_background@3x.png);
    background-repeat: no-repeat;
    background-size: cover;
}
</style>