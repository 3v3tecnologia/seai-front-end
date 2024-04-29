<template>
  <form class="formulario bg-white p-4 px-8 rounded-md">
    <div
      class="flex w-full justify-between gap-4 mt-8"
      v-for="(weight, i) in weights"
      :key="i"
    >
      <div class="flex justify-start items-center w-[200px]">
        <h4 class="font-[700]">{{ weight.Crop }}:</h4>
      </div>
      <div class="form-group form-group-number p-float-label">
        <InputNumber
          v-model="weight.ProductivityPerHectare"
          aria-describedby="kc-help"
          showButtons
          mode="decimal"
          :minFractionDigits="1"
          :min="0"
        />
        <label for="kc" class="font-weight-bold"> SP (kg/ha) </label>
      </div>

      <div class="form-group form-group-number p-float-label">
        <InputNumber
          v-model="weight.ProductivityPerMeters"
          aria-describedby="kc-help"
          showButtons
          mode="decimal"
          :minFractionDigits="1"
          :min="0"
        />
        <label for="kc" class="font-weight-bold"> SP (kg/m³) </label>
      </div>
      <div class="form-group form-group-number p-float-label">
        <InputNumber
          v-model="weight.ProfitabilityPerHectare"
          aria-describedby="kc-help"
          showButtons
          mode="decimal"
          :minFractionDigits="1"
          :min="0"
        />
        <label for="kc" class="font-weight-bold"> SE (R$/ha) </label>
      </div>
      <div class="form-group form-group-number p-float-label">
        <InputNumber
          v-model="weight.ProfitabilityPerMeters"
          aria-describedby="kc-help"
          showButtons
          mode="decimal"
          :minFractionDigits="1"
          :min="0"
        />
        <label for="kc" class="font-weight-bold"> SE (R$/m³) </label>
      </div>
      <div class="form-group form-group-number p-float-label">
        <InputNumber
          v-model="weight.WaterConsumption"
          aria-describedby="kc-help"
          showButtons
          mode="decimal"
          :minFractionDigits="1"
          :min="0"
        />
        <label for="kc" class="font-weight-bold"> SH (m³/ha) </label>
      </div>
      <div class="form-group form-group-number p-float-label">
        <InputNumber
          v-model="weight.JobsPerHectare"
          aria-describedby="kc-help"
          showButtons
          mode="decimal"
          :minFractionDigits="1"
          :min="0"
        />
        <label for="kc" class="font-weight-bold"> SS (Empregos/ha) </label>
      </div>
      <div class="form-group form-group-number p-float-label">
        <InputNumber
          v-model="weight.JobsPerMeters"
          aria-describedby="kc-help"
          showButtons
          mode="decimal"
          :minFractionDigits="1"
          :min="0"
        />
        <label for="kc" class="font-weight-bold"> SS (Empregos/m³) </label>
      </div>
    </div>
  </form>
</template>
<script setup>
import { defineProps } from "vue";
const props = defineProps({
  weights: {
    type: Array,
  },
});
</script>
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
