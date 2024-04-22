<template>
  <form
    class="flex w-full max-w-[1600px] min-w-[700px] gap-4 flex-col items-start"
    v-if="user"
  >
    <div class="w-full flex gap-4 mt-4">
      <div
        class="form-group form-group-text text-left p-float-label mt-2 w-[50%]"
      >
        <InputText
          id="e-mail"
          aria-describedby="culture-name-help"
          v-model="userInfo.email"
          :class="`w-full ${emailError.data ? 'invalidInput' : ''}`"
          :disabled="userInfo.emailDisabled"
          required
        />
        <label for="e-mail" class="font-weight-bold">E-mail</label>
        <small v-if="emailError.data" class="text-danger">{{
          emailError.text
        }}</small>
      </div>
      <div
        class="form-group form-group-text text-left p-float-label mt-2 w-[50%]"
      >
        <Dropdown
          id="user-type"
          v-model="userInfo.type"
          :options="select"
          optionLabel="name"
          optionValue="value"
          placeholder="Tipo de usuário"
          class="w-full"
          @update:model-value="setAdmin"
        />
        <label for="user-type" class="font-weight-bold">Tipo de usuário</label>
      </div>
    </div>
    <div class="mt-4">
      <h3 class="text-[20px] font-bold">Acessos</h3>
    </div>

    <div
      class="w-full flex justify-between mt-2"
      v-for="(module, i) in modules"
      :key="i"
    >
      <div
        class="form-group form-group-text text-left p-float-label mt-2 w-[33%]"
      >
        <InputText
          id="e-mail"
          aria-describedby="culture-name-help"
          v-model="module.name"
          class="w-full"
          required
          disabled
        />
        <label for="e-mail" class="font-weight-bold">Módulo</label>
      </div>
      <div
        class="form-group form-group-text text-left p-float-label mt-2 w-[33%]"
      >
        <Dropdown
          id="user-type"
          v-model="module.read"
          :options="selectModule"
          optionLabel="name"
          optionValue="value"
          placeholder="Tipo de usuário"
          :disabled="module.disabled"
          class="w-full"
        />
        <label for="e-mail" class="font-weight-bold">Leitura</label>
      </div>
      <div class="text-left p-float-label mt-2 w-[33%]">
        <Dropdown
          id="user-type"
          v-model="module.write"
          :options="selectModule"
          optionLabel="name"
          optionValue="value"
          placeholder="Tipo de usuário"
          :disabled="module.disabled"
          class="w-full"
        />
        <label for="e-mail" class="font-weight-bold">Escrita</label>
      </div>
    </div>
  </form>
</template>
<script setup>
import { onMounted, ref, defineProps } from "vue";

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
  emailError: {
    type: Object,
    required: true,
  },
});

const userInfo = ref({});
const newsModule = ref({});
const jobsModule = ref({});
const registerModule = ref({});
const userModule = ref({});
const modules = ref([]);

const select = ref([
  {
    name: "Básico",
    value: "standard",
  },
  {
    name: "Administrador",
    value: "admin",
  },
]);

const selectModule = ref([
  {
    name: "Sim",
    value: true,
  },
  {
    name: "Não",
    value: false,
  },
]);

onMounted(() => {
  userInfo.value = props.user;
  userInfo.value.emailDisabled = props.user.type === "admin" ? true : false;

  newsModule.value = props.user.modules.news;
  newsModule.value.name = "Notícias";
  newsModule.value.disabled = props.user.type === "admin" ? true : false;

  registerModule.value = props.user.modules.register;
  registerModule.value.name = "Cadastro";
  registerModule.value.disabled = props.user.type === "admin" ? true : false;

  userModule.value = props.user.modules.user;
  userModule.value.name = "Usuários";
  userModule.value.disabled = true;

  jobsModule.value = props.user.modules.jobs;
  jobsModule.value.name = "Rotina de dados";
  jobsModule.value.disabled = true;

  modules.value = [
    newsModule.value,
    registerModule.value,
    userModule.value,
    jobsModule.value,
  ];
});

function setAdmin() {
  modules.value.forEach((module) => {
    if (userInfo.value.type === "admin") {
      module.write = true;
      module.read = true;
      module.disabled = true;
    } else {
      module.write = false;
      module.read = false;
      module.disabled = false;
      userModule.value.disabled = true;
      jobsModule.value.disabled = true;
    }
  });
}
</script>
<style>
.invalidInput {
  border: 1px solid rgb(117, 0, 0) !important;
  border-radius: 5px;
}
</style>
