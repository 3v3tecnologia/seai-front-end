<template>
  <div class="w-full flex flex-col justify-center items-center">
    <ReadModal
      v-if="showModal"
      :read-data="reads"
      :id-equipment="currentEquipment.Id"
      :showModal="showModal"
      :title="currentEquipment.Name"
      :loading-button="loadingRead"
      @on-close-modal="showModal = false"
      @on-save-read="updateRead"
      :type="currentType"
    />
    <div
      v-if="!loading"
      class="w-full max-w-[1600px] px-4 flex justify-start mt-4"
    >
      <HeaderTable
        @onSearchItem="searchEquipments"
        :selectItems="equipmentsSelects"
        @onSelectItem="selectEquipments"
      />
    </div>
    <ProgressSpinner v-if="loading" />
    <div v-else class="w-full max-w-[1600px] px-4 min-w-[350px]">
      <div class="mt-6">
        <div
          v-if="loadingTable"
          class="w-full h-[400px] bg-white flex items-center justify-center"
        >
          <ProgressSpinner />
        </div>
        <Dtable
          v-else
          :infoTable="equipmentsTable"
          :dataValue="equipments?.Items"
          :loadingTable="loadingTable"
          @onSwitchItem="updateEquipment"
          @onOpenModal="openModal"
        />
        <Pagination
          :rows="params.limit"
          :current-total="numberResultsFound"
          :totalRecords="equipments?.TotalItems"
          :items-name="'equipamentos'"
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
import ReadModal from "./Modals/Read.vue";
import { ref, onMounted } from "vue";
import { equipmentsTable } from "@/utils/tables/equipments";
import { EquipmentRest } from "@/services/equipment.service";
import { toast } from "vue3-toastify";

const limit = ref(7);
const equipments = ref({});
const equipmentsSelects = ref([]);
const currentEquipment = ref({});
const numberResultsFound = ref(0);
const reads = ref({});
const organs = ref({});
const loading = ref(false);
const loadingRead = ref(false);
const loadingTable = ref(false);
const showModal = ref(false);
const hiddenPagination = ref(false);
const currentType = ref("");
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
const et0Types = ref({
  placeholder: "Filtrar por medição",
  optionLabel: "Name",
  paramsName: "only_with_measurements",
  disabled: true,
  items: [
    { Name: "Todos", Id: 0 },
    { Name: "Somente com medição", Id: "true" },
    { Name: "Sem medição", Id: "false" },
  ],
});
const equipmentRest = new EquipmentRest();
const params = ref({
  pageNumber: 0,
  limit: limit.value,
  name: null,
});

onMounted(() => {
  loading.value = true;
  getAllEquipment();
  equipmentsSelects.value.push(equipmentTypes.value);
  equipmentsSelects.value.push(et0Types.value);
});

function getAllEquipment() {
  loadingTable.value = true;
  equipmentRest.getAll(params.value).then((res) => {
    equipments.value = res.data;
    numberResultsFound.value =
      equipments.value !== null && equipments.value.Items
        ? equipments.value.Items.length
        : 0;
    adjustmentEquipmentValue();
    loading.value = false;
    loadingTable.value = false;
  });
}

function adjustmentEquipmentValue() {
  if (equipments.value !== null && equipments.value.Items)
    equipments.value.Items.forEach((element) => {
      element.Type.Name = tradutionType(element.Type.Name);
      element.link = "Acessar leituras";
      element.actions = ["modal"];
      element.Name = capitalizeText(element.Name);
      element.router = {
        name: "station-reads",
        params: { id: element.Id },
      };
    });
}
function capitalizeText(text) {
  return text
    .split(" ")
    .map((word) =>
      word.toLowerCase() === "de" || word.toLowerCase() === "do"
        ? word.toLowerCase()
        : capitalize(word)
    )
    .join(" ");
}
function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

function tradutionType(type) {
  return type === "station" ? "Estação" : "Pluviômetro";
}

function tradutionTypePTEN(type) {
  return type === "Estação" ? "station" : "pluviometer";
}

function searchEquipments(searchTerm) {
  if (searchTerm.length >= 3 || searchTerm.length === 0) {
    resetPagination();
    params.value.name = searchTerm.length >= 3 ? searchTerm : null;
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
  resetPagination();
  params.value[paramsName] = paramsValue != 0 ? paramsValue : null;
  if (paramsName === equipmentTypes.value.paramsName) {
    et0Types.value.disabled = paramsValue != 0 ? false : true;
  }
  getAllEquipment();
}
function resetPagination() {
  hiddenPagination.value = true;
  params.value.limit = limit.value;
  params.value.pageNumber = 0;
  setTimeout(() => {
    hiddenPagination.value = false;
  }, 1);
}
function updateEquipment(equipment) {
  const data = {
    Enable: equipment.Enable,
    Operation: equipment.Operation,
  };
  equipmentRest.enableEquipment(equipment.Id, data);
}
function openModal(data) {
  currentEquipment.value = data;
  getReads();
}
function getReads() {
  loadingRead.value = true;
  currentType.value = tradutionTypePTEN(currentEquipment.value.Type.Name);
  equipmentRest
    .getLatestEquipmentMeasurements(
      currentEquipment.value.Id,
      currentType.value
    )
    .then((res) => {
      reads.value = res.data;
      loadingTable.value = false;
      loadingRead.value = false;
      showModal.value = true;
    });
}
function updateRead(data) {
  loadingRead.value = true;
  if (tradutionTypePTEN(currentEquipment.value.Type.Name) === "station") {
    updateStationRead(data);
  } else {
    updatePluvRead(data);
  }
}

function updatePluvRead(data) {
  const pluv = {
    Precipitation: data.Precipitation.Value,
    Operation: data.Operation,
  };
  equipmentRest
    .updatePluvRead(data.IdRead, pluv)
    .then(() => {
      toast.success("Leitura salva com sucesso!");
    })
    .catch((e) => {
      loadingRead.value = false;
      toast.error(e.response.data.error);
    })
    .finally(() => {
      loadingRead.value = false;
    });
}
function updateStationRead(data) {
  const station = {
    IdRead: data.IdRead,
    IdEquipment: data.IdEquipment,
    Time: data.Time,
    Hour: data.Hour,
    Altitude: data.Altitude.Value,
    TotalRadiation: data.TotalRadiation.Value,
    AverageRelativeHumidity: data.AverageRelativeHumidity.Value,
    MinRelativeHumidity: data.MinRelativeHumidity.Value,
    MaxRelativeHumidity: data.MaxRelativeHumidity.Value,
    AverageAtmosphericTemperature: data.AverageAtmosphericTemperature.Value,
    MaxAtmosphericTemperature: data.MaxAtmosphericTemperature.Value,
    MinAtmosphericTemperature: data.MinAtmosphericTemperature.Value,
    AtmosphericPressure: data.AtmosphericPressure.Value,
    WindVelocity: data.WindVelocity.Value,
    Et0: data.Et0.Value,
    Operation: data.Operation,
  };
  equipmentRest
    .updateStationRead(data.IdRead, station)
    .then(() => {
      toast.success("Leitura salva com sucesso!");
      getReads();
    })
    .catch((e) => {
      toast.error(e.response.data.error);
      loadingTable.value = false;
      loadingRead.value = false;
    });
}
</script>
