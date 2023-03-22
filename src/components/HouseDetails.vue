<template>
    <div class="back-block">
        <router-link to="/" class="back-block-back">
            <img src="/png/ic_back_grey@3x.png" alt="back" class="back-block-back__icon">
            <div class="back-block-back__title">Back to overview</div>
        </router-link>
    </div>
    <div class="house-details-container">
        <div class="house-details">
            <div class="house-details-image">
                <img class="house-details-image__img" :src="`${house.image}`" :alt="`${house.location?.street}`">
            </div>
            <div class="house-details-wrapper">
                <div class="house-details-description">
                    <div class="house-short-description">
                        <div class="house-details-description-street">{{ house.location?.street }}</div>

                        <div class="house-details-description-block">
                            <div>
                                <img class="house-details-description-block__icon" src="/png/ic_location@3x.png"
                                    alt="location">
                                <span class="house-details-description-block__title">{{ house.location?.zip }}
                                    {{ house.location?.city }}</span>
                            </div>
                        </div>
                        <div class="house-details-description-block">
                            <div>
                                <img class="house-details-description-block__icon" src="/png/ic_price@3x.png" alt="price">
                                <span class="house-details-description-block__title">{{ house.price }}</span>
                            </div>
                            <div>
                                <img class="house-details-description-block__icon" src="/png/ic_size@3x.png" alt="size">
                                <span class="house-details-description-block__title">{{ house.size }}m2</span>
                            </div>
                            <div>
                                <img class="house-details-description-block__icon" src="/png/ic_construction_date@3x.png"
                                    alt="construction_date">
                                <span class="house-details-description-block__title">Built in
                                    {{ house.constructionYear }}</span>
                            </div>
                        </div>
                        <div class="house-details-description-block">
                            <div>
                                <img class="house-details-description-block__icon" src="/png/ic_bed@3x.png" alt="bed">
                                <span class="house-details-description-block__title">{{ house.rooms?.bedrooms }}</span>
                            </div>

                            <div><img class="house-details-description-block__icon" src="/png/ic_bath@3x.png" alt="bath">
                                <span class="house-details-description-block__title">{{ house.rooms?.bathrooms }}</span>
                            </div>

                            <div><img class="house-details-description-block__icon" src="/png/ic_garage@3x.png"
                                    alt="garage">
                                <span class="house-details-description-block__title">{{ (house.hasGarage ? "Yes" :
                                    "No") }}</span>
                            </div>
                        </div>

                    </div>
                    <div class="house-tools" v-if="house.madeByMe">
                        <router-link :to="`/edit-listing/${house.id}`"><img src="/png/ic_edit@3x.png" alt="edit"
                                class="house-tools__icon"></router-link>
                        <div @click="toogleDeleteBlock"><img src="/png/ic_delete@3x.png" alt="ic_delete"
                                class="house-tools__icon"></div>
                        <div v-if="isVisibleDeleteBlock">
                            <DeleteHouse :house='house' @goBack="toogleDeleteBlock" />
                            <GrayBackground />
                        </div>
                    </div>
                </div>
                <div class="house-details-description-area">
                    {{ house.description }}
                </div>
            </div>

        </div>
        <div class="housesList-wrapper">
            <RecommendationsList />
        </div>
    </div>
</template>


<script setup>
import RecommendationsList from '@/components/RecommendationsList.vue'
import DeleteHouse from '@/components/DeleteHouse.vue'
import GrayBackground from '@/components/GrayBackground.vue'
import { ref } from 'vue';

const props = defineProps({
    house: {
        type: Object,
        required: true
    }
})
const isVisibleDeleteBlock = ref(false)
function toogleDeleteBlock() {
    isVisibleDeleteBlock.value = !isVisibleDeleteBlock.value
}
</script>

<style lang="scss" scoped>
.back-block {
    margin: 40px 0;

    &-back {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 10px;
        text-decoration: none;

        &__icon {
            width: 20px;
            height: 20px;
        }

        &__title {
            font-family: var(--montserrat);
            font-size: 16px;
            font-weight: 600;
            color: var(--text-primary);
        }
    }
}

.house-details {
    width: inherit;
    background: var(--background2);
    border-radius: 10px;

    &-image {
        max-width: inherit;

        &__img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
}

.house-details-container {
    display: grid;
    grid-template-columns: 55% 40%;
    gap: 50px;
}

.housesList-wrapper {
    display: flex;
    transform: scale(0.9);
    position: relative;
    top: -125px;
}


.house-details-wrapper {
    width: inherit;
    padding: 10px 30px;
    display: flex;
    flex-direction: column;
}

.house-details-description {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;

    &-street {
        font-family: var(--montserrat);
        font-size: 32px;
        font-weight: bold;

        color: var(--text-primary) & div {
            margin-right: 20px;
            display: flex;
            align-items: center;
            gap: 5px;
        }
    }

    &-area {
        padding: 20px 0;
        font-family: var(--open-sans);
        font-size: 16px;
        color: var(--text-secondary);
    }

    .house-short-description {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .house-tools {
        display: flex;
        gap: 20px;

        &__icon {
            width: 20px;
            height: 20px;
            cursor: pointer;
        }
    }
}

.house-details-description-block {
    & div {
        margin-right: 20px;
        display: flex;
        align-items: center;
        gap: 5px;
    }

    display: flex;

    &__icon {
        width: 20px;
        height: 20px;
        object-fit: contain;
        margin-right: 5px;
    }

    &__title {
        font-family: var(--open-sans);
        font-size: 16px;
        font-weight: 600;
        color: var(--text-secondary);
    }
}
</style>
