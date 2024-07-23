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
      class="w-full flex gap-5 items-center mt-2"
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
      <div class="mt-2 flex gap-2">
        <Checkbox v-model="module.read" :disabled="module.disabled" binary />
        <label for="user-type-read" class="font-weight-bold">Leitura</label>
      </div>
      <div class="mt-2 flex gap-2">
        <Checkbox v-model="module.write" :disabled="module.disabled" binary />
        <label for="user-type-write" class="font-weight-bold">Escrita</label>
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

const modules = ref([]);
const moduleTranslations = ref({
  user: "Usuário",
  weights: "Pesos",
  faq: "FAQ",
  crop: "Cultura",
  equipments: "Equipamentos",
  studies: "Estudos",
  newsletter: "Newsletter",
});

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

onMounted(() => {
  userInfo.value = props.user;

  for (const [key, item] of Object.entries(props.user.modules)) {
    item.name = getModuleName(key);
    item.disabled = false;
    modules.value.push(item);
  }
});

function getModuleName(key) {
  return moduleTranslations.value[key] || key;
}

function setAdmin() {
  modules.value.forEach((module) => {
    if (userInfo.value.type === "admin") {
      module.write = true;
      module.read = true;
    } else {
      module.write = false;
      module.read = false;
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
