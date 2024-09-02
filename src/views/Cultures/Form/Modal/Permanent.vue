<template>
  <Dialog
    v-model:visible="visible"
    modal
    header="Cultura Perene"
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    @hide="closeModal"
  >
    <div class="w-full flex flex-col justify-start items-start">
      <label
        for="starting-point"
        class="text-[#003B66] text-[16px] font-semibold mb-2"
      >
        Estágio de reinício:
      </label>
      <Dropdown
        v-if="startPoints.length > 0"
        v-model="selectedStartPoint"
        :options="startPoints.map((item, index) => ({ ...item, index }))"
        optionLabel="Title"
        optionValue="index"
        inputId="starting-point"
        placeholder="Nenhum selecionado"
        class="w-full"
      />
      <div class="w-full flex justify-end gap-2 mt-2">
        <Button @click="closeModal" class="btn-danger">Cancelar</Button>
        <Button
          :disabled="selectedStartPoint === null"
          class="btn-success"
          @click="saveCulture"
          >Salvar</Button
        >
      </div>
    </div>
  </Dialog>
</template>

<script setup>
import { ref, onMounted, defineProps, defineEmits, watch } from "vue";

const emit = defineEmits(["onCloseModal", "onSaveCulture"]);

const visible = ref(false);
const selectedStartPoint = ref(null);

const props = defineProps({
  showModal: {
    type: Boolean,
  },
  startPoints: {
    type: Array,
    required: true,
    default: () => [],
  },
  initialStartPoint: {
    type: Number,
    default: null,
  },
});

onMounted(() => {
  visible.value = props.showModal;
  validateInitialStartPoint();
});

watch(
  () => props.showModal,
  (newVal) => {
    visible.value = newVal;
  }
);

watch(
  () => props.initialStartPoint,
  () => {
    validateInitialStartPoint();
  }
);

function validateInitialStartPoint() {
  if (
    props.initialStartPoint !== null &&
    props.initialStartPoint >= 0 &&
    props.initialStartPoint < props.startPoints.length
  ) {
    selectedStartPoint.value = props.initialStartPoint;
  } else {
    selectedStartPoint.value = null;
  }
}

function closeModal() {
  emit("onCloseModal");
}

function saveCulture() {
  emit("onSaveCulture", selectedStartPoint.value);
}
</script>
