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
        />
        <label class="font-weight-bold">Título</label>
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
        />
        <label class="font-weight-bold">Data para envio</label>
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
        />
        <label class="font-weight-bold">Descrição</label>
      </div>
    </div>
    <Editor
      class="w-full"
      v-model="info.Data"
      editorStyle="height: 320px"
      :modules="editorModules"
    />
  </form>
</template>
<script setup>
import { onMounted, ref, defineProps } from "vue";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});
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
