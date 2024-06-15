<template>
  <div
    class="w-full h-screen flex flex-col justify-center items-center bg-[#00000046] fixed top-0 left-0 z-50"
  >
    <div class="w-[80%] bg-white rounded-md p-4 min-h-[300px] flex flex-col">
      <div
        class="w-full max-w-[1600px] px-4 flex justify-start mt-4 items-center gap-2"
      >
        <h2 class="text-[20px]">Categorias</h2>
        <HeaderTable
          :searchPlaceholder="'Pesquisar por título'"
          :hiddenSearch="true"
        >
          <div class="flex gap-3">
            <Button
              label="Fechar"
              class="btn-danger"
              @click="closeModal()"
            ></Button>
            <Button
              icon="pi pi-plus"
              label="Criar"
              class="btn-primary"
              @click="openModalFormCategory = true"
            ></Button>
          </div>
        </HeaderTable>
      </div>
      <ProgressSpinner v-if="loading" />
      <Table
        v-else
        :service="service"
        :items="items"
        @on-delete-item="deleteItem"
        @on-edit-item="openModalEditItem"
      />
      <Form
        v-if="openModalFormCategory"
        @onCloseModal="closeModalFormCategory"
        @onGetAll="getAll"
        :service="service"
        :id="currentId"
      />
    </div>
  </div>
</template>
<script setup>
import HeaderTable from "@/components/tables/HeaderTable";
import Table from "./Table.vue";
import Form from "./Form.vue";
import { defineProps, defineEmits, ref, onMounted } from "vue";
import { FAQRest } from "@/services/faq.service";
import { toast } from "vue3-toastify";
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
});
const service = new FAQRest();
const emit = defineEmits(["onCloseModal"]);
const openModalFormCategory = ref(false);
const limit = ref(7);
const items = ref([]);
const loading = ref(false);
const numberResultsFound = ref(0);
const currentId = ref(-1);

const params = ref({
  pageNumber: 0,
  limit: limit.value,
  name: null,
});

onMounted(() => {
  getAll();
});

function getAll() {
  loading.value = true;
  service.getAllCategories(params.value).then((res) => {
    items.value = res.data;
    adjustmentItemsValue();
    loading.value = false;
  });
}

function adjustmentItemsValue() {
  if (items.value !== null) {
    items.value.forEach((element) => {
      element.actions = ["delete"];
    });
    numberResultsFound.value = items.value.length;
  }
}

function deleteItem(data) {
  const id = data.id;
  loading.value = true;
  service
    .deleteCategoriesById(id)
    .then(() => {
      toast.success("Categoria deletada!");
    })
    .finally(() => {
      getAll();
    });
}
function closeModal() {
  emit("onCloseModal");
}
function openModalEditItem(data) {
  currentId.value = data.id;
  openModalFormCategory.value = true;
}
function closeModalFormCategory() {
  openModalFormCategory.value = false;
  currentId.value = -1;
}
</script>
