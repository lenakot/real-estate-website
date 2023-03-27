<template>
    <div class="house-details-wrapper">
        <div class="back-block">
            <router-link to="/" class="back-block-back" v-if="!isMobile">
                <img src="/png/ic_back_grey@3x.png" alt="back" class="back-block-back__icon">
                <div class="back-block-back__title">Back to overview</div>
            </router-link>
            <router-link to="/" class="back-block-back" v-else>
                <img src="/png/ic_back_white@3x.png" alt="back" class="back-block-back__icon"></router-link>
            <div class="house-detail-description__tools" v-if="currentHouse.madeByMe && isMobile">
                <router-link :to="`/edit-listing/${currentHouse.id}`"><img src="/png/ic_edit_white@3x.png" alt="edit"
                        class="house-detail-description__tools__icon"></router-link>
                <div @click="toogleDeleteBlock"><img src="/png/ic_delete_white@3x.png" alt="ic_delete"
                        class="house-detail-description__tools__icon"></div>
            </div>
            <!-- To position an arrow without using absolute positioning, I added an empty <div> element at the bottom of a
                container. This empty <div> element will act as a spacer to prevent the arrow from being centered if the
                    container is not owned by the arrow's owner. -->
            <div v-else></div>
            <div v-if="isVisibleDeleteBlock">
                <DeleteHouse :house='currentHouse' @goBack="toogleDeleteBlock" />
                <GrayBackground />
            </div>

        </div>
        <div class="house-detail-container">
            <div class="house-detail">
                <div class="house-detail-image">
                    <img class="house-detail-image__img" :src="`${currentHouse?.image}`"
                        :alt="`${currentHouse.location?.street}`">
                </div>
                <div class="house-detail-description">
                    <div class="house-detail-description__short">
                        <div class="house-detail-description__short__block">
                            <div class="house-detail-description__short__street">{{ currentHouse.location?.street }}
                            </div>
                        </div>

                        <div class="house-detail-description__short__block">
                            <div class="house-detail-description__short__block__text_wrapper">
                                <img class="house-detail-description__short__block__icon" src="/png/ic_location@3x.png"
                                    alt="location">
                                <span class="house-detail-description__short__block__title">{{
                                    currentHouse.location?.zip }}
                                    {{ currentHouse.location?.city }}</span>
                            </div>
                        </div>
                        <div class="house-detail-description__short__block">
                            <div class="house-detail-description__short__block__text_wrapper">
                                <img class="house-detail-description__short__block__icon" src="/png/ic_price@3x.png"
                                    alt="price">
                                <span class="house-detail-description__short__block__title">{{ currentHouse.price
                                }}</span>
                            </div>
                            <div class="house-detail-description__short__block__text_wrapper">
                                <img class="house-detail-description__short__block__icon" src="/png/ic_size@3x.png"
                                    alt="size">
                                <span class="house-detail-description__short__block__title">{{ currentHouse.size
                                }}m2</span>
                            </div>
                            <div class="house-detail-description__short__block__text_wrapper">
                                <img class="house-detail-description__short__block__icon"
                                    src="/png/ic_construction_date@3x.png" alt="construction_date">
                                <span class="house-detail-description__short__block__title">Built in
                                    {{ currentHouse.constructionYear }}</span>
                            </div>
                        </div>
                        <div class="house-detail-description__short__block">
                            <div class="house-detail-description__short__block__text_wrapper">
                                <img class="house-detail-description__short__block__icon" src="/png/ic_bed@3x.png"
                                    alt="bed">
                                <span class="house-detail-description__short__block__title">{{
                                    currentHouse.rooms?.bedrooms
                                }}</span>
                            </div>

                            <div class="house-detail-description__short__block__text_wrapper">
                                <img class="house-detail-description__short__block__icon" src="/png/ic_bath@3x.png"
                                    alt="bath">
                                <span class="house-detail-description__short__block__title">{{
                                    currentHouse.rooms?.bathrooms
                                }}</span>
                            </div>

                            <div class="house-detail-description__short__block__text_wrapper">
                                <img class="house-detail-description__short__block__icon" src="/png/ic_garage@3x.png"
                                    alt="garage">
                                <span class="house-detail-description__short__block__title">{{
                                    (currentHouse.hasGarage ?
                                        "Yes" : "No") }}</span>
                            </div>
                        </div>

                    </div>
                    <div class="house-detail-description__tools" v-if="currentHouse.madeByMe && !isMobile">
                        <router-link :to="`/edit-listing/${currentHouse.id}`"><img src="/png/ic_edit@3x.png" alt="edit"
                                class="house-detail-description__tools__icon"></router-link>
                        <div @click="toogleDeleteBlock"><img src="/png/ic_delete@3x.png" alt="ic_delete"
                                class="house-detail-description__tools__icon"></div>
                        <div v-if="isVisibleDeleteBlock">
                            <DeleteHouse :house='currentHouse' @goBack="toogleDeleteBlock" />
                            <GrayBackground />
                        </div>
                    </div>
                </div>
                <div class="house-detail-description-full">
                    {{ currentHouse.description }}
                </div>
            </div>
            <div class="reccomendation-block">
                <RecommendationsList :city="currentHouse.location?.city" :currentHouseId="houseId" />
            </div>
        </div>
    </div>
</template>

<script setup>
import RecommendationsList from '@/components/RecommendationsList.vue'
import DeleteHouse from '@/components/DeleteHouse.vue'
import GrayBackground from '@/components/GrayBackground.vue'
import { ref, onMounted, onUnmounted, watchEffect } from 'vue';
import { useHousesStore } from '@/stores/houseStore.js'
import { useRoute, useRouter } from 'vue-router';

const props = defineProps({
    houseId: {
        type: String,
    }
})

const route = useRoute()
const router = useRouter()
const housesStore = useHousesStore()
const currentHouse = ref({})

watchEffect(() => {
    currentHouse.value = housesStore.getHouseById(props.houseId)
})

const isVisibleDeleteBlock = ref(false)
function toogleDeleteBlock() {
    isVisibleDeleteBlock.value = !isVisibleDeleteBlock.value
}

const isMobile = ref(false);
const checkIfMobile = () => {
    isMobile.value = window.innerWidth < 768;
}

onMounted(async () => {
    window.addEventListener("resize", checkIfMobile);
    checkIfMobile();
    isVisibleDeleteBlock.value = route.query.showDelete
    router.replace({ query: {} }) // remove the param from address
});

onUnmounted(async () => {
    window.removeEventListener("resize", checkIfMobile);
});
</script>

<style lang="scss" scoped>
.house-details-wrapper {
    margin: 40px 300px;
    display: flex;
    flex-direction: column;
    gap: 20px;

    @media screen and (max-width: 1150px) {
        margin: 40px 150px;
    }

    @media screen and (max-width: 767px) {
        margin: -50px 0 50px 0;
    }
}

.back-block {

    @media screen and (max-width: 1150px) {
        width: 100%;
    }

    @media screen and (max-width: 767px) {
        position: absolute;
        top: 50px;
        width: 100%;
        display: flex;
        justify-content: space-around;
        gap: 65%;
    }

    &-back {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 10px;
        text-decoration: none;

        &__icon {
            width: 25px;
            height: 25px;
        }

        &__title {
            font-family: var(--montserrat);
            font-size: var(--back-button-label-desktop);
            font-weight: var(--semibold);
            color: var(--text-primary);
        }
    }
}

.house-detail-container {
    display: flex;
    width: inherit;
    gap: 75px;

    @media screen and (max-width: 1150px) {
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
            gap: 20px;

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

                @media screen and (max-width: 767px) {
                    font-size: var(--header-1-mobile);
                }
            }

            &__block {
                display: flex;

                &__text_wrapper {
                    display: flex;
                    gap: 5px;
                    margin-right: 10px;
                    align-items: center;
                }

                &__icon {
                    width: 20px;
                    height: 20px;
                    object-fit: contain;
                    margin: 5px;
                }

                &__title {
                    font-family: var(--open-sans);
                    font-size: var(--listing-info-desktop);
                    font-weight: var(--semibold);
                    color: var(--text-secondary);

                    @media screen and (max-width: 767px) {
                        font-size: var(--listing-info-mobile);
                    }
                }
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

                @media screen and (max-width: 1150px) {
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

        @media screen and (max-width: 767px) {
            font-size: var(--body-text-mobile);
        }
    }
}

.reccomendation-block {
    transform: scale(0.8);

    @media screen and (max-width: 767px) {
        transform: scale(1);
        margin: 20px;
    }
}
</style>
