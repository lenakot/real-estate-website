<template>
    <div v-if="isMobile">
        <div class="header-mobile" ref="headerDiv">
            <div class="header-mobile-menu">
                <router-link to='/' class="header-mobile-menu-image header-mobile-menu-image__houses"></router-link>
                <router-link to="/about" class="header-mobile-menu-image header-mobile-menu-image__info"></router-link>
            </div>
        </div>
    </div>
    <div v-else>
        <div class="header" ref="headerDiv">
            <div class="header-menu">
                <router-link to="/"><img src="/png/img_logo_dtt@3x.png" alt="logo" class="header-menu-image"></router-link>
                <router-link to='/' class="header-menu-links">Houses</router-link>
                <router-link to="/about" class="header-menu-links">About</router-link>
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
.header {
    margin: auto;
    height: 80px;
    background: var(--background2);

    &-menu {
        display: flex;
        gap: 65px;
        align-items: center;
        margin-left: 300px;
        padding: 20px 20px 20px 0;
        width: fit-content;

        @media screen and (max-width: 1150px) {
            margin-left: 150px;
        }

        &-image {
            height: 45px;
        }

        &-links {
            font-family: var(--montserrat);
            font-size: var(--body-text-desktop);
            font-weight: var(--medium);
            color: var(--text-secondary);
            text-decoration: none;
            cursor: pointer;
        }

        &-links[data-current=true] {
            font-family: var(--montserrat);
            font-size: var(--body-text-desktop);
            font-weight: var(--bold);
            color: var(--text-primary);
        }
    }
}

.header-mobile {
    margin: auto;
    background: var(--background2);
    position: fixed;
    bottom: 0;
    width: 100vw;
    z-index: 1;

    &-menu {
        display: flex;
        gap: 65px;
        align-items: center;
        padding: 15px;
        width: 100vw;
        justify-content: space-around;

        &-image {
            height: 30px;
            width: 30px;

            &__houses {
                background-image: url('/png/ic_mobile_navigarion_home@3x.png');
                background-size: 30px 30px;
            }

            &__houses:hover {
                background-image: url('/png/ic_mobile_navigarion_home_active@3x.png');
                background-size: 30px 30px;
            }

            &__info {
                background-image: url('/png/ic_mobile_navigarion_info@3x.png');
                background-size: 30px 30px;
            }

            &__info:hover {
                background-image: url('/png/ic_mobile_navigarion_info_active@3x.png');
                background-size: 30px 30px;
            }
        }
    }
}
</style>