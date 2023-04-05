<template>
  <div class="container">
    <HouseDetails :key="route.params.id" :house-id="route.params.id" />
  </div>
</template>

<script setup>
import HouseDetails from "@/components/HouseDetails.vue";
import { useRoute } from "vue-router";
const route = useRoute();
</script>
