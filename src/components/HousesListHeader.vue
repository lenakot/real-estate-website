<template>
    <div class="header">
        <div class="header-title">Houses</div>
        <router-link to="/create-new-listing" class="header-create-list" >
            <img class="header-create-list-image" src="/png/ic_plus_white@3x.png" alt="plus"><span class="header-create-list-text">CREATE NEW</span>
        </router-link>
    </div>
    
</template>


<script setup>
const props = defineProps({
    house: {
        type: Object,
        default: () => { },
        requred: true,
    }
})
</script>


<style lang="scss" scoped>
.header {
    display: flex;
    justify-content: space-between;
    margin: 40px 300px;

    &-title {
        font-family: var(--monserrat);
        font-size: 32px;
        font-weight: 700;
        color: var(--text-primary);
        }
    &-create-list {
        background: var(--primary);
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        padding: 10px 20px;
        height: 40px;
        text-decoration: none;
        cursor: pointer;

        &-text{
            color: var(--background2);
            font-family: var(--monserrat);
            font-weight: 700;
            font-size: 18px;
        }

        &-image {
            object-fit: cover;
            width: 20px;
            height: 20px;
        }
    }
}
</style>