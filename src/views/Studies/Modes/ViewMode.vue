<template>
  <Dtable :infoTable="studiesTable" :dataValue="studies" />
</template>
<script setup>
import Dtable from "@/components/tables/Dtable";
import { defineProps } from "vue";
import { studiesTable } from "@/utils/tables/studies";

const props = defineProps({
  studies: {
    type: Array,
  },
});
</script>
