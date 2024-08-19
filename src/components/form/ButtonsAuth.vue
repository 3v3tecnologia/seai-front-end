<template>
  <div class="flex flex-col w-full justify-center items-end mt-4">
    <PrimaryButton :text="mainItem.text" />
    <div class="flex justify-center mt-2">
      <router-link
        :to="secondaryItem.routeName"
        class="text-[#002040] text-[12px] hover:text-[#355b81]"
      >
        {{ secondaryItem.text }}
      </router-link>
      <!-- <router-link to="/" class="ml-3 text-dark">
        Continuar sem sessão
      </router-link> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import PrimaryButton from "./PrimaryButton.vue";
import { defineProps, ref, watch } from "vue";
const props = defineProps({
  isLogging: Boolean,
});

const texts = [
  {
    text: "Login",
    routeName: "/login",
  },
  {
    text: "Recuperar conta",
    routeName: "retrieve-account",
  },
];

let mainItem = ref(texts[0]);
let secondaryItem = ref(texts[1]);

watch(
  () => props.isLogging,
  (isLogging) => {
    if (isLogging) {
      [mainItem.value, secondaryItem.value] = texts;
    } else {
      [secondaryItem.value, mainItem.value] = texts;
    }
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped>
.btn {
  &:hover {
    cursor: pointer;
  }
}
</style>
