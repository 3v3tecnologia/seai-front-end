<template>
  <div class="position-relative w-100 mt-4">
    <div class="row mb-2">
      <div class="col-2">
        <h3 class="text-left">Ciclos</h3>
      </div>
      <div class="col-1">
        <button
          type="button"
          class="btn btn-primary w-25"
          @click="addKC()"
          v-tooltip.left="{
            value: 'Adicionar estágio',
            showDelay: 1000,
            hideDelay: 300,
          }"
          :style="{ minWidth: '50px' }"
        >
          <i class="pi pi-plus pr-2e"></i>
        </button>
      </div>
      <div class="col-1">
        <button
          type="button"
          class="btn btn-danger mr-4 w-25"
          @click="removeKC()"
          v-tooltip.left="{
            value: 'Remover estágio',
            showDelay: 1000,
            hideDelay: 300,
          }"
          :style="{ minWidth: '50px' }"
        >
          <i class="pi pi-trash pr-2e"></i>
        </button>
      </div>
      <div class="col-4" v-if="cycleError">
        <small class="text-danger">Preencha todos os campos obrigatórios</small>
      </div>
    </div>
    <form class="mt-4 formulario" v-for="(kc, i) in KCs" :key="i">
      <div class="form-group form-group-text p-float-label">
        <InputText
          id="estagio"
          aria-describedby="estagio-help"
          v-model="kc.Title"
          :class="`w-100 ${cycleError && !kc.Title ? 'invalidInput' : ''}`"
        />
        <label for="estagio" class="font-weight-bold">Nome do estágio</label>
      </div>
      <div class="form-group form-group-number p-float-label">
        <InputNumber
          v-model="kc.Start"
          id="kc"
          aria-describedby="kc-help"
          :class="`w-100 ${cycleError && !kc.Start ? 'invalidInput' : ''}`"
          showButtons
          :min="0"
        />
        <label for="kc" class="font-weight-bold">Início</label>
      </div>
      <div class="form-group form-group-number p-float-label">
        <InputNumber
          v-model="kc.End"
          id="kc"
          aria-describedby="kc-help"
          :class="`w-100 ${cycleError && !kc.End ? 'invalidInput' : ''}`"
          showButtons
          :min="0"
        />
        <label for="kc" class="font-weight-bold">Fim</label>
      </div>

      <div class="form-group form-group-number p-float-label">
        <InputNumber
          v-model="kc.KC"
          id="kc"
          aria-describedby="kc-help"
          :class="`w-100 ${cycleError && !kc.KC ? 'invalidInput' : ''}`"
          showButtons
          mode="decimal"
          :minFractionDigits="1"
          :min="0"
        />
        <label for="kc" class="font-weight-bold">KC</label>
      </div>
      <div class="form-group form-group-increment p-float-label">
        <InputNumber
          v-model="kc.Increment"
          id="kc"
          aria-describedby="kc-help"
          :class="`w-100 ${cycleError && !kc.Increment ? 'invalidInput' : ''}`"
          showButtons
          mode="decimal"
          :minFractionDigits="1"
          :min="0"
        />
        <label for="kc" class="font-weight-bold">Incremento</label>
      </div>
    </form>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch, onMounted } from "vue";

const emit = defineEmits(["onSaveCycle"]);

const props = defineProps({
  cycle: {
    type: Array,
    required: false,
    default: () => [],
  },
  cycleError: {
    type: Boolean,
    default: true,
  },
});

const KCs = ref();

onMounted(() => {
  KCs.value = props.cycle;
  if (KCs.value.length === 0) {
    addKC();
  }
});

watch(
  () => KCs.value,
  (newValue, oldValue) => {
    emit("onSaveCycle", newValue);
  },
  { deep: true }
);

function addKC() {
  const newKC = {
    Stage: KCs.value.length + 1,
    Title: "",
    Start: 0,
    End: 0,
    KC: 0,
    Increment: 0,
  };
  KCs.value.push(newKC);
}

function removeKC() {
  if (KCs.value.length > 1) {
    KCs.value.pop();
  }
}
</script>

<style lang="scss">
.formulario {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 9px;
  .form-group-text {
    width: 30%;
    min-width: 300px;
  }
  .form-group-number {
    width: 13%;
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
