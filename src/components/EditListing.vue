<template>
  <div class="listing-back-wrapper">
    <router-link :to="`/house/${houseId}`" class="listing-back">
      <img
        src="/png/ic_back_grey@3x.png"
        alt="back"
        class="listing-back__icon"
      />
      <div v-if="!isMobile" class="listing-back__title">Back to overview</div>
    </router-link>
    <div class="listing-title">Edit Listing</div>
  </div>
</template>

<script setup>
import { useIsMobileVersion } from "@/mobileVersion.js";
const isMobile = useIsMobileVersion();
const props = defineProps({
  houseId: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.listing-back-wrapper {
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin: 40px 300px;

  @media screen and (max-width: 1200px) {
    margin: 40px 150px;
  }

  @media screen and (max-width: 767px) {
    margin: 40px 30px;
    display: grid;
    grid-template-columns: 5% 80%;
  }
}

.listing-back {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  cursor: pointer;

  &__icon {
    width: 20px;
    height: 20px;
  }

  &__title {
    font-family: var(--montserrat);
    font-size: var(--back-button-label-desktop);
    font-weight: var(--semibold);
    color: var(--text-primary);
  }
}

.listing-title {
  font-family: var(--montserrat);
  font-size: var(--header-1-desktop);
  font-weight: var(--bold);
  color: var(--text-primary);

  @media screen and (max-width: 767px) {
    font-size: var(--header-1-mobile);
    display: grid;
    justify-content: center;
  }
}
</style>
