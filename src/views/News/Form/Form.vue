<template>
  <form
    class="flex news-form w-full max-w-[1600px] min-w-[700px] gap-4 flex-col items-start"
    v-if="item"
  >
    <div class="w-full flex gap-4 mt-4">
      <div
        class="form-group form-group-text text-left p-float-label mt-2 w-[50%]"
      >
        <InputText
          name="firstName"
          aria-describedby="culture-name-help"
          v-model="info.Title"
          :class="`w-full`"
          required
          @blur="markAsTouched('Title')"
        />
        <label class="font-weight-bold">Título</label>
        <small v-if="isTouched.Title && !info.Title" class="text-red-500"
          >Campo obrigatório</small
        >
      </div>
      <div
        class="form-group form-group-text text-left p-float-label mt-2 w-[50%]"
      >
        <Calendar
          v-model="info.SendDate"
          inputId="date-range-read"
          dateFormat="dd/mm/yy"
          showIcon
          class="w-full"
          :min-date="new Date()"
          @blur="markAsTouched('SendDate')"
        />
        <label class="font-weight-bold">Data para envio</label>
        <small v-if="isTouched.SendDate && !info.SendDate" class="text-red-500"
          >Campo obrigatório</small
        >
      </div>
    </div>
    <div class="w-full flex gap-4 mt-4">
      <div
        class="form-group form-group-text text-left p-float-label mt-2 w-full"
      >
        <InputText
          name="firstName"
          aria-describedby="culture-name-help"
          v-model="info.Description"
          :class="`w-full`"
          required
          @blur="markAsTouched('Description')"
        />
        <label class="font-weight-bold">Descrição</label>
        <small
          v-if="isTouched.Description && !info.Description"
          class="text-red-500"
          >Campo obrigatório</small
        >
      </div>
    </div>
    <Editor
      class="w-full"
      v-model="info.Data"
      editorStyle="height: 320px"
      :modules="editorModules"
      @blur="markAsTouched('Data')"
    />
    <small v-if="isTouched.Data && !info.Data" class="text-red-500"
      >Campo obrigatório</small
    >
    <div class="w-full flex gap-4 mt-4" v-if="item.Id">
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
import { onMounted, ref, defineProps, computed, defineEmits, watch } from "vue";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["update-validation"]);

const editorModules = ref({
  toolbar: [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote"], // remove 'code-block' to remove the code button
    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ direction: "rtl" }], // text direction
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ align: [] }],
    ["clean"], // remove formatting button
  ],
});

const info = ref({});
const isTouched = ref({
  Title: false,
  SendDate: false,
  Description: false,
  Data: false,
  Operation: false,
});

const isFormValid = computed(() => {
  return (
    info.value.Title &&
    info.value.SendDate &&
    info.value.Description &&
    info.value.Data &&
    (!info.value.Id || info.value.Operation)
  );
});

watch(isFormValid, (newValue) => {
  emit("update-validation", newValue);
});

function markAsTouched(field) {
  isTouched.value[field] = true;
}

function submitForm() {
  if (isFormValid.value) {
    // Lógica de submissão do formulário
    console.log("Formulário enviado com sucesso!", info.value);
  } else {
    console.log("Por favor, preencha todos os campos obrigatórios.");
  }
}

onMounted(() => {
  info.value = props.item;
  info.value.SendDate = info.value.SendDate
    ? new Date(info.value.SendDate)
    : new Date();
});
</script>

<style lang="scss">
.news-form {
  .p-editor-toolbar {
    display: none;
  }
}
</style>
