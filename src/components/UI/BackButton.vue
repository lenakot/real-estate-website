<template>
  <router-link :to="houseId ? `/house/${houseId}` : '/'" class="back">
    <div
      alt="back"
      class="back__image"
      :class="{ white: isMobile && white }"
    ></div>
    <div v-if="!isMobile" class="back__title">
      Back to {{ houseId ? "detail page" : "overview" }}
    </div>
  </router-link>
</template>

<script setup>
import { useIsMobileVersion } from "@/mobileVersion.js";
const isMobile = useIsMobileVersion();
const props = defineProps({
  houseId: {
    type: String,
    default: "",
  },
  white: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
.back {
  display: flex;
  gap: 10px;
  text-decoration: none;
  align-items: center;

  &__image {
    width: 20px;
    height: 20px;
    background: url("/png/ic_back_grey@3x.png");
    background-size: 20px 20px;
    background-repeat: no-repeat;
    object-fit: cover;
  }
  &__image.white {
    background: url("/png/ic_back_white@3x.png");
    background-size: 20px 20px;
    background-repeat: no-repeat;
  }
  &__title {
    font-family: var(--montserrat);
    font-size: var(--back-button-label-desktop);
    font-weight: var(--semibold);
    color: var(--text-primary);
  }
}
</style>
