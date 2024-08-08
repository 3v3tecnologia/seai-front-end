<template>
  <form
    class="flex w-full max-w-[1600px] min-w-[700px] gap-4 flex-col items-start"
    v-if="item"
  >
    <div class="w-full flex gap-4 mt-4">
      <div
        class="form-group form-group-text text-left p-float-label mt-2 w-[50%]"
      >
        <InputText
          name="firstName"
          aria-describedby="culture-name-help"
          v-model="info.question"
          :class="`w-full`"
          required
          @blur="markAsTouched('question')"
        />
        <label class="font-weight-bold">Pergunta</label>
        <small v-if="isTouched.question && !info.question" class="text-red-500"
          >Campo obrigatório</small
        >
      </div>
      <div
        class="form-group form-group-text text-left p-float-label mt-2 w-[50%]"
      >
        <AutoComplete
          v-model="info.category"
          dropdown
          optionLabel="title"
          :suggestions="filteredCategories"
          @complete="search"
          class="w-full"
          @blur="markAsTouched('category')"
        >
          <template v-slot:empty>
            <div class="w-full p-2 flex flex-col items-center gap-2">
              <p>
                <strong>{{ info.categories }}</strong> não foi encontrado!
              </p>
              <Button
                @click="addCategory()"
                label="Clique aqui para cadastrar"
              />
            </div>
          </template>
        </AutoComplete>
        <label class="font-weight-bold">Categoria</label>
        <small v-if="isTouched.category && !info.category" class="text-red-500"
          >Campo obrigatório</small
        >
      </div>
    </div>
    <div class="w-full flex gap-4 mt-4">
      <div
        class="form-group form-group-text text-left p-float-label mt-2 w-full"
      >
        <Textarea
          v-model="info.answer"
          rows="5"
          class="w-full"
          @blur="markAsTouched('answer')"
        />
        <label class="font-weight-bold">Resposta</label>
        <small v-if="isTouched.answer && !info.answer" class="text-red-500"
          >Campo obrigatório</small
        >
      </div>
    </div>
    <div class="w-full flex gap-4 mt-4" v-if="editMode">
      <div
        class="form-group form-group-text text-left p-float-label mt-2 w-full"
      >
        <Textarea
          v-model="info.Operation"
          rows="3"
          class="w-full"
          @blur="markAsTouched('Operation')"
        />
        <label class="font-weight-bold">Motivo para edição</label>
        <small
          v-if="isTouched.Operation && !info.Operation"
          class="text-red-500"
          >Campo obrigatório</small
        >
      </div>
    </div>
  </form>
</template>

<script setup>
import { onMounted, ref, defineProps, defineEmits, computed, watch } from "vue";
import { FAQRest } from "@/services/faq.service";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  categories: {
    type: Object,
    required: true,
  },
  categoriesRest: {
    type: FAQRest,
    required: true,
  },
  editMode: {
    type: Boolean,
    default: false,
  },
});
const isTouched = ref({
  question: false,
  category: false,
  answer: false,
  Operation: false,
});

const filteredCategories = ref([]);
const showAddButton = ref(true);

const info = ref({});
const emit = defineEmits(["onGetAllCategories", "update-validation"]);

const isFormValid = computed(() => {
  if (props.editMode) {
    return (
      info.value.question &&
      info.value.category &&
      info.value.answer &&
      info.value.Operation
    );
  } else {
    return info.value.question && info.value.category && info.value.answer;
  }
});

watch(isFormValid, (newValue) => {
  emit("update-validation", newValue);
});

onMounted(() => {
  info.value = props.item;
  info.value.CreatedAt = new Date();
});

const search = (event) => {
  // showAddButton.value = false;
  const query = event.query.toLowerCase();

  filteredCategories.value = query
    ? props.categories.filter((category) =>
        category.title.toLowerCase().includes(query)
      )
    : props.categories;

  if (filteredCategories.value.length === 0) {
    showAddButton.value = true;
  }
};

function addCategory() {
  const data = {
    title: info.value.category,
    description: info.value.category,
  };
  props.categoriesRest.createCategories(data).then((res) => {
    info.value.category = {
      id: res.data,
      title: data.title,
      description: data.description,
    };
    filteredCategories.value.push(info.value.category);
    showAddButton.value = false;
    onGetAllCategories();
  });
}

function onGetAllCategories() {
  emit("onGetAllCategories");
}
function markAsTouched(field) {
  isTouched.value[field] = true;
}
</script>
