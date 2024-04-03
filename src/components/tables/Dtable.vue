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
    </DataTable>
  </div>
</template>
<script setup>
import { defineProps, defineEmits } from "vue";
import { useRouter } from "vue-router";
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

const emit = defineEmits(["onSwitchItem"]);

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
</script>
<script>
export default {
  name: "d-table",
  // ...
};
</script>
<style type="text/css">
.p-paginator {
  width: 104% !important;
  margin-left: -30px;
}
</style>
