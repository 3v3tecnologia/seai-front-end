<template>
  <div
    class="w-full max-w-[1600px] px-4 min-w-[350px] mb-10 max-h-[700px] overflow-auto"
  >
    <div class="mt-6" v-if="items && items.length > 0">
      <Dtable
        :infoTable="faqCategoriesTable"
        :dataValue="items"
        @on-edit-item="editItem"
        @on-delete-item="deleteItem"
      />
    </div>
    <div class="mt-6" v-else>
      <p>Nenhuma categoria cadastrada!</p>
      <Button
        label="Criar Categoria"
        class="btn-primary mt-4"
        @click="editItem()"
      ></Button>
    </div>
  </div>
</template>
<script setup>
import Dtable from "@/components/tables/Dtable";
import { defineProps, defineEmits } from "vue";
import { faqCategoriesTable } from "@/utils/tables/faq";
import { FAQRest } from "@/services/faq.service";
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  service: {
    type: FAQRest,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
});
const emit = defineEmits(["onEditItem", "onDeleteitem"]);

function deleteItem(data) {
  emit("onDeleteItem", data);
}
function editItem(data) {
  emit("onEditItem", data);
}
</script>
