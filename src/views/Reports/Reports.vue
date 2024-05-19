<template>
  <div class="w-full flex flex-col justify-center items-center">
    <div
      class="w-full max-w-[1600px] px-4 flex justify-start mt-4"
      v-if="!loading"
    >
      <HeaderTable
        :hiddenSearch="true"
        :selectItems="selectItems"
        :startSelected="startSelected"
      >
      </HeaderTable>
    </div>
  </div>
  <div v-if="typeSelected.Id === 0" class="flex flex-col gap-8 pb-8">
    <Registered />
    <Workers />
    <Monthly />
  </div>
</template>
<script setup>
import Registered from "./tables/Registered.vue";
import Workers from "./tables/Workers.vue";
import Monthly from "./tables/Monthly.vue";
import HeaderTable from "@/components/tables/HeaderTable";
import { ref, onMounted } from "vue";

const reportsTypes = ref({
  placeholder: "Filtrar por tipo",
  optionLabel: "Name",
  paramsName: "idType",
  items: [
    { Name: "Geral", Id: 0 },
    { Name: "Animais", Id: 1 },
    { Name: "Aquiculturas", Id: 2 },
    { Name: "Indicadores por localização", Id: 3 },
    { Name: "Indicadores por cultura", Id: 4 },
  ],
});
const startSelected = ref([]);
const selectItems = ref([]);
const typeSelected = ref({});
const loading = ref(false);

onMounted(() => {
  loading.value = true;
  selectItems.value.push(reportsTypes.value);
  typeSelected.value = { Name: "Geral", Id: 0 };
  startSelected.value.push(typeSelected.value);
  setTimeout(() => (loading.value = false), 500);
});
</script>
