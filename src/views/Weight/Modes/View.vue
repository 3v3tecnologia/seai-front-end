<template>
  <Dtable :infoTable="weightsTable" :dataValue="weights" />
</template>
<script setup>
import Dtable from "@/components/tables/Dtable";
import { defineProps } from "vue";
import { weightsTable } from "@/utils/tables/weight";

const props = defineProps({
  weights: {
    type: Array,
  },
});
</script>
