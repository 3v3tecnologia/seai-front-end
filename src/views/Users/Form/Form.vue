<template>
  <form
    class="flex w-full max-w-[1600px] min-w-[700px] gap-4 flex-col items-start"
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
    <div class="w-full flex gap-4 mt-4" v-if="userInfo.id">
      <div
        class="form-group form-group-text text-left p-float-label mt-2 w-full"
      >
        <Textarea v-model="userInfo.Operation" rows="3" class="w-full" />
        <label class="font-weight-bold">Motivo para edição</label>
        <small v-if="operationError.data" class="text-danger">{{
          operationError.text
        }}</small>
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
import { onMounted, ref, defineProps, defineEmits, watch } from "vue";

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
  emailError: {
    type: Object,
    required: true,
  },
  operationError: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["update:user"]);

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
  if (props.user.id) {
    userInfo.value = props.user;
    initializeUserInfo();
  } else {
    setDefaultUserInfo();
  }
});

function createDefaultModules() {
  // Cria um objeto com as chaves de moduleTranslations e valores padrão
  const defaultModules = {};
  let idCounter = 1;
  for (const [key, value] of Object.entries(moduleTranslations.value)) {
    defaultModules[key] = {
      id: idCounter++, // Incrementa o id para cada módulo
      read: false,
      write: false,
    };
  }
  return defaultModules;
}

function initializeUserInfo() {
  for (const [key, item] of Object.entries(userInfo.value.modules)) {
    item.name = getModuleName(key);
    item.disabled = false;
    modules.value.push(item);
  }
  setAdmin();
}

function setDefaultUserInfo() {
  userInfo.value = {
    email: "",
    emailDisabled: false,
    type: "standard",
    Operation: "",
    modules: createDefaultModules(),
  };
  initializeUserInfo();
}

function getModuleName(key) {
  return moduleTranslations.value[key] || key;
}

function setAdmin() {
  Object.keys(modules.value).forEach((key) => {
    if (userInfo.value.type === "admin") {
      modules.value[key].write = true;
      modules.value[key].read = true;
      modules.value[key].disabled = false;
    } else {
      modules.value[key].write = false;
      modules.value[key].read = false;
      console.log(key);
      modules.value[0].disabled = true;
    }
  });
}

// Watcher para emitir evento quando userInfo mudar
watch(userInfo, (newValue) => {
  emit("update:user", newValue);
});
</script>

<style>
.invalidInput {
  border: 1px solid rgb(117, 0, 0) !important;
  border-radius: 5px;
}
</style>
