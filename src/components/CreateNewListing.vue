<template>
    <div class="listing-back-wrapper">
        <router-link to="/" class="listing-back">
            <img src="/png/ic_back_grey@3x.png" alt="back" class="listing-back__icon">
            <div class="listing-back__title">Back to overview</div>
        </router-link>
        <div class="listing-title">Create new listing</div>
    </div>
</template>


<style lang="scss" scoped>
.listing-back-wrapper {
    display: flex;
    flex-direction: column;
    gap: 30px;
    margin: 40px 300px;
}

.listing-back {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 10px;
        text-decoration: none;
        cursor: pointer;

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

    .listing-title {
        font-family: var(--montserrat);
        font-size: 32px;
        font-weight: 700;
        color: var(--text-primary);
    }
</style>