<template>
  <div
    class="w-full flex flex-col md:justify-center md:items-center overflow-hidden p-4"
  >
    <ProgressSpinner v-if="loading" />
    <div
      v-if="!loading"
      class="w-full xl:w-[65%] max-w-[1600px] flex justify-between items-center mt-4"
    >
      <h1 class="text-left text-[22px] font-[500]">{{ title }}</h1>
      <div class="flex gap-4">
        <Button
          icon="pi pi-times"
          label="Sair"
          class="btn-danger"
          @click="goTo('users')"
        ></Button>
        <Button
          icon="pi pi-save"
          label="Salvar usuário"
          class="btn-success"
          @click="save()"
        ></Button>
      </div>
    </div>
    <div
      v-if="!loading"
      class="w-full xl:w-[65%] flex justify-start bg-white p-4 px-8 rounded-md mt-8 h-[60vh] overflow-auto overflow-x-auto"
    >
      <Form
        :user="user"
        :emailError="emailError"
        :operationError="operationError"
        @update:user="setUser"
      />
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import Form from "./Form.vue";
import { UsersRest } from "@/services/users.service";
import { toast } from "vue3-toastify";
import { useRouter } from "vue-router";

const router = useRouter();
const user = ref({});
const loading = ref(true);
const emailError = ref({ text: "", data: false });
const operationError = ref({ text: "", data: false });
const userId = ref(0);
const isEditing = ref(false);
const title = ref("Criar usuário");

const userRest = new UsersRest();

onMounted(() => {
  verifyId();
});

function verifyId() {
  if (router.currentRoute.value.params.id) {
    const idAsNumber = Number(router.currentRoute.value.params.id);
    if (!isNaN(idAsNumber)) {
      userId.value = idAsNumber;
      isEditing.value = true;
      title.value = "Editar usuário";
      getUserById(userId.value);
    } else {
      goTo("create-user");
    }
  } else {
    loading.value = false;
  }
}

function getUserById(id) {
  loading.value = true;
  userRest
    .getById(id)
    .then((response) => {
      user.value = response.data;
      user.value.emailDisabled = true;
      loading.value = false;
    })
    .catch(() => {
      goTo("create-user");
    });
}

function save() {
  emailError.value.data = false;
  operationError.value.data = false;

  if (user.value.email === "" || !validateEmail()) {
    emailError.value.data = true;
    emailError.value.text =
      user.value.email === "" ? "Campo obrigatório" : "E-mail inválido";
    return;
  }

  if (isEditing.value) {
    const operationValidationError = validateOperation();
    if (operationValidationError) {
      operationError.value.data = true;
      operationError.value.text = operationValidationError;
      return;
    }
  }

  loading.value = true;
  if (isEditing.value) {
    updateUser();
  } else {
    createUser();
  }
}

function validateEmail() {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(user.value.email);
}

function goTo(routeName) {
  router.push({ name: routeName });
}

function createUser() {
  userRest
    .create(filterModules(user.value))
    .then(() => {
      goTo("users");
      setTimeout(() => {
        toast.success("Usuário cadastrado com sucesso");
      }, 200);
    })
    .catch((err) => {
      toast.error(err.message);
    })
    .finally(() => (loading.value = false));
}

function updateUser() {
  userRest
    .update(userId.value, filterModules(user.value))
    .then(() => {
      toast.success("Usuário atualizado com sucesso");
      setTimeout(() => {
        location.reload();
      }, 1000);
    })
    .catch((err) => {
      toast.error(err.response.data.error);
    })
    .finally(() => (loading.value = false));
}

function validateOperation() {
  if (!user.value.Operation) {
    return "Campo obrigatório";
  }
  return "";
}

// Atualizar o valor de user com base no evento do filho
function setUser(newUser) {
  user.value = newUser;
}
function filterModules(data) {
  var filteredModules = {};

  for (var key in data.modules) {
    if (Object.prototype.hasOwnProperty.call(data.modules, key)) {
      filteredModules[key] = {
        id: data.modules[key].id,
        read: data.modules[key].read,
        write: data.modules[key].write,
      };
    }
  }
  data.modules = filteredModules;
  return data;
}
</script>
