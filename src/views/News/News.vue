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
      <div class="mt-6" v-if="items.Items">
        <Dtable
          :infoTable="newsTable"
          :dataValue="items.Items ?? []"
          :loadingTable="loadingTable"
          @onDeleteItem="deleteItem"
          @onEditItem="goTo"
        />
        <Pagination
          v-if="!hiddenPagination"
          :rows="params.limit"
          :current-total="numberResultsFound"
          :totalRecords="items.TotalItems"
          :items-name="'notícias'"
          @onHandlePageChange="handlePageChange"
        />
      </div>
      <div class="mt-6" v-else>
        <p>Nenhuma notícia cadastrada!</p>
        <Button
          label="Criar Notícia"
          class="btn-primary mt-4"
          @click="goTo()"
        ></Button>
      </div>
    </div>
  </div>
</template>
<script setup>
import Dtable from "@/components/tables/Dtable";
import HeaderTable from "@/components/tables/HeaderTable";
import Pagination from "@/components/pagination/pagination.vue";
import { ref, onMounted } from "vue";
import { newsTable } from "@/utils/tables/news";
import { toast } from "vue3-toastify";
import { useRouter } from "vue-router";
import { NewsRest } from "@/services/news";

const router = useRouter();
const limit = ref(7);
const numberResultsFound = ref(0);
const items = ref([]);
const loading = ref(false);
const loadingTable = ref(false);
const service = new NewsRest();
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
      console.log(items.value);
      if (res.data) {
        items.value = res.data;
        adjustmentItemsValue();
      }
    })
    .finally(() => {
      loading.value = false;
    });
}

function adjustmentItemsValue() {
  if (items.value !== null) {
    items.value.Items.forEach((element) => {
      element.actions = ["edit", "delete"];
    });
    numberResultsFound.value = items.value.Items.length;
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
  getAll();
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
