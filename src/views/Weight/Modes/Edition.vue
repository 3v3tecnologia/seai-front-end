<template>
  <EditTable :infoTable="weightsTable" :dataValue="weights" />
</template>
<script setup>
import EditTable from "@/components/tables/EditTable.vue";
import { defineProps } from "vue";
import { weightsTable } from "@/utils/tables/weight";

const props = defineProps({
  weights: {
    type: Array,
  },
});
</script>
