<template>
  <form class="formulario">
    <div
      class="flex w-full justify-between gap-4 mt-8"
      v-for="(study, i) in studies"
      :key="i"
    >
      <div class="flex justify-start items-center w-[200px]">
        <h4 class="font-[700]">{{ study.Crop }}:</h4>
      </div>
      <div class="form-group form-group-number p-float-label">
        <InputNumber
          v-model="study.HarvestDuration"
          aria-describedby="kc-help"
          showButtons
          mode="decimal"
          :minFractionDigits="1"
          :min="0"
        />
        <label for="kc" class="font-weight-bold">
          Duração da safra (dias)
        </label>
      </div>
      <div class="form-group form-group-number p-float-label">
        <InputNumber
          v-model="study.CultivationPeriod"
          aria-describedby="kc-help"
          showButtons
          mode="decimal"
          :minFractionDigits="1"
          :min="0"
        />
        <label for="kc" class="font-weight-bold"> Produtividade (kg/ha) </label>
      </div>
      <div class="form-group form-group-number p-float-label">
        <InputNumber
          v-model="study.Consumption"
          aria-describedby="kc-help"
          showButtons
          mode="decimal"
          :minFractionDigits="1"
          :min="0"
        />
        <label for="kc" class="font-weight-bold">
          Consumo hídrico (m³/ha)
        </label>
      </div>
      <div class="form-group form-group-number p-float-label">
        <InputNumber
          v-model="study.CultivationPeriod"
          aria-describedby="kc-help"
          showButtons
          mode="decimal"
          :minFractionDigits="1"
          :min="0"
        />
        <label for="kc" class="font-weight-bold">
          Período de cultivo (dias)
        </label>
      </div>
    </div>
  </form>
</template>
<script setup>
import { defineProps } from "vue";

const props = defineProps({
  studies: {
    type: Array,
  },
});
</script>
]
<style lang="scss">
.formulario {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 9px;
  .form-group-number {
    width: 25%;
    display: flex;
    justify-content: start;
    min-width: 80px;
    input {
      width: 50%;
    }
  }
  .form-group-increment {
    width: 18%;
    min-width: 120px;

    input {
      width: 50%;
    }
  }
  .invalidInput {
    border: 1px solid red !important;
    border-radius: 5px;
  }
}
</style>
