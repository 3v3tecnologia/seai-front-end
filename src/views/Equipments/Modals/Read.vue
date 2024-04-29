<template>
  <Dialog
    v-model:visible="visible"
    modal
    :header="title"
    :style="{ width: '40rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    @hide="closeModal()"
  >
    <div class="w-full flex justify-between items-center">
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
            @click="saveRead()"
            :disabled="loadingButton"
          ></Button>
        </div>
      </div>
    </div>
    <form class="flex mt-12 flex-wrap gap-8 w-full">
      <div class="flex w-full gap-4">
        <div class="form-group form-group-text p-float-label w-1/2">
          <InputNumber
            id="kc"
            aria-describedby="kc-help"
            v-model="read.Altitude.Value"
            class="w-full"
            :disabled="!editMode"
            showButtons
            :min="0"
          />
          <label for="estagio" class="font-weight-bold">
            Altitude ({{ read.Altitude.Unit }})
          </label>
        </div>
        <div class="form-group form-group-text p-float-label w-1/2">
          <InputNumber
            id="kc"
            aria-describedby="kc-help"
            v-model="read.TotalRadiation.Value"
            class="w-full"
            :disabled="!editMode"
            showButtons
            :min="0"
          />
          <label for="estagio" class="font-weight-bold">
            Radiação total ({{ read.TotalRadiation.Unit }})
          </label>
        </div>
      </div>
      <div class="flex w-full gap-4">
        <div class="form-group form-group-text p-float-label w-1/2">
          <InputNumber
            id="kc"
            aria-describedby="kc-help"
            v-model="read.AverageRelativeHumidity.Value"
            class="w-full"
            :disabled="!editMode"
            showButtons
            :min="0"
          />
          <label for="estagio" class="font-weight-bold">
            Umidade relativa média ({{ read.AverageRelativeHumidity.Unit }})
          </label>
        </div>
        <div class="form-group form-group-text p-float-label w-1/2">
          <InputNumber
            id="kc"
            aria-describedby="kc-help"
            v-model="read.AverageAtmosphericTemperature.Value"
            class="w-full"
            :disabled="!editMode"
            showButtons
            :min="0"
          />

          <label for="estagio" class="font-weight-bold">
            Temperatura atmosférica média ({{
              read.AverageAtmosphericTemperature.Unit
            }})
          </label>
        </div>
      </div>
      <div class="flex w-full gap-4">
        <div class="form-group form-group-text p-float-label w-1/2">
          <InputNumber
            id="kc"
            aria-describedby="kc-help"
            v-model="read.AtmosphericPressure.Value"
            class="w-full"
            :disabled="!editMode"
            showButtons
            :min="0"
          />

          <label for="estagio" class="font-weight-bold">
            Pressão atmosférica ({{ read.AtmosphericPressure.Unit }})
          </label>
        </div>
        <div class="form-group form-group-text p-float-label w-1/2">
          <InputNumber
            id="kc"
            aria-describedby="kc-help"
            v-model="read.WindVelocity.Value"
            class="w-full"
            :disabled="!editMode"
            showButtons
            :min="0"
          />
          <label for="estagio" class="font-weight-bold">
            Velocidade do vento ({{ read.WindVelocity.Unit }})
          </label>
        </div>
      </div>
      <div class="form-group form-group-text p-float-label w-full">
        <InputNumber
          id="kc"
          aria-describedby="kc-help"
          v-model="read.Et0.Value"
          class="w-full"
          :disabled="true"
          showButtons
          :min="0"
        />
        <label for="estagio" class="font-weight-bold">
          ET0 ({{ read.Et0.Unit }})
        </label>
      </div>
    </form>
  </Dialog>
</template>
<script setup>
import { ref, onMounted, defineProps, defineEmits } from "vue";
import moment from "moment";
import { toast } from "vue3-toastify";
import { useRouter } from "vue-router";

const emit = defineEmits(["onCloseModal", "onSaveRead"]);

const editMode = ref(false);

const read = ref({});

const props = defineProps({
  showModal: {
    type: Boolean,
  },
  title: {
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
  console.log(props.readData);
  if (props.readData === null) {
    getDefaultRead();
  } else {
    read.value = props.readData;
  }
});

function getDefaultRead() {
  read.value = {
    IdEquipment: props.idEquipment,
    Time: getYesterday(),
    Hour: null,
    Altitude: {
      Unit: "m",
      Value: 0.0,
    },
    TotalRadiation: {
      Unit: "W/m",
      Value: 0.0,
    },
    AverageRelativeHumidity: {
      Unit: "%",
      Value: 0.0,
    },
    MinRelativeHumidity: {
      Unit: "%",
      Value: 0.0,
    },
    MaxRelativeHumidity: {
      Unit: "%",
      Value: 0.0,
    },
    AverageAtmosphericTemperature: {
      Unit: "°C",
      Value: 0.0,
    },
    MaxAtmosphericTemperature: {
      Unit: "°C",
      Value: 0.0,
    },
    MinAtmosphericTemperature: {
      Unit: "°C",
      Value: 0.0,
    },
    AtmosphericPressure: {
      Unit: "°C",
      Value: 0.0,
    },
    WindVelocity: {
      Unit: "m/s",
      Value: 0.0,
    },
    Et0: {
      Unit: "mm",
      Value: 0.0,
    },
  };
}

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
  emit("onSaveRead", read.value);
}
</script>
