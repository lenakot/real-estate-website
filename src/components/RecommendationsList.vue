<template>
  <div class="recommend-title">Recommended for you</div>
  <House v-for="house of recommendedHouses" :key="house.id" :house="house" />
  <div v-if="recommendedHouses.length === 0" class="recommend-text">
    There are no available houses in the same city.
  </div>
</template>

<script setup>
import House from "@/components/House.vue";
import { useHousesStore } from "@/stores/houseStore.js";
import { onMounted, ref } from "vue";

const props = defineProps({
  city: {
    type: String,
    required: true,
  },
  currentHouseId: {
    type: String,
    required: true,
  },
});
const housesStore = useHousesStore();

// Recommends 3 houses that are located in the same city
const recommendedHouses = ref([]);
onMounted(() => {
  recommendedHouses.value = housesStore.getRecommendations(
    props.city,
    props.currentHouseId
  );
});
</script>

<style lang="scss" scoped>
.recommend-title {
  font-family: var(--montserrat);
  font-size: var(--header-2-desktop);
  font-weight: var(--bold);
  margin-bottom: 5px;
  white-space: nowrap;

  @media screen and (max-width: 767px) {
    font-size: var(--header-2-mobile);
  }
}

.recommend-text {
  font-family: var(--open-sans);
  font-size: var(--body-text-desktop);

  @media screen and (max-width: 767px) {
    font-size: var(--body-text-mobile);
  }
}
</style>
