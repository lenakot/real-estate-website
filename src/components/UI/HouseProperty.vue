<template>
  <div class="house-property-wrapper">
    <img
      class="house-property-wrapper__icon"
      :src="`/png/${iconName}@3x.png`"
      :alt="`${alt}`"
      :class="{ preview }"
    />
    <span class="house-property-wrapper__title" :class="{ preview }">{{
      title
    }}</span>
  </div>
</template>

<script setup>
const props = defineProps({
  iconName: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },

  preview: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
.house-property-wrapper {
  display: flex;
  gap: 10px;
  margin-right: 15px;
  align-items: center;

  &__icon {
    width: 20px;
    height: 20px;
    object-fit: contain;

    @media screen and (max-width: 767px) {
      width: 15px;
      height: 15px;
    }
  }
  &__icon.preview {
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
    font-size: var(--listing-info-desktop);
    font-weight: var(--semibold);
    color: var(--text-secondary);
    white-space: nowrap;

    @media screen and (max-width: 1200px) {
      font-size: 14px;
    }

    @media screen and (max-width: 767px) {
      font-size: var(--listing-info-mobile);
    }
  }
  &__title.preview {
    font-family: var(--open-sans);
    font-size: var(--body-text-desktop);
    color: var(--text-primary);
    font-weight: var(--regular);
    white-space: nowrap;

    @media screen and (max-width: 1200px) {
      font-size: 14px;
    }

    @media screen and (max-width: 767px) {
      font-size: var(--body-text-mobile);
    }
  }
}
</style>
