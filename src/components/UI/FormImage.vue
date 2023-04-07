<template>
  <label :for="`${name}`" class="listing-form-title">{{ label }}</label>
  <div class="listing-form-block">
    <!-- Displays image placeholder (if not selected) -->
    <div
      v-if="modelValue == ''"
      class="listing-form-block listing-form-block-active"
      :class="{
        'listing-form-block-active__invalid': errors.length,
      }"
      @click="uploadImage"
    ></div>

    <!-- Displays image preview (otherwise) -->
    <div v-else class="listing-form-block">
      <img class="listing-form-block__image" :src="modelValue" />
      <div class="listing-form-block-remove" @click="deleteImage"></div>
    </div>

    <!-- Hidden input file -->
    <input
      ref="inputFile"
      class="listing-form-block-input-file"
      type="file"
      :name="`${name}`"
      accept="image/png, image/jpeg"
      @change="displayImage"
    />
  </div>
  <div v-if="errors.length" class="listing-form-input__invalid__message">
    {{ errors[0].$message }}
  </div>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits([
  // Event to update image URL. The event name is special to support v-model attribute
  "update:modelValue",
  // Event to update image file
  "change",
]);

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  errors: {
    type: Object,
    default: null,
  },
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
});

// A reference to input file element
const inputFile = ref();

function uploadImage() {
  inputFile.value.click();
}

function displayImage() {
  const image = inputFile.value.files[0];
  if (image.size < 5000000) {
    emit("update:modelValue", URL.createObjectURL(image));
    emit("change", image);
  } else {
    alert("Image size more than 5MB");
  }
}

function deleteImage() {
  inputFile.value.value = "";
  emit("update:modelValue", "");
  emit("change", null);
}
</script>

<style lang="scss" scoped>
.listing-form-title {
  font-family: var(--open-sans);
  font-size: var(--input-title-desktop);
  font-weight: var(--semibold);
  color: var(--text-secondary);
  font-style: normal;

  @media screen and (max-width: 767px) {
    font-size: var(--input-title-mobile);
  }
}

.listing-form-input {
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
    border: 2px solid red;

    &__message {
      font-size: var(--error-message-desktop);
      font-style: italic;
      margin: 5px 0 15px 0;
      color: red;

      @media screen and (max-width: 767px) {
        font-size: var(--error-message-mobile);
      }
    }
  }
}

.listing-form-block {
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
</style>
