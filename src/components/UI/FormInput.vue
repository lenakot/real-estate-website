<template>
  <label :for="`${name}`" class="listing-form-title">{{ label }}</label>
  <input
    v-if="!textArea"
    :value="modelValue"
    class="listing-form-input listing-form-placeholder"
    :class="{ 'listing-form-input__invalid': errors ? errors.length : false }"
    :type="`${type}`"
    :name="`${name}`"
    :placeholder="`${placeholder}`"
    @input="$emit('update:modelValue', $event.target.value)"
  />
  <textarea
    v-else
    :value="modelValue"
    class="listing-form-input listing-form-placeholder listing-form-description"
    :class="{ 'listing-form-input__invalid': errors ? errors.length : false }"
    :type="`${type}`"
    :name="`${name}`"
    :placeholder="`${placeholder}`"
    @input="$emit('update:modelValue', $event.target.value)"
  ></textarea>
  <div
    v-if="errors && errors.length"
    class="listing-form-input__invalid__message"
  >
    {{ errors[0].$message }}
  </div>
</template>

<script setup>
// Event that lets parent component (Listing Form) know that input value was changed, it allows to use v-model
const emits = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: {
    type: null,
    required: true,
  },
  errors: {
    type: Object,
    default: null,
  },
  type: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  textArea: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
.listing-form {
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
      border: 1px solid red;

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

    &__invalid::placeholder {
      color: red;
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

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
