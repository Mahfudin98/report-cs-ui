<template>
  <input
    ref="inputRef"
    :error-message="errorMessage"
    :error="!!errorMessage"
    v-model="formattedValue"
  />
</template>

<script>
import { useCurrencyInput } from "vue-currency-input";
import { computed, watch } from "vue";

export default {
  props: {
    modelValue: Number,
    options: Object,
    className: String,
  },
  setup(props) {
    const { inputRef, formattedValue, numberValue, setValue } =
      useCurrencyInput(props.options);

    const errorMessage = computed(() =>
      numberValue.value <= 100 ? "Value must be greater than 100" : undefined
    );

    watch(
      () => props.modelValue,
      (value) => {
        setValue(value);
      }
    );

    return { inputRef, formattedValue, errorMessage };
  },
};
</script>
