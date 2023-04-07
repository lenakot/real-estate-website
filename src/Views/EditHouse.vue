<template>
  <div class="listing-container">
    <ListingFormHeader :house-id="route.params.id" />
    <ListingForm :house-id="route.params.id" />
  </div>
</template>

<script setup>
import ListingFormHeader from "@/components/ListingFormHeader.vue";
import ListingForm from "@/components/ListingForm.vue";
import { useRoute } from "vue-router";
const route = useRoute();
</script>
