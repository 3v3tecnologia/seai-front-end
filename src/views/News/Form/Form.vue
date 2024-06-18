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
          :manualInput="false"
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
    <Editor class="w-full" v-model="info.Data" editorStyle="height: 320px" />
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

const info = ref({});

onMounted(() => {
  info.value = props.item;
  info.value.SendDate = info.value.SendDate
    ? new Date(info.value.SendDate)
    : new Date();
});
</script>
