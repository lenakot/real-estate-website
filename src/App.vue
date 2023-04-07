<template>
  <div v-if="loaded" class="container">
    <Header />
    <router-view />
  </div>
  <div v-else-if="error">
    Something went wrong. Reload the page and try again later.
  </div>
  <Preloader v-else />
</template>

<script setup>
import Header from "@/components/Layout/Header.vue";
import Preloader from "@/components/UI/Preloader.vue";
import { useHousesStore } from "@/stores/houseStore.js";
import { onBeforeMount, ref } from "vue";
const housesStore = useHousesStore();
const loaded = ref(false);
const error = ref(false);

// Fetch the list of houses once to avoid extra requests during navigation.
// Also, handle an error if cannot get houses for some reason
onBeforeMount(async () => {
  try {
    await housesStore.getHousesList();
    loaded.value = true;
  } catch (e) {
    error.value = true;
  }
});
</script>

<style lang="scss" scoped>
@import "./assets/styles/global.scss";
</style>
