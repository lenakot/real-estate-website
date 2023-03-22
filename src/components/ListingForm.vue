<template>
    <div class="listing">
        <div class="listing-form">
            <form @submit="{ $event.preventDefault(); housesStore.createNewHouse(house, imageFile) }">
                streetName - {{ house.streetName }}
                <label for="street" class="listing-form-title">Street name*</label><br>
                <input required class="listing-form-input listing-form-placeholder" type="text" id="street" name="street"
                    placeholder="Enter the street name" v-model="house.streetName"><br>

                <div class="listing-form-two-columns">
                    <div>
                        streetNum - {{ house.houseNumber }}
                        <label for="houseNum" class="listing-form-title">House number*</label><br>
                        <input required class="listing-form-input listing-form-placeholder" type="text" id="houseNum"
                            name="houseNum" placeholder="Enter house number" v-model="house.houseNumber"><br>
                    </div>

                    <div>
                        addit - {{ house.numberAddition }}
                        <label for="addition" class="listing-form-title">Addition
                            (optional)</label><br>
                        <input class="listing-form-input listing-form-placeholder" type="text" id="addition" name="addition"
                            placeholder="e.g. A" v-model="house.numberAddition"><br>
                    </div>

                </div>
                post - {{ house.zip }}
                <label for="postCode" class="listing-form-title">Postal code*</label><br>
                <input required class="listing-form-input listing-form-placeholder" type="text" id="postCode"
                    name="postCode" placeholder="e.g. 1000 AA" v-model="house.zip"><br>
                city - {{ house.city }}
                <label for="city" class="listing-form-title">City*</label><br>
                <input required class="listing-form-input listing-form-placeholder" type="text" id="city" name="city"
                    placeholder="e.g. Utrecht" v-model="house.city"><br>


                <label for="defImageBtn" class="listing-form-title">Upload picture (PNG or JPG)*</label><br>
                <div class="listing-form-block listing-form-block-active" v-if="imgUrl == ''" @click="uploadImage"></div>
                <div class="listing-form-block" v-else>
                    <img class="listing-form-block__image" :src='imgUrl'>
                    <div class="listing-form-block-remove" @click="deleteImage"></div>
                </div>
                <input hidden required type="file" ref="inputFile" @change="displayImage" name="defImageBtn"
                    accept="image/png, image/jpeg">
                <br>

                House PRICE - {{ house.price }}
                <label for="price" class="listing-form-title">Price*</label><br>
                <input required class="listing-form-input listing-form-placeholder" type="text" id="price" name="price"
                    placeholder="e.g. €150.000" v-model="house.price"><br>

                <div class="listing-form-two-columns">
                    <div>
                        SIZE - {{ house.size }}
                        <label for="size" class="listing-form-title">Size*</label><br>
                        <input required class="listing-form-input listing-form-placeholder" type="text" id="size"
                            name="size" placeholder="e.g. 60m2" v-model="house.size"><br>
                    </div>
                    <div class="garage-block">
                        <label required for="garage" class="listing-form-title">Garage*</label>
                        <select id="garage" name="garage" class="listing-form-input  garage-block-select"
                            v-model="house.hasGarage">
                            <option disabled selected class="garage-block-option" value="Select">Select</option>
                            <option class="garage-block-option" value="true">Yes</option>
                            <option class="garage-block-option" value="false">No</option>
                        </select>

                        <span class='garage-block-arrows'></span>
                    </div>
                </div>
                <div class="listing-form-two-columns">
                    <div>
                        ROOMS - {{ house.bedrooms }}
                        <label for=" bedroom" class="listing-form-title">Bedrooms*</label><br>
                        <input required class="listing-form-input listing-form-placeholder" type="text" id="bedroom"
                            name="bedroom" placeholder="Enter amount" v-model="house.bedrooms"><br>
                    </div>
                    <div><label for="bathroom" class="listing-form-title">Bathrooms*</label><br>
                        <input required class="listing-form-input listing-form-placeholder" type="text" id="bathroom"
                            name="bathroom" placeholder="Enter amount" v-model="house.bathrooms"><br>
                    </div>
                </div>

                <label for="constructionDate" class="listing-form-title">Construction date*</label><br>
                <input required class="listing-form-input listing-form-placeholder" type="text" id="constructionDate"
                    name="constructionDate" placeholder="e.g. 1990" v-model="house.constructionYear"><br>
                DESCRIPTION - {{ house.description }}
                <label for="description" class="listing-form-title">Description*</label><br>
                <textarea required class="listing-form-input listing-form-placeholder listing-form-description" type="text"
                    id="description" name="description" placeholder="Enter description" v-model="house.description" /><br>

                <!-- <input class="listing-submit" v-if='house.streetName' type="submit" value="SAVE"> -->
                <input class="listing-submit" type="submit" value="POST">
            </form>
        </div>
    </div>
</template>

<script setup>
import { onUpdated, ref } from 'vue';
import { useHousesStore } from '@/stores/houseStore.js'

const housesStore = useHousesStore()

const props = defineProps({
    house: {
        type: Object,
        required: true
    }
})

const inputFile = ref();
const imgUrl = ref('')
const imageFile = ref(null)

onUpdated(async () => {
    if (props.house.image !== '') {
        imgUrl.value = props.house.image
    }
    console.log(props.house)
})

function uploadImage() {
    inputFile.value.click();
}

function displayImage() {
    const image = inputFile.value.files[0]
    imageFile.value = image
    if (image.size < 2000000) {
        imgUrl.value = URL.createObjectURL(image)
    } else {
        alert("Image size more than 2MB");
    }
}

function deleteImage() {
    imgUrl.value = ''
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
    width: 400px;

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
        width: inherit;
        outline: none;
    }

    &-two-columns {
        display: flex;
        justify-content: space-between;
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
        display: flex;
        flex-direction: column;
        width: 100%;
        margin-left: 10px;
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

    }

    &-description {
        min-height: 220px;
        overflow-wrap: break-word;
        box-sizing: border-box;
        resize: none;
        overflow: hidden;
    }

    &-description::placeholder {
        position: absolute;
        top: 10px;
        left: 10px;
        padding: 10px;

    }
}

form {
    width: inherit;
}

select {
    height: 50px;
}
</style>