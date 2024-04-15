<template>
  <div class="w-full flex flex-col justify-center items-center">
    <div
      v-if="!loading"
      class="w-full max-w-[1600px] px-4 flex justify-start mt-4"
    >
      <HeaderTable
        :selectItems="basinSelectsOptions"
        :startSelected="startBasinSelectsOptions"
        :hiddenSearch="true"
        @onSelectItem="basinSelectsActions"
      >
        <div v-if="!editMode && !loadingTable">
          <Button
            icon="pi pi-pencil"
            label="Modo de edição"
            class="btn-primary"
            @click="enterEditMode(true)"
          ></Button>
        </div>
        <div class="flex gap-4" v-if="editMode && !loadingTable">
          <Button
            icon="pi pi-times"
            label="Sair"
            class="btn-danger"
            @click="enterEditMode(false)"
          ></Button>
          <Button
            icon="pi pi-save"
            label="Salvar alterações"
            class="btn-success"
            @click="save()"
          ></Button>
        </div>
      </HeaderTable>
    </div>
    <ProgressSpinner v-if="loading" />
    <div v-else class="w-full max-w-[1600px] px-4 min-w-[350px]">
      <div
        class="mt-6 h-[56vh] min-h-[500px] max-h-[1000px] bg-white overflow-auto"
      >
        <Edition v-if="editMode" :weights="weights" />
        <ViewMode v-else :weights="weights" />
      </div>
      <Legend />
    </div>
  </div>
</template>
<script setup>
import Legend from "./Legend/legend.vue";
import Edition from "./Modes/Edition.vue";
import ViewMode from "./Modes/View.vue";
import HeaderTable from "@/components/tables/HeaderTable";
import { ref, onMounted } from "vue";
import { CultureRest } from "@/services/culture.service";
import { CensusRest } from "@/services/census.service";
import { toast } from "vue3-toastify";

const weights = ref([]);
const loading = ref(false);
const loadingTable = ref(false);
const editMode = ref(false);
const basinSelectsOptions = ref([]);
const startBasinSelectsOptions = ref([]);
const currentBasin = ref({});
const basin = ref({});

const { getWeightByBasin, createWeightsByBasin } = new CultureRest();
const { getLocations } = new CensusRest();

onMounted(() => {
  loading.value = true;
  getBasin();
});

function getAllWeights(id) {
  getWeightByBasin(id).then((res) => {
    weights.value = res.data ? res.data : [];
    if (weights.value.length > 0) {
      weights.value = weights.value.map((weight) => {
        Object.keys(weight).forEach((key) => {
          if (weight[key] === null) {
            weight[key] = 0;
          }
        });
        return weight;
      });
    }
    loading.value = false;
  });
}
function enterEditMode(value) {
  loadingTable.value = true;
  editMode.value = value;
  setTimeout(() => {
    loadingTable.value = false;
  }, 100);
}

function basinSelectsActions(select, index) {
  loadingTable.value = true;
  getAllWeights(index);
}

function getBasin() {
  getLocations().then((res) => {
    console.log(res);
    const resultBasin = res.data.data.Bacia;
    currentBasin.value = resultBasin[0];
    basin.value = {
      placeholder: "Buscar por Bacia",
      optionLabel: "Local",
      paramsName: "Id",
      items: resultBasin,
    };
    basinSelectsOptions.value.push(basin.value);
    startBasinSelectsOptions.value.push(currentBasin.value);
    getAllWeights(currentBasin.value.Id);
  });
}
function save() {
  loadingTable.value = true;
  createWeightsByBasin(currentBasin.value.Id, weights.value)
    .then(() => {
      toast.success("Pesos salvos com sucesso!");
    })
    .catch(() => {
      toast.error("Não foi possível salvar os pesos!");
    })
    .finally(() => {
      getAllWeights(currentBasin.value.Id);
      editMode.value = false;
      loadingTable.value = false;
    });
}
</script>
