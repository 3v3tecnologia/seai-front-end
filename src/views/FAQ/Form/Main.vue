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
          @click="goTo('faq')"
        ></Button>
        <Button
          icon="pi pi-save"
          label="Salvar pergunta"
          class="btn-success"
          :disabled="!isFormValid"
          @click="save()"
        ></Button>
      </div>
    </div>
    <div
      v-if="!loading"
      class="w-full xl:w-[65%] flex flex-col justify-start bg-white p-4 px-8 pb-8 rounded-md mt-8 min-h-[25vh] max-h-[70vh] overflow-auto overflow-x-auto"
    >
      <Form
        v-if="item"
        :item="item"
        :categories="categories"
        :categories-rest="service"
        @on-get-all-categories="getCategories"
        @update-validation="updateValidation"
        :edit-mode="isEditing"
      />
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import Form from "./Form.vue";
import { toast } from "vue3-toastify";
import { useRouter } from "vue-router";
import { FAQRest } from "@/services/faq.service";
import store from "@/store";

const profile = store.state.profile;
const router = useRouter();
const item = ref({});
const categories = ref({});
const loading = ref(false);
const currentId = ref(0);
const isEditing = ref(false);
const title = ref("Criar pergunta");
const service = new FAQRest();

const isFormValid = ref(false);

function updateValidation(isValid) {
  isFormValid.value = isValid;
}

onMounted(() => {
  verifyId();
  getCategories();
});

function getCategories() {
  service
    .getAllCategories()
    .then((response) => {
      categories.value = response.data ?? [];
    })
    .catch((error) => {
      console.log(error);
    });
}

function verifyId() {
  if (router.currentRoute.value.params.id) {
    const idAsNumber = Number(router.currentRoute.value.params.id);
    if (!isNaN(idAsNumber)) {
      currentId.value = idAsNumber;
      isEditing.value = true;
      title.value = "Editar pergunta";
      getItemById(currentId.value);
    } else {
      goTo("form-faq");
    }
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
      console.log("Failed to get item");
      goTo("form-faq");
    });
}

function save() {
  loading.value = true;
  item.value.id_category = item.value.category.id;
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
  service
    .create(item.value)
    .then(() => {
      goTo("faq");
      setTimeout(() => {
        toast.success("Pergunta cadastrada com sucesso");
      }, 200);
    })
    .finally(() => (loading.value = false));
}

function updateItem() {
  service
    .update(currentId.value, item.value)
    .then(() => {
      setTimeout(() => {
        toast.success("Pergunta atualizada com sucesso");
      }, 200);
    })
    .finally(() => (loading.value = false));
}
</script>
