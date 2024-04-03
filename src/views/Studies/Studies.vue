<template>
  <div class="w-full flex flex-col justify-center items-center">
    <div v-if="!loading" class="w-[80%] flex justify-start mt-4">
      <HeaderTable
        :selectItems="basinSelectsOptions"
        :startSelected="startBasinSelectsOptions"
        :hiddenSearch="true"
        @onSelectItem="basinSelectsActions"
      >
        <Button
          icon="pi pi-pencil"
          label="Modo de edição"
          class="btn-primary"
        ></Button>
      </HeaderTable>
    </div>
    <ProgressSpinner v-if="loading" />
    <div v-else class="w-[80%] min-w-[350px] mt-8 h-[70vh] overflow-auto">
      <!-- <ViewMode :studies="studies" /> -->
      <EditMode :studies="studies" />
    </div>
  </div>
</template>
<script setup>
import ViewMode from "./Modes/ViewMode.vue";
import EditMode from "./Modes/EditMode.vue";
import HeaderTable from "@/components/tables/HeaderTable";
import { ref, onMounted } from "vue";
import { CultureRest } from "@/services/culture.service";
import { CensusRest } from "@/services/census.service";

const studies = ref([]);
const currentBasin = ref({});
const basinSelectsOptions = ref([]);
const startBasinSelectsOptions = ref([]);
const basin = ref({});
const loading = ref(false);
const loadingTable = ref(false);

const { getStudiesByBasin } = new CultureRest();
const { getLocations } = new CensusRest();

onMounted(() => {
  loading.value = true;
  getBasin();
});

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
    getStudies();
  });
}

function getStudies() {
  getStudiesByBasin(currentBasin.value.Id).then((res) => {
    console.log(res);
    studies.value = res.data.data;
    loading.value = false;
    loadingTable.value = false;
  });
}

function basinSelectsActions() {
  console.log("teste");
}
</script>

<script>
export default {
  name: "studies",
};
</script>
