<template>
  <div class="w-full flex flex-col justify-center items-center">
    <div
      v-if="!loading"
      class="w-full max-w-[1600px] px-4 flex justify-start mt-4"
    >
      <HeaderTable @onSearchItem="searchCulture">
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
    <div
      v-else
      class="w-full max-w-[1600px] px-4 min-w-[350px] flex flex-wrap flex-row gap-8 mt-10"
    >
      <div class="w-full flex gap-2">
        <div class="w-[20px] h-[20px] bg-[#104770]"></div>
        <h2 class="text-[16px] font-[500]">Cultura Perene</h2>
      </div>
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
import { useRouter } from "vue-router";

const router = useRouter();
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
function deleteCulture(data) {
  restCulture
    .delete(data.id, data.Operation)
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
function goTo() {
  router.push({ name: "create-culture" });
}
</script>
