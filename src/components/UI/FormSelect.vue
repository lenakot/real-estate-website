<template>
  <div class="form-select-block">
    <label :for="`${name}`" class="form-select-title">{{ label }}</label>
    <select
      :value="modelValue"
      :for="`${name}`"
      class="form-select-input"
      :class="{ 'form-select-input__invalid': errors.length }"
      @input="$emit('update:modelValue', $event.target.value)"
    >
      <option disabled selected value="">Select</option>
      <option value="true">Yes</option>
      <option value="false">No</option>
    </select>
    <span class="form-select-arrows"></span>
    <div v-if="errors.length" class="form-select-input__invalid__message">
      Choose option
    </div>
  </div>
</template>

<script setup>
// Event that lets parent component (Listing Form) know that option was selected
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
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.form-select-block {
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;

  @media screen and (max-width: 767px) {
    margin-left: 0;
  }
}

.form-select {
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
  }

  &-arrows {
    display: block;
    position: absolute;
    background: var(--background2);
    top: 33px;
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

select {
  height: 50px;
}
</style>
