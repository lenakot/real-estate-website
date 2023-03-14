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
    height: 80px;
    background: var(--background2);

    &-menu {
        display: flex;
        gap: 65px;
        align-items: center;
        margin-left: 300px;
        padding: 20px;
        width: fit-content;

        &-image {
            height: 45px;
        }

        &-links {
            font-family: var(--montserrat);
            font-size: 18px;
            font-weight: bold;
            cursor: pointer;
        }

    }
}
</style>