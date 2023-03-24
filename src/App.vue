<template>
  <Header />
  <div class="container" v-if="loaded">
    <router-view />
    <!-- <ListingForm/> -->
    <!-- <SearchAndSort/> -->
  </div>
</template>

<script setup>
import Header from '@/components/Layout/Header.vue'
import SearchAndSort from '@/components/SearchAndSort.vue'
import { useHousesStore } from '@/stores/houseStore.js'
import { onBeforeMount, ref } from 'vue';
const housesStore = useHousesStore()
const loaded = ref(false)

onBeforeMount(async () => {
  await housesStore.getHousesList()
  loaded.value = true
})
</script>

<style lang='scss' scoped>
@import './assets/styles/global.scss'
</style>
