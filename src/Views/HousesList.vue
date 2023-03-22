<template>
    <Header :currentLink="HousesList" />
    <HousesList />
    <!-- <HousesList :house="houses" /> -->
</template>

<script setup>
import Header from '@/components/Layout/Header.vue'
import HousesList from '@/components/HousesList.vue'
</script>