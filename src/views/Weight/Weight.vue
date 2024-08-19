<template>
  <div class="w-full flex flex-col justify-center items-center">
    <div
      v-if="!loading"
      class="w-full max-w-[1600px] px-4 flex justify-start mt-4"
    >
      <HeaderTable :hiddenSearch="true" class="w-full">
        <div class="flex w-full gap-2 justify-between items-center">
          <div>
            <h2 v-if="selectedBasinAplicated.length === 0">
              Nenhuma bacia selecionada
            </h2>
            <h2 v-else>
              Bacias selecionadas:
              <span>{{ formatBasins(selectedBasinAplicated) }}</span>
            </h2>
          </div>
          <div class="flex gap-2">
            <MultiSelect
              v-model="selectedBasin"
              :options="basins"
              optionLabel="name"
              filter
              placeholder="Selecione a bacia"
              :maxSelectedLabels="3"
              class="w-full md:w-80"
            />
            <Dropdown
              v-model="selectedYear"
              :options="years"
              placeholder="Selecione o ano"
              class="w-full md:w-40"
            />
            <Button
              :disabled="selectedBasin.length === 0"
              class="btn-primary"
              @click="getAllWeights()"
            >
              Aplicar
            </Button>
          </div>
        </div>
      </HeaderTable>
    </div>
    <ProgressSpinner v-if="loading" />
    <div v-else class="w-full max-w-[1600px] px-4 min-w-[350px]">
      <div
        class="h-[56vh] min-h-[500px] max-h-[1000px] bg-white flex justify-center items-center"
        v-if="loadingTable"
      >
        <ProgressSpinner />
      </div>
      <div
        v-else
        class="mt-6 h-[56vh] min-h-[500px] max-h-[1000px] bg-white overflow-auto"
      >
        <Edition
          v-if="weights && weights.length > 0 && editMode"
          :weights="weights"
        />
        <ViewMode
          v-else-if="weights && weights.length > 0 && !editMode"
          :weights="weights"
        />

        <div class="mt-4" v-else>Selecione uma bacia para gerar a tabela</div>
      </div>
      <Legend />
      <div class="w-full flex justify-end mt-4">
        <div class="flex gap-4" v-if="editMode">
          <Button
            :disabled="selectedBasinAplicated.length === 0"
            class="btn-danger"
            @click="editMode = false"
          >
            Sair do modo de edição
          </Button>
          <Button
            :disabled="selectedBasinAplicated.length === 0"
            class="btn-secondary"
            @click="recalculated()"
          >
            Recalcular
          </Button>
          <Button
            :disabled="selectedBasinAplicated.length === 0"
            class="btn-success"
            @click="save()"
          >
            Salvar
          </Button>
        </div>
        <div class="flex gap-4" v-else>
          <Button
            :disabled="selectedBasinAplicated.length === 0"
            class="btn-secondary"
            @click="generateGraphs()"
          >
            Gerar gráfico
          </Button>
          <Button
            :disabled="selectedBasinAplicated.length === 0"
            class="btn-primary"
            @click="editMode = true"
          >
            Modo de edição
          </Button>
        </div>
      </div>
    </div>

    <div class="w-full max-w-[1600px] px-4 flex justify-start mt-4">
      <Graphs
        v-if="graphsData && graphsData.length > 0"
        :cropsData="graphsData"
      />
    </div>
  </div>
</template>
<script setup>
import Legend from "./Legend/legend.vue";
import Edition from "./Modes/Edition.vue";
import ViewMode from "./Modes/View.vue";
import Graphs from "./Graphs/Graphs.vue";
import { ref, onMounted } from "vue";
import { CultureRest } from "@/services/culture.service";
import { CensusRest } from "@/services/census.service";
import { toast } from "vue3-toastify";

const weights = ref([]);
const loading = ref(false);
const loadingTable = ref(false);
const editMode = ref(false);
const basins = ref([]);
const selectedBasin = ref([]);
const selectedBasinAplicated = ref([]);
const graphsData = ref([]);
const currentBasin = ref({});
const selectedYear = ref(2023);
const years = ref(generateYears());

const { getWeightByBasin, createWeightsByBasin, getGraphs, calculate } =
  new CultureRest();
const { getLocations } = new CensusRest();

onMounted(() => {
  loading.value = true;
  getBasin();
});

function getAllWeights() {
  selectedBasinAplicated.value = selectedBasin.value;
  const ids = getIdsString();
  loadingTable.value = true;
  getWeightByBasin(ids, selectedYear.value)
    .then((res) => {
      weights.value = res.data ? res.data : [];
    })
    .finally(() => {
      loading.value = false;
      loadingTable.value = false;
    });
}
function getIdsString() {
  return selectedBasinAplicated.value.map((basin) => basin.id).join(",");
}
function getBasin() {
  getLocations()
    .then((res) => {
      const resultBasin = res.data;
      basins.value = resultBasin;
      selectedBasin.value.push(resultBasin[0]);
      getAllWeights();
    })
    .finally(() => (loading.value = false));
}
function save() {
  loadingTable.value = true;
  const data = {
    basin_ids: selectedBasinAplicated.value.map((basin) => basin.id),
    year: selectedYear.value,
    data: weights.value,
  };
  createWeightsByBasin(data)
    .then(() => {
      toast.success("Pesos salvos com sucesso!");
    })
    .catch(() => {
      toast.error("Não foi possível salvar os pesos!");
    })
    .finally(() => {
      getAllWeights();
      editMode.value = false;
      loadingTable.value = false;
    });
}

function formatBasins(basins) {
  if (basins.length === 1) {
    return basins[0].name;
  } else if (basins.length === 2) {
    return `${basins[0].name} e ${basins[1].name}`;
  } else {
    return (
      basins
        .slice(0, -1)
        .map((basin) => basin.name)
        .join(", ") + ` e ${basins[basins.length - 1].name}`
    );
  }
}
function generateGraphs() {
  const ids = selectedBasinAplicated.value.map((basin) => basin.id);
  getGraphs(ids, selectedYear.value).then((res) => {
    graphsData.value = res.data;
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }, 200);
  });
}
function generateYears() {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: currentYear - 2023 + 1 }, (_, i) => 2023 + i);
}
function recalculated() {
  loadingTable.value = true;
  const ids = selectedBasinAplicated.value.map((basin) => basin.id);
  calculate(ids)
    .then((res) => {
      weights.value = res.data ? res.data : [];
    })
    .finally(() => {
      loading.value = false;
      loadingTable.value = false;
    });
}
</script>
