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
          @click="goTo('newsletter')"
        ></Button>
        <Button
          icon="pi pi-save"
          label="Salvar notícia"
          class="btn-success"
          @click="isToday()"
        ></Button>
      </div>
    </div>
    <div
      v-if="!loading"
      class="w-full xl:w-[65%] flex flex-col justify-start bg-white p-4 px-8 pb-8 rounded-md mt-8 min-h-[25vh] max-h-[70vh] overflow-auto overflow-x-auto"
    >
      <Form v-if="item" :item="item" />
    </div>
  </div>
  <ConfirmDialog />
</template>
<script setup>
import { ref, onMounted } from "vue";
import Form from "./Form.vue";
import { toast } from "vue3-toastify";
import { useRouter } from "vue-router";
import { NewsRest } from "@/services/news";
import store from "@/store";
import { useConfirm } from "primevue/useconfirm";

const profile = store.state.profile;
const router = useRouter();
const item = ref({});
const loading = ref(false);
const currentId = ref(0);
const isEditing = ref(false);
const title = ref("Criar notícia");
const service = new NewsRest();
const confirm = useConfirm();

onMounted(() => {
  verifyId();
});

function verifyId() {
  if (router.currentRoute.value.params.id) {
    const idAsNumber = Number(router.currentRoute.value.params.id);
    if (!isNaN(idAsNumber)) {
      currentId.value = idAsNumber;
      isEditing.value = true;
      title.value = "Editar notícia";
      getItemById(currentId.value);
    } else {
      goTo("form-newsletter");
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
      convertBuffer(item.value.Data.data);
    })
    .catch(() => {
      goTo("form-newsletter");
    });
}

function convertBuffer(preBuffer) {
  const buffer = new Uint8Array(preBuffer);
  const decoder = new TextDecoder("utf-8");
  const result = decoder.decode(buffer);
  item.value.Data = result;
}

function save() {
  loading.value = true;

  if (isEditing.value) {
    updateItem();
  } else {
    createItem();
  }
}

function isToday() {
  const today = new Date();

  if (
    item.value.SendDate.getDate() === today.getDate() &&
    item.value.SendDate.getMonth() === today.getMonth() &&
    item.value.SendDate.getFullYear() === today.getFullYear()
  ) {
    confirmDate();
  } else {
    save();
  }
}

function goTo(routeName) {
  router.push({ name: routeName });
}

function createItem() {
  item.value.FK_Author = profile.id;
  service
    .create(item.value)
    .then(() => {
      goTo("newsletter");
      setTimeout(() => {
        toast.success("Notícia cadastrada com sucesso");
      }, 200);
    })
    .finally(() => (loading.value = false));
}

function updateItem() {
  service
    .update(currentId.value, item.value)
    .then(() => {
      setTimeout(() => {
        toast.success("Notícia atualizado com sucesso");
      }, 200);
    })
    .finally(() => (loading.value = false));
}
function confirmDate() {
  confirm.require({
    message:
      "A data selecionada para postagem da notícia será hoje, notícias já postadas não podem ser editadas!",
    header: "Confirmar deleção",
    icon: "pi pi-exclamation-triangle",
    rejectClass: "p-button-secondary p-button-outlined",
    acceptClass: "btn-primary",
    rejectLabel: "Cancelar",
    acceptLabel: "Salvar",
    accept: () => {
      save();
    },
  });
}
</script>
