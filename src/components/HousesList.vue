<template>
    <div class="search-and-sort-wrapper">
        <form class="search-wrapper" action="#">
            <img class='search-wrapper-image' src="/png/ic_search@3x.png" alt="search">
            <input class='search-wrapper-input' @click="clearInput(this)" type="text" placeholder="Search for a house"
                name="search" v-model="housesStore.search" ref="search">
        </form>
        <div class="sort-wrapper">
            <div @click='sortByPrice' class="sort-wrapper-price sort-wrapper-title">Price</div>
            <div @click='sortBySize' class="sort-wrapper-size sort-wrapper-title">Size</div>
        </div>
    </div>
    <div v-if="sortedBy == ''">
        <House v-for="house of housesStore.filter" :key='house.id' :house="house" />
    </div>
    <div v-else>
        <House v-for="house of sortedBy" :key='house.id' :house="house" />
    </div>
    <div v-if='housesStore.filter.length === 0' class='search-undefined'>
        <img src="/png/img_empty_houses@3x.png" alt="not found" class='search-undefined-image'>
        <div class='search-undefined-description'>No results found.</div>
        <div class='search-undefined-description'>Please try another keyword.</div>
    </div>
</template>

<script setup>
import House from '@/components/House.vue'
import { useHousesStore } from '@/stores/houseStore.js'
import { ref } from 'vue';
const housesStore = useHousesStore()
const search = ref('')

const sortedBy = ref('')
function clearInput() {
    search.value.value = ''
    sortedBy.value = ''
}

function sortByPrice() {
    sortedBy.value = housesStore.sortByPrice
}
function sortBySize() {
    sortedBy.value = housesStore.sortBySize
}

</script>

<style lang="scss" scoped>
.search-and-sort-wrapper {
    display: flex;
    justify-content: space-between;
    margin: 20px 0;
}

.search-wrapper {
    width: 400px;
    height: 40px;
    padding: 8px 20px;
    border-radius: 10px;
    background: var(--tertiary);
    display: flex;
    gap: 10px;

    &-image {
        width: 25px;
        height: 25px;
        margin-right: 5px;
    }

    &-input {
        background: var(--tertiary);
        ;
        width: inherit;
        border: none;
        font-family: var(--open-sans);
        font-size: 14px;
        font-weight: 400;
        color: var(--text-primary);
        outline: none;
    }
}

.sort-wrapper {
    width: 300px;
    height: 40px;
    display: grid;
    grid-template-columns: 1fr 1fr;

    &-price {
        background: var(--primary);
        border-top-left-radius: 10px;
        border-end-start-radius: 10px;
    }

    &-size {
        background: var(--quaternary);
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
    }

    &-title {
        color: var(--background2);
        font-family: var(--monserrat);
        font-weight: 700;
        font-size: 18px;
        text-align: center;
        padding: 8px
    }
}

.search-undefined {
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin: 20px 0;
    height: 400px;
    width: auto;

    &-image {
        width: auto;
        height: inherit;
        padding: 50px;
        object-fit: contain;
    }

    &-description {
        font-family: var(--montserrat);
        font-size: 18px;
        color: var(--text-secondary);
        text-align: center;
    }
}
</style>