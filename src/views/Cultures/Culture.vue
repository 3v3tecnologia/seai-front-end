<template>
  <div class="w-full flex flex-col justify-center items-center">
    <div v-if="!loading" class="w-[80%] flex justify-start mt-4">
      <HeaderTable @onSearchItem="searchCulture" />
    </div>
    <ProgressSpinner v-if="loading" />
    <div v-else class="w-[80%] min-w-[350px] flex flex-row gap-8 mt-10">
      <CultureCard :cultures="cultures" @onDelete="deleteCulture" />
    </div>
  </div>
</template>
<script setup>
import HeaderTable from "@/components/tables/HeaderTable";
import { CultureRest } from "@/services/culture.service";
import { ref, onMounted } from "vue";
import CultureCard from "./CultureCard/CultureCard.vue";
import { toast } from "vue3-toastify";

const cultures = ref({});
const loading = ref(false);
const restCulture = new CultureRest();
const params = ref({ name: null });

onMounted(() => {
  loading.value = true;
  getCulture();
});

function getCulture() {
  restCulture.getAll(params.value).then((res) => {
    cultures.value = res.data.data;
    loading.value = false;
  });
}
function deleteCulture(id) {
  restCulture
    .delete(id)
    .then(() => {
      toast.success("Cultura deletada");
    })
    .catch(() => {
      toast.error("Erro ao deletar cultura");
    })
    .finally(() => {
      loading.value = true;
      getCulture();
    });
}
function searchCulture(searchTerm) {
  if (searchTerm.length >= 3 || searchTerm.length === 0) {
    params.value.name = searchTerm.length >= 3 ? searchTerm : null;
    getCulture();
  }
}
</script>
