<template>
  <BasicContentWrapper>
    <div class="crud-page-title d-flex mb-3">
      {{ pageExtraTitle }}
    </div>
    <CrudTable
      v-model="filtersUsers"
      :hide-search="hideSearch"
      :action-text="actionText"
      :show-date-range-filter="showDateRangeFilter"
      :has-api-filters="hasApiFilters"
      :data="data.data"
      :columns="columns"
      :filters="filters"
      :state-filters="stateFilters"
      :search-filter="searchFilter"
      :action-routes="actionRoutes"
      :get-data-key="getDataKey"
      :delete-data-key="deleteDataKey"
      :api-pagination="apiPagination"
      selectable
    />
  </BasicContentWrapper>
</template>

<script lang="ts" setup>
import { useStore } from "vuex";
import CrudTable from "@/components/tables/CrudTable.vue";
import BasicContentWrapper from "@/components/spacing/BasicContentWrapper.vue";
import { computed, ref, defineProps, watch } from "vue";
import { accessStoreKey } from "@/helpers/dto";

const store = useStore();

const props = defineProps({
  headerLabels: {
    type: Array,
    required: true,
  },
  navBarTab: {
    type: Number,
    default: null,
  },
  actionText: {
    type: String,
    required: true,
  },
  hasApiFilters: {
    type: Boolean,
    default: false,
  },
  stateFilters: {
    type: Array,
    default: () => [],
  },
  hideSearch: {
    type: Boolean,
    default: false,
  },
  showDateRangeFilter: {
    type: Boolean,
    default: false,
  },
  storeDataKey: {
    type: [String, Array],
    required: true,
  },
  getDataKey: {
    type: String,
    required: true,
  },
  deleteDataKey: {
    type: String,
    required: true,
  },
  columns: {
    type: Array,
    default: () => [],
  },
  actionRoutes: {
    type: Object,
    required: true,
  },
  filters: {
    type: Array,
    required: false,
    default: () => [],
  },
  searchFilter: {
    type: Array,
    required: true,
  },
});

// const currentRoute = useRoute();
// const paramId = computed(() => currentRoute.params.id || "");
const filtersUsers = ref({});

const pageExtraTitle = computed(() => store.state.page.pageExtraTitle);
const data = computed(() => accessStoreKey(store.state, props.storeDataKey));
const apiPagination = computed(() => data.value.apiPagination);
</script>

<style lang="scss" scoped>
.users-count {
  background: rgba(203, 197, 197, 0.529);
  border-radius: 5px;
  border: 1px solid black;
  max-width: 800px !important;
  margin: auto;

  .wrapper-counter {
    display: flex;
    flex-direction: column;
    color: black;

    .counter {
      font-weight: bold;
      font-size: 2rem;
    }

    .label {
      font-size: 1.1rem;
    }
  }
}
</style>
