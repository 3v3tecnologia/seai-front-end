<template>
  <form class="flex mt-12 flex-wrap gap-8 w-full" v-if="!loading">
    <div
      class="form-group form-group-text text-left p-float-label mt-2 w-full"
      v-if="editMode"
    >
      <Textarea v-model="read.Operation" rows="3" class="w-full" />
      <label class="font-weight-bold">Motivo para edição</label>
      <small v-if="!read.Operation" class="p-error"> Campo obrigatório </small>
    </div>

    <div class="flex w-full gap-4">
      <div class="form-group form-group-text p-float-label w-1/2">
        <InputNumber
          id="altitude"
          aria-describedby="altitude-help"
          v-model="read.Altitude.Value"
          class="w-full"
          :disabled="true"
          :min-fraction-digits="1"
          mode="decimal"
          :min="0"
          :useGrouping="false"
          :showButtons="true"
        />
        <label for="altitude" class="font-weight-bold">
          Altitude ({{ read.Altitude.Unit }})
        </label>
      </div>

      <div class="form-group form-group-text p-float-label w-1/2">
        <InputNumber
          id="totalRadiation"
          aria-describedby="totalRadiation-help"
          v-model="read.TotalRadiation.Value"
          class="w-full"
          :class="{
            'p-invalid':
              touchedFields.TotalRadiation && !read.TotalRadiation.Value,
          }"
          :disabled="!editMode"
          :min-fraction-digits="1"
          mode="decimal"
          :min="50"
          :max="400"
          :useGrouping="false"
          required
          :showButtons="true"
          @blur="touchedFields.TotalRadiation = true"
        />
        <label for="totalRadiation" class="font-weight-bold">
          Radiação solar ({{ read.TotalRadiation.Unit }})
        </label>
        <small
          v-if="touchedFields.TotalRadiation && !read.TotalRadiation.Value"
          class="p-error"
        >
          Campo obrigatório
        </small>
      </div>
    </div>

    <div class="flex w-full gap-4">
      <div class="form-group form-group-text p-float-label w-1/2">
        <InputNumber
          id="averageRelativeHumidity"
          aria-describedby="averageRelativeHumidity-help"
          v-model="read.AverageRelativeHumidity.Value"
          class="w-full"
          :class="{
            'p-invalid':
              touchedFields.AverageRelativeHumidity &&
              !read.AverageRelativeHumidity.Value,
          }"
          :disabled="!editMode"
          :min-fraction-digits="1"
          mode="decimal"
          :min="5"
          :max="100"
          :useGrouping="false"
          required
          :showButtons="true"
          @blur="touchedFields.AverageRelativeHumidity = true"
        />
        <label for="averageRelativeHumidity" class="font-weight-bold">
          Umidade relativa do ar média ({{ read.AverageRelativeHumidity.Unit }})
        </label>
        <small
          v-if="
            touchedFields.AverageRelativeHumidity &&
            !read.AverageRelativeHumidity.Value
          "
          class="p-error"
        >
          Campo obrigatório
        </small>
      </div>

      <div class="form-group form-group-text p-float-label w-1/2">
        <InputNumber
          id="averageAtmosphericTemperature"
          aria-describedby="averageAtmosphericTemperature-help"
          v-model="read.AverageAtmosphericTemperature.Value"
          class="w-full"
          :class="{
            'p-invalid':
              touchedFields.AverageAtmosphericTemperature &&
              !read.AverageAtmosphericTemperature.Value,
          }"
          :disabled="!editMode"
          :min-fraction-digits="1"
          mode="decimal"
          :min="0"
          :max="60"
          :useGrouping="false"
          required
          :showButtons="true"
          @blur="touchedFields.AverageAtmosphericTemperature = true"
        />
        <label for="averageAtmosphericTemperature" class="font-weight-bold">
          Temperatura do ar média ({{
            read.AverageAtmosphericTemperature.Unit
          }})
        </label>
        <small
          v-if="
            touchedFields.AverageAtmosphericTemperature &&
            !read.AverageAtmosphericTemperature.Value
          "
          class="p-error"
        >
          Campo obrigatório
        </small>
      </div>
    </div>

    <div class="flex w-full gap-4">
      <div class="form-group form-group-text p-float-label w-1/2">
        <InputNumber
          id="atmosphericPressure"
          aria-describedby="atmosphericPressure-help"
          v-model="read.AtmosphericPressure.Value"
          class="w-full"
          :class="{
            'p-invalid':
              touchedFields.AtmosphericPressure &&
              !read.AtmosphericPressure.Value,
          }"
          :disabled="!editMode"
          :min-fraction-digits="1"
          mode="decimal"
          :min="500"
          :max="1200"
          :useGrouping="false"
          required
          :showButtons="true"
          @blur="touchedFields.AtmosphericPressure = true"
        />
        <label for="atmosphericPressure" class="font-weight-bold">
          Pressão atmosférica ({{ read.AtmosphericPressure.Unit }})
        </label>
        <small
          v-if="
            touchedFields.AtmosphericPressure && !read.AtmosphericPressure.Value
          "
          class="p-error"
        >
          Campo obrigatório
        </small>
      </div>

      <div class="form-group form-group-text p-float-label w-1/2">
        <InputNumber
          id="windVelocity"
          aria-describedby="windVelocity-help"
          v-model="read.WindVelocity.Value"
          class="w-full"
          :class="{
            'p-invalid': touchedFields.WindVelocity && !read.WindVelocity.Value,
          }"
          :disabled="!editMode"
          :min-fraction-digits="1"
          mode="decimal"
          :min="0"
          :max="20"
          :useGrouping="false"
          required
          :showButtons="true"
          @blur="touchedFields.WindVelocity = true"
        />
        <label for="windVelocity" class="font-weight-bold">
          Velocidade do vento ({{ read.WindVelocity.Unit }})
        </label>
        <small
          v-if="touchedFields.WindVelocity && !read.WindVelocity.Value"
          class="p-error"
        >
          Campo obrigatório
        </small>
      </div>
    </div>

    <div class="flex w-full gap-4">
      <div class="form-group form-group-text p-float-label w-1/2">
        <InputNumber
          id="minAtmosphericTemperature"
          aria-describedby="minAtmosphericTemperature-help"
          v-model="read.MinAtmosphericTemperature.Value"
          class="w-full"
          :class="{
            'p-invalid':
              touchedFields.MinAtmosphericTemperature &&
              !read.MinAtmosphericTemperature.Value,
          }"
          :disabled="!editMode"
          :min-fraction-digits="1"
          mode="decimal"
          :min="0"
          :max="60"
          :useGrouping="false"
          required
          :showButtons="true"
          @blur="touchedFields.MinAtmosphericTemperature = true"
        />
        <label for="minAtmosphericTemperature" class="font-weight-bold">
          Temperatura do ar min. ({{ read.MinAtmosphericTemperature.Unit }})
        </label>
        <small
          v-if="
            touchedFields.MinAtmosphericTemperature &&
            !read.MinAtmosphericTemperature.Value
          "
          class="p-error"
        >
          Campo obrigatório
        </small>
      </div>

      <div class="form-group form-group-text p-float-label w-1/2">
        <InputNumber
          id="maxAtmosphericTemperature"
          aria-describedby="maxAtmosphericTemperature-help"
          v-model="read.MaxAtmosphericTemperature.Value"
          class="w-full"
          :class="{
            'p-invalid':
              touchedFields.MaxAtmosphericTemperature &&
              !read.MaxAtmosphericTemperature.Value,
          }"
          :disabled="!editMode"
          :min-fraction-digits="1"
          mode="decimal"
          :min="0"
          :max="60"
          :useGrouping="false"
          required
          :showButtons="true"
          @blur="touchedFields.MaxAtmosphericTemperature = true"
        />
        <label for="maxAtmosphericTemperature" class="font-weight-bold">
          Temperatura do ar Atmosférica máx. ({{
            read.MaxAtmosphericTemperature.Unit
          }})
        </label>
        <small
          v-if="
            touchedFields.MaxAtmosphericTemperature &&
            !read.MaxAtmosphericTemperature.Value
          "
          class="p-error"
        >
          Campo obrigatório
        </small>
      </div>
    </div>

    <div class="flex w-full gap-4">
      <div class="form-group form-group-text p-float-label w-1/2">
        <InputNumber
          id="minRelativeHumidity"
          aria-describedby="minRelativeHumidity-help"
          v-model="read.MinRelativeHumidity.Value"
          class="w-full"
          :class="{
            'p-invalid':
              touchedFields.MinRelativeHumidity &&
              !read.MinRelativeHumidity.Value,
          }"
          :disabled="!editMode"
          :min-fraction-digits="1"
          mode="decimal"
          :min="5"
          :max="100"
          :useGrouping="false"
          required
          :showButtons="true"
          @blur="touchedFields.MinRelativeHumidity = true"
        />
        <label for="minRelativeHumidity" class="font-weight-bold">
          Umidade relativa do ar min. ({{ read.MinRelativeHumidity.Unit }})
        </label>
        <small
          v-if="
            touchedFields.MinRelativeHumidity && !read.MinRelativeHumidity.Value
          "
          class="p-error"
        >
          Campo obrigatório
        </small>
      </div>

      <div class="form-group form-group-text p-float-label w-1/2">
        <InputNumber
          id="maxRelativeHumidity"
          aria-describedby="maxRelativeHumidity-help"
          v-model="read.MaxRelativeHumidity.Value"
          class="w-full"
          :class="{
            'p-invalid':
              touchedFields.MaxRelativeHumidity &&
              !read.MaxRelativeHumidity.Value,
          }"
          :disabled="!editMode"
          :min-fraction-digits="1"
          mode="decimal"
          :min="5"
          :max="100"
          :useGrouping="false"
          required
          :showButtons="true"
          @blur="touchedFields.MaxRelativeHumidity = true"
        />
        <label for="maxRelativeHumidity" class="font-weight-bold">
          Umidade relativa do ar máx. ({{ read.MaxRelativeHumidity.Unit }})
        </label>
        <small
          v-if="
            touchedFields.MaxRelativeHumidity && !read.MaxRelativeHumidity.Value
          "
          class="p-error"
        >
          Campo obrigatório
        </small>
      </div>
    </div>
  </form>
</template>

<script setup>
import { ref, onMounted, defineProps, defineEmits, watch, computed } from "vue";
const emit = defineEmits(["update:isFormValid", "onCloseModal", "onSaveRead"]);

const read = ref({});
const loading = ref(true);
const submitted = ref(false);
const visible = ref(false);

const props = defineProps({
  readData: Object,
  date: String,
  editMode: Boolean,
  showModal: Boolean,
  idEquipment: Number,
});

const isFormValid = computed(() => {
  return (
    read.value.TotalRadiation?.Value !== null &&
    read.value.AverageRelativeHumidity?.Value !== null &&
    read.value.AverageAtmosphericTemperature?.Value !== null &&
    read.value.AtmosphericPressure?.Value !== null &&
    read.value.WindVelocity?.Value !== null &&
    read.value.MinAtmosphericTemperature?.Value !== null &&
    read.value.MaxAtmosphericTemperature?.Value !== null &&
    read.value.MinRelativeHumidity?.Value !== null &&
    read.value.MaxRelativeHumidity?.Value !== null
  );
});

const touchedFields = ref({
  TotalRadiation: false,
  AverageRelativeHumidity: false,
  AverageAtmosphericTemperature: false,
  AtmosphericPressure: false,
  WindVelocity: false,
  MinAtmosphericTemperature: false,
  MaxAtmosphericTemperature: false,
  MinRelativeHumidity: false,
  MaxRelativeHumidity: false,
});

watch(isFormValid, (newVal) => {
  emit("update:isFormValid", newVal);
});

watch(
  () => read.value,
  () => {
    emit("update:isFormValid", isFormValid.value);
  },
  { deep: true }
);

onMounted(() => {
  visible.value = props.showModal;
  if (!props.readData) {
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
      Value: 500.0,
    },
    AverageAtmosphericTemperature: {
      Unit: "°C",
      Value: 0.0,
    },
    AverageRelativeHumidity: {
      Unit: "%",
      Value: 5.0,
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
      Value: 5.0,
    },
    MinAtmosphericTemperature: {
      Unit: "°C",
      Value: 0.0,
    },
    MinRelativeHumidity: {
      Unit: "%",
      Value: 5.0,
    },
    TotalRadiation: {
      Unit: "W/m",
      Value: 50.0,
    },
    WindVelocity: {
      Unit: "m/s",
      Value: 0.0,
    },
  };
}
</script>
