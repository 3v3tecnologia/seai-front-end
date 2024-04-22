<template>
  <div class="bg-white w-full min-h-[50vh]">
    <DataTable :value="dataValue" tableStyle="min-width: 50rem">
      <Column
        v-for="col of infoTable"
        :key="col.field"
        :field="col.field"
        :header="col.header"
      >
        <template #body="slotProps">
          <p v-if="col.type === 'text'" class="truncate ...">
            {{ getValue(slotProps.data, col.field) }}
          </p>
          <button class="bg-black text-white" v-else-if="col.type === 'button'">
            {{ getValue(slotProps.data, col.field) }}
          </button>
          <a
            class="text-blue-400 cursor-pointer hover:text-blue-700"
            v-else-if="col.type === 'link'"
            @click="goTo(slotProps.data.router)"
            >{{ getValue(slotProps.data, col.field) }}</a
          >
          <InputSwitch
            v-else-if="col.type === 'switch'"
            v-model="slotProps.data[col.field]"
            @change="switchItem(slotProps.data)"
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
              @click="getAction(slotProps.data.id, action)"
            ></i>
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
  <ConfirmDialog />
</template>
<script setup>
import { defineProps, defineEmits } from "vue";
import { useRouter } from "vue-router";
import { useConfirm } from "primevue/useconfirm";

const confirm = useConfirm();
const router = useRouter();
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
});

const emit = defineEmits(["onSwitchItem", "onEditItem", "onDeleteItem"]);

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

function switchItem(item) {
  emit("onSwitchItem", item);
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
  }
  return result;
}

function getAction(id, action) {
  if (action === "edit") {
    emit("onEditItem", id);
  } else if (action === "delete") {
    confirmDelete(id);
  }
}

function confirmDelete(id) {
  confirm.require({
    message:
      "Será deletado o usuário selecionado. Este processo não poderá ser desfeito!",
    header: "Confirmar deleção",
    icon: "pi pi-exclamation-triangle",
    rejectClass: "p-button-secondary p-button-outlined",
    acceptClass: "btn-danger",
    rejectLabel: "Cancelar",
    acceptLabel: "Deletar",
    accept: () => {
      emit("onDeleteItem", id);
    },
  });
}
</script>
<style type="text/css">
.p-paginator {
  width: 104% !important;
  margin-left: -30px;
}
</style>
