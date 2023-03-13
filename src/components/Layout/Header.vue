<template>
    <div class="header">
        <div class="header-menu">
            <img src="png/img_logo_dtt@3x.png" alt="logo" class="header-menu-image">
            <div class="header-menu-links">Houses</div>
            <div class="header-menu-links">About</div>
        </div>

    </div>
</template>

<style lang="scss" scoped>
.header {
    height: 100px;
    background: var(--background2);

    &-menu {
        display: flex;
        gap: 50px;
        align-items: center;
        padding: 20px 500px 20px 300px;

        &-image {
            height: 50px;
        }

        &-links {
            font-family: var(--montserrat);
            font-size: 18px;
            font-weight: bold
        }

    }
}
</style>