<template>
    <div class="about-wrapper">
        <div v-if="isMobile" class="about-wrapper-page-title">Houses</div>
        <div class="about-wrapper-title">About DTT Real Estate</div>
        <div class="about-wrapper-description about-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod
            tempor
            incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
            ex ea commodo consequat.
            <br />
            <br />
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
            fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
            deserunt mollit anim id est laborum.
        </div>
        <div class="about-wrapper-title">Design and Development</div>
        <div class="about-block">
            <div>
                <img src="/png/img_logo_dtt@3x.png" alt="logo" class="about-block-image">
            </div>
            <div class='about-block-links'>
                <div class="about-text">By DTT</div>
                <div><a class='about-text-link' href="www.d-tt.nl">www.d-tt.nl</a></div>
            </div>
        </div>
    </div>
</template>


<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const isMobile = ref(false);
const checkIfMobile = () => {
    isMobile.value = window.innerWidth < 768;
}

onMounted(async () => {
    window.addEventListener("resize", checkIfMobile);
    checkIfMobile();
});

onUnmounted(async () => {
    window.removeEventListener("resize", checkIfMobile);
});
</script>


<style lang="scss" scoped>
.about-wrapper {
    display: flex;
    flex-direction: column;
    gap: 30px;
    margin: 40px 300px;

    @media screen and (max-width: 1150px) {
        margin: 40px 150px;
    }

    @media screen and (max-width: 767px) {
        margin: 30px;
        gap: 15px;
    }

    &-page-title {
        @media screen and (max-width: 767px) {
            font-family: var(--montserrat);
            font-size: var(--header-1-mobile);
            font-weight: var(--bold);
            color: var(--text-primary);
            text-align: center;
            margin-bottom: 15px;
        }
    }

    &-title {
        font-family: var(--montserrat);
        font-size: var(--header-1-desktop);
        font-weight: var(--bold);

        @media screen and (max-width: 767px) {
            font-size: var(--header-2-mobile);
        }
    }
}

.about-block {
    display: flex;
    gap: 20px;

    &-image {
        width: 200px;

        @media screen and (max-width: 767px) {
            width: 100px;
            gap: 10px;
        }
    }

    &-links {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }


}

.about-text {
    font-family: var(--open-sans);
    font-size: var(--body-text-desktop);
    font-weight: var(--regular);
    color: var(--text-secondary);

    @media screen and (max-width: 767px) {
        font-size: var(--body-text-mobile);
    }

    &-link {
        color: var(--hyperlink);
        text-decoration: none;
        font-family: var(--open-sans);
        font-size: var(--body-text-desktop);
        font-weight: var(--regular);

        @media screen and (max-width: 767px) {
            font-size: var(--body-text-mobile);
        }
    }

}
</style>