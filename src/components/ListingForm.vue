<template>
  <div class="listing">
    <div class="listing-form">
      <form @submit.prevent="handleSubmit">
        <!-- street block -->
        <label for="street" class="listing-form-title">Street name*</label>
        <!-- classes for displaying validation errors - :class="{ 'listing-form-input__invalid': v$.house.streetName/houseNumber/etc.$errors.length }" -->
        <input
          v-model="v$.house.streetName.$model"
          class="listing-form-input listing-form-placeholder"
          :class="{
            'listing-form-input__invalid': v$.house.streetName.$errors.length,
          }"
          type="text"
          name="street"
          placeholder="Enter the street name"
        />
        <div
          v-if="v$.house.streetName.$errors.length"
          class="listing-form-input__invalid__message"
        >
          {{ v$.house.streetName.$errors[0].$message }}
        </div>

        <div class="listing-form-two-columns">
          <!-- number of house block -->
          <div>
            <label for="houseNum" class="listing-form-title"
              >House number*</label
            >
            <input
              v-model="v$.house.houseNumber.$model"
              class="listing-form-input listing-form-placeholder"
              :class="{
                'listing-form-input__invalid':
                  v$.house.houseNumber.$errors.length,
              }"
              type="number"
              name="houseNum"
              placeholder="Enter house number"
            />
            <div
              v-if="v$.house.houseNumber.$errors.length"
              class="listing-form-input__invalid__message"
            >
              {{ v$.house.houseNumber.$errors[0].$message }}
            </div>
          </div>

          <!-- addition block -->
          <div>
            <label for="addition" class="listing-form-title"
              >Addition (optional)</label
            >
            <input
              v-model="state.numberAddition"
              class="listing-form-input listing-form-placeholder"
              type="text"
              name="addition"
              placeholder="e.g. A"
            />
          </div>
        </div>

        <!-- zip block -->
        <label for="postCode" class="listing-form-title">Postal code*</label>
        <input
          v-model="v$.house.zip.$model"
          class="listing-form-input listing-form-placeholder"
          :class="{
            'listing-form-input__invalid': v$.house.zip.$errors.length,
          }"
          type="text"
          name="postCode"
          placeholder="e.g. 1000 AA"
        />
        <div
          v-if="v$.house.zip.$errors.length"
          class="listing-form-input__invalid__message"
        >
          {{ v$.house.zip.$errors[0].$message }}
        </div>

        <!-- name of city block -->
        <label for="city" class="listing-form-title">City*</label>
        <input
          v-model="v$.house.city.$model"
          class="listing-form-input listing-form-placeholder"
          :class="{
            'listing-form-input__invalid': v$.house.city.$errors.length,
          }"
          type="text"
          name="city"
          placeholder="e.g. Utrecht"
        />
        <div
          v-if="v$.house.city.$errors.length"
          class="listing-form-input__invalid__message"
        >
          {{ v$.house.city.$errors[0].$message }}
        </div>

        <!-- upload picture block -->
        <label for="defImageBtn" class="listing-form-title"
          >Upload picture (PNG or JPG)*</label
        >
        <div
          v-if="v$.imgUrl.$errors.length"
          class="listing-form-input__invalid__message"
        >
          {{ v$.imgUrl.$errors[0].$message }}
        </div>
        <div class="listing-form-block">
          <!-- displays an empty field for uploading an image (when creating a new house) -->
          <div
            v-if="v$.imgUrl.$model == ''"
            class="listing-form-block listing-form-block-active"
            :class="{
              'listing-form-block-active__invalid': v$.imgUrl.$errors.length,
            }"
            @click="uploadImage"
          ></div>
          <!-- displays an image of house (when editing house) -->
          <div v-else class="listing-form-block">
            <img class="listing-form-block__image" :src="v$.imgUrl.$model" />
            <div class="listing-form-block-remove" @click="deleteImage"></div>
          </div>
          <!-- hidden button  -->
          <input
            ref="inputFile"
            class="listing-form-block-input-file"
            type="file"
            name="defImageBtn"
            accept="image/png, image/jpeg"
            @change="displayImage"
          />
        </div>

        <!-- price block -->
        <label for="price" class="listing-form-title">Price*</label>
        <input
          v-model="v$.house.price.$model"
          class="listing-form-input listing-form-placeholder"
          :class="{
            'listing-form-input__invalid': v$.house.price.$errors.length,
          }"
          type="number"
          name="price"
          placeholder="e.g. €150000"
        />
        <div
          v-if="v$.house.price.$errors.length"
          class="listing-form-input__invalid__message"
        >
          {{ v$.house.price.$errors[0].$message }}
        </div>

        <div class="listing-form-two-columns">
          <!-- size block -->
          <div>
            <label for="size" class="listing-form-title">Size*</label>
            <input
              v-model="v$.house.size.$model"
              class="listing-form-input listing-form-placeholder"
              :class="{
                'listing-form-input__invalid': v$.house.size.$errors.length,
              }"
              type="number"
              name="size"
              placeholder="e.g. 60m2"
            />
            <div
              v-if="v$.house.size.$errors.length"
              class="listing-form-input__invalid__message"
            >
              {{ v$.house.size.$errors[0].$message }}
            </div>
          </div>

          <!-- garage block -->
          <div class="garage-block">
            <label for="garage" class="listing-form-title">Garage*</label>
            <select
              v-model="v$.house.hasGarage.$model"
              name="garage"
              class="listing-form-input garage-block-select"
              :class="{
                'listing-form-input__invalid':
                  v$.house.hasGarage.$errors.length,
              }"
            >
              <option disabled selected class="garage-block-option" value="">
                Select
              </option>
              <option class="garage-block-option" value="true">Yes</option>
              <option class="garage-block-option" value="false">No</option>
            </select>
            <span class="garage-block-arrows"></span>
            <div
              v-if="v$.house.hasGarage.$errors.length"
              class="listing-form-input__invalid__message"
            >
              Choose option
            </div>
          </div>
        </div>

        <div class="listing-form-two-columns">
          <!-- bedroom quantity block. -->
          <div>
            <label for=" bedroom" class="listing-form-title">Bedrooms*</label>
            <input
              v-model="v$.house.bedrooms.$model"
              class="listing-form-input listing-form-placeholder"
              :class="{
                'listing-form-input__invalid': v$.house.bedrooms.$errors.length,
              }"
              type="number"
              name="bedroom"
              placeholder="Enter amount"
            />
            <div
              v-if="v$.house.bedrooms.$errors.length"
              class="listing-form-input__invalid__message"
            >
              {{ v$.house.bedrooms.$errors[0].$message }}
            </div>
          </div>

          <!-- bathroom quantity block. -->
          <div>
            <label for="bathroom" class="listing-form-title">Bathrooms*</label>
            <input
              v-model="v$.house.bathrooms.$model"
              class="listing-form-input listing-form-placeholder"
              :class="{
                'listing-form-input__invalid':
                  v$.house.bathrooms.$errors.length,
              }"
              type="number"
              name="bathroom"
              placeholder="Enter amount"
            />
            <div
              v-if="v$.house.bathrooms.$errors.length"
              class="listing-form-input__invalid__message"
            >
              {{ v$.house.bathrooms.$errors[0].$message }}
            </div>
          </div>
        </div>

        <!-- construction date block -->
        <label for="constructionDate" class="listing-form-title"
          >Construction date*</label
        >
        <input
          v-model="v$.house.constructionYear.$model"
          class="listing-form-input listing-form-placeholder"
          :class="{
            'listing-form-input__invalid':
              v$.house.constructionYear.$errors.length,
          }"
          type="number"
          name="constructionDate"
          placeholder="e.g. 1990"
        />
        <div
          v-if="v$.house.constructionYear.$errors.length"
          class="listing-form-input__invalid__message"
        >
          {{ v$.house.constructionYear.$errors[0].$message }}
        </div>

        <!-- description block -->
        <label for="description" class="listing-form-title">Description*</label>
        <textarea
          v-model="v$.house.description.$model"
          class="listing-form-input listing-form-placeholder listing-form-description"
          :class="{
            'listing-form-input__invalid': v$.house.description.$errors.length,
          }"
          type="text"
          name="description"
          placeholder="Enter description"
        ></textarea>
        <div
          v-if="v$.house.description.$errors.length"
          class="listing-form-input__invalid__message"
        >
          {{ v$.house.description.$errors[0].$message }}
        </div>

        <input
          v-if="!houseId"
          :disabled="v$.$invalid"
          class="listing-submit"
          type="submit"
          value="POST"
        />
        <input v-else class="listing-submit" type="submit" value="SAVE" />
      </form>
    </div>
    <div v-if="error != ''" class="error">{{ error }}</div>
  </div>
</template>

<script setup>
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { onMounted, ref, reactive } from "vue";
import { useHousesStore } from "@/stores/houseStore.js";
import { useRouter } from "vue-router";
const router = useRouter();

const housesStore = useHousesStore();
const props = defineProps({
  houseId: {
    type: String,
    default: "",
  },
});

const state = ref({
  house: {
    price: "",
    bedrooms: "",
    bathrooms: "",
    size: "",
    streetName: "",
    houseNumber: "",
    numberAddition: "",
    zip: "",
    city: "",
    constructionYear: "",
    hasGarage: "",
    description: "",
  },
  imgUrl: "",
});

const rules = {
  house: {
    price: { required },
    bedrooms: { required },
    bathrooms: { required },
    size: { required },
    streetName: { required },
    houseNumber: { required },
    zip: { required },
    city: { required },
    constructionYear: { required },
    hasGarage: { required },
    description: { required },
  },
  imgUrl: { required },
};

const v$ = useVuelidate(rules, state);

const addressRegex = /^(.+?)\s+(\d+)(\w*)$/;

function parseAddress(address) {
  const matches = address.match(addressRegex);
  if (!matches) {
    return null;
  }

  const street = matches[1];
  const number = parseInt(matches[2]);
  const additional = matches[3];

  return { street, number, additional };
}

onMounted(() => {
  if (props.houseId) {
    const house = housesStore.getHouseById(props.houseId);
    const address = parseAddress(house.location.street);
    state.value.house = {
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
    };
    state.value.imgUrl = house.image;
  }
});

const inputFile = ref(); // hidden input button
const imageFile = ref(null); // image path to send request

function uploadImage() {
  inputFile.value.click();
}

function displayImage() {
  const image = inputFile.value.files[0];
  imageFile.value = image;
  if (image.size < 5000000) {
    state.value.imgUrl = URL.createObjectURL(image);
    v$.value.imgUrl.$touch();
  } else {
    alert("Image size more than 5MB");
  }
}

function deleteImage() {
  state.value.imgUrl = "";
  inputFile.value.value = "";
  v$.value.imgUrl.$touch();
}

const error = ref("");
async function handleSubmit() {
  try {
    if (!props.houseId) {
      const newHouseId = await housesStore.createNewHouse(
        state.value.house,
        imageFile.value
      );
      router.push(`/house/${newHouseId}`);
    } else {
      await housesStore.editHouse(
        props.houseId,
        state.value.house,
        imageFile.value
      );
      router.push(`/house/${props.houseId}`);
    }
  } catch (e) {
    error.value = "Something went wrong. Reload the page and try again later.";
  }
}
</script>

<style lang="scss" scoped>
.listing {
  margin: 0 300px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding-bottom: 40px;
  max-width: 100vw;
  position: relative;

  @media screen and (max-width: 1200px) {
    margin: 0 150px;
  }

  @media screen and (max-width: 767px) {
    margin: 0 30px;
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
    opacity: 1;

    @media screen and (max-width: 767px) {
      margin: 0;
      width: 100%;
      font-size: var(--buttons-n-tabs-desktop);
    }
  }

  &-submit:disabled {
    opacity: 0.7;
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
    font-style: normal;

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

    &__invalid {
      border: 2px solid var(--primary);

      &__message {
        font-size: var(--error-message-desktop);
        font-style: italic;
        margin: 5px 0 15px 0;
        color: var(--primary);

        @media screen and (max-width: 767px) {
          font-size: var(--error-message-mobile);
        }
      }
    }

    &__invalid::placeholder {
      color: red;
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
      background: url("/png/ic_upload@3x.png");
      background-repeat: no-repeat;
      background-size: 30px 30px;
      background-position: center;

      &__invalid {
        border: 2px dashed var(--primary);
      }
    }

    &-remove {
      width: 20px;
      height: 20px;
      background: url("/png/ic_clear_white@3x.png");
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
      background: url("/png/ic_clear@3x.png");
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
      content: "< >";
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
    top: 5px;
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

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.error {
  font-family: var(--montserrat);
  font-size: var(--buttons-n-tabs-desktop);
  font-weight: var(--bold);
  color: var(--tertiary);
  font-style: italic;
  background: var(--secondary);
  text-align: center;
  opacity: 0.8;
  border-radius: 15px;
  position: absolute;
  top: 50%;
  right: 35%;
  width: 525px;
  height: 125px;
  display: flex;
  align-items: center;

  @media screen and (max-width: 1200px) {
    top: 50%;
    right: 20%;
  }

  @media screen and (max-width: 767px) {
    top: 35%;
    right: 0%;
    width: inherit;
  }
}
</style>
