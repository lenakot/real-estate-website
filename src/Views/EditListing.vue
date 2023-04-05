<template>
  <div class="listing-container">
    <EditListing :house-id="route.params.id" />
    <ListingForm :house-id="route.params.id" />
  </div>
</template>

<script setup>
import EditListing from "@/components/EditListing.vue";
import ListingForm from "@/components/ListingForm.vue";
import { useRoute } from "vue-router";
const route = useRoute();
</script>
