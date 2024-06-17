<template>
  <div></div>
  <form class="flex mt-12 flex-wrap gap-8 w-full" v-if="!loading">
    <div class="flex w-full gap-4">
      <div class="form-group form-group-text p-float-label w-full">
        <InputNumber
          id="kc"
          aria-describedby="kc-help"
          v-model="read.Precipitation.Value"
          class="w-full"
          :disabled="!editMode"
          showButtons
          mode="decimal"
          :min="0"
        />
        <label for="estagio" class="font-weight-bold">
          Preciptação ({{ read.Precipitation.Unit }})
        </label>
      </div>
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
    Precipitation: {
      Unit: "mm",
      Value: 0.0,
    },
  };
}
</script>
