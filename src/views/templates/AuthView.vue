<template>
  <div class="home">
    <LogoProject />

    <div class="py-3"></div>

    <AuthForm :is-logging="isLogging">
      <div class="w-full flex justify-end">
        <ButtonsAuth :is-logging="isLogging" />
      </div>
    </AuthForm>
  </div>

  <div class="my-5 py-5"></div>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
import AuthForm from "@/components/form/AuthForm.vue"; // @ is an alias to /src
import LogoProject from "@/components/videntity/LogoProject.vue"; // @ is an alias to /src
import ButtonsAuth from "@/components/form/ButtonsAuth.vue"; // @ is an alias to /src
import { computed, Ref, ref, watch } from "vue";

const route = useRoute();

const name = computed(() => route.name);
let isLogging: Ref<boolean> = ref(name.value == "login");
watch(name, (name) => {
  isLogging.value = name == "login";
});
</script>
