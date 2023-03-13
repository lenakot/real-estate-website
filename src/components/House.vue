<template>
    <div class="house">
        <img src="/png/img_placeholder_house@3x.png" alt="house" class="house-image">
        <div class="house-description">
            <div class="house-description-street">Dahliastraat 5</div>
            <div class="house-description-price">€500.000</div>
            <div class="house-description-index">1011AA Amsterdam</div>
            <div class="house-description-block">
                <img class="house-description-block__icon" src="/png/ic_bed@3x.png" alt="bed">
                <span class="house-description-block__title">1</span>

                <img class="house-description-block__icon" src="/png/ic_bath@3x.png" alt="bath">
                <span class="house-description-block__title">1</span>

                <img class="house-description-block__icon" src="/png/ic_size@3x.png" alt="size">
                <span class="house-description-block__title">120</span>
            </div>
        </div>
        <div class="house-tools">
            <img src="/png/ic_edit@3x.png" alt="edit" class="house-tools__icon">
            <img src="/png/ic_delete@3x.png" alt="ic_delete" class="house-tools__icon">
        </div>
    </div>
</template>

<style lang="scss" scoped>
.house {
    margin: 10px 300px;
    padding: 20px;
    width: auto;
    background: var(--background2);
    border-radius: 1%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;

    &-image {
        width: 200px;
        height: 200px;
        border-radius: 5%;
        object-fit: cover;
        flex-grow: 0;
    }

    &-description {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        gap: 20px;

        &-street {
            font-family: var(--montserrat);
            font-size: 22px;
            font-weight: bold;
            color: var(--text-primary)
        }

        &-price {
            font-family: var(--open-sans);
            font-size: 18px;
            color: var(--text-secondary)
        }

        &-index {
            color: var(--quaternary)
        }

        &-block {
            display: flex;
            gap: 10px;

            &__icon {
                width: 25px;
                height: 25px;
                object-fit: contain;
            }

            &__title {
                font-family: var(--open-sans);
                font-size: 18px;
                color: var(--text-primary)
            }
        }
    }

    &-tools {
        display: flex;
        align-self: flex-start;
        gap: 20px;
        padding-top: 20px;

        &__icon {
            width: 20px;
            height: 20px;
        }
    }

}
</style>