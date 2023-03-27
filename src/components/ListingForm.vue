<template>
    <div class="listing">
        <div class="listing-form">
            <form @submit.prevent="handleSubmit">
                <label for=" street" class="listing-form-title">Street name*</label>
                <input required class="listing-form-input listing-form-placeholder" type="text" name="street"
                    placeholder="Enter the street name" v-model="currentHouse.streetName">

                <div class="listing-form-two-columns">
                    <div>
                        <label for="houseNum" class="listing-form-title">House number*</label>
                        <input required class="listing-form-input listing-form-placeholder" type="text" name="houseNum"
                            placeholder="Enter house number" v-model="currentHouse.houseNumber">
                    </div>
                    <div>
                        <label for="addition" class="listing-form-title">Addition
                            (optional)</label>
                        <input class="listing-form-input listing-form-placeholder" type="text" name="addition"
                            placeholder="e.g. A" v-model="currentHouse.numberAddition">
                    </div>

                </div>
                <label for="postCode" class="listing-form-title">Postal code*</label>
                <input required class="listing-form-input listing-form-placeholder" type="text" name="postCode"
                    placeholder="e.g. 1000 AA" v-model="currentHouse.zip">
                <label for="city" class="listing-form-title">City*</label>
                <input required class="listing-form-input listing-form-placeholder" type="text" name="city"
                    placeholder="e.g. Utrecht" v-model="currentHouse.city">

                <label for="defImageBtn" class="listing-form-title">Upload picture (PNG or JPG)*</label>
                <div class="listing-form-block">
                    <div class="listing-form-block listing-form-block-active" v-if="currentImageUrl == ''"
                        @click="uploadImage">
                    </div>
                    <div class="listing-form-block" v-else>
                        <img class="listing-form-block__image" :src='currentImageUrl'>
                        <div class="listing-form-block-remove" @click="deleteImage"></div>
                    </div>
                    <input :required="currentImageUrl === ''" class="listing-form-block-input-file" type="file"
                        ref="inputFile" @change="displayImage" name="defImageBtn" accept="image/png, image/jpeg">
                </div>

                <label for="price" class="listing-form-title">Price*</label>
                <input required class="listing-form-input listing-form-placeholder" type="text" name="price"
                    placeholder="e.g. €150.000" v-model="currentHouse.price">

                <div class="listing-form-two-columns">
                    <div>
                        <label for="size" class="listing-form-title">Size*</label>
                        <input required class="listing-form-input listing-form-placeholder" type="text" name="size"
                            placeholder="e.g. 60m2" v-model="currentHouse.size">
                    </div>
                    <div class="garage-block">
                        <label for="garage" class="listing-form-title">Garage*</label>
                        <select required name="garage" class="listing-form-input  garage-block-select"
                            v-model="currentHouse.hasGarage">
                            <option disabled selected class="garage-block-option" value="Select">Select</option>
                            <option class="garage-block-option" value="true">Yes</option>
                            <option class="garage-block-option" value="false">No</option>
                        </select>

                        <span class='garage-block-arrows'></span>
                    </div>
                </div>
                <div class="listing-form-two-columns">
                    <div>
                        <label for=" bedroom" class="listing-form-title">Bedrooms*</label><br>
                        <input required class="listing-form-input listing-form-placeholder" type="text" name="bedroom"
                            placeholder="Enter amount" v-model="currentHouse.bedrooms"><br>
                    </div>
                    <div><label for="bathroom" class="listing-form-title">Bathrooms*</label><br>
                        <input required class="listing-form-input listing-form-placeholder" type="text" name="bathroom"
                            placeholder="Enter amount" v-model="currentHouse.bathrooms"><br>
                    </div>
                </div>

                <label for="constructionDate" class="listing-form-title">Construction date*</label><br>
                <input required class="listing-form-input listing-form-placeholder" type="text" name="constructionDate"
                    placeholder="e.g. 1990" v-model="currentHouse.constructionYear"><br>
                <label for="description" class="listing-form-title">Description*</label><br>
                <textarea required class="listing-form-input listing-form-placeholder listing-form-description" type="text"
                    name="description" placeholder="Enter description" v-model="currentHouse.description" /><br>

                <input v-if='houseId === undefined' class="listing-submit" type="submit" value="POST">
                <input v-else class="listing-submit" type="submit" value="SAVE">
            </form>
        </div>
    </div>
</template>

<script setup>
import { onUpdated, ref } from 'vue';
import { useHousesStore } from '@/stores/houseStore.js'
import { useRouter } from 'vue-router'
const router = useRouter()

const housesStore = useHousesStore()
const props = defineProps({
    houseId: {
        type: String,
    },
})

const currentHouse = ref({
    price: 123,
    bedrooms: 1,
    bathrooms: 2,
    size: 55,
    streetName: 'Laliala',
    houseNumber: 123,
    numberAddition: 'X',
    zip: '1234XY',
    city: 'Lalala',
    constructionYear: 2001,
    hasGarage: true,
    description: 'Foooo',
})
const currentImageUrl = ref('') // specified as a path to src

const inputFile = ref(); // hidden input button
const imageFile = ref(null) // image path to send request

function uploadImage() {
    inputFile.value.click();
}

function displayImage() {
    const image = inputFile.value.files[0]
    imageFile.value = image
    if (image.size < 2000000) {
        currentImageUrl.value = URL.createObjectURL(image)
    } else {
        alert("Image size more than 2MB");
    }
}

function deleteImage() {
    currentImageUrl.value = ''
    inputFile.value.value = ''
}

function handleSubmit() {
    console.log('handlesubmit - ', currentHouse.value)
    if (props.houseId === undefined) {
        housesStore.createNewHouse(currentHouse.value, imageFile.value)
        router.push('/')
    } else {
        housesStore.editHouse(props.houseId, currentHouse.value, imageFile.value)
        router.push(`/house/${props.houseId}`)
    }
}

const addressRegex = /^(.+?)\s+(\d+)(\w*)$/

function parseAddress(address) {
    const matches = address.match(addressRegex)
    if (!matches) {
        return null
    }

    const street = matches[1]
    const number = parseInt(matches[2])
    const additional = matches[3]

    return { street, number, additional }
}

onUpdated(async () => {
    const house = housesStore.getHouseById(props.houseId)
    const address = parseAddress(house.location.street)
    currentImageUrl.value = house.image
    currentHouse.value = {
        price: house.price,
        bedrooms: house.rooms.bedrooms,
        bathrooms: house.rooms.bathrooms,
        size: house.size,
        streetName: address.street,
        houseNumber: address.number,
        numberAddition: address.additional,
        zip: house.location.zip,
        city: house.location.city,
        constructionYear: house.constructionYear,
        hasGarage: house.hasGarage,
        description: house.description,
    }
})
</script>

<style lang="scss" scoped>
.listing {
    margin: 0 300px;
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding-bottom: 40px;
    max-width: 100vw;

    @media screen and (max-width: 1150px) {
        margin: 40px 150px;
    }

    @media screen and (max-width: 767px) {
        margin: 40px 30px;
    }

    &-submit {
        background: var(--primary);
        border: none;
        border-radius: 10px;
        padding: 15px;
        margin-left: 40%;
        margin-top: 25px;
        width: 60%;
        font-family: var(--montserrat);
        font-size: var(--buttons-n-tabs-desktop);
        font-weight: var(--semibold);
        color: var(--background2);
        cursor: pointer;

        @media screen and (max-width: 767px) {
            margin: 0;
            width: 100%;
            font-size: var(--buttons-n-tabs-desktop);
        }
    }
}

.listing-form {
    display: flex;
    flex-direction: column;
    width: 400px;

    @media screen and (max-width: 767px) {
        width: 100%;
    }

    &-title {
        font-family: var(--open-sans);
        font-size: var(--input-title-desktop);
        font-weight: var(--semibold);
        color: var(--text-secondary);

        @media screen and (max-width: 767px) {
            font-size: var(--input-title-mobile);
        }
    }

    &-placeholder {
        font-family: var(--open-sans);
        font-weight: var(--regular);
        font-size: var(--input-title-desktop);

        @media screen and (max-width: 767px) {
            font-size: var(--input-title-mobile);
        }
    }

    &-input {
        background: var(--background2);
        border: none;
        border-radius: 10px;
        padding: 15px;
        margin: 10px 0;
        width: inherit;
        outline: none;
        font-size: var(--input-field-desktop);
        pointer-events: painted;

        @media screen and (max-width: 767px) {
            width: 100%;
            font-size: var(--input-field-mobile);
        }
    }

    &-two-columns {
        display: flex;
        justify-content: space-between;
        gap: 10px;

        @media screen and (max-width: 767px) {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
        }
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

        &-input-file {
            width: 1px;
            height: 1px;
            position: absolute;
            left: 50%;
            top: 50%;
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
        position: relative;

        @media screen and (max-width: 767px) {
            margin-left: 0;
        }

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
            font-size: var(--input-field-desktop);
            font-family: var(--open-sans);
            color: var(--quaternary);
            font-weight: var(--semibold);
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

form:invalid {
    font-size: var(--error-message-desktop);
    font-style: italic;

    @media screen and (max-width: 767px) {
        font-size: var(--error-message-mobile);
    }
}

select {
    height: 50px;
}
</style>