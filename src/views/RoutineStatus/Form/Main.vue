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
          @click="goTo('cron')"
        ></Button>
        <Button
          icon="pi pi-save"
          label="Salvar notícia"
          class="btn-success"
          @click="save()"
        ></Button>
      </div>
    </div>
    <div
      v-if="!loading"
      class="w-full xl:w-[65%] flex flex-col justify-start bg-white p-4 px-8 pb-8 rounded-md mt-8 min-h-[25vh] max-h-[70vh] overflow-auto overflow-x-auto"
    >
      <Form v-if="item" :item="item" :edit-mode="isEditing" />
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import Form from "./Form.vue";
import { toast } from "vue3-toastify";
import { useRouter } from "vue-router";
import { RoutineRest } from "@/services/routine.service";
import store from "@/store";

const profile = store.state.profile;
const router = useRouter();
const item = ref({});
const loading = ref(false);
const currentId = ref(0);
const isEditing = ref(false);
const title = ref("Criar rotina");
const service = new RoutineRest();

onMounted(() => {
  verifyId();
});

function verifyId() {
  if (router.currentRoute.value.params.id) {
    currentId.value = router.currentRoute.value.params.id;
    isEditing.value = true;
    title.value = "Editar rotina";
    getItemById(currentId.value);
    // const idAsNumber = Number(router.currentRoute.value.params.id);
    // if (!isNaN(idAsNumber)) {
    //   currentId.value = idAsNumber;
    //   isEditing.value = true;
    //   title.value = "Editar rotina";
    //   getItemById(currentId.value);
    // } else {
    //   goTo("form-routine");
    // }
  }
}

function getItemById(id) {
  loading.value = true;
  service
    .getById(id)
    .then((response) => {
      item.value = response.data;
      loading.value = false;
    })
    .catch(() => {
      goTo("cron");
    });
}

function save() {
  loading.value = true;
  if (isEditing.value) {
    updateItem();
  } else {
    createItem();
  }
}

function goTo(routeName) {
  router.push({ name: routeName });
}

function createItem() {
  item.value.FK_Author = profile.name;
  service
    .create(item.value)
    .then(() => {
      goTo("cron");
      setTimeout(() => {
        toast.success("Rotina criada com sucesso");
      }, 200);
    })
    .finally(() => (loading.value = false));
}

function updateItem() {
  service
    .update(currentId.value, item.value)
    .then(() => {
      setTimeout(() => {
        toast.success("Rotina atualizado com sucesso");
      }, 200);
    })
    .finally(() => (loading.value = false));
}
</script>
