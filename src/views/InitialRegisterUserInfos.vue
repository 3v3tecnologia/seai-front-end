<template>
  <div
    v-if="loading"
    class="fixed top-0 left-0 flex justify-center items-center w-screen h-screen bg-white z-50"
  >
    <ProgressSpinner />
  </div>
  <div v-else class="home p-4">
    <div class="py-4" />

    <div class="py-3" />
    <div
      class="container mx-auto bg-white p-4 rounded-md w-full lg:w-[50%] min-w-[350px]"
    >
      <h4 class="text-[25px] mt-10">Completar Cadastro</h4>
      <form @submit.prevent="register" class="w-full flex flex-col mt-10 pb-8">
        <div class="form-group form-group-text text-left p-float-label w-full">
          <InputText id="name" v-model="form.name" class="w-full" required />
          <label for="name" class="font-weight-bold">Nome completo*</label>
          <small v-if="submitted && !form.name" class="p-error">{{
            requiredField
          }}</small>
        </div>

        <div
          class="form-group form-group-text text-left p-float-label mt-2 w-full"
        >
          <InputText id="login" v-model="form.login" class="w-full" required />
          <label for="login" class="font-weight-bold">Username*</label>
          <small v-if="submitted && !form.login" class="p-error">{{
            requiredField
          }}</small>
        </div>

        <div
          class="form-group form-group-text text-left p-float-label mt-2 w-full"
        >
          <Password
            id="password"
            v-model="form.password"
            class="w-full"
            required
            toggleMask
            :feedback="false"
          />
          <label for="password" class="font-weight-bold">Senha</label>
          <small v-if="submitted && !form.password" class="p-error">{{
            requiredField
          }}</small>
        </div>

        <div
          class="form-group form-group-text text-left p-float-label mt-2 w-full"
        >
          <Password
            id="confirmPassword"
            v-model="form.confirmPassword"
            class="w-full"
            required
            toggleMask
            :feedback="false"
          />
          <label for="confirmPassword" class="font-weight-bold"
            >Confirmar Senha</label
          >
          <small v-if="submitted && !form.confirmPassword" class="p-error">{{
            requiredField
          }}</small>
          <small
            v-if="submitted && form.password !== form.confirmPassword"
            class="p-error"
            >As senhas não estão iguais.</small
          >
        </div>

        <div
          class="form-group form-group-text text-left mt-4 w-full flex justify-end"
        >
          <Button
            label="Cadastrar"
            type="submit"
            class="w-[200px] btn-primary"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { UsersRest } from "@/services/users.service";
import { toast } from "vue3-toastify";
import { useRouter } from "vue-router";

const form = ref({
  name: "",
  login: "",
  password: "",
  confirmPassword: "",
});

const submitted = ref(false);
const loading = ref(false);
const requiredField = "Campo obrigatório";
const service = new UsersRest();
const router = useRouter();
const code = ref("");

onMounted(() => {
  const tkn = localStorage.getItem("tkn");
  loading.value = true;
  if (tkn) {
    localStorage.clear();
    window.location.reload();
  } else {
    code.value = router.currentRoute.value.params.token;
    localStorage.clear();
    if (!code.value) {
      router.push("login");
    }
    loading.value = false;
  }
});

function register() {
  console.log("register");
  if (isValid()) {
    service
      .completeRegister(form.value, code.value)
      .then((res) => {
        toast.success("Conta criada com sucesso!");
        router.push("login");
      })
      .finally(() => (loading.value = false));
  }
}

const isValid = () => {
  return (
    form.value.name &&
    form.value.login &&
    form.value.password &&
    form.value.confirmPassword &&
    form.value.password === form.value.confirmPassword
  );
};
</script>
<style lang="scss">
form {
  gap: 15px;
  min-width: 320px;
  padding-bottom: 25px;
}
.btn-register {
  background-color: #99bdff;
  border-color: #2c5ebb7d;
  color: #1b3f82;
  border-radius: 3px;
}
</style>
