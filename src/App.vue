<template>
  <Header/>
  <div class="container">
     <router-view />
    <!-- <ListingForm/> -->
    <!-- <SearchAndSort/> -->
  </div>
</template>

<script setup>
import Header from '@/components/Layout/Header.vue'
import SearchAndSort from '@/components/SearchAndSort.vue'


</script>


<style lang='scss' scoped>
@import './assets/styles/global.scss'
</style>
