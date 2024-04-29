<template>
  <div
    class="w-full flex flex-col md:justify-center md:items-center overflow-hidden p-4"
  >
    <ProgressSpinner v-if="loading" />
    <div
      v-if="!loading"
      class="w-full xl:w-[65%] max-w-[1600px] flex justify-between items-center mt-4"
    >
      <h1 class="text-left text-[22px] font-[500]">{{ title }}</h1>
      <div class="flex gap-4">
        <Button
          icon="pi pi-times"
          label="Sair"
          class="btn-danger"
          @click="goTo('meteorological-bodies')"
        ></Button>
        <Button
          icon="pi pi-save"
          label="Salvar órgão"
          class="btn-success"
          @click="save()"
        ></Button>
      </div>
    </div>
    <div
      v-if="!loading"
      class="w-full xl:w-[65%] flex flex-col justify-start bg-white p-4 px-8 rounded-md mt-8 min-h-[25vh] max-h-[60vh] overflow-auto overflow-x-auto"
    >
      <Form v-if="organ" :organ="organ" :emailError="emailError" />
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import Form from "./Form.vue";
import { toast } from "vue3-toastify";
import { useRouter } from "vue-router";
import { EquipmentRest } from "@/services/equipment.service";
const router = useRouter();

const organ = ref({});

const loading = ref(false);
const emailError = ref({ text: "", data: false });
const currentId = ref(0);
const isEditing = ref(false);
const title = ref("Criar órgão meteorológico");

const equipmentRest = new EquipmentRest();

onMounted(() => {
  verifyId();
});

function verifyId() {
  if (router.currentRoute.value.params.id) {
    goTo("form-organs");
    // const idAsNumber = Number(router.currentRoute.value.params.id);
    // if (!isNaN(idAsNumber)) {
    //   userId.value = idAsNumber;
    //   isEditing.value = true;
    //   title.value = "Editar órgão meteorológico";
    //   getUserById(userId.value);
    // } else {
    //   goTo("form-organs");
    // }
  }
}

// function getUserById(id) {
//   loading.value = true;
//   userRest
//     .getById(id)
//     .then((response) => {
//       user.value = response.data;
//       loading.value = false;
//     })
//     .catch(() => {
//       goTo("form-organs");
//     });
// }

function save() {
  loading.value = true;
  if (isEditing.value) {
    // updateUser();
  } else {
    createOrgan();
  }
}

function goTo(routeName) {
  router.push({ name: routeName });
}

function createOrgan() {
  equipmentRest
    .createOrgan(organ.value)
    .then(() => {
      goTo("meteorological-bodies");
      setTimeout(() => {
        toast.success("Órgão Metereológico cadastrado com sucesso");
      }, 200);
    })
    .catch((err) => {
      console.log(err);
      toast.error(err.message);
    })
    .finally(() => (loading.value = false));
}

// function updateUser() {
//   userRest
//     .update(currentId.value, organ.value)
//     .then(() => {
//       setTimeout(() => {
//         toast.success("Usuário atualizado com sucesso");
//       }, 200);
//     })
//     .catch((err) => {
//       toast.error(err.response.data.error);
//     })
//     .finally(() => (loading.value = false));
// }
</script>
