<template>
    <div class="wrapper">
        <div class="wrapper-title">Recommended for you</div>
        <HousesList />
    </div>
</template>

<script setup>
import HousesList from '@/components/HousesList.vue'
</script>

<style lang='scss'>
.wrapper {
    display: flex;
    flex-direction: column;

    gap: 10px;

    &-title {
        font-family: var(--montserrat);
        font-size: 22px;
        font-weight: bold;
        padding-left: 5px;
    }
}
</style>