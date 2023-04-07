<template>
  <div class="listing-container">
    <ListinFormHeader :house-id="route.params.id" />
    <ListingForm :house-id="route.params.id" />
  </div>
</template>

<script setup>
import ListinFormHeader from "@/components/ListinFormHeader.vue";
import ListingForm from "@/components/ListingForm.vue";
import { useRoute } from "vue-router";
const route = useRoute();
</script>
