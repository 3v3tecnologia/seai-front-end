<template>
  <form>
    <div class="flex" v-for="(study, i) in studiesForEdit" :key="i">
      {{ study }}
      <div class="form-group form-group-text p-float-label">
        <InputText
          id="estagio"
          aria-describedby="estagio-help"
          v-model="study.Crop"
          disabled
          :class="`w-100 ${cycleError && !kc.Title ? 'invalidInput' : ''}`"
        />
        <label for="estagio" class="font-weight-bold">Cultura</label>
      </div>
      <div class="form-group form-group-text p-float-label">
        <div class="form-group form-group-number p-float-label">
          <InputNumber
            v-model="study.HarvestDuration"
            id="kc"
            aria-describedby="kc-help"
          />
          <label for="kc" class="font-weight-bold"></label>
        </div>
      </div>
    </div>
  </form>
</template>
<script setup>
import { defineProps, ref, onMounted } from "vue";
import { studiesTable } from "@/utils/tables/studies";

const props = defineProps({
  studies: {
    type: Array,
  },
});

const studiesForEdit = ref([]);

onMounted(() => {
  studiesForEdit.value = props.studies;
});
</script>
