<template>
  <form class="flex mt-12 flex-wrap gap-8 w-full" v-if="!loading">
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
        />
        <label for="altitude" class="font-weight-bold"
          >Altitude ({{ read.Altitude.Unit }})</label
        >
      </div>
      <div class="form-group form-group-text p-float-label w-1/2">
        <InputNumber
          id="totalRadiation"
          aria-describedby="totalRadiation-help"
          v-model="read.TotalRadiation.Value"
          class="w-full"
          :class="{ 'p-invalid': !read.TotalRadiation.Value }"
          :disabled="!editMode"
          :min-fraction-digits="1"
          mode="decimal"
          :min="0"
          :useGrouping="false"
          required
        />
        <label for="totalRadiation" class="font-weight-bold"
          >Radiação total ({{ read.TotalRadiation.Unit }})</label
        >
        <small v-if="!read.TotalRadiation.Value" class="p-error"
          >Campo obrigatório</small
        >
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
            'p-invalid': !read.AverageRelativeHumidity.Value,
          }"
          :disabled="!editMode"
          :min-fraction-digits="1"
          mode="decimal"
          :min="0"
          :useGrouping="false"
          required
        />
        <label for="averageRelativeHumidity" class="font-weight-bold"
          >Umidade relativa média ({{
            read.AverageRelativeHumidity.Unit
          }})</label
        >
        <small v-if="!read.AverageRelativeHumidity.Value" class="p-error"
          >Campo obrigatório</small
        >
      </div>
      <div class="form-group form-group-text p-float-label w-1/2">
        <InputNumber
          id="averageAtmosphericTemperature"
          aria-describedby="averageAtmosphericTemperature-help"
          v-model="read.AverageAtmosphericTemperature.Value"
          class="w-full"
          :class="{
            'p-invalid': !read.AverageAtmosphericTemperature.Value,
          }"
          :disabled="!editMode"
          :min-fraction-digits="1"
          mode="decimal"
          :min="0"
          :useGrouping="false"
          required
        />
        <label for="averageAtmosphericTemperature" class="font-weight-bold"
          >Temperatura atmosférica média ({{
            read.AverageAtmosphericTemperature.Unit
          }})</label
        >
        <small v-if="!read.AverageAtmosphericTemperature.Value" class="p-error"
          >Campo obrigatório</small
        >
      </div>
    </div>
    <div class="flex w-full gap-4">
      <div class="form-group form-group-text p-float-label w-1/2">
        <InputNumber
          id="atmosphericPressure"
          aria-describedby="atmosphericPressure-help"
          v-model="read.AtmosphericPressure.Value"
          class="w-full"
          :class="{ 'p-invalid': !read.AtmosphericPressure.Value }"
          :disabled="!editMode"
          :min-fraction-digits="1"
          mode="decimal"
          :min="0"
          :useGrouping="false"
          required
        />
        <label for="atmosphericPressure" class="font-weight-bold"
          >Pressão atmosférica ({{ read.AtmosphericPressure.Unit }})</label
        >
        <small v-if="!read.AtmosphericPressure.Value" class="p-error"
          >Campo obrigatório</small
        >
      </div>
      <div class="form-group form-group-text p-float-label w-1/2">
        <InputNumber
          id="windVelocity"
          aria-describedby="windVelocity-help"
          v-model="read.WindVelocity.Value"
          class="w-full"
          :class="{ 'p-invalid': !read.WindVelocity.Value }"
          :disabled="!editMode"
          :min-fraction-digits="1"
          mode="decimal"
          :min="0"
          :useGrouping="false"
          required
        />
        <label for="windVelocity" class="font-weight-bold"
          >Velocidade do vento ({{ read.WindVelocity.Unit }})</label
        >
        <small v-if="!read.WindVelocity.Value" class="p-error"
          >Campo obrigatório</small
        >
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
            'p-invalid': !read.MinAtmosphericTemperature.Value,
          }"
          :disabled="!editMode"
          :min-fraction-digits="1"
          mode="decimal"
          :min="0"
          :useGrouping="false"
          required
        />
        <label for="minAtmosphericTemperature" class="font-weight-bold"
          >Temperatura Atmosférica min. ({{
            read.MinAtmosphericTemperature.Unit
          }})</label
        >
        <small v-if="!read.MinAtmosphericTemperature.Value" class="p-error"
          >Campo obrigatório</small
        >
      </div>
      <div class="form-group form-group-text p-float-label w-1/2">
        <InputNumber
          id="maxAtmosphericTemperature"
          aria-describedby="maxAtmosphericTemperature-help"
          v-model="read.MaxAtmosphericTemperature.Value"
          class="w-full"
          :class="{
            'p-invalid': !read.MaxAtmosphericTemperature.Value,
          }"
          :disabled="!editMode"
          :min-fraction-digits="1"
          mode="decimal"
          :min="0"
          :useGrouping="false"
          required
        />
        <label for="maxAtmosphericTemperature" class="font-weight-bold"
          >Temperatura Atmosférica máx ({{
            read.MaxAtmosphericTemperature.Unit
          }})</label
        >
        <small v-if="!read.MaxAtmosphericTemperature.Value" class="p-error"
          >Campo obrigatório</small
        >
      </div>
    </div>
    <div class="flex w-full gap-4">
      <div class="form-group form-group-text p-float-label w-1/2">
        <InputNumber
          id="minRelativeHumidity"
          aria-describedby="minRelativeHumidity-help"
          v-model="read.MinRelativeHumidity.Value"
          class="w-full"
          :class="{ 'p-invalid': !read.MinRelativeHumidity.Value }"
          :disabled="!editMode"
          :min-fraction-digits="1"
          mode="decimal"
          :min="0"
          :useGrouping="false"
          required
        />
        <label for="minRelativeHumidity" class="font-weight-bold"
          >Umidade relativa min. ({{ read.MinRelativeHumidity.Unit }})</label
        >
        <small v-if="!read.MinRelativeHumidity.Value" class="p-error"
          >Campo obrigatório</small
        >
      </div>
      <div class="form-group form-group-text p-float-label w-1/2">
        <InputNumber
          id="maxRelativeHumidity"
          aria-describedby="maxRelativeHumidity-help"
          v-model="read.MaxRelativeHumidity.Value"
          class="w-full"
          :class="{ 'p-invalid': !read.MaxRelativeHumidity.Value }"
          :disabled="!editMode"
          mode="decimal"
          :min-fraction-digits="1"
          :min="0"
          :useGrouping="false"
          required
        />
        <label for="maxRelativeHumidity" class="font-weight-bold"
          >Umidade relativa máx. ({{ read.MaxRelativeHumidity.Unit }})</label
        >
        <small v-if="!read.MaxRelativeHumidity.Value" class="p-error"
          >Campo obrigatório</small
        >
      </div>
    </div>
    <div class="form-group form-group-text p-float-label w-full">
      <InputNumber
        id="et0"
        aria-describedby="et0-help"
        v-model="read.Et0.Value"
        class="w-full"
        :disabled="true"
        mode="decimal"
        :min-fraction-digits="1"
        :min="0"
        :useGrouping="false"
      />
      <label for="et0" class="font-weight-bold"
        >ET0 ({{ read.Et0.Unit }})</label
      >
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
    read.value.TotalRadiation?.Value > 0 &&
    read.value.AverageRelativeHumidity?.Value > 0 &&
    read.value.AverageAtmosphericTemperature?.Value > 0 &&
    read.value.AtmosphericPressure?.Value > 0 &&
    read.value.WindVelocity?.Value > 0 &&
    read.value.MinAtmosphericTemperature?.Value > 0 &&
    read.value.MaxAtmosphericTemperature?.Value > 0 &&
    read.value.MinRelativeHumidity?.Value > 0 &&
    read.value.MaxRelativeHumidity?.Value > 0
  );
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

function handleSubmit() {
  submitted.value = true;
  if (isFormValid.value) {
    emit("onSaveRead", read.value);
  }
}
</script>
