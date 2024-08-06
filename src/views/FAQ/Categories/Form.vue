<template>
  <div
    class="bg-[#0008] w-full h-screen fixed top-0 left-0 flex justify-center items-center"
  >
    <form
      @submit.prevent="save"
      class="bg-white w-[40%] min-w-[350px] rounded-md p-8 flex flex-col gap-4"
    >
      <div
        class="form-group form-group-text text-left p-float-label mt-2 w-full"
      >
        <h2 class="text-[20px]">{{ title }}</h2>
      </div>
      <div
        class="form-group form-group-text text-left p-float-label mt-2 w-full"
      >
        <InputText
          name="categoryName"
          aria-describedby="culture-name-help"
          v-model="category.title"
          :class="`w-full`"
          required
        />
        <label class="font-weight-bold">Nome da categoria</label>
      </div>
      <div
        class="form-group form-group-text text-left p-float-label mt-2 w-full"
      >
        <InputText
          name="categoryDescription"
          aria-describedby="culture-name-help"
          v-model="category.description"
          :class="`w-full`"
          required
        />
        <label class="font-weight-bold">Descrição</label>
      </div>
      <div
        v-if="editMode"
        class="form-group form-group-text text-left p-float-label mt-2 w-full"
      >
        <Textarea
          name="categoryDescription"
          aria-describedby="culture-name-help"
          v-model="category.Operation"
          :class="`w-full`"
          required
        />
        <label class="font-weight-bold">Motivo para edição</label>
      </div>
      <div class="mt-2 w-full flex justify-end gap-1">
        <Button
          class="btn-danger"
          label="Cancelar"
          @click="closeModal()"
        ></Button>
        <Button type="submit" class="btn-primary" label="Salvar"></Button>
      </div>
    </form>
  </div>
</template>
<script setup>
import { FAQRest } from "@/services/faq.service";
import { onMounted, ref, defineProps, defineEmits } from "vue";
import { toast } from "vue3-toastify";
const emit = defineEmits(["onCloseModal", "onGetAll"]);
const props = defineProps({
  id: {
    type: Number,
    default: -1,
  },
  service: {
    type: FAQRest,
    required: true,
  },
  currentCategory: {
    type: Object,
    default: () => ({ title: "", description: "" }),
  },
});
const category = ref({
  title: "",
  description: "",
});
const editMode = ref(false);
const title = ref("Criar categoria");
onMounted(() => {
  if (props.id >= 0) {
    editMode.value = true;
    title.value = "Editar categoria";
    console.log(props.currentCategory);
    getCategoryById();
  }
});

function getCategoryById() {
  console.log(props.currentCategory);
  category.value.title = props.currentCategory.title;
  category.value.description = props.currentCategory.description;
}

function save() {
  if (!editMode.value) {
    createCategory();
  } else {
    updateCategory();
  }
}
function createCategory() {
  props.service.createCategories(category.value).then(() => {
    finallyCreate();
  });
}
function updateCategory() {
  props.service.updateCategory(props.id, category.value).then(() => {
    finallyCreate();
  });
}
function finallyCreate() {
  emit("onGetAll");
  toast.success("Categoria salva!");
  closeModal();
}
function closeModal() {
  emit("onCloseModal");
}
</script>
