<template>
    <div class="wrapper">
        <div class="delete">
            <div class="delete-title">Delete listing</div>
            <div class="delete-description">Are you sure you want to delete this listing?<br />
                This action cannot be undone.</div>
            <div class="delete-buttons">
                <div class="delete-buttons__button delete-buttons__button__yes">YES, DELETE</div>
                <router-link to="/house-details" class="delete-buttons__button delete-buttons__button__no">GO BACK</router-link>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.wrapper {
    position: fixed;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
}

.delete {
    width: 500px;
    height: auto;
    background: var(--background2);
    display: flex;
    flex-direction: column;
    text-align: center;
    gap: 20px;
    padding: 50px;
    border-radius: 10px;

    &-title {
        font-family: var(--montserrat);
        font-size: 22px;
        font-weight: bold;
    }

    &-description {
        font-family: var(--open-sans);
        font-size: 16px;
        font-weight: 600;
        color: var(--text-secondary)
    }

    &-buttons {
        display: flex;
        flex-direction: column;
        gap: 20px;
        height: 100%;

        &__button {
            font-family: var(--montserrat);
            font-size: 18px;
            font-weight: bold;
            padding: 10px;
            color: var(--background2);
            width: 300px;
            margin: 0 auto;
            border-radius: 10px;
            cursor: pointer;
            text-decoration: none;


            &__yes {
                background: var(--primary);
            }

            &__no {
                background: var(--secondary);
            }
        }
    }

}
</style>