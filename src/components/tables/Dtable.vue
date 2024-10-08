<template>
  <div class="bg-white w-full min-h-[50vh]">
    <DataTable
      scrollable
      scrollHeight="500px"
      :value="dataValue"
      tableStyle="min-width: 50rem"
    >
      <Column
        v-for="col of infoTable"
        :key="col.field"
        :field="col.field"
        :header="col.header"
      >
        <template #body="slotProps">
          <p
            :title="getValue(slotProps.data, col.field)"
            v-if="col.type === 'text' || col.type === 'number'"
            class="max-w-[200px] truncate ..."
          >
            {{ getValue(slotProps.data, col.field) }}
          </p>
          <p v-if="col.type === 'date'" class="truncate ...">
            {{ convertDate(getValue(slotProps.data, col.field)) }}
          </p>
          <button class="bg-black text-white" v-else-if="col.type === 'button'">
            {{ getValue(slotProps.data, col.field) }}
          </button>
          <a
            class="text-blue-400 cursor-pointer hover:text-blue-700"
            v-else-if="col.type === 'link'"
            @click="goTo(slotProps.data.router)"
          >
            {{ getValue(slotProps.data, col.field) }}
          </a>
          <InputSwitch
            v-else-if="col.type === 'switch'"
            v-model="slotProps.data[col.field]"
            @change="handleSwitchChange(slotProps.data, col.field)"
          />
        </template>
      </Column>
      <Column field="actions" header="Ações">
        <template #body="slotProps">
          <div class="flex gap-4">
            <i
              v-for="(action, i) in slotProps.data.actions"
              :key="i"
              :class="['cursor-pointer', getIcon(action)]"
              @click="getAction(slotProps.data, action)"
            ></i>
          </div>
        </template>
      </Column>
    </DataTable>
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
          <label class="font-weight-bold">Motivo para alterar</label>
        </div>
      </div>
    </template>
  </ConfirmDialog>
</template>
<script setup>
import { defineProps, defineEmits, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useConfirm } from "primevue/useconfirm";
import moment from "moment";
import DataTable from "primevue/datatable";

const confirm = useConfirm();
const router = useRouter();
const Operation = ref("");

const props = defineProps({
  dataValue: {
    type: Array,
  },
  infoTable: {
    type: Array,
  },
  loadingTable: {
    type: Boolean,
    required: false,
    default: false,
  },
  infoName: {
    type: String,
    default: "O item",
  },
});

const emit = defineEmits([
  "onSwitchItem",
  "onEditItem",
  "onDeleteItem",
  "onOpenModal",
]);

function getValue(data, field) {
  if (field.includes(".")) {
    const fields = field.split(".");
    let value = data;
    for (const f of fields) {
      if (value[f]) {
        value = value[f];
      } else {
        return "";
      }
    }
    return value;
  } else {
    return data[field];
  }
}

function goTo(route) {
  router.push(route);
}

function getIcon(icon) {
  let result = "pi pi-check text-black";
  if (icon === "edit") {
    result = "pi pi-pencil text-primary";
  } else if (icon === "delete") {
    result = "pi pi-trash text-danger";
  } else if (icon === "modal") {
    result = "pi pi-eye text-primary";
  }
  return result;
}

function getAction(data, action) {
  if (action === "edit") {
    emit("onEditItem", data);
  } else if (action === "delete") {
    confirmDelete(data);
  } else if (action === "modal") {
    emit("onOpenModal", data);
  }
}

function confirmDelete(data) {
  confirm.require({
    message: `${props.infoName} selecionado será deletado. Este processo não poderá ser desfeito!`,
    header: "Confirmar deleção",
    icon: "pi pi-exclamation-triangle",
    rejectClass: "p-button-secondary p-button-outlined",
    acceptClass: "btn-danger blocked",
    rejectLabel: "Cancelar",
    acceptLabel: "Deletar",
    accept: () => {
      data.Operation = Operation.value;
      Operation.value = "";
      emit("onDeleteItem", data);
    },
  });
  setTimeout(() => {
    updateButtonState();
  }, 200);
}
function convertDate(date) {
  return moment(date).format("DD/MM/YYYY - HH:mm");
}
// Função para habilitar ou desabilitar o botão com a classe "blocked"
function updateButtonState() {
  const button = document.querySelector(".blocked");
  if (button) {
    button.disabled = Operation.value.trim().length < 6;
  }
}

// Watch para a variável Operation
watch(Operation, () => {
  updateButtonState();
});
function handleSwitchChange(item, fieldName) {
  confirm.require({
    message: "Por favor, informe o motivo para alterar o status.",
    header: "Confirmar Alteração",
    icon: "pi pi-exclamation-triangle",
    rejectClass: "p-button-secondary p-button-outlined",
    acceptClass: "btn-danger blocked",
    rejectLabel: "Cancelar",
    acceptLabel: "Confirmar",
    accept: () => {
      item.Operation = Operation.value;
      Operation.value = "";
      emit("onSwitchItem", item);
    },
    reject: () => {
      item[fieldName] = !item[fieldName]; // Reverter o valor do switch
    },
    onHide: () => {
      item[fieldName] = !item[fieldName]; // Reverter o valor do switch
    },
  });
  setTimeout(() => {
    updateButtonState();
  }, 200);
}
</script>
<style>
.p-datatable-thead {
  background-color: rgb(0, 0, 0) !important;
}
</style>
