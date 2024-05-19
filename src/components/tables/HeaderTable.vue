<template>
  <div class="w-full flex flex-row justify-between gap-8">
    <div class="flex flex-row gap-4">
      <span class="p-input-icon-right" v-if="!hiddenSearch">
        <InputText
          v-model="searchTerm"
          :placeholder="searchPlaceholder"
          leftIcon="pi pi-search"
          class="w-[300px] p-input-icon"
          @input="onSearchItem"
        />
        <i class="pi pi-search" />
      </span>
      <span v-if="selectItems.length === 0"></span>
      <div
        class="form-group form-group-text p-float-label w-full"
        v-else
        v-for="(select, i) in selectItems"
        :key="i"
      >
        <Dropdown
          v-model="selected[i]"
          :options="select.items"
          :optionLabel="select.optionLabel"
          :placeholder="select.placeholder"
          class="w-[200px]"
          @change="onSelectItem(select, i)"
        />
        <label class="font-weight-bold"> {{ select.placeholder }} </label>
      </div>
    </div>
    <slot></slot>
  </div>
</template>
<script setup>
import { defineProps, defineEmits, ref, onMounted } from "vue";

const props = defineProps({
  selectItems: {
    type: Array,
    default: () => [],
  },
  hiddenSearch: {
    type: Boolean,
    default: false,
  },
  startSelected: {
    type: Array,
    default: () => [],
  },
  searchPlaceholder: {
    type: String,
    default: "Pesquisar por nome",
  },
});

const selected = ref([]);
const searchTerm = ref(null);
const emit = defineEmits(["onSearchItem", "onSelectItem"]);

onMounted(() => {
  for (let i = 0; i < props.selectItems.length; i++) {
    selected.value.push(
      props.startSelected.length > 0 ? props.startSelected[i] : null
    );
  }
});

function onSearchItem() {
  emit("onSearchItem", searchTerm.value);
}
function onSelectItem(select, index) {
  emit("onSelectItem", select.paramsName, selected.value[index].Id);
}
</script>
