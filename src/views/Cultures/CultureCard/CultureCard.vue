<template>
  <div
    class="bg-white w-[23.45%] min-w-[320px] p-4 pb-2 shadow-md rounded-tl-xl rounded-br-xl"
    v-for="(culture, i) in cultures"
    :key="i"
  >
    <div class="flex flex-row justify-between">
      <h1 class="text-xl text-left font-bold mb-4 w-[82%] truncate ...">
        {{ culture.Name }}
      </h1>
      <div class="flex gap-4 w-[15%] h-[28px] items-center">
        <i
          class="pi pi-trash text-danger cursor-pointer"
          title="Excluir cultura"
          style="font-size: 1rem"
          @click="confirmDelete(culture.Id)"
        ></i>
        <i
          class="pi pi-pencil text-primary cursor-pointer"
          title="Editar cultura"
          @click="goTo(culture.Id)"
          style="font-size: 1rem"
        ></i>
      </div>
    </div>
  </div>
  <ConfirmDialog>
    <template #message="slotProps">
      <div class="flex flex-col items-center w-full gap-4">
        <p>{{ slotProps.message.message }}</p>
        <div
          class="form-group form-group-text text-left p-float-label mt-2 w-full"
        >
          <Textarea
            name="categoryDescription"
            aria-describedby="culture-name-help"
            v-model="Operation"
            :class="`w-full`"
            required
          />
          <label class="font-weight-bold">Motivo para deletar</label>
        </div>
      </div>
    </template>
  </ConfirmDialog>
</template>
<script setup>
import { defineProps, defineEmits, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useConfirm } from "primevue/useconfirm";

const router = useRouter();
const confirm = useConfirm();
const Operation = ref("");

const props = defineProps({
  cultures: {
    type: Array,
  },
});

const emit = defineEmits(["onDelete"]);

function goTo(id) {
  router.push({
    name: "edit-culture",
    params: {
      id,
    },
  });
}

function confirmDelete(id) {
  confirm.require({
    message:
      "Será deletada a cultura selecionada. Este processo não poderá ser desfeito!",
    header: "Confirmar deleção",
    icon: "pi pi-exclamation-triangle",
    rejectClass: "p-button-secondary p-button-outlined",
    acceptClass: "btn-danger",
    rejectLabel: "Cancelar",
    acceptLabel: "Deletar",
    accept: () => {
      onDelete(id);
    },
  });
  setTimeout(() => {
    updateButtonState();
  }, 200);
}

function onDelete(id) {
  emit("onDelete", { id: id, Operation: Operation.value });
}
function updateButtonState() {
  const button = document.querySelector(".blocked");
  if (button) {
    button.disabled = Operation.value.trim() === "";
  }
}

// Watch para a variável Operation
watch(Operation, () => {
  updateButtonState();
});
</script>
