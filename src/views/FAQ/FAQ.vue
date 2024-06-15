<template>
  <Categories
    v-if="showCategories"
    :show="showCategories"
    @on-close-modal="closeModal"
  />
  <div class="w-full flex flex-col justify-center items-center">
    <div
      v-if="!loading"
      class="w-full max-w-[1600px] px-4 flex justify-start mt-4"
    >
      <HeaderTable
        @onSearchItem="searchItems"
        :searchPlaceholder="'Pesquisar por título'"
      >
        <div class="flex gap-3">
          <Button
            icon="pi pi-eye"
            label="Categorias"
            class="btn"
            @click="
              showCategories = true;
              loading = true;
            "
          ></Button>
          <Button
            icon="pi pi-plus"
            label="Criar"
            class="btn-primary"
            @click="goTo()"
          ></Button>
        </div>
      </HeaderTable>
    </div>
    <div v-if="loading" class="container mx-auto h-[50vh] flex items-end">
      <ProgressSpinner />
    </div>
    <div v-else class="w-full max-w-[1600px] px-4 min-w-[350px]">
      <div class="mt-6" v-if="items.Items && items.Items.length > 0">
        <Dtable
          :infoTable="faqTable"
          :dataValue="items.Items"
          :loadingTable="loadingTable"
          @on-edit-item="goTo"
          @on-delete-item="deleteItem"
        />
        <Pagination
          v-if="!hiddenPagination"
          :rows="params.limit"
          :current-total="numberResultsFound"
          :totalRecords="items.TotalItems"
          :items-name="'perguntas'"
          @onHandlePageChange="handlePageChange"
        />
      </div>
      <div class="mt-6" v-else>
        <p>Nenhuma pergunta cadastrada!</p>
        <Button
          label="Criar Pergunta"
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
import Categories from "./Categories/Main.vue";
import { ref, onMounted } from "vue";
import { faqTable } from "@/utils/tables/faq";
import { FAQRest } from "@/services/faq.service";
import { toast } from "vue3-toastify";
import { useRouter } from "vue-router";
const router = useRouter();

const limit = ref(7);
const items = ref([]);
const loading = ref(false);
const hiddenPagination = ref(false);
const loadingTable = ref(false);
const showCategories = ref(false);
const numberResultsFound = ref(0);
const service = new FAQRest();
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
  service.getAll(params.value).then((res) => {
    items.value = res.data;
    adjustmentItemsValue();
    loading.value = false;
  });
}

function adjustmentItemsValue() {
  if (items.value !== null && items.value.Items) {
    items.value.Items.forEach((element) => {
      element.actions = ["edit", "delete"];
    });
    numberResultsFound.value = items.value.Items.length;
  }
}

function goTo(data = null) {
  const id = data === null ? 0 : data.id;
  router.push({
    name: "form-faq",
    params: { id: id === 0 ? null : id },
  });
}
function handlePageChange(page) {
  params.value.pageNumber = page;
  loadingTable.value = true;
  getAllFAQ();
}

function searchItems(searchTerm) {
  if (searchTerm.length >= 3 || searchTerm.length === 0) {
    resetPagination();
    params.value.question = searchTerm.length >= 3 ? searchTerm : null;
    loadingTable.value = true;
    getAllFAQ();
  }
}

function deleteItem(data) {
  const id = data.id;
  loading.value = true;
  service
    .deleteById(id)
    .then(() => {
      toast.success("Pergunta deletada!");
    })
    .finally(() => {
      getAllFAQ();
    });
}
function resetPagination() {
  hiddenPagination.value = true;
  params.value.limit = limit.value;
  params.value.pageNumber = 0;
  setTimeout(() => {
    hiddenPagination.value = false;
  }, 1);
}
function closeModal() {
  showCategories.value = false;
  loading.value = false;
}
</script>
