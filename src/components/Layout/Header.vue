<template>
    <div class="header" ref="headerDiv">
        <div class="header-menu">
            <router-link to="/"><img src="png/img_logo_dtt@3x.png" alt="logo" class="header-menu-image"></router-link>
            <router-link to='/' class="header-menu-links">Houses</router-link>
            <router-link to="/about" class="header-menu-links">About</router-link>
        </div>
    </div>
</template>

<script setup>

// import { onMounted, ref } from 'vue';
// import { useRouter } from 'vue-router'

// const headerDiv = ref(null)
// const router = useRouter()
// onMounted(() => {
//     const currentLink = headerDiv.value.querySelector(`.header-menu-links[href="${router.currentRoute.value.path}"]`)
//     currentLink.dataset.current = true;
// });
</script>

<style lang="scss" scoped>
.header {
    margin: 0;
    height: 80px;
    background: var(--background2);

    &-menu {
        display: flex;
        gap: 65px;
        align-items: center;
        margin-left: 300px;
        padding: 20px 20px 20px 0;
        width: fit-content;

        &-image {
            height: 45px;
        }

        &-links {
            font-family: var(--montserrat);
            font-size: 18px;
            font-weight: 500;
            color: var(--text-secondary);
            text-decoration: none;
            cursor: pointer;
           
        }

        &-links[data-current=true] {
            


            font-family: var(--montserrat);
            font-size: 18px;
            font-weight: 700;
            color: var(--text-primary);
            
        }
    }
}
</style>