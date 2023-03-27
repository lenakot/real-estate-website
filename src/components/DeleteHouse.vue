<template>
    <div class="wrapper">
        <div class="delete">
            <div class="delete-title">Delete listing</div>
            <div class="delete-description">Are you sure you want to delete this listing?<br />
                This action cannot be undone.</div>
            <div class="delete-buttons">
                <router-link to="/" @click="housesStore.deleteHouse(house.id)"
                    class="delete-buttons__button delete-buttons__button__yes">
                    YES, DELETE</router-link>
                <div @click="goBack" class="delete-buttons__button delete-buttons__button__no">GO
                    BACK</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useHousesStore } from '@/stores/houseStore.js'

const housesStore = useHousesStore()
const props = defineProps({
    house: {
        type: Object,
        required: true
    }
})

const emit = defineEmits(['goBack'])

function goBack() {
    emit('goBack')
}
</script>

<style lang="scss" scoped>
.wrapper {
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
}

.delete {
    margin: -40px -300px;
    width: 500px;
    height: auto;
    background: var(--background2);
    display: flex;
    flex-direction: column;
    text-align: center;
    gap: 30px;
    padding: 50px;
    border-radius: 10px;

    @media screen and (max-width: 1150px) {
        width: 400px;
        margin: 10px;
    }

    @media screen and (max-width: 767px) {
        padding: 25px;
    }

    &-title {
        font-family: var(--montserrat);
        font-size: var(--header-2-desktop);
        font-weight: bold;

        @media screen and (max-width: 1150px) {
            font-size: 18px;
        }

        @media screen and (max-width: 767px) {
            font-size: var(--header-2-mobile);
        }
    }

    &-description {
        font-family: var(--open-sans);
        font-size: var(--body-text-desktop);
        font-weight: var(--regular);
        color: var(--text-secondary);

        @media screen and (max-width: 1150px) {
            font-size: 14px;
        }

        @media screen and (max-width: 767px) {
            font-size: var(--body-text-mobile);
        }
    }

    &-buttons {
        display: flex;
        flex-direction: column;
        gap: 20px;
        height: 100%;

        @media screen and (max-width: 767px) {
            gap: 10px;
        }

        &__button {
            font-family: var(--montserrat);
            font-size: var(--buttons-n-tabs-desktop);
            font-weight: var(--bold);
            padding: 10px;
            color: var(--background2);
            width: 300px;
            margin: 0 auto;
            border-radius: 10px;
            cursor: pointer;
            text-decoration: none;

            @media screen and (max-width: 1150px) {
                width: 200px;
                font-size: 16px;
            }

            @media screen and (max-width: 767px) {
                font-size: var(--buttons-n-tabs-mobile);
            }


            &__yes {
                background: var(--primary);
            }

            &__no {
                background: var(--secondary);
            }
        }
    }

}
</style>