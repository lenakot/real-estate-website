<template>
  <!-- Depending on whether we are editing a home or creating a new one, the button will either
       save the changes or send a request to create a new home. -->
  <input v-if="!houseId" class="listing-submit" type="submit" value="POST" />
  <input v-else class="listing-submit" type="submit" value="SAVE" />
</template>

<script setup>
const props = defineProps({
  houseId: {
    type: String,
    default: "",
  },
});
</script>

<style lang="scss" scoped>
.listing-submit {
  background: var(--primary);
  border: none;
  border-radius: 10px;
  padding: 15px;
  margin-left: 40%;
  margin-top: 25px;
  width: 60%;
  font-family: var(--montserrat);
  font-size: var(--buttons-n-tabs-desktop);
  font-weight: var(--semibold);
  color: var(--background2);
  cursor: pointer;
  opacity: 1;

  @media screen and (max-width: 767px) {
    margin: 0;
    width: 100%;
    font-size: var(--buttons-n-tabs-desktop);
  }
}

.listing-submit:disabled {
  opacity: 0.7;
}
</style>
