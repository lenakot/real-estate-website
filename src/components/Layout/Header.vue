<template>
    <div v-if="isMobile">
        <div class="header-mobile" ref="headerDiv">
            <div class="header-mobile-menu">
                <router-link to='/' class="header-mobile-menu-links header-mobile-menu-links__houses"
                    :class="{ active: isActive('/') }"></router-link>
                <router-link to="/about" class="header-mobile-menu-links header-mobile-menu-links__info"
                    :class="{ active: isActive('/about') }"></router-link>
            </div>
        </div>
    </div>
    <div v-else>
        <div class="header" ref="headerDiv">
            <div class="header-menu">
                <router-link to="/"><img src="/png/img_logo_dtt@3x.png" alt="logo" class="header-menu-image"></router-link>
                <router-link to='/' class="header-menu-links" :class="{ active: isActive('/') }">Houses</router-link>
                <router-link to="/about" class="header-menu-links"
                    :class="{ active: isActive('/about') }">About</router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watchEffect } from 'vue';
import { useRouter } from 'vue-router'

const isMobile = ref(false);
const checkIfMobile = () => {
    isMobile.value = window.innerWidth < 768;
}

const headerDiv = ref()
const router = useRouter()

function isActive(href) {
    if (router.currentRoute.value.path == "/about") {
        return href == "/about";
    }
    return href != "/about";;
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

        @media screen and (max-width: 1200px) {
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

        &-links.active {
            font-size: var(--desktop-active-menu);
            font-weight: var(--bold);
            color: var(--text-primary);
        }

        &-links {
            font-size: var(--desktop-inactive-menu);
            font-weight: var(--medium);
            color: var(--text-secondary);
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
        padding: 10px;
        width: 100vw;
        justify-content: space-around;

        &-links {
            height: 25px;
            width: 25px;
            background-size: 25px 25px;
            background-repeat: no-repeat;

            &__houses {
                background-image: url('/png/ic_mobile_navigarion_home@3x.png');
            }

            &__houses.active {
                background-image: url('/png/ic_mobile_navigarion_home_active@3x.png');
            }

            &__info {
                background-image: url('/png/ic_mobile_navigarion_info@3x.png');
            }

            &__info.active {
                background-image: url('/png/ic_mobile_navigarion_info_active@3x.png');
            }
        }
    }
}
</style>