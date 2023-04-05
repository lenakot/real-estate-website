<template>
  <div class="house">
    <img
      :src="`${house.image}`"
      :alt="`${house.location.street}`"
      class="house-image"
    />
    <div class="house-description">
      <router-link :to="`/house/${house.id}`" class="house-description-street">
        {{ house.location.street }}</router-link
      >
      <div class="house-description-price">€{{ house.price }}</div>
      <div class="house-description-index">
        {{ house.location.zip }} {{ house.location.city }}
      </div>
      <div class="house-description-block">
        <img
          class="house-description-block__icon"
          src="/png/ic_bed@3x.png"
          alt="bed"
        />
        <span class="house-description-block__title">{{
          house.rooms.bedrooms
        }}</span>

        <img
          class="house-description-block__icon"
          src="/png/ic_bath@3x.png"
          alt="bath"
        />
        <span class="house-description-block__title">{{
          house.rooms.bathrooms
        }}</span>

        <img
          class="house-description-block__icon"
          src="/png/ic_size@3x.png"
          alt="size"
        />
        <span class="house-description-block__title">{{ house.size }} m2</span>
      </div>
    </div>
    <div v-if="house.madeByMe" class="house-tools">
      <router-link :to="`/edit-listing/${house.id}`">
        <img src="/png/ic_edit@3x.png" alt="edit" class="house-tools__icon" />
      </router-link>
      <router-link
        :to="{
          name: 'Detail',
          params: { id: house.id },
          query: { showDelete: true },
        }"
      >
        <img
          src="/png/ic_delete@3x.png"
          alt="ic_delete"
          class="house-tools__icon"
        />
      </router-link>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  house: {
    type: Object,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.house {
  margin: 10px 0;
  padding: 20px;
  background: var(--background2);
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 20px;
  min-width: fit-content;

  @media screen and (max-width: 1200px) {
    gap: 15px;
  }

  @media screen and (max-width: 767px) {
    margin: 20px 0;
    gap: 10px;
    padding: 15px 10px;
  }

  &-image {
    width: 150px;
    height: 150px;
    border-radius: 10px;
    object-fit: cover;
    flex-grow: 0;

    @media screen and (max-width: 767px) {
      width: 100px;
      height: 100px;
    }
  }

  &-description {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;

    &-street {
      font-family: var(--montserrat);
      font-size: var(--header-2-desktop);
      font-weight: var(--bold);
      color: var(--text-primary);
      text-decoration: none;
      white-space: nowrap;

      @media screen and (max-width: 767px) {
        font-size: var(--header-2-mobile);
      }
    }

    &-price,
    &-index {
      font-family: var(--open-sans);
      font-size: var(--body-text-desktop);

      @media screen and (max-width: 767px) {
        font-size: var(--body-text-mobile);
      }

      color: var(--text-secondary);
    }

    &-index {
      color: var(--quaternary);
    }

    &-block {
      display: flex;
      gap: 10px;

      @media screen and (max-width: 767px) {
        gap: 5px;
      }

      &__icon {
        width: 25px;
        height: 25px;
        object-fit: contain;

        @media screen and (max-width: 767px) {
          width: 15px;
          height: 15px;
        }
      }

      &__title {
        font-family: var(--open-sans);
        font-size: var(--body-text-desktop);
        color: var(--text-primary);
        white-space: nowrap;

        @media screen and (max-width: 767px) {
          font-size: var(--body-text-mobile);
        }
      }
    }
  }

  &-tools {
    display: flex;
    align-self: flex-start;
    gap: 20px;
    padding-top: 15px;

    @media screen and (max-width: 1200px) {
      gap: 10px;
    }

    @media screen and (max-width: 767px) {
      padding-top: 0px;
      gap: 5px;
    }

    &__icon {
      width: 20px;
      height: 20px;
      cursor: pointer;
      opacity: 0.5;

      @media screen and (max-width: 767px) {
        width: 15px;
        height: 15px;
      }
    }

    &__icon:hover {
      cursor: pointer;
      opacity: 1;
    }
  }
}
</style>
