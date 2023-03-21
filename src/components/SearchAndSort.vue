<template>
    <div class="search-and-sort-wrapper">
            <form class="search-wrapper" action="#">
                <img  class='search-wrapper-image' src="/png/ic_search@3x.png" alt="search">
                <input  class='search-wrapper-input' type="text" placeholder="Search for a house" name="search">
            </form>
        <div class="sort-wrapper">
            <div class="sort-wrapper-price sort-wrapper-title">Price</div>
            <div class="sort-wrapper-size sort-wrapper-title">Size</div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.search-and-sort-wrapper {
    display: flex;
    justify-content: space-between;
    margin: 20px 0;
}

.search-wrapper {
    width: 400px;
    height: 40px;
    padding: 8px 20px;
    border-radius: 10px;
    background: var(--tertiary);
    display: flex;
    gap: 10px;

    &-image {
        width: 25px;
        height: 25px;
        margin-right: 5px;
    }

    &-input {
        background: var(--tertiary);;
        width: inherit;
        border: none;
        font-family: var(--open-sans);
        font-size: 14px;
        font-weight: 400;
        color: var(--text-primary);
        outline: none;
    }
}
.sort-wrapper {
    width: 300px;
    height: 40px;
    display: grid;
    grid-template-columns: 1fr 1fr;

    &-price {
        background: var(--primary);
        border-top-left-radius: 10px;
        border-end-start-radius: 10px;
    }
    &-size {
        background: var(--quaternary);
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
    }

    &-title {
        color: var(--background2);
            font-family: var(--monserrat);
            font-weight: 700;
            font-size: 18px;
            text-align: center;
            padding: 8px
    }
}
</style>