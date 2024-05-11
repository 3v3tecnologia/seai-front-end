<template>
  <div class="w-full flex flex-col justify-center items-center">
    <div
      v-if="!loading"
      class="w-full max-w-[1600px] px-4 flex justify-start mt-4"
    >
      <HeaderTable
        @onSearchItem="searchItems"
        :searchPlaceholder="'Pesquisar por título'"
      >
        <div>
          <Button
            icon="pi pi-plus"
            label="Criar"
            class="btn-primary"
            @click="goTo()"
          ></Button>
        </div>
      </HeaderTable>
    </div>
    <ProgressSpinner v-if="loading" />
    <div v-else class="w-full max-w-[1600px] px-4 min-w-[350px]">
      <div class="mt-6">
        <Dtable
          :infoTable="routineStatusTable"
          :dataValue="items"
          :loadingTable="loadingTable"
          @onDeleteItem="deleteItem"
          @onEditItem="goTo"
        />
        <!-- <Pagination
          :rows="numberResultsFound"
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
import { routineStatusTable } from "@/utils/tables/routineStatus";
import { toast } from "vue3-toastify";
import { useRouter } from "vue-router";
import { RoutineRest } from "@/services/routine.service";

const router = useRouter();
const limit = ref(7);
const numberResultsFound = ref(0);
const items = ref([]);
const loading = ref(false);
const loadingTable = ref(false);
const service = new RoutineRest();
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
    .getAll(params.value)
    .then((res) => {
      items.value = res.data.Data;
      adjustmentItemsValue();
    })
    .finally(() => {
      loading.value = false;
    });
}

function adjustmentItemsValue() {
  if (items.value !== null) {
    items.value.forEach((element) => {
      element.actions = ["edit"];
      element.cron = convertCron(element.cron);
    });
    numberResultsFound.value = items.value.length;
  }
}

function convertCron(cron) {
  const result =
    cron === "0 0 * * *" ? "Diariamente (00:00)" : "A cada início de hora";
  return result;
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
  const id = data === null ? 0 : data.name;
  router.push({
    name: "form-routine",
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
