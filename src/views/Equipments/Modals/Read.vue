<template>
  <Dialog
    v-model:visible="visible"
    modal
    :header="title"
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    @hide="closeModal()"
  >
    <div v-if="!isEmpty" class="w-full flex justify-between items-center">
      <h1>
        Data: <strong>{{ convertDate(read.Time) }}</strong>
      </h1>
      <div>
        <Button
          v-if="!editMode"
          icon="pi pi-pencil"
          label="Modo de edição"
          class="btn-primary"
          :disabled="loadingButton"
          @click="editMode = true"
        ></Button>
        <div class="flex gap-1" v-if="editMode">
          <Button
            class="btn-simple flex gap-2 !p-4"
            :disabled="loadingButton"
            @click="editMode = false"
          >
            <i class="pi pi-times text-danger"></i>
            <p class="text-danger">Cancelar</p>
          </Button>
          <Button
            icon="pi pi-save"
            label="Salvar dados"
            class="btn-success"
            @click="handleSave()"
            :disabled="loadingButton || !isFormValid"
          ></Button>
        </div>
      </div>
    </div>
    <div v-if="!isEmpty">
      <div
        class="min-h-[500px] flex justify-center items-center"
        v-if="loadingButton"
      >
        <ProgressSpinner />
      </div>

      <span v-else>
        <Station
          v-if="type === 'station'"
          :readData="readData"
          :editMode="editMode"
          @update:isFormValid="isFormValid = $event"
          ref="stationComponent"
        />
        <Pluv
          v-else
          :readData="readData"
          :editMode="editMode"
          :date="read.Time"
        />
      </span>
    </div>
    <div v-else>
      <p>Nada encontrado!</p>
    </div>
  </Dialog>
</template>
<script setup>
import { ref, onMounted, defineProps, defineEmits } from "vue";
import moment from "moment";
import Station from "./Station.vue";
import Pluv from "./Pluv.vue";

const emit = defineEmits(["onCloseModal", "onSaveRead"]);

const editMode = ref(false);
const isEmpty = ref(false);
const isFormValid = ref(false);
const stationComponent = ref(null);

const read = ref({});

const props = defineProps({
  showModal: {
    type: Boolean,
  },
  title: {
    type: String,
  },
  type: {
    type: String,
  },
  readData: {
    type: Object,
  },
  idEquipment: {
    type: Number,
  },
  loadingButton: {
    type: Boolean,
    default: false,
  },
});

const visible = ref(false);

onMounted(() => {
  visible.value = props.showModal;
  if (props.readData === null) {
    read.value.Time = getYesterday();
    isEmpty.value = true;
  } else {
    read.value.Time = props.readData.Time.slice(0, -1);
  }
});

function convertDate(date) {
  return moment(date).format("DD/MM/YYYY");
}
function getYesterday() {
  const today = new Date();
  const yesterday = new Date(today.setDate(today.getDate() - 1));
  return yesterday;
}

function closeModal() {
  emit("onCloseModal");
}

function saveRead() {
  emit("onSaveRead", props.readData);
}
function handleSave() {
  if (isFormValid.value) {
    saveRead();
  }
}
</script>
