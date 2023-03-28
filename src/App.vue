<template>
  <div class="container" v-if="loaded">
    <Header />
    <router-view />
  </div>
  <div v-else-if="error">
    Something went wrong. Reload the page and try again later.
  </div>
  <Preloader v-else />
</template>

<script setup>
import Header from '@/components/layout/Header.vue'
import Preloader from '@/components//Preloader.vue'
import { useHousesStore } from '@/stores/houseStore.js'
import { onBeforeMount, ref } from 'vue'
const housesStore = useHousesStore()
const loaded = ref(false)
const error = ref(false)

onBeforeMount(async () => {
  try {
    await housesStore.getHousesList()
    loaded.value = true
  } catch (e) {
    error.value = true
  }
})

</script>

<style lang='scss' scoped>
@import './assets/styles/global.scss'
</style>
