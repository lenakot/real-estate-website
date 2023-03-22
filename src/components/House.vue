<template>
    <div class="house">
        <img :src="`${house.image}`" :alt="`${house.location.street}`" class="house-image">
        <div class="house-description">
            <router-link :to="`/house/${house.id}`" class="house-description-street">{{ house.location.street
            }}</router-link>
            <div class="house-description-price">€{{ house.price }}</div>
            <div class="house-description-index">{{ house.location.zip }}</div>
            <div class="house-description-block">
                <img class="house-description-block__icon" src="/png/ic_bed@3x.png" alt="bed">
                <span class="house-description-block__title">{{ house.rooms.bedrooms }}</span>

                <img class="house-description-block__icon" src="/png/ic_bath@3x.png" alt="bath">
                <span class="house-description-block__title">{{ house.rooms.bathrooms }}</span>

                <img class="house-description-block__icon" src="/png/ic_size@3x.png" alt="size">
                <span class="house-description-block__title">{{ house.size }} m2</span>
            </div>
        </div>
        <div class="house-tools" v-if="house.madeByMe">
            <img src="/png/ic_edit@3x.png" alt="edit" class="house-tools__icon">
            <img src="/png/ic_delete@3x.png" alt="ic_delete" class="house-tools__icon">
        </div>
    </div>
</template>


<script setup>
import { useHousesStore } from '@/stores/houseStore.js'

const housesStore = useHousesStore()

const props = defineProps({
    house: {
        type: Object,
        requared: true
    }
})
</script>


<style lang="scss" scoped>
.house {
    margin: 10px;
    padding: 20px;
    width: auto;

    background: var(--background2);
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;

    &-image {
        width: 150px;
        height: 150px;
        border-radius: 10px;
        object-fit: cover;
        flex-grow: 0;
    }

    &-description {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        gap: 10px;

        &-street {
            font-family: var(--montserrat);
            font-size: 22px;
            font-weight: bold;
            color: var(--text-primary);
            text-decoration: none;
        }

        &-price,
        &-index {
            font-family: var(--open-sans);
            font-size: 18px;
            color: var(--text-secondary)
        }

        &-index {
            color: var(--quaternary)
        }

        &-block {
            display: flex;
            gap: 10px;

            &__icon {
                width: 25px;
                height: 25px;
                object-fit: contain;
            }

            &__title {
                font-family: var(--open-sans);
                font-size: 18px;
                color: var(--text-primary)
            }
        }
    }

    &-tools {
        display: flex;
        align-self: flex-start;
        gap: 20px;
        padding-top: 20px;

        &__icon {
            width: 20px;
            height: 20px;
            cursor: pointer;
        }
    }

}
</style>