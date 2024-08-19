<template>
  <div class="w-full flex flex-col justify-center items-center">
    <div v-if="!loading" class="w-full max-w-[1600px] flex justify-start mt-8">
      <HeaderTable
        :hiddenSearch="true"
        :searchPlaceholder="'Pesquisar por título'"
      >
        <div class="w-full flex justify-between">
          <h1 class="text-[20px]">Quantidade de Recenseados</h1>
        </div>
      </HeaderTable>
    </div>
    <ProgressSpinner v-if="loading" />
    <div v-else class="w-full max-w-[1600px] px-4 min-w-[350px]">
      <div class="mt-6">
        <Dtable
          :infoTable="registeredTable"
          :dataValue="items"
          :loadingTable="loadingTable"
          @onDeleteItem="deleteItem"
          @onEditItem="goTo"
        />
        <!-- <Pagination
          v-if="!hiddenPagination"
          :rows="params.limit"
          :current-total="numberResultsFound"
          :totalRecords="items.TotalItems"
          :items-name="'notícias'"
          @onHandlePageChange="handlePageChange"
        /> -->
      </div>
    </div>
  </div>
</template>
<script setup>
import Dtable from "@/components/tables/Dtable";
import HeaderTable from "@/components/tables/HeaderTable";
import Pagination from "@/components/pagination/pagination.vue";
import { ref, onMounted } from "vue";
import { registeredTable } from "@/utils/tables/registered";
import { toast } from "vue3-toastify";
import { useRouter } from "vue-router";
import { CensusRest } from "@/services/census.service";

const router = useRouter();
const limit = ref(7);
const numberResultsFound = ref(0);
const items = ref([]);
const loading = ref(false);
const loadingTable = ref(false);
const service = new CensusRest();
const params = ref({
  pageNumber: 0,
  limit: limit.value,
  name: null,
});

onMounted(() => {
  loading.value = true;
  getAll();
});

function getAll() {
  service
    .getRegistered()
    .then((res) => {
      items.value = res.data;
      adjustmentItemsValue();
    })
    .finally(() => {
      loading.value = false;
    });
}

function adjustmentItemsValue() {
  if (items.value !== null) {
    items.value.forEach((element) => {
      element.actions = [];
    });
    numberResultsFound.value = items.value.length;
  }
}

function searchItems(searchTerm) {
  if (searchTerm.length >= 3 || searchTerm.length === 0) {
    params.value.title = searchTerm.length >= 3 ? searchTerm : null;
    params.value.limit = limit.value;
    params.value.pageNumber = 0;
    loadingTable.value = true;
    getAll();
  }
}

function handlePageChange(page) {
  params.value.pageNumber = page;
  loadingTable.value = true;
}

function goTo(data = null) {
  const id = data === null ? 0 : data.Id;
  router.push({
    name: "form-newsletter",
    params: { id: id === 0 ? null : id },
  });
}
function deleteItem(data) {
  const id = data.Id;
  loading.value = true;
  service
    .deleteById(id)
    .then(() => {
      toast.success("Notícia deletada!");
    })
    .finally(() => {
      getAll();
    });
}
</script>
