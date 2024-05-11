<template>
  <form class="flex mt-12 flex-wrap gap-8 w-full" v-if="!loading">
    <div class="flex w-full gap-4">
      <div class="form-group form-group-text p-float-label w-1/2">
        <InputNumber
          id="kc"
          aria-describedby="kc-help"
          v-model="read.Altitude.Value"
          class="w-full"
          :disabled="true"
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
    <div class="flex w-full gap-4">
      <div class="form-group form-group-text p-float-label w-1/2">
        <InputNumber
          id="kc"
          aria-describedby="kc-help"
          v-model="read.MinAtmosphericTemperature.Value"
          class="w-full"
          :disabled="!editMode"
          showButtons
          :min="0"
        />

        <label for="estagio" class="font-weight-bold">
          Temperatura Atmosférica min. ({{
            read.MinAtmosphericTemperature.Unit
          }})
        </label>
      </div>
      <div class="form-group form-group-text p-float-label w-1/2">
        <InputNumber
          id="kc"
          aria-describedby="kc-help"
          v-model="read.MaxAtmosphericTemperature.Value"
          class="w-full"
          :disabled="!editMode"
          showButtons
          :min="0"
        />
        <label for="estagio" class="font-weight-bold">
          Temperatura Atmosférica máx ({{
            read.MaxAtmosphericTemperature.Unit
          }})
        </label>
      </div>
    </div>
    <div class="flex w-full gap-4">
      <div class="form-group form-group-text p-float-label w-1/2">
        <InputNumber
          id="kc"
          aria-describedby="kc-help"
          v-model="read.MinRelativeHumidity.Value"
          class="w-full"
          :disabled="!editMode"
          showButtons
          :min="0"
        />

        <label for="estagio" class="font-weight-bold">
          Umidade relativa min. ({{ read.MinRelativeHumidity.Unit }})
        </label>
      </div>
      <div class="form-group form-group-text p-float-label w-1/2">
        <InputNumber
          id="kc"
          aria-describedby="kc-help"
          v-model="read.MaxRelativeHumidity.Value"
          class="w-full"
          :disabled="!editMode"
          showButtons
          :min="0"
        />
        <label for="estagio" class="font-weight-bold">
          Umidade relativa máx. ({{ read.MaxRelativeHumidity.Unit }})
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
</template>
<script setup>
import { ref, onMounted, defineProps, defineEmits } from "vue";

const emit = defineEmits(["onCloseModal", "onSaveRead"]);

const read = ref({});
const loading = ref(true);

const props = defineProps({
  readData: {
    type: Object,
  },
  date: {
    type: String,
  },
  editMode: {
    type: Boolean,
  },
});

const visible = ref(false);

onMounted(() => {
  visible.value = props.showModal;
  if (props.readData === null) {
    getDefaultRead();
  } else {
    read.value = props.readData;
  }
  loading.value = false;
});

function getDefaultRead() {
  read.value = {
    IdEquipment: props.idEquipment,
    Time: props.date,
    Hour: null,
    Altitude: {
      Unit: "m",
      Value: 0.0,
    },
    AtmosphericPressure: {
      Unit: "°C",
      Value: 0.0,
    },
    AverageAtmosphericTemperature: {
      Unit: "°C",
      Value: 0.0,
    },
    AverageRelativeHumidity: {
      Unit: "%",
      Value: 0.0,
    },
    Et0: {
      Unit: "mm",
      Value: 0.0,
    },
    MaxAtmosphericTemperature: {
      Unit: "°C",
      Value: 0.0,
    },
    MaxRelativeHumidity: {
      Unit: "%",
      Value: 0.0,
    },
    MinAtmosphericTemperature: {
      Unit: "°C",
      Value: 0.0,
    },
    MinRelativeHumidity: {
      Unit: "%",
      Value: 0.0,
    },

    TotalRadiation: {
      Unit: "W/m",
      Value: 0.0,
    },

    WindVelocity: {
      Unit: "m/s",
      Value: 0.0,
    },
  };
}
</script>
