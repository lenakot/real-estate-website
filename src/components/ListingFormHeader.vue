<template>
  <div class="listing-back-wrapper">
    <!-- Depending on whether we are editing a home or creating a new one, the link changes its path. -->
    <BackButton :house-id="houseId" />

    <!-- The same applies to displaying the title -->
    <div v-if="houseId" class="listing-title">Edit Listing</div>
    <div v-else class="listing-title">Create new listing</div>
  </div>
</template>

<script setup>
import BackButton from "@/components/UI/BackButton.vue";
const props = defineProps({
  houseId: {
    type: String,
    default: "",
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

.listing-title {
  font-family: var(--montserrat);
  font-size: var(--header-1-desktop);
  font-weight: var(--bold);
  color: var(--text-primary);
  text-decoration: none;

  @media screen and (max-width: 767px) {
    font-size: var(--header-1-mobile);
    display: grid;
    justify-content: center;
  }
}
</style>
