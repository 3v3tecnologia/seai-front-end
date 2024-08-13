<template>
  <Dialog
    v-model:visible="visible"
    modal
    header="Descrição"
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    @hide="closeModal"
  >
    <div class="w-full flex flex-col justify-start items-start">
      <div
        class="form-group form-group-text text-left p-float-label mt-2 w-full"
        v-if="editMode"
      >
        <Textarea v-model="read.Operation" rows="3" class="w-full" />
        <label class="font-weight-bold">Motivo para edição</label>
        <small v-if="!read.Operation" class="p-error">
          Campo obrigatório
        </small>
      </div>
    </div>
    <Button class="btn-primary">Salvar</Button>
  </Dialog>
</template>

<script setup>
import { ref, onMounted, defineProps, defineEmits } from "vue";

const emit = defineEmits(["onCloseModal"]);

const visible = ref(false);

const props = defineProps({
  showModal: {
    type: Boolean,
  },
  log: {
    type: Object,
    required: true,
  },
});

onMounted(() => {
  visible.value = props.showModal;
});

function closeModal() {
  emit("onCloseModal");
}
</script>
