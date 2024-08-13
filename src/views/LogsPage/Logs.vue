<template>
  <LogsModal
    v-if="showModal"
    :log="currentItems"
    :showModal="showModal"
    @on-close-modal="showModal = false"
  />
  <div class="w-full flex flex-col justify-center items-center">
    <div class="w-full flex flex-col justify-center items-center">
      <div
        v-if="!loading"
        class="w-full max-w-[1600px] px-4 flex justify-start mt-4"
      >
        <ProgressSpinner v-if="loadingUsers" />
        <HeaderTable
          v-else
          :hidden-search="true"
          :selectItems="[usersSelected, resourceSelected, operationSelected]"
          @onSelectItem="selectItems"
        >
        </HeaderTable>
      </div>
    </div>
    <div v-if="loading" class="container mx-auto h-[50vh] flex items-end">
      <ProgressSpinner />
    </div>
    <div v-else class="w-full max-w-[1600px] px-4 min-w-[350px]">
      <div class="mt-6" v-if="items.Items && items.Items.length > 0">
        <Dtable
          :infoTable="logsTable"
          :dataValue="items.Items"
          :loadingTable="loadingTable"
          @on-open-modal="openModal"
        />
        <Pagination
          v-if="!hiddenPagination"
          :rows="params.limit"
          :totalRecords="items.TotalItems"
          :items-name="'logs'"
          @onHandlePageChange="handlePageChange"
        />
      </div>
      <div class="mt-6" v-else>
        <p>Nenhum log registrado!</p>
      </div>
    </div>
  </div>
</template>
<script setup>
import Dtable from "@/components/tables/Dtable";
import HeaderTable from "@/components/tables/HeaderTable";
import Pagination from "@/components/pagination/pagination.vue";
import LogsModal from "./Modal/Modal.vue";
import { ref, onMounted } from "vue";
import { logsTable } from "@/utils/tables/logs";
import { LogsRest } from "@/services/logs.service";
import { UsersRest } from "@/services/users.service";

const limit = ref(7);
const items = ref([]);
const currentItems = ref({});
const users = ref([]);
const loading = ref(false);
const loadingTable = ref(false);
const loadingUsers = ref(false);
const showModal = ref(false);
const params = ref({
  pageNumber: 0,
  limit: limit.value,
  name: null,
});
const service = new LogsRest();
const userService = new UsersRest();
const hiddenPagination = ref(false);
const operationSelected = ref({
  placeholder: "Filtrar por operação",
  optionLabel: "Name",
  paramsName: "operation",
  items: [
    { Name: "Todos", Id: 0 },
    { Name: "Criação", Id: "create" },
    { Name: "Atualização", Id: "update" },
    { Name: "Exclusão", Id: "delete" },
  ],
});
const resourceSelected = ref({
  placeholder: "Filtrar por recurso",
  optionLabel: "Name",
  paramsName: "resource",
  items: [
    { Name: "Todos", Id: 0 },
    { Name: "Culturas", Id: "crop" },
    { Name: "Ciclos de cultivo", Id: "crop-cycles" },
    { Name: "Equipamentos", Id: "equipment" },
    { Name: "Medições de equipamentos", Id: "equipment-measurements" },
    { Name: "FAQ", Id: "faq" },
    { Name: "Categorias da FAQ", Id: "faq-category" },
    { Name: "Newsletter", Id: "newsletter" },
    { Name: "Usuário", Id: "user" },
    { Name: "Peso", Id: "weight" },
  ],
});
const usersSelected = ref({
  placeholder: "Filtrar por usuário",
  optionLabel: "Name",
  paramsName: "user_id",
  items: [],
});

onMounted(() => {
  loading.value = true;
  getAllUsers();
  getAllLogs();
});

function getAllLogs() {
  service
    .getAll(params.value)
    .then((response) => {
      items.value = response.data;
      adjustmentItemsValue();
      loading.value = false;
      console.log(items.value.Items);
    })
    .catch((error) => {
      loading.value = false;
    });
}
function getAllUsers() {
  loadingUsers.value = true;
  userService
    .getAll()
    .then((response) => {
      users.value = response.data;
      usersSelected.value.items = usersSelected.value.items.concat([
        { Name: "Todos", Id: 0 },
        ...users.value.Items.map((user) => ({ Name: user.name, Id: user.id })),
      ]);
      loadingUsers.value = false;
    })
    .catch((error) => {
      console.error(error);
      loadingUsers.value = false;
    });
}
function adjustmentItemsValue() {
  if (items.value !== null && items.value.Items) {
    items.value.Items.forEach((element) => {
      element.description = capitalizeFirstLetter(String(element.description));
      element.operation = translateOperation(String(element.operation));
      element.resource = translateResource(String(element.resource));
      element.user.name = capitalizeFirstLetter(String(element.user.name));
      element.actions = ["modal"];
    });
  }
}
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
function translateOperation(operation) {
  const translations = {
    create: "Criação",
    update: "Atualização",
    delete: "Exclusão",
  };
  return translations[operation] || operation;
}
function translateResource(resource) {
  const translations = {
    crop: "Culturas",
    "crop-cycles": "Ciclos de cultivo",
    equipment: "Equipamentos",
    "equipment-measurements": "Medições de equipamentos",
    "faq-category": "Categoria de FAQ",
    newsletter: "Newsletter",
    user: "Usuário",
    weight: "Peso",
    faq: "FAQ",
  };

  return translations[resource] || resource;
}
function handlePageChange(page) {
  params.value.pageNumber = page;
  loadingTable.value = true;
  getAllLogs();
}
function selectItems(paramsName, paramsValue) {
  resetPagination();
  params.value[paramsName] = paramsValue != 0 ? paramsValue : null;
  console.log(paramsName, paramsValue);
  getAllLogs();
}
function resetPagination() {
  hiddenPagination.value = true;
  params.value.limit = limit.value;
  params.value.pageNumber = 0;
  setTimeout(() => {
    hiddenPagination.value = false;
  }, 1);
}
function openModal(data) {
  currentItems.value = data;
  console.log("Open modal", data);
  showModal.value = true;
}
</script>
