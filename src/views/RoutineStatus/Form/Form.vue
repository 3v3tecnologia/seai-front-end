<template>
  <form
    class="flex w-full max-w-[1600px] min-w-[700px] gap-4 flex-col items-start"
    v-if="info.cron"
  >
    <div class="w-full flex gap-4 mt-4">
      <div
        class="form-group form-group-text text-left p-float-label mt-2 w-[50%]"
      >
        <InputText
          name="firstName"
          aria-describedby="culture-name-help"
          v-model="info.name"
          :class="`w-full`"
          required
          :disabled="editMode"
        />
        <label class="font-weight-bold">Título</label>
      </div>
      <div
        class="form-group form-group-text text-left p-float-label mt-2 w-[50%]"
      >
        <Dropdown
          v-model="info.cron"
          :options="crons"
          optionLabel="name"
          optionValue="value"
          placeholder="Tipo de usuário"
          class="w-full"
        />
        <label class="font-weight-bold">Recorrência</label>
      </div>
    </div>
    <div class="w-full flex gap-4 mt-4">
      <div class="form-group form-group-text p-float-label w-[33%]">
        <InputNumber
          id="kc"
          aria-describedby="kc-help"
          v-model="info.options.priority"
          class="w-full"
          showButtons
          :min="0"
        />
        <label for="estagio" class="font-weight-bold"> Prioridade </label>
      </div>
      <div class="form-group form-group-text p-float-label w-[33%]">
        <InputNumber
          id="kc"
          aria-describedby="kc-help"
          v-model="info.options.priority"
          class="w-full"
          showButtons
          :min="0"
        />
        <label for="estagio" class="font-weight-bold">
          Período para reexecução em caso de falha (min.)
        </label>
      </div>
      <div class="form-group form-group-text p-float-label w-[33%]">
        <InputNumber
          id="kc"
          aria-describedby="kc-help"
          v-model="info.options.priority"
          class="w-full"
          showButtons
          :min="0"
        />
        <label for="estagio" class="font-weight-bold">
          Tentativas de reexecução em caso de falha
        </label>
      </div>
    </div>
  </form>
</template>
<script setup>
import { onMounted, ref, defineProps } from "vue";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  editMode: {
    type: Boolean,
    default: false,
  },
});

const crons = [
  {
    value: "0 0 * * *",
    name: "Diariamente (00:00)",
  },
  {
    value: "0 * * * *",
    name: "A cada início de hora",
  },
];

const info = ref({});

onMounted(() => {
  if (props.item.cron) {
    info.value = props.item;
  } else {
    getDefaultValue();
  }
});

function getDefaultValue() {
  info.value = {
    cron: "0 0 * * *",
    name: "",
    data: null,
    options: {
      priority: 0,
      retryLimit: 0,
      retryDelay: 0,
    },
  };
}
</script>
