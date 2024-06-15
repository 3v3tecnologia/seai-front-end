<template>
  <div class="w-full flex flex-col justify-center items-center">
    <div
      v-if="!loading"
      class="w-full max-w-[1600px] px-4 flex justify-start mt-4"
    >
      <HeaderTable @onSearchItem="searchEquipments"> </HeaderTable>
    </div>
    <ProgressSpinner v-if="loading" />
    <div v-else class="w-full max-w-[1600px] px-4 min-w-[350px]">
      <div class="mt-6">
        <Dtable
          :infoTable="organsTable"
          :dataValue="organs"
          :loadingTable="loadingTable"
          @onDeleteItem="deleteItem"
        />
        <!-- <Pagination
          v-if="!hiddenPagination"
          :rows="params.limit"
          :current-total="numberResultsFound"
          :totalRecords="equipments?.TotalItems"
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
import { organsTable } from "@/utils/tables/organs";
import { EquipmentRest } from "@/services/equipment.service";
import { toast } from "vue3-toastify";
import { useRouter } from "vue-router";

const router = useRouter();
const limit = ref(7);
const equipments = ref({});
const numberResultsFound = ref(0);
const organs = ref([]);
const loading = ref(false);
const loadingTable = ref(false);
const equipmentRest = new EquipmentRest();
const params = ref({
  pageNumber: 0,
  limit: limit.value,
  name: null,
});

onMounted(() => {
  loading.value = true;
  getOrgans();
});

function getOrgans() {
  equipmentRest
    .getAllOrgans()
    .then((res) => {
      organs.value = res.data;
    })
    .finally(() => {
      loading.value = false;
    });
}
function adjustmentOrgansValue() {
  if (organs.value !== null)
    organs.value.forEach((element) => {
      element.actions = ["delete"];
    });
}

function searchEquipments(searchTerm) {
  if (searchTerm.length >= 3 || searchTerm.length === 0) {
    params.value.name = searchTerm.length >= 3 ? searchTerm : null;
    params.value.limit = limit.value;
    params.value.pageNumber = 0;
    loadingTable.value = true;
  }
}

function handlePageChange(page) {
  params.value.pageNumber = page;
  loadingTable.value = true;
}

function goTo(data = null) {
  const id = data === null ? 0 : data.id;
  router.push({ name: "form-organs", params: { id: id === 0 ? null : id } });
}
function deleteItem(data) {
  const id = data.Id;
  equipmentRest
    .deleteOrganById(id)
    .then(() => {
      toast.success("Órgão Metereológico deletado");
      getOrgans();
    })
    .catch(() => {
      toast.error("Não foi possível deletar Órgão Metereológico");
    });
}
</script>
