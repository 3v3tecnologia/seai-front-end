<template>
  <div class="w-full flex flex-col justify-center items-center">
    <div
      v-if="!loading"
      class="w-full max-w-[1600px] px-4 flex justify-start mt-4"
    >
      <HeaderTable :hiddenSearch="true" />
    </div>
    <ProgressSpinner v-if="loading" />
    <div v-else class="w-full max-w-[1600px] px-4 min-w-[350px]">
      <div class="mt-6">
        <Dtable
          :infoTable="faqTable"
          :dataValue="faq"
          :loadingTable="loadingTable"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import Dtable from "@/components/tables/Dtable";
import HeaderTable from "@/components/tables/HeaderTable";
import Pagination from "@/components/pagination/pagination.vue";
import { ref, onMounted } from "vue";
import { faqTable } from "@/utils/tables/faq";
import { FAQRest } from "@/services/faq.service";
import { toast } from "vue3-toastify";

const limit = ref(7);
const faq = ref([]);
const equipmentsSelects = ref([]);
const numberResultsFound = ref(0);
const loading = ref(false);
const loadingTable = ref(false);
const equipmentTypes = ref({
  placeholder: "Filtrar por tipo",
  optionLabel: "Name",
  paramsName: "idType",
  items: [
    { Name: "Todos", Id: 0 },
    { Name: "Estação", Id: 1 },
    { Name: "Pluviômetro", Id: 2 },
  ],
});
const faqRest = new FAQRest();
const params = ref({
  pageNumber: 0,
  limit: limit.value,
  name: null,
});

onMounted(() => {
  loading.value = true;
  getAllFAQ();
});

function getAllFAQ() {
  faqRest.getAll().then((res) => {
    faq.value = res.data;
    console.log(faq.value);
    loading.value = false;
  });
}

function adjustmentEquipmentValue() {
  if (faq.value !== null && faq.value.Items)
    faq.value.Items.forEach((element) => {
      element.Type.Name = tradutionType(element.Type.Name);
      element.link = "Acessar leituras";
      element.actions = ["modal"];
      element.router = {
        name: "station-reads",
        params: { id: element.Id },
      };
    });
}

function tradutionType(type) {
  return type === "station" ? "Estação" : "Pluviômetro";
}

function handlePageChange(page) {
  params.value.pageNumber = page;
  loadingTable.value = true;
  getAllFAQ();
}
</script>
