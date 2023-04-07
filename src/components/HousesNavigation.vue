<template>
  <div class="header-wrapper">
    <div class="header">
      <div class="header-title">Houses</div>

      <!-- Create new house button -->
      <router-link
        v-if="isMobile"
        to="/create-new-listing"
        class="header-create-list"
      >
        <img
          class="header-create-list-image"
          src="/png/ic_plus_grey@3x.png"
          alt="plus"
        />
      </router-link>
      <router-link v-else to="/create-new-listing" class="header-create-list">
        <img
          class="header-create-list-image"
          src="/png/ic_plus_white@3x.png"
          alt="plus"
        /><span class="header-create-list-text">CREATE NEW</span>
      </router-link>
    </div>

    <div class="search-and-sort">
      <!-- Search area -->
      <div class="search-wrapper">
        <img
          class="search-wrapper-image"
          src="/png/ic_search@3x.png"
          alt="search"
        />
        <input
          ref="search"
          v-model="housesStore.search"
          class="search-wrapper-input"
          type="text"
          placeholder="Search for a house"
          name="search"
        />
        <div
          v-if="housesStore.search !== ''"
          class="search-wrapper-input-clear"
          @click="clearInput()"
        ></div>
      </div>

      <!-- Sort area (price and size buttons) -->
      <div class="sort-wrapper">
        <div
          class="sort-wrapper-price sort-wrapper-title"
          :class="{ active: housesStore.sortParam === 'price' }"
          @click="sortByPrice"
        >
          Price
        </div>
        <div
          class="sort-wrapper-size sort-wrapper-title"
          :class="{ active: housesStore.sortParam === 'size' }"
          @click="sortBySize"
        >
          Size
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useHousesStore } from "@/stores/houseStore.js";
import { useIsMobileVersion } from "@/mobileVersion.js";
const isMobile = useIsMobileVersion();

const housesStore = useHousesStore();

function clearInput() {
  housesStore.search = "";
}

function sortByPrice() {
  housesStore.sortParam = "price";
}

function sortBySize() {
  housesStore.sortParam = "size";
}
</script>

<style lang="scss" scoped>
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
  width: 350px;
  height: 40px;
  padding: 8px 10px;
  border-radius: 10px;
  background: var(--tertiary);
  display: flex;
  justify-content: space-between;
  gap: 5px;

  @media screen and (max-width: 1200px) {
    width: 300px;
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
    width: 0px;
    border: none;
    font-family: var(--open-sans);
    font-size: var(--input-title-desktop);
    font-weight: var(--regular);
    color: var(--text-primary);
    outline: none;
    flex-grow: 1;

    @media screen and (max-width: 1200px) {
      width: 250px;
    }

    @media screen and (max-width: 767px) {
      font-size: var(--input-title-mobile);
    }

    &-clear {
      background: url(/png/ic_clear@3x.png);
      width: 30px;
      height: 25px;
      object-fit: cover;
      background-repeat: no-repeat;
      background-size: 20px 20px;
      background-position: center;
    }
  }
}

.sort-wrapper {
  width: 300px;
  height: 40px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  cursor: pointer;

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
    padding: 8px;

    @media screen and (max-width: 767px) {
      font-size: var(--buttons-n-tabs-mobile);
      padding: 12px;
    }
  }
}
</style>
