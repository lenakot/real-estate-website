<template>
    <div class="main-page-wrapper">
        <div class="header-wrapper">
            <div class="header">
                <div class="header-title">Houses</div>
                <router-link v-if="isMobile" to="/create-new-listing" class="header-create-list">
                    <img class="header-create-list-image" src="/png/ic_plus_grey@3x.png" alt="plus">
                </router-link>
                <router-link v-else to="/create-new-listing" class="header-create-list">
                    <img class="header-create-list-image" src="/png/ic_plus_white@3x.png" alt="plus"><span
                        class="header-create-list-text">CREATE NEW</span>
                </router-link>
            </div>
            <div class="search-and-sort">
                <div class="search-wrapper">
                    <img class='search-wrapper-image' src="/png/ic_search@3x.png" alt="search">
                    <input class='search-wrapper-input' @click="clearInput()" type="text" placeholder="Search for a house"
                        name="search" v-model="housesStore.search" ref="search">
                </div>
                <div class="sort-wrapper">
                    <div @click='sortByPrice' class="sort-wrapper-price sort-wrapper-title"
                        :class="{ active: housesStore.sortParam === 'price' }">Price</div>
                    <div @click='sortBySize' class="sort-wrapper-size sort-wrapper-title"
                        :class="{ active: housesStore.sortParam === 'size' }">Size</div>
                </div>
            </div>
            <div v-if="housesStore.search != ''" class="found">Found: {{ housesStore.filter.length }}</div>
            <div v-if='housesStore.filter.length == 0' class='search-undefined'>
                <img src="/png/img_empty_houses@3x.png" alt="not found" class='search-undefined-image'>
                <div class='search-undefined-description'>No results found.</div>
                <div class='search-undefined-description'>Please try another keyword.</div>
            </div>
        </div>
        <House v-for="house of housesStore.filter" :key='house.id' :house="house" />
    </div>
</template>

<script setup>
import House from '@/components/House.vue'
import { useHousesStore } from '@/stores/houseStore.js'
import { useIsMobileVersion } from '@/mobileVersion.js'
const isMobile = useIsMobileVersion()

const housesStore = useHousesStore()

function clearInput() {
    housesStore.search = ''
}

function sortByPrice() {
    housesStore.sortParam = 'price'
}
function sortBySize() {
    housesStore.sortParam = 'size'
}
</script>

<style lang="scss" scoped>
.main-page-wrapper {
    margin: 40px 300px;

    @media screen and (max-width: 1200px) {
        margin: 40px 150px;
    }

    @media screen and (max-width: 767px) {
        margin: 30px;
    }
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &-title {
        font-family: var(--montserrat);
        font-size: var(--header-1-desktop);
        font-weight: var(--bold);
        color: var(--text-primary);

        @media screen and (max-width: 767px) {
            flex-basis: 100%;
            text-align: center;
            font-size: var(--header-1-mobile);
        }
    }

    &-create-list {
        background: var(--primary);
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        padding: 10px 20px;
        height: 40px;
        text-decoration: none;
        cursor: pointer;

        @media screen and (max-width: 767px) {
            padding: 0;
            background: none;
        }


        &-text {
            color: var(--background2);
            font-family: var(--montserrat);
            font-weight: var(--bold);
            font-size: var(--buttons-n-tabs-desktop);
        }

        &-image {
            object-fit: cover;
            width: 20px;
            height: 20px;
        }
    }
}

.search-and-sort {
    display: flex;
    justify-content: space-between;
    margin: 20px 0;
    gap: 20px;

    @media screen and (max-width: 767px) {
        display: flex;
        flex-direction: column;
    }
}

.search-wrapper {
    width: 400px;
    height: 40px;
    padding: 8px 20px;
    border-radius: 10px;
    background: var(--tertiary);
    display: flex;
    gap: 10px;

    @media screen and (max-width: 1200px) {
        width: 250px;
    }

    @media screen and (max-width: 767px) {
        width: auto;
    }


    &-image {
        width: 25px;
        height: 25px;
        margin-right: 5px;
    }

    &-input {
        background: var(--tertiary);
        width: inherit;
        border: none;
        font-family: var(--open-sans);
        font-size: var(--input-title-desktop);
        font-weight: var(--regular);
        color: var(--text-primary);
        outline: none;

        @media screen and (max-width: 1200px) {
            width: 250px;
        }

        @media screen and (max-width: 767px) {
            font-size: var(--input-title-mobile);
        }
    }
}

.sort-wrapper {
    width: 300px;
    height: 40px;
    display: grid;
    grid-template-columns: 1fr 1fr;

    @media screen and (max-width: 767px) {
        width: auto;
    }

    &-price {
        background: var(--quaternary);
        border-top-left-radius: 10px;
        border-end-start-radius: 10px;
    }

    &-price.active {
        background: var(--primary);
    }

    &-size {
        background: var(--quaternary);
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
    }

    &-size.active {
        background: var(--primary);
    }

    &-title {
        color: var(--background2);
        font-family: var(--montserrat);
        font-weight: var(--bold);
        font-size: var(--buttons-n-tabs-desktop);
        text-align: center;
        padding: 10px;

        @media screen and (max-width: 767px) {
            font-size: var(--buttons-n-tabs-mobile);
            padding: 12px;
        }

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
        font-family: var(--open-sans);
        font-size: var(--body-text-desktop);
        color: var(--text-secondary);
        font-weight: var(--regular);
        text-align: center;

        @media screen and (max-width: 767px) {
            font-size: var(--body-text-mobile);
            padding: 13px;
        }
    }
}

.found {
    font-family: var(--open-sans);
    font-size: var(--body-text-desktop);
    color: var(--text-secondary);
    font-weight: var(--regular);

    @media screen and (max-width: 767px) {
        font-size: var(--body-text-mobile);
    }

}
</style>