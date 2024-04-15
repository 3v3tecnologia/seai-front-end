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
    <div
      v-else
      class="w-full max-w-[1600px] px-4 min-w-[350px] mt-8 h-[70vh] overflow-auto"
    >
      <ProgressSpinner v-if="loadingTable" />
      <ViewMode v-if="!editMode && !loadingTable" :studies="studies" />
      <EditMode v-if="editMode && !loadingTable" :studies="studies" />
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
import { toast } from "vue3-toastify";

const studies = ref([]);
const currentBasin = ref({});
const basinSelectsOptions = ref([]);
const startBasinSelectsOptions = ref([]);
const basin = ref({});
const loading = ref(false);
const loadingTable = ref(false);
const editMode = ref(false);

const { getStudiesByBasin, createStudiesByBasin } = new CultureRest();
const { getLocations } = new CensusRest();

onMounted(() => {
  loading.value = true;
  getBasin();
});

function getBasin() {
  getLocations().then((res) => {
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
    getStudies(currentBasin.value.Id);
  });
}

function getStudies(id) {
  getStudiesByBasin(id).then((res) => {
    studies.value = res.data.data;
    studies.value = studies.value.map((study) => {
      Object.keys(study).forEach((key) => {
        if (study[key] === null) {
          study[key] = 0;
        }
      });
      return study;
    });
    loading.value = false;
    loadingTable.value = false;
  });
}

function basinSelectsActions(select, index) {
  loadingTable.value = true;
  getStudies(index);
}
function enterEditMode(value) {
  loadingTable.value = true;
  editMode.value = value;
  setTimeout(() => {
    loadingTable.value = false;
  }, 100);
}

function save() {
  loadingTable.value = true;
  createStudiesByBasin(currentBasin.value.Id, studies.value)
    .then(() => {
      toast.success("Estudos salvos com sucesso!");
    })
    .catch(() => {
      toast.error("Não foi possível salvar os estudos!");
    })
    .finally(() => {
      getStudies(currentBasin.value.Id);
      editMode.value = false;
    });
}
</script>
