<template>
  <span class="p-float-label" :class="{ 'mt-4 mt-lg-5': extraMarginTop }">
    <Dropdown
      v-model="inputValue"
      :disabled="disabled"
      :options="options"
      optionLabel="title"
      class="wrapper-dropdown"
      :placeholder="placeholder"
      :style="`max-width: ${width}; min-width: ${width};`"
    />
    <label for="dd-city">{{ placeholder }}</label>
  </span>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, ref, Ref, watch } from "vue";
import Dropdown from "primevue/dropdown";

const props = defineProps({
  label: String,
  modelValue: Object,
  inputRequired: {
    type: Boolean,
    default: true,
  },
  extraMarginTop: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  inlineLabel: {
    type: Boolean,
    default: false,
  },
  width: {
    type: String,
    default: "150px",
  },
  placeholder: {
    type: String,
    default: "",
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  removeMargin: {
    type: Boolean,
    default: false,
  },
  options: {
    type: Array,
    default: () => [],
  },
});

const inputValue: Ref<object> = ref({});

const emit = defineEmits(["update:modelValue"]);

watch(
  () => props.modelValue,
  (val) => {
    inputValue.value = val;
  },
  { immediate: true }
);

watch(inputValue, (val) => {
  emit("update:modelValue", val);
});
</script>

<style lang="scss" scoped>
.wrapper-dropdown {
  & > :first-child {
    text-align: start !important;
  }
}
</style>
