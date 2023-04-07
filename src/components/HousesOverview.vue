<template>
  <div class="main-page-wrapper">
    <HousesNavigation />

    <!-- Number of houses (if searching) -->
    <div
      v-if="housesStore.search != '' && housesStore.filter.length !== 0"
      class="found"
    >
      {{ housesStore.filter.length }} results found
    </div>

    <!-- Not found message -->
    <div v-if="housesStore.filter.length == 0" class="search-undefined">
      <img
        src="/png/img_empty_houses@3x.png"
        alt="not found"
        class="search-undefined-image"
      />
      <div class="search-undefined-description">
        No results found.<br />
        Please try another keyword.
      </div>
    </div>

    <House v-for="house of housesStore.filter" :key="house.id" :house="house" />
  </div>
</template>

<script setup>
import HousesNavigation from "@/components/HousesNavigation.vue";
import House from "@/components/House.vue";
import { useHousesStore } from "@/stores/houseStore.js";

const housesStore = useHousesStore();
</script>

<style lang="scss" scoped>
.main-page-wrapper {
  margin: 40px 300px;

  @media screen and (max-width: 1200px) {
    margin: 40px 150px;
  }

  @media screen and (max-width: 767px) {
    margin: 30px;
  }
}

.found {
  margin: 20px 0;
  font-family: var(--montserrat);
  font-size: var(--header-2-desktop);
  color: var(--text-primary);
  font-weight: var(--bold);

  @media screen and (max-width: 767px) {
    font-size: var(--header-2-mobile);
  }
}

.search-undefined {
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 20px 0;
  height: 400px;
  width: auto;

  &-image {
    width: auto;
    height: inherit;
    padding: 50px;
    object-fit: contain;
  }

  &-description {
    font-family: var(--open-sans);
    font-size: var(--body-text-desktop);
    color: var(--text-secondary);
    font-weight: var(--regular);
    text-align: center;

    @media screen and (max-width: 767px) {
      font-size: var(--body-text-mobile);
      padding: 13px;
    }
  }
}
</style>
