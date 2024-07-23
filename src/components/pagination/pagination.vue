<template>
  <div class="w-full bg-white">
    <Paginator
      :rows="rows"
      :totalRecords="totalRecords"
      :pageLinkSize="calculatePagesButtonsMax()"
      @page="handlePageChange"
    >
      <template #start="slotProps">
        <p class="hidden md:block">
          <span class="capitalize">{{ itemsName }}</span>
          {{ getStartedIndexItem(slotProps.state.page, currentTotal) }} a
          {{ getEndIndexItem(slotProps.state.page, currentTotal) }} de
          {{ totalRecords }}
        </p>
        <p class="block md:hidden">
          {{ slotProps.state.rows }}/ {{ totalRecords }}
        </p>
      </template>
    </Paginator>
  </div>
</template>
<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  rows: {
    type: Number,
    required: false,
    default: 1,
  },
  totalRecords: {
    type: Number,
    required: false,
    default: 1,
  },
  itemsName: {
    type: String,
    default: "items",
  },
  currentTotal: {
    type: Number,
    required: false,
    default: 1,
  },
});

const emit = defineEmits(["onHandlePageChange"]);

function calculatePagesButtonsMax() {
  const screenWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  if (screenWidth < 550) {
    return 3;
  } else if (screenWidth < 650) {
    return 5;
  } else if (screenWidth < 1070) {
    return 7;
  } else {
    return 9;
  }
}

function handlePageChange(page) {
  emit("onHandlePageChange", page.page + 1);
}
function getStartedIndexItem(page, total) {
  return page * total + 1;
}
function getEndIndexItem(page, total) {
  return total * (page + 1);
}
</script>
<style type="text/css">
.p-paginator {
  width: 104% !important;
  margin-left: -30px;
}
</style>
