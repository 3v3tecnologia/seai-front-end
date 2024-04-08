<template>
  <div class="w-full flex flex-col justify-center items-center">
    <div v-if="!loading" class="w-[80%] flex justify-start mt-4">
      <HeaderTable
        @onSearchItem="searchEquipments"
        :selectItems="equipmentsSelects"
        @onSelectItem="selectEquipments"
      />
    </div>
    <ProgressSpinner v-if="loading" />
    <div v-else class="w-[80%] min-w-[350px]">
      <div class="mt-6">
        <Dtable
          :infoTable="equipmentsTable"
          :dataValue="equipments?.Equipments"
          :loadingTable="loadingTable"
          @onSwitchItem="updateEquipment"
        />
        <Pagination
          :rows="equipments?.PageLimitRows"
          :totalRecords="equipments?.QtdRows"
          @onHandlePageChange="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import Dtable from "@/components/tables/Dtable";
import HeaderTable from "@/components/tables/HeaderTable";
import Pagination from "@/components/pagination/pagination.vue";
import { ref, onMounted } from "vue";
import { equipmentsTable } from "@/utils/tables/equipments";
import { EquipmentRest } from "@/services/equipment.service";

const limit = ref(7);
const equipments = ref({});
const equipmentsSelects = ref([]);
const organs = ref({});
const loading = ref(false);
const loadingTable = ref(false);
const equipmentTypes = ref({
  placeholder: "Filtrar por tipo",
  optionLabel: "Name",
  paramsName: "idType",
  items: [
    { Name: "Todos", Id: 0 },
    { Name: "Estação", Id: 1 },
    { Name: "Pluviômetro", Id: 2 },
  ],
});
const { getAll, getAllOrgans, enableEquipment } = new EquipmentRest();
const params = ref({
  pageNumber: 0,
  limit: limit.value,
  name: null,
});

onMounted(() => {
  loading.value = true;
  getAllEquipment();
  getOrgans();
});

function getAllEquipment() {
  getAll(params.value).then((res) => {
    equipments.value = res.data.data;
    adjustmentEquipmentValue();
    loading.value = false;
    loadingTable.value = false;
  });
}

function getOrgans() {
  getAllOrgans().then((res) => {
    organs.value = {
      placeholder: "Filtrar por orgãos",
      optionLabel: "Name",
      paramsName: "idOrgan",
      items: [{ Name: "Todos", Id: 0 }, ...res.data.data],
    };

    equipmentsSelects.value.push(organs.value);
    equipmentsSelects.value.push(equipmentTypes.value);
  });
}
function adjustmentEquipmentValue() {
  equipments.value.Equipments.forEach((element) => {
    element.Type.Name = tradutionType(element.Type.Name);
    element.link = "Acessar leituras";
    element.router = {
      name: "station-reads",
      params: { id: element.Id },
    };
  });
}

function tradutionType(type) {
  return type === "station" ? "Estação" : "Pluviômetro";
}

function searchEquipments(searchTerm) {
  if (searchTerm.length >= 3 || searchTerm.length === 0) {
    params.value.name = searchTerm.length >= 3 ? searchTerm : null;
    params.value.limit = limit.value;
    params.value.pageNumber = 0;
    loadingTable.value = true;
    getAllEquipment();
  }
}

function handlePageChange(page) {
  params.value.pageNumber = page;
  loadingTable.value = true;
  getAllEquipment();
}
function selectEquipments(paramsName, paramsValue) {
  params.value.limit = limit.value;
  params.value.pageNumber = 0;
  params.value[paramsName] = paramsValue > 0 ? paramsValue : null;
  getAllEquipment();
}
function updateEquipment(equipment) {
  enableEquipment(equipment.Id, equipment.Enable);
}
</script>
