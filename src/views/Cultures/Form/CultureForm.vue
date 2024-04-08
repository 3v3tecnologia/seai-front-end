<template>
  <div v-if="loading">
    <div class="spinner-border text-primary" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
  <div v-else class="container wrapper-form p-2">
    <form class="p-4 p-lg-5" @submit="save">
      <h2 class="text-left">{{ title }}</h2>
      <div class="form-group form-group-text text-left p-float-label mt-4">
        <InputText
          id="culture-name"
          aria-describedby="culture-name-help"
          v-model="culture.Name"
          class="w-50"
          required
        />
        <label for="culture-name" class="font-weight-bold">Nome</label>
      </div>
      <div class="mt-4">
        <CreateFarmDap
          :cycleError="cycleError"
          :cycle="cultureCycle"
          @onSaveCycle="saveCycle"
        />
      </div>
      <div class="mt-4">
        <PrimaryButton
          :disabled="loadButton"
          :text="`${loadButton ? 'Salvando...' : 'Salvar'}`"
        />
      </div>
    </form>
  </div>
</template>
<script setup>
import CreateFarmDap from "@/components/form/CreateFarmDap.vue";
import PrimaryButton from "@/components/form/PrimaryButton.vue";
import { ref } from "vue";
import { CultureRest } from "@/services/culture.service";
import { CycleRest } from "@/services/cycle.service";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const cultureRest = new CultureRest();
const cycleRest = new CycleRest();
const loading = ref(false);
const loadButton = ref(false);
const cycleError = ref(false);
const culture = ref({});
const cultureCycle = ref([]);
const cultureId = ref(0);
const title = ref("Criar cultura");
const isEditing = ref(false);

onMounted(() => {
  verifyId();
});

function verifyId() {
  if (router.currentRoute.value.params.id) {
    const idAsNumber = Number(router.currentRoute.value.params.id);
    if (!isNaN(idAsNumber)) {
      cultureId.value = idAsNumber;
      isEditing.value = true;
      title.value = "Editar cultura";
      getCultureById(cultureId.value);
    } else {
      router.push("create-culture");
    }
  }
}

function getCultureById(id) {
  loading.value = true;
  cultureRest.getById(id).then((response) => {
    const { data } = response;
    culture.value = data.data;
    getCycleByCultureId(id);
  });
}
function getCycleByCultureId(id) {
  cycleRest.getByCultureId(id).then((response) => {
    const { data } = response;
    cultureCycle.value = data.data;
    loading.value = false;
  });
}

function saveCycle(cycle) {
  cycle.value = cycle;
}

function save() {
  loadButton.value = true;
  cycleError.value = verifyCycles();
  if (cycleError.value) {
    loadButton.value = false;
    return;
  }
  if (isEditing.value) {
    updateCulture();
  } else {
    createCulture();
  }
}

function createCulture() {
  cultureRest.create(culture.value).then((response) => {
    const { data } = response;
    createCycle(data.data);
  });
}

function updateCulture() {
  cultureRest.update(cultureId.value, culture.value).then((response) => {
    createCycle(cultureId.value);
  });
}

function createCycle(id) {
  cycleRest.createByCultureId(id, cultureCycle.value).then((response) => {
    loadButton.value = false;

    router.push({ name: "culture" });
  });
}

function verifyCycles() {
  let result = false;
  if (!cultureCycle.value) {
    result = true;
  } else {
    for (const cycle of cultureCycle.value) {
      if (
        !cycle.Title ||
        !cycle.Start ||
        !cycle.End ||
        !cycle.KC ||
        !cycle.Increment
      ) {
        result = true;
      }
    }
  }
  return result;
}
</script>
