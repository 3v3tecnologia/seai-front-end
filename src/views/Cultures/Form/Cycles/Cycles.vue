<template>
  <div class="position-relative w-100 mt-8">
    <div class="w-full flex gap-4 items-center">
      <div class="col-2">
        <h3 class="text-left">Ciclos</h3>
      </div>
      <div class="flex flex-row gap-4">
        <Button
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
        </Button>
        <Button
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
        </Button>
      </div>

      <div class="col-4" v-if="cycleError">
        <small class="text-danger">Preencha todos os campos obrigatórios</small>
      </div>
    </div>
    <form class="mt-16 flex flex-wrap gap-8" v-for="(kc, i) in KCs" :key="i">
      <div class="form-group form-group-text p-float-label">
        <InputText
          id="estagio"
          aria-describedby="estagio-help"
          v-model="kc.Title"
          :class="`w-[300px] ${cycleError && !kc.Title ? 'invalidInput' : ''}`"
        />
        <label for="estagio" class="font-weight-bold">Nome do estágio</label>
      </div>
      <div class="form-group form-group-number p-float-label">
        <InputNumber
          v-model="kc.Start"
          id="kc"
          aria-describedby="kc-help"
          :class="`w-100 ${
            cycleError && kc.Start === null ? 'invalidInput' : ''
          }`"
          showButtons
          :min="i - 1 < 0 ? 0 : KCs[i - 1].End + 1"
          :disabled="i > 0"
        />
        <label for="kc" class="font-weight-bold">Início</label>
      </div>
      <div class="form-group form-group-number p-float-label">
        <InputNumber
          v-model="kc.End"
          id="kc"
          aria-describedby="kc-help"
          :class="`w-100 ${
            cycleError && kc.End === null ? 'invalidInput' : ''
          }`"
          showButtons
          :min="kc.Start + 1"
        />
        <label for="kc" class="font-weight-bold">Fim</label>
      </div>
      <div class="form-group form-group-number p-float-label">
        <InputNumber
          v-model="kc.KC"
          id="kc"
          aria-describedby="kc-help"
          :class="`w-100 ${cycleError && kc.KC === null ? 'invalidInput' : ''}`"
          showButtons
          mode="decimal"
          :min-fraction-digits="1"
          :min="0"
        />
        <label for="kc" class="font-weight-bold">KC</label>
      </div>
      <div class="form-group form-group-increment p-float-label">
        <InputNumber
          v-model="kc.Increment"
          id="kc"
          aria-describedby="kc-help"
          :class="` ${
            cycleError && kc.Increment === null ? 'invalidInput' : ''
          }`"
          showButtons
          :min-fraction-digits="1"
          mode="decimal"
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
    updateStartValues();
  },
  { deep: true }
);

function updateStartValues() {
  for (let i = 0; i < KCs.value.length; i++) {
    if (i > 0) {
      const previousEnd = KCs.value[i - 1].End;
      if (KCs.value[i].Start <= previousEnd) {
        KCs.value[i].Start = previousEnd + 1;
      }
    }
    if (KCs.value[i].End <= KCs.value[i].Start) {
      KCs.value[i].End = KCs.value[i].Start + 1;
    }
  }
}

function addKC() {
  let i = KCs.value.length - 1;
  console.log(KCs.value);
  const newKC = {
    Title: "",
    Start: i < 0 ? 0 : KCs.value[i].End + 1,
    End: 0,
    KC: 0,
    Increment: 0,
  };
  if (newKC.End <= newKC.Start) {
    newKC.End = newKC.Start + 1;
  }
  console.log(newKC);
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
    width: 10%;
    min-width: 300px;
  }
  .form-group-number {
    width: 13%;
    min-width: 50px;
    input {
      width: 10%;
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
