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
        <Dtable
          :infoTable="equipmentsTable"
          :dataValue="equipments?.Items"
          :loadingTable="loadingTable"
          @onSwitchItem="updateEquipment"
          @onOpenModal="openModal"
        />
        <Pagination
          :rows="numberResultsFound"
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
const equipmentRest = new EquipmentRest();
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

function getOrgans() {
  equipmentRest.getAllOrgans().then((res) => {
    organs.value = {
      placeholder: "Filtrar por orgãos",
      optionLabel: "Name",
      paramsName: "idOrgan",
      items: [{ Name: "Todos", Id: 0 }, ...res.data],
    };

    equipmentsSelects.value.push(organs.value);
    equipmentsSelects.value.push(equipmentTypes.value);
  });
}
function adjustmentEquipmentValue() {
  if (equipments.value !== null && equipments.value.Items)
    equipments.value.Items.forEach((element) => {
      element.Type.Name = tradutionType(element.Type.Name);
      element.link = "Acessar leituras";
      element.actions = ["modal"];
      element.router = {
        name: "station-reads",
        params: { id: element.Id },
      };
    });
}

function tradutionType(type) {
  return type === "station" ? "Estação" : "Pluviômetro";
}

function tradutionTypePTEN(type) {
  return type === "Estação" ? "station" : "pluviometer";
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
  equipmentRest.enableEquipment(equipment.Id, equipment.Enable);
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
    IdRead: data.IdRead,
    Time: data.Time,
    Hour: data.Hour,
    Precipitation: data.Precipitation.Value,
  };
  equipmentRest
    .updatePluvRead(currentEquipment.value.Id, pluv)
    .then(() => {
      toast.success("Leitura salva com sucesso!");
    })
    .catch((e) => {
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
  };
  equipmentRest
    .updateStationRead(currentEquipment.value.Id, station)
    .then(() => {
      toast.success("Leitura salva com sucesso!");
    })
    .catch((e) => {
      toast.error(e.response.data.error);
    })
    .finally(() => {
      loadingRead.value = false;
    });
}
</script>
