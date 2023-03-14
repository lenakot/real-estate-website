<template>
    <div class="listing">
        <div class="listing-back">
            <img src="/png/ic_back_grey@3x.png" alt="back" class="listing-back__icon">
            <div class="listing-back__title">Back to overview</div>
        </div>
        <div class="listing-title">Create new listing</div>
        <div class="listing-form">
            <form action="#">
                <label for="street" class="listing-form-title">Street name*</label><br>
                <input required class="listing-form-input listing-form-placeholder" type="text" id="street" name="street"
                    placeholder="Enter the street name"><br>

                <div class="listing-form-two-columns">
                    <div>
                        <label for="houseNum" class="listing-form-title">House number*</label><br>
                        <input required class="listing-form-input listing-form-placeholder" type="text" id="houseNum"
                            name="houseNum" placeholder="Enter house number"><br>
                    </div>

                    <div>
                        <label for="addition" class="listing-form-title">Addition
                            (optional)</label><br>
                        <input class="listing-form-input listing-form-placeholder" type="text" id="addition" name="addition"
                            placeholder="e.g. A"><br>
                    </div>

                </div>

                <label for="postCode" class="listing-form-title">Postal code*</label><br>
                <input required class="listing-form-input listing-form-placeholder" type="text" id="postCode"
                    name="postCode" placeholder="e.g. 1000 AA"><br>

                <label for="city" class="listing-form-title">City*</label><br>
                <input required class="listing-form-input listing-form-placeholder" type="text" id="city" name="city"
                    placeholder="e.g. Utrecht"><br>


                <label for="defImageBtn" class="listing-form-title">Upload picture (PNG or JPG)*</label><br>
                <button class="listing-form-image" id="newImageBtn" @click="defaulfBtnActive"></button>
                <input type="file" id="defImageBtn" name="defImageBtn" accept="image/png, image/jpeg"
                    @click="defaulfBtnActive">
                <br>

                <label for="price" class="listing-form-title">Price*</label><br>
                <input required class="listing-form-input listing-form-placeholder" type="text" id="price" name="price"
                    placeholder="e.g. €150.000"><br>

                <div class="listing-form-two-columns">
                    <div>
                        <label for="size" class="listing-form-title">Size*</label><br>
                        <input required class="listing-form-input listing-form-placeholder" type="text" id="size"
                            name="size" placeholder="e.g. 60m2"><br>
                    </div>
                    <div>
                        <label required for="garage" class="listing-form-title">Garage*
                            <select id="garage" name="garage" class="listing-form-input listing-forma">
                                <option selected>Select</option>
                                <option>Yes</option>
                                <option>No</option>
                            </select>
                        </label>
                    </div>
                    <div><label for=" bedroom" class="listing-form-title">Bedrooms*</label><br>
                        <input required class="listing-form-input listing-form-placeholder" type="text" id="bedroom"
                            name="bedroom" placeholder="Enter amount"><br>
                    </div>
                    <div><label for="bathroom" class="listing-form-title">Bathrooms*</label><br>
                        <input required class="listing-form-input listing-form-placeholder" type="text" id="bathroom"
                            name="bathroom" placeholder="Enter amount"><br>
                    </div>
                </div>

                <label for="constructionDate" class="listing-form-title">Construction date*</label><br>
                <input required class="listing-form-input listing-form-placeholder" type="text" id="constructionDate"
                    name="constructionDate" placeholder="e.g. 1990"><br>

                <label for="description" class="listing-form-title">Description*</label><br>
                <input required class="listing-form-input listing-form-placeholder listing-form-description" type="text"
                    id="description" name="description" placeholder="Enter description"><br>

                <input class="listing-submit" type="submit" value="POST">
            </form>
        </div>
    </div>
</template>

<script setup>
const defaultBtn = document.querySelector('#defImageBtn')
const newBtn = document.querySelector('#newImageBtn')
function defaulfBtnActive() {
    console.log(defaultBtn)
    document.getElementById('defImageBtn').click();
}
</script>

<style lang="scss" scoped>
.listing {
    background-image: url(/png/img_background@3x.png);
    background-repeat: no-repeat;
    background-size: cover;
    margin-left: 300px;
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding: 40px 0;

    &-back {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 10px;

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

    &-title {
        font-family: var(--montserrat);
        font-size: 32px;
        font-weight: 700;
        color: var(--text-primary);
    }

    &-submit {
        background: var(--primary);
        border: none;
        border-radius: 10px;
        padding: 15px;
        margin-left: 40%;
        margin-top: 25px;
        width: 60%;
        opacity: 0.5;
        font-family: var(--montserrat);
        font-size: 18px;
        font-weight: 600;
        color: var(--background2)
    }
}

.listing-form {
    display: flex;
    flex-direction: column;
    width: 390px;

    &-title {
        font-family: var(--open-sans);
        font-size: 14px;
        font-weight: 600;
        color: var(--text-secondary);
    }

    &-placeholder {
        font-family: var(--open-sans);
        font-weight: 400;
        font-size: 14px;
    }

    &-input {
        background: var(--background2);
        border: none;
        border-radius: 10px;
        padding: 15px;
        margin: 10px 0;
        width: -webkit-fill-available;
    }

    &-two-columns {
        display: grid;
        grid-template-columns: repeat((2, 48%));
        gap: 20px;
    }

    &-image {
        width: 125px;
        height: 125px;
        border: 2px dashed var(--quaternary);
        background: transparent;

        // &__input {
        //     width: 125px;
        //     height: 125px;
        // }
    }

    &-description {
        height: 150px;
        // text-align: left;
        // vertical-align: top;
    }

    &-description::placeholder {
        position: absolute;
        top: 10px;
        left: 10px;
        padding: 10px;

    }
}
</style>