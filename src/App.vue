<template>
  <div class="container">
    <Header/>
    <router-view />
  </div>
</template>

<script setup>
import Header from '@/components/Layout/Header.vue'
</script>


<style lang='scss' scoped>
@import './assets/styles/global.scss'
</style>
