<template>
  <div class="w-full flex flex-col justify-center items-center">
    <ProgressSpinner v-if="loading" />
    <div
      v-else
      class="w-[80%] min-w-[350px] flex flex-row gap-8 mt-10 bg-white p-8 rounded-md max-h-[75vh] overflow-auto"
    >
      <form class="w-full" @submit.prevent="save">
        <div class="w-full flex justify-between items-center">
          <h1 class="text-left text-[22px] font-[500]">{{ title }}</h1>
          <div>
            <div class="flex gap-4">
              <Button
                icon="pi pi-times"
                label="Sair"
                class="btn-danger"
                @click="goTo()"
                type="button"
              ></Button>
              <Button
                icon="pi pi-save"
                :label="loadButton ? '' : 'Salvar alterações'"
                class="btn-success min-w-[200px]"
                type="submit"
                :disabled="loadButton"
              >
                <ProgressSpinner
                  style="width: 20px; height: 20px"
                  v-if="loadButton"
                />
              </Button>
            </div>
          </div>
        </div>
        <div class="form-group form-group-text text-left p-float-label mt-8">
          <InputText
            id="culture-name"
            aria-describedby="culture-name-help"
            v-model="culture.Name"
            class="w-[30%] min-w-[300px]"
            required
          />
          <label for="culture-name" class="font-weight-bold">Nome</label>
        </div>
        <div
          v-if="isEditing"
          class="form-group form-group-text text-left p-float-label mt-8 w-[30%] min-w-[300px]"
        >
          <Textarea
            name="categoryDescription"
            aria-describedby="culture-name-help"
            v-model="culture.Operation"
            :class="`w-full`"
            required
          />
          <label class="font-weight-bold">Motivo para edição</label>
        </div>
        <div class="mt-4">
          <CreateFarmDap
            :cycleError="cycleError"
            :cycle="cultureCycle"
            @onSaveCycle="saveCycle"
          />
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
import CreateFarmDap from "./Cycles/Cycles.vue";
import { ref } from "vue";
import { CultureRest } from "@/services/culture.service";
import { CycleRest } from "@/services/cycle.service";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";

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
  cultureRest
    .create(culture.value)
    .then((response) => {
      const { data } = response;
      createCycle(data.data);
    })
    .finally(() => {
      loadButton.value = false;
    });
}

function updateCulture() {
  cultureRest
    .update(cultureId.value, culture.value)
    .then(() => {
      createCycle(cultureId.value);
    })
    .finally(() => {
      loadButton.value = false;
    });
}

function createCycle(id) {
  cycleRest
    .createByCultureId(id, cultureCycle.value)
    .then(() => {
      isEditing.value
        ? toast.success("Cultura alterada com sucesso!")
        : toast.success("Cultura criada com sucesso!");
      setTimeout(() => {
        goTo();
      }, 500);
    })
    .finally(() => {
      loadButton.value = false;
    });
}

function goTo() {
  router.push({ name: "culture" });
}

function verifyCycles() {
  let result = false;
  if (!cultureCycle.value) {
    result = true;
  } else {
    for (const cycle of cultureCycle.value) {
      if (
        !cycle.Title ||
        cycle.Start === null ||
        cycle.End === null ||
        cycle.KC === null ||
        cycle.Increment === null
      ) {
        result = true;
      }
    }
  }
  return result;
}
</script>
