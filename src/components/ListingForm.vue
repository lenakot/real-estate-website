<template>
  <div class="listing">
    <div class="listing-form">
      <form @submit.prevent="handleSubmit">
        <!-- Street -->
        <FormInput
          v-model="v$.house.streetName.$model"
          :errors="v$.house.streetName.$errors"
          :type="'text'"
          :name="'street'"
          :placeholder="'Enter the street name'"
          :label="'Street name*'"
        />

        <div class="listing-form-two-columns">
          <!-- House number -->
          <div>
            <FormInput
              v-model="v$.house.houseNumber.$model"
              :errors="v$.house.houseNumber.$errors"
              :type="'number'"
              :name="'houseNum'"
              :placeholder="'Enter house number'"
              :label="'House number*'"
            />
          </div>

          <!-- Addition -->
          <div>
            <FormInput
              v-model="state.numberAddition"
              :type="'text'"
              :name="'addition'"
              :placeholder="'e.g. A'"
              :label="'Addition (optional)'"
            />
          </div>
        </div>

        <!-- Zip -->
        <FormInput
          v-model="v$.house.zip.$model"
          :errors="v$.house.zip.$errors"
          :type="'text'"
          :name="'postCode'"
          :placeholder="'e.g. 1000 AA'"
          :label="'Postal code*'"
        />

        <!-- City -->
        <FormInput
          v-model="v$.house.city.$model"
          :errors="v$.house.city.$errors"
          :type="'text'"
          :name="'city'"
          :placeholder="'e.g. Utrecht'"
          :label="'City*'"
        />

        <!-- Upload picture -->
        <FormImage
          v-model="v$.imgUrl.$model"
          :errors="v$.imgUrl.$errors"
          :name="'defImageBtn'"
          :label="'Upload picture (PNG or JPG)*'"
          @change="(file) => (imageFile = file)"
        />

        <!-- Price -->
        <FormInput
          v-model="v$.house.price.$model"
          :errors="v$.house.price.$errors"
          :type="'number'"
          :name="'price'"
          :placeholder="'e.g. €150000'"
          :label="'Price*'"
        />

        <div class="listing-form-two-columns">
          <!-- Size -->
          <div>
            <FormInput
              v-model="v$.house.size.$model"
              :errors="v$.house.size.$errors"
              :type="'number'"
              :name="'size'"
              :placeholder="'e.g. 60m2'"
              :label="'Size*'"
            />
          </div>

          <!-- Garage -->
          <FormSelect
            v-model="v$.house.hasGarage.$model"
            :errors="v$.house.hasGarage.$errors"
            :name="'garage'"
            :label="'Garage*'"
          />
        </div>

        <div class="listing-form-two-columns">
          <!-- Bedroom quantity -->
          <div>
            <FormInput
              v-model="v$.house.bedrooms.$model"
              :errors="v$.house.bedrooms.$errors"
              :type="'number'"
              :name="'bedroom'"
              :placeholder="'Enter amount'"
              :label="'Bedrooms*'"
            />
          </div>

          <!-- Bathroom quantity -->
          <div>
            <FormInput
              v-model="v$.house.bathrooms.$model"
              :errors="v$.house.bathrooms.$errors"
              :type="'number'"
              :name="'bathroom'"
              :placeholder="'Enter amount'"
              :label="'Bathrooms*'"
            />
          </div>
        </div>

        <!-- Construction date -->
        <FormInput
          v-model="v$.house.constructionYear.$model"
          :errors="v$.house.constructionYear.$errors"
          :type="'number'"
          :name="'constructionDate'"
          :placeholder="'e.g. 1990'"
          :label="'Construction date*'"
        />

        <!-- Description -->
        <FormInput
          v-model="v$.house.description.$model"
          :errors="v$.house.description.$errors"
          :type="'text'"
          :name="'description'"
          :placeholder="'Enter description'"
          :label="'Description*'"
          text-area
        />

        <FormSubmitButton :house-id="houseId" :disabled="v$.$invalid" />
      </form>
    </div>
    <div v-if="error != ''" class="error">{{ error }}</div>
  </div>
</template>

<script setup>
import FormInput from "@/components/UI/FormInput.vue";
import FormImage from "@/components/UI/FormImage.vue";
import FormSelect from "@/components/UI/FormSelect.vue";
import FormSubmitButton from "@/components/UI/FormSubmitButton.vue";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { onMounted, ref } from "vue";
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
    // Breaking down a string into street name, house number, and additional information
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

const imageFile = ref(null); // image path to send request

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
}

.listing-form {
  display: flex;
  flex-direction: column;
  width: 400px;

  @media screen and (max-width: 767px) {
    width: 100%;
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
}

form {
  width: inherit;
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
