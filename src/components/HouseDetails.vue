<template>
  <div class="house-details-wrapper">
    <div class="back-block">
      <!-- Go back to houses overview -->
      <BackButton white />

      <!-- Edit and delete buttons for mobile version -->
      <div
        v-if="currentHouse.madeByMe && isMobile"
        class="house-detail-description__tools"
      >
        <router-link :to="`/edit-listing/${currentHouse.id}`"
          ><img
            src="/png/ic_edit_white@3x.png"
            alt="edit"
            class="house-detail-description__tools__icon"
        /></router-link>

        <div @click="toogleDeleteBlock">
          <img
            src="/png/ic_delete_white@3x.png"
            alt="ic_delete"
            class="house-detail-description__tools__icon"
          />
        </div>
      </div>
      <!-- To position an arrow without using absolute positioning, I added an empty <div> element at the bottom of a
           container. This empty <div> element will act as a spacer to prevent the arrow from being centered if the
           container is not owned by the arrow's owner -->
      <div v-else></div>

      <!-- Pop-up window -->
      <div v-if="isVisibleDeleteBlock">
        <DeleteHouse :house="currentHouse" @go-back="toogleDeleteBlock" />
      </div>
    </div>

    <!-- Full house description -->
    <div class="house-detail-container">
      <div class="house-detail">
        <!-- Image -->
        <div class="house-detail-image">
          <img
            class="house-detail-image__img"
            :src="`${currentHouse?.image}`"
            :alt="`${currentHouse.location?.street}`"
          />
        </div>

        <!-- Main details about house -->
        <div class="house-detail-description">
          <div class="house-detail-description__short">
            <div class="house-detail-description__short__block">
              <div class="house-detail-description__short__street">
                {{ currentHouse.location?.street }}
              </div>
            </div>

            <div class="house-detail-description__short__block">
              <HouseProperty
                :icon-name="'ic_location'"
                :alt="'location'"
                :title="`${currentHouse.location?.zip}
                  ${currentHouse.location?.city}`"
              />
            </div>
            <div class="house-detail-description__short__block">
              <HouseProperty
                :icon-name="'ic_price'"
                :alt="'price'"
                :title="`${currentHouse.price}`"
              />

              <HouseProperty
                :icon-name="'ic_size'"
                :alt="'size'"
                :title="`${currentHouse.size}m2`"
              />

              <HouseProperty
                :icon-name="'ic_construction_date'"
                :alt="'construction_date'"
                :title="`Built in ${currentHouse.constructionYear}`"
              />
            </div>
            <div class="house-detail-description__short__block">
              <HouseProperty
                :icon-name="'ic_bed'"
                :alt="'bed'"
                :title="`${currentHouse.rooms?.bedrooms}`"
              />

              <HouseProperty
                :icon-name="'ic_bath'"
                :alt="'bath'"
                :title="`${currentHouse.rooms?.bathrooms}`"
              />

              <HouseProperty
                :icon-name="'ic_garage'"
                :alt="'garage'"
                :title="`${currentHouse.hasGarage ? 'Yes' : 'No'}`"
              />
            </div>
          </div>
          <div
            v-if="currentHouse.madeByMe && !isMobile"
            class="house-detail-description__tools"
          >
            <router-link :to="`/edit-listing/${currentHouse.id}`"
              ><img
                src="/png/ic_edit@3x.png"
                alt="edit"
                class="house-detail-description__tools__icon"
            /></router-link>
            <div @click="toogleDeleteBlock">
              <img
                src="/png/ic_delete@3x.png"
                alt="ic_delete"
                class="house-detail-description__tools__icon"
              />
            </div>
            <div v-if="isVisibleDeleteBlock">
              <DeleteHouse :house="currentHouse" @go-back="toogleDeleteBlock" />
            </div>
          </div>
        </div>

        <!-- Description -->
        <div class="house-detail-description-full">
          {{ currentHouse.description }}
        </div>
      </div>

      <!-- Recommendation based on the same city -->
      <div class="recommendation-block">
        <RecommendationsList
          :city="currentHouse.location?.city"
          :current-house-id="houseId"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import HouseProperty from "@/components/UI/HouseProperty.vue";
import RecommendationsList from "@/components/RecommendationsList.vue";
import BackButton from "@/components/UI/BackButton.vue";
import DeleteHouse from "@/components/UI/DeleteHouse.vue";
import { ref, onMounted, watchEffect } from "vue";
import { useHousesStore } from "@/stores/houseStore.js";
import { useRoute, useRouter } from "vue-router";
import { useIsMobileVersion } from "@/mobileVersion.js";
const isMobile = useIsMobileVersion();

const props = defineProps({
  houseId: {
    type: String,
    required: true,
  },
});

const route = useRoute();
const router = useRouter();
const housesStore = useHousesStore();
const currentHouse = ref({});

watchEffect(() => {
  currentHouse.value = housesStore.getHouseById(props.houseId);
});

const isVisibleDeleteBlock = ref(false);
function toogleDeleteBlock() {
  isVisibleDeleteBlock.value = !isVisibleDeleteBlock.value;
}

onMounted(() => {
  isVisibleDeleteBlock.value = route.query.showDelete;
  router.replace({ query: {} }); // remove the param from address
});
</script>

<style lang="scss" scoped>
.house-details-wrapper {
  margin: 40px 300px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media screen and (max-width: 1200px) {
    margin: 40px 150px;
  }

  @media screen and (max-width: 767px) {
    margin: -50px 0 50px 0;
  }
}

.back-block {
  @media screen and (max-width: 1200px) {
    width: 100%;
  }

  @media screen and (max-width: 767px) {
    position: absolute;
    top: 50px;
    width: 100%;
    display: flex;
    justify-content: space-around;
    gap: 65%;
    align-items: center;
  }
}

.house-detail-container {
  display: flex;
  width: inherit;
  gap: 75px;

  @media screen and (max-width: 1200px) {
    gap: 0;
  }

  @media screen and (max-width: 767px) {
    display: flex;
    flex-direction: column;
    max-width: 767px;
  }
}

.house-detail {
  width: fit-content;
  background: var(--background2);
  border-radius: 10px;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 767px) {
    max-width: 767px;
    margin: 0;
    border-radius: 0;
  }

  &-image {
    width: fit-content;

    @media screen and (max-width: 767px) {
      max-width: 767px;
      margin: 0;
    }

    &__img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &-description {
    display: flex;
    justify-content: space-between;
    margin: 20px;

    @media screen and (max-width: 767px) {
      margin: 0;
      margin-top: -25px;
      background: var(--background2);
      border-top-left-radius: 25px;
      border-top-right-radius: 25px;
      padding: 20px;
    }

    &__short {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 15px;
      white-space: nowrap;

      @media screen and (max-width: 767px) {
        gap: 5px;
      }

      &__street {
        font-family: var(--montserrat);
        font-size: var(--header-1-desktop);
        font-weight: var(--bold);
        color: var(--text-primary);
        margin-right: 20px;
        display: flex;
        align-items: center;
        gap: 5px;
        white-space: nowrap;

        @media screen and (max-width: 1200px) {
          font-size: 28px;
        }

        @media screen and (max-width: 767px) {
          font-size: var(--header-1-mobile);
        }
      }

      &__block {
        display: flex;
      }
    }

    &__tools {
      display: flex;
      gap: 20px;

      &__icon {
        width: 20px;
        height: 20px;
        cursor: pointer;
        opacity: 0.5;

        @media screen and (max-width: 1200px) {
          opacity: 1;
          height: 22px;
        }
      }

      &__icon:hover {
        cursor: pointer;
        opacity: 1;
      }
    }
  }

  &-description-full {
    margin: 0 20px 20px 20px;
    font-family: var(--open-sans);
    font-size: var(--body-text-desktop);
    color: var(--text-secondary);

    @media screen and (max-width: 1200px) {
      font-size: 16px;
    }

    @media screen and (max-width: 767px) {
      font-size: var(--body-text-mobile);
    }
  }
}

.recommendation-block {
  transform: scale(0.8);

  @media screen and (max-width: 767px) {
    transform: scale(1);
    margin: 20px;
  }
}
</style>
