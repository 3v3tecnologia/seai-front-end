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
      <Form v-if="user" :user="user" :emailError="emailError" />
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

const user = ref({
  email: "",
  type: "standard",
  modules: {
    news: {
      id: 1,
      read: false,
      write: false,
    },
    register: {
      id: 3,
      read: false,
      write: false,
    },
    user: {
      id: 2,
      read: false,
      write: false,
    },
    jobs: {
      id: 4,
      read: false,
      write: false,
    },
  },
});

const loading = ref(false);
const emailError = ref({ text: "", data: false });
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
  }
}

function getUserById(id) {
  loading.value = true;
  userRest
    .getById(id)
    .then((response) => {
      user.value = response.data;
      loading.value = false;
    })
    .catch(() => {
      goTo("create-user");
    });
}

function save() {
  if (user.value.email === "" || !validateEmail()) {
    emailError.value.data = true;
    emailError.value.text =
      user.value.email === "" ? "Campo obrigatório" : "E-mail inválido";
    return;
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
    .create(user.value)
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
    .update(userId.value, user.value)
    .then(() => {
      setTimeout(() => {
        toast.success("Usuário atualizado com sucesso");
      }, 200);
    })
    .catch((err) => {
      toast.error(err.response.data.error);
    })
    .finally(() => (loading.value = false));
}
</script>
