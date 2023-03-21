<template>
    <div class="about-wrapper">
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
                <img src="png/img_logo_dtt@3x.png" alt="logo" class="about-block-image">
            </div>
            <div class='about-block-links'>
                <div class="about-text">By DTT</div>
                <div><a class='about-text-link' href="www.d-tt.nl">www.d-tt.nl</a></div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.about-wrapper {
    display: flex;
    flex-direction: column;
    gap: 30px;

    &-title {
        font-family: var(--montserrat);
        font-size: 22px;
        font-weight: bold;
    }
}

.about-block {
    display: flex;
    gap: 20px;

    &-image {
        width: 200px;
    }

    &-links {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }


}

.about-text {
    font-family: var(--open-sans);
    font-style: 18px;
    color: var(--text-secondary);

    &-link {
        color: var(--hyperlink);
        text-decoration: none;
        font-family: var(--open-sans);
        font-style: 18px;
    }

}
</style>