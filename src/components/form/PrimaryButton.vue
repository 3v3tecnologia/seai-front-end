<template>
  <Button
    @click="handleClick"
    type="submit"
    class="btn-primary px-4 py-2 text-white w-[200px]"
    :label="props.text"
  />
</template>

<script lang="ts" setup>
import { defineEmits, defineProps } from "vue";

const emit = defineEmits(["click"]);

const handleClick = (e) => {
  emit("click", e);
};

const props = defineProps({
  text: String,
});
</script>

<style lang="scss" scoped>
.btn {
  &:hover {
    cursor: pointer;
  }
}
</style>
