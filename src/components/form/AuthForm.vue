<template>
  <FormWrapper @submit="handleSubmit">
    <template v-slot:content>
      <span v-if="isLogging">
        <div
          class="form-group form-group-text text-left p-float-label mt-2 w-full"
        >
          <InputText
            name="email"
            aria-describedby="culture-name-help"
            v-model="form.login"
            :class="`w-full`"
            required
          />
          <label class="font-weight-bold">E-mail</label>
        </div>
        <div
          class="form-group form-group-text text-left p-float-label mt-8 w-full"
        >
          <Password
            class="password w-full"
            v-model="form.password"
            toggleMask
            :feedback="false"
          />
          <label for="e-mail" class="font-weight-bold">Senha</label>
        </div>
      </span>

      <span v-else>
        <div
          class="form-group form-group-text text-left p-float-label mt-2 w-full"
        >
          <InputText
            name="email"
            aria-describedby="culture-name-help"
            v-model="form.login"
            :class="`w-full`"
            required
          />
          <label class="font-weight-bold">E-mail</label>
          <small v-if="!isEmailValid" class="text-red-500"
            >E-mail inválido</small
          >
        </div>
      </span>
    </template>

    <template v-slot:buttons>
      <slot />
    </template>
  </FormWrapper>
</template>

<script lang="ts" setup>
import BaseInput from "./BaseInput.vue";
import FormWrapper from "./FormWrapper.vue";
import { defineProps } from "vue";
import { ref } from "vue";
import type { Ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const router = useRouter();
const props = defineProps({
  isLogging: Boolean,
});

const store = useStore();

const form: Ref = ref({
  login: "",
  password: "",
});

const isEmailValid: Ref<boolean> = ref(true);

const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const handleSubmit = (e: any) => {
  e.preventDefault();
  isEmailValid.value = validateEmail(form.value.login);

  if (!isEmailValid.value) {
    return;
  }

  const action = props.isLogging ? "LOGIN_USER" : "SEND_EMAIL_CHANGE_PASSWORD";
  console.log(form.value);
  store
    .dispatch(action, form.value)
    .then((r) => {
      if (props.isLogging && !(r instanceof Error) && r) {
        router.push({ path: "/home" });
      }
    })
    .catch();
};
</script>
