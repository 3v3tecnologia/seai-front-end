<template>
  <div class="w-full h-[60vh] flex justify-center items-center">
    <div
      class="container mx-auto bg-white p-4 rounded-md w-full lg:w-[50%] min-w-[350px]"
    >
      <div class=""><h2>Trocar Senha</h2></div>

      <form @submit.prevent="onSubmit" class="w-full flex flex-col gap-8 mt-4">
        <div
          v-if="!hasCode"
          class="form-group form-group-text text-left p-float-label mt-2 w-full"
        >
          <Password
            id="current-password"
            v-model="form.currentPassword"
            class="w-full"
            required
            toggleMask
            :feedback="false"
          />
          <label for="current-password" class="font-weight-bold"
            >Senha Atual</label
          >
          <small v-if="submitted && !form.currentPassword" class="p-error">
            {{ requiredField }}
          </small>
        </div>
        <div class="w-full flex gap-4">
          <div
            class="form-group form-group-text text-left p-float-label mt-2 w-full"
          >
            <Password
              id="new-password"
              v-model="form.password"
              class="w-full"
              required
              toggleMask
              :feedback="true"
              @focus="onFocus('password')"
            />
            <label for="new-password" class="font-weight-bold"
              >Nova Senha</label
            >
            <small v-if="touched.password && !isPasswordValid" class="p-error">
              A senha deve ter mais de 6 caracteres e conter letras.
            </small>
            <small v-if="submitted && !form.password" class="p-error">
              {{ requiredField }}
            </small>
          </div>

          <div
            class="form-group form-group-text text-left p-float-label mt-2 w-full"
          >
            <Password
              id="confirm-password"
              v-model="form.confirmPassword"
              class="w-full"
              required
              toggleMask
              :feedback="false"
            />
            <label for="confirm-password" class="font-weight-bold"
              >Confirmar Senha</label
            >
            <small v-if="submitted && !form.confirmPassword" class="p-error">
              {{ requiredField }}
            </small>
            <small
              v-if="form.password !== form.confirmPassword"
              class="p-error"
            >
              As senhas não coincidem.
            </small>
          </div>
        </div>
        <Button
          :disabled="!isFormValid() || loading"
          label="Salvar"
          type="submit"
          class="w-50 btn-primary mt-3"
        />
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { UsersRest } from "@/services/users.service";
import { toast } from "vue3-toastify";

const form = ref({
  currentPassword: "",
  password: "",
  confirmPassword: "",
});
const touched = ref({
  password: false,
});

const service = new UsersRest();
const requiredField = "Este campo é obrigatório.";
const submitted = ref(false);
const loading = ref(false);

const currentRoute = useRoute();
const router = useRouter();

const hasCode = computed(() => {
  return currentRoute.params.code;
});

onMounted(() => {
  if (!hasCode.value && !localStorage.getItem("tkn")) {
    router.push("/login");
  }
});
const isPasswordValid = computed(() => {
  return form.value.password.length > 6 && /[a-zA-Z]/.test(form.value.password);
});

function isFormValid() {
  const passwordValid =
    form.value.password &&
    form.value.confirmPassword &&
    form.value.password === form.value.confirmPassword;

  const currentPasswordValid = hasCode.value || form.value.currentPassword;

  return passwordValid && currentPasswordValid && isPasswordValid;
}

const onFocus = (field) => {
  touched.value[field] = true;
};
const onSubmit = () => {
  submitted.value = true;

  if (isFormValid()) {
    loading.value = true;
    console.log(hasCode.value);
    service
      .changePassword(form.value, hasCode.value)
      .then(() => {
        toast.success("senha alterada!");
        setTimeout(() => {
          router.push("/login");
        }, 1000);
      })
      .finally(() => (loading.value = false));
  } else {
    console.error("Verifique os campos de senha.");
  }
};
</script>

<style scoped>
.validation-list {
  list-style-type: none;
  padding: 0;
  margin: 0.5rem 0;
}

.text-danger {
  color: red;
}
</style>
