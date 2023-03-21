<template>
    <div class="listing">
        <div class="listing-form">
            <form @submit="{ $event.preventDefault(); api.editHouse(house.id, house) }">
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
                <div class="listing-form-block listing-form-block-active" v-if="imgUrl == ''" ref="imgArea"
                    @click="uploadImage"></div>
                <div class="listing-form-block" v-else>
                    <img class="listing-form-block__image" :src='imgUrl' alt="" ref="img">
                    <div class="listing-form-block-remove" @click="deleteImage"></div>
                </div>
                <input hidden required type="file" ref="inputFile" @change="displayImage" name="defImageBtn"
                    accept="image/png, image/jpeg">
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
                    <div class="garage-block">
                        <label required for="garage" class="listing-form-title">Garage*
                            <select id="garage" name="garage" class="listing-form-input  garage-block-select">
                                <option disabled selected class="garage-block-option" value="Select">Select</option>
                                <option class="garage-block-option" value="true">Yes</option>
                                <option class="garage-block-option" value="false">No</option>
                            </select>
                        </label>
                        <span class='garage-block-arrows'></span>
                    </div>
                    <div>
                        <label for=" bedroom" class="listing-form-title">Bedrooms*</label><br>
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
import { ref } from 'vue';
const inputFile = ref();
const imgArea = ref();
const img = ref();
const imgUrl = ref('')

function uploadImage() {
    inputFile.value.click();
}

function displayImage() {
    const image = inputFile.value.files[0]
    if (image.size < 2000000) {
        const reader = new FileReader();
        reader.onload = () => {
            console.log("onload")
            // const allImg = imgArea.querySelectorAll('img');
            // allImg.forEach(item=> item.remove());
            imgUrl.value = reader.result;
            img.src = imgUrl;
            img.alt = image.name;
        }
        reader.readAsDataURL(image);
    } else {
        alert("Image size more than 2MB");
    }
}

function deleteImage() {
    imgUrl.value = ''
    img.src = imgUrl;
    inputFile.value.value = ''
    console.log(imgUrl, 'hello')
}
</script>

<style lang="scss" scoped>
.listing {
    background-image: url(/png/img_background@3x.png);
    background-repeat: no-repeat;
    background-size: cover;
    margin: 0 -300px -40px 0;
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding-bottom: 40px;

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
        margin-bottom: 5px;
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
        outline: none;
    }

    &-two-columns {
        display: grid;
        grid-template-columns: repeat((2, 48%));
        gap: 20px;
    }

    &-block {
        margin: 10px 0 10px 0;
        width: 130px;
        height: 130px;
        position: relative;

        &-active {
            border: 2px dashed var(--quaternary);
            background: url('/png/ic_upload@3x.png');
            background-repeat: no-repeat;
            background-size: 30px 30px;
            background-position: center;
        }

        &-remove {
            width: 20px;
            height: 20px;
            background: url('/png/ic_clear_white@3x.png');
            object-fit: cover;
            background-repeat: no-repeat;
            background-size: 25px 25px;
            background-position: center;
            position: absolute;
            left: 120px;
            top: -5px;
        }

        &-remove:hover {
            width: 20px;
            height: 20px;
            background: url('/png/ic_clear@3x.png');
            object-fit: cover;
            background-repeat: no-repeat;
            background-size: 20px 20px;
            background-position: center;
            border-radius: 50%;
        }

        &__image {
            width: inherit;
            height: inherit;
            object-fit: cover;
            border-radius: 10px;
        }
    }

    .garage-block {
        position: relative;

        &-arrows {
            display: block;
            position: absolute;
            background: var(--background2);
            top: 30px;
            right: 2px;
            width: 30px;
            height: 45px;
            border-radius: 10px;
            pointer-events: none;
        }

        &-arrows::before {
            content: '< >';
            position: absolute;
            top: 12px;
            right: 5px;
            font-size: 15px;
            font-family: var(--open-sans);
            color: var(--quaternary);
            font-weight: 600;
            transform: rotate(90deg);
        }

        .garage-block-select option {
            color: var(--quaternary);
        }


    }

    // &__input {
    //     width: 125px;
    //     height: 125px;
    // }

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

.active {}
</style>