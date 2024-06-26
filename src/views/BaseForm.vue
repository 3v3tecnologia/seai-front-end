<template>
  <div class="home">
    <FormWrapper :title="headerLabel" @submit="handleSubmit">
      <template v-slot:content>
        <div class="row">
          <div
            v-for="(field, i) in fieldsTotal"
            :class="field.colSize ? `col-lg-${field.colSize}` : 'col-lg-6'"
            class="items-end flex"
            :key="i"
          >
            <div v-if="field._typeComponent == 'component'">
              <component
                v-model="form[field.formKey]"
                v-bind="field.component.props"
                :is="preBuiltComponents[field.component.name]"
              />
            </div>

            <BaseDropdown
              v-else-if="field._typeComponent == 'dropdown'"
              v-model="form[field.formKey]"
              :extra-margin-top="field.props?.extraMarginTop"
              inline-label
              remove-margin
              class="w-100"
              :class="{ 'mt-5': i > 1 }"
              width="100%"
              :options="field.options"
              :placeholder="field.label"
            />

            <span
              v-else
              class="margin-inputs d-block p-input-icon-right p-float-label"
            >
              <i
                v-if="field.type === 'password' || field.subtype === 'password'"
                @click="() => clickEyePassword(field)"
                :class="`pi ${field.tmp_pass ? 'pi-eye-slash' : 'pi-eye'}`"
              />
              <InputNumber
                v-if="field.type === 'number'"
                v-model="form[field.formKey]"
                :required="!field.nullable"
                :input-id="field.formKey"
                class="w-100"
                :maxFractionDigits="5"
                locale="en-US"
                showButtons
                :class="{
                  'p-invalid': [null, undefined, ''].includes(
                    form[field.formKey]
                  ),
                }"
              />
              <InputText
                v-else
                v-model="form[field.formKey]"
                :disabled="field.disabled"
                :required="!field.nullable"
                :type="field.type || 'text'"
                :input-id="field.formKey"
                :minlength="
                  field.requireMinMax || field.min ? field.min || 5 : null
                "
                :maxlength="
                  field.requireMinMax || field.max ? field.max || 25 : null
                "
                class="w-100"
              />

              <label class="font-weight-bold" :for="field.formKey"
                >{{ field.label }}
              </label>
            </span>
          </div>
        </div>
        <div class="py-2"></div>
      </template>

      <template v-slot:buttons>
        <router-link
          v-if="
            hasSaved || (finishedDataButton && finishedDataButton.isRedirect)
          "
          :to="{
            name: finishedDataButton.routeName,
            params: {
              id:
                form?.[fields?.[finishedDataButton?.fieldIdIndex]?.formKey]
                  ?.id || 1,
            },
          }"
          class="btn btn-success px-4 py-2 btn-block"
        >
          {{ finishedDataButton.text }}
        </router-link>

        <PrimaryButton
          v-else
          :disabled="!changedForm && !isNewForm"
          :text="`${isNewForm ? 'Salvar dados' : 'Atualizar dados'}`"
        />
      </template>
    </FormWrapper>

    <div class="py-5"></div>
  </div>
</template>

<script setup>
import PrimaryButton from "@/components/form/PrimaryButton.vue";
import FormWrapper from "@/components/form/FormWrapper.vue";
import { computed, ref, watch, defineProps, nextTick } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import BaseDropdown from "@/components/form/BaseDropdown.vue";
import FilterDate from "@/components/form/FilterDate.vue";
import FarmDap from "@/components/form/FarmDap.vue";
import CreateFarmDap from "@/components/form/CreateFarmDap.vue";
import FieldEditor from "@/components/form/FieldEditor.vue";
import BaseTable from "@/components/tables/BaseTable.vue";
import { accessStoreKey } from "@/helpers/dto";
import { useRouter } from "vue-router";
const router = useRouter();

const form = ref({});
const oldForm = ref({});
const preBuiltComponents = {
  FilterDate,
  FieldEditor,
  BaseTable,
  FarmDap,
  CreateFarmDap,
};

const loadedAllOptions = ref(false);

const currentRoute = useRoute();
const fieldsTmp = ref([]);
const hasSaved = ref(false);
const cycleError = ref(false);

const paramId = ref(currentRoute.params.id || "");

const store = useStore();

const clickEyePassword = (field) => {
  field.tmp_pass = !field.tmp_pass;
  field.subtype = "password";
  field.type = field.type === "password" ? "text" : "password";
};

const props = defineProps({
  getDataKey: {
    type: String,
    required: true,
  },
  storeDataKey: {
    type: [String, Array],
    required: true,
  },
  submitDataKey: {
    type: String,
    required: true,
  },
  headerLabel: {
    type: String,
    required: true,
  },
  finishedDataButton: {
    type: Object,
    required: true,
  },
  defaultValue: {
    type: [Object, Boolean],
    required: false,
    default: false,
  },
  workWithoutId: {
    type: Boolean,
    required: false,
    default: false,
  },
  fields: {
    type: Array,
    required: true,
  },
  navBarTab: {
    type: Number,
    default: null,
  },
});

watch(
  () => props.fields,
  async (newVal) => {
    try {
      loadedAllOptions.value = false;

      fieldsTmp.value = newVal
        .map((c) => ({ ...c }))
        .map((c, index) => {
          c.index = index;
          c.tmp_pass = true;

          return c;
        });

      await Promise.allSettled(
        fieldsTmp.value
          .filter((f) => f.getListKey)
          .map(async (f) => await store.dispatch(f.getListKey))
      );
    } catch (e) {
      console.error(e);
    } finally {
      loadedAllOptions.value = true;
    }
  },
  { immediate: true, deep: true }
);

const formData = computed(() => {
  let data = {};

  if (props.defaultValue) {
    data = props.defaultValue;
  } else if (props.storeDataKey) {
    data = accessStoreKey(store.state, props.storeDataKey);
  } else {
    data = {};
  }

  return data;
});

const labelTypeField = (fields, type) =>
  fields.map((field) => {
    field._typeComponent = type;
    return field;
  });

const prebuiltComponentsFields = computed(() =>
  fieldsTmp.value
    .filter((f) => f.component)
    .map((field) => ({
      ...field,
      value: form.value[field.formKey],
    }))
);

const drodpDowns = computed(() =>
  JSON.parse(JSON.stringify(fieldsTmp.value))
    .filter((f) => f.getListKey && !f.component)
    .map((field) => ({
      ...field,
      options: store.getters[field.getterKey].filter((f) => f.value),
    }))
);

const inputFields = computed(() =>
  fieldsTmp.value.filter((f) => !f.getListKey && !f.component)
);

const fieldsTotal = computed(() => {
  const tempComponents = labelTypeField(
    prebuiltComponentsFields.value,
    "component"
  );
  const tempDropdowns = labelTypeField(drodpDowns.value, "dropdown");
  const tempInputFields = labelTypeField(inputFields.value, "input");

  return [...tempComponents, ...tempDropdowns, ...tempInputFields].sort(
    (a, b) => a.index - b.index
  );
});

const dropdownsCopy = computed(() => {
  return JSON.parse(JSON.stringify(drodpDowns.value));
});

const requestDropdown = computed(() => {
  const dropdowns = dropdownsCopy.value
    .filter((d) => d.requestOnChange)
    .map((d) => {
      return {
        ...d,
        value: form.value[d.formKey],
      };
    });

  return JSON.parse(JSON.stringify(dropdowns));
});

const updateOldForm = (hasSavedForm = false) => {
  oldForm.value = JSON.parse(JSON.stringify(form.value));

  hasSaved.value = !!hasSavedForm;
};

watch(
  currentRoute,
  async (newVal) => {
    paramId.value = newVal.params.id;

    if (
      props.getDataKey &&
      (paramId.value || props.workWithoutId) &&
      !requestDropdown.value.length
    ) {
      await store.dispatch(props.getDataKey, paramId.value);
    } else {
      form.value = {};
      updateOldForm();
    }
  },
  { immediate: true }
);

const updateDropdownsValue = async (value) => {
  if (!value) return;

  drodpDowns.value.forEach((field) => {
    const key = field.formKey;
    const firstOption = field.options?.[0];
    const matchedResult = field.options.find((f) => f.title === field.value);
    const currentValue = form.value[key];

    let valueToReceive = null;
    if (!currentValue) {
      valueToReceive = firstOption;
    } else if (matchedResult && matchedResult.value != form.value[key].value) {
      valueToReceive = matchedResult;
    }

    if (valueToReceive) {
      form.value[key] = valueToReceive;
    }
  });
};

watch(() => loadedAllOptions.value, updateDropdownsValue);

const getConcatValuesForms = (formToCheck) => {
  const flatTypes = ["string", "number"];
  const isFlat = (field) => flatTypes.includes(typeof field) || !field;

  return Object.values(formToCheck)
    .map((field) => {
      if (isFlat(field)) {
        return field;
      }

      let currentField = field;

      if (!currentField.length) {
        currentField = [currentField];
      }

      return currentField.map((row) => Object.values(row).join("")).join("");
    })
    .join("");
};

const changedForm = computed(() => {
  const hasOldVal = !!(oldForm.value && Object.keys(oldForm.value).length);

  if (!hasOldVal) {
    return false;
  }
  const concatOldVal = getConcatValuesForms(oldForm.value);
  const concatNewVal = getConcatValuesForms(form.value);

  return hasOldVal && concatOldVal !== concatNewVal;
});

const isNewForm = computed(() => {
  return (
    !oldForm.value || !Object.keys(oldForm.value).length || props.defaultValue
  );
});

const setFormWatcher = (value) => {
  form.value = value ? JSON.parse(JSON.stringify(value)) : {};
  oldForm.value = JSON.parse(JSON.stringify(form.value));
};

watch(() => formData.value, setFormWatcher, { deep: true });

const fetchDataParams = computed(() =>
  JSON.parse(JSON.stringify([requestDropdown.value, currentRoute.path]))
);

watch(
  () => fetchDataParams.value,
  async (newVal, oldVal) => {
    const [newDropdown, newPath] = newVal;
    const fullNewDropdownValue = newDropdown?.[0]?.value;
    const newDropdownValue = fullNewDropdownValue?.value;
    const oldDropdownValue = oldVal?.[0]?.[0]?.value?.value;

    const hasDropdownChangedValue =
      (newDropdownValue && !oldDropdownValue) ||
      (oldDropdownValue &&
        newDropdownValue &&
        oldDropdownValue != newDropdownValue);
    const isChangingRoute = oldVal && oldVal[1] != newPath;

    if (hasDropdownChangedValue || isChangingRoute) {
      await store.dispatch(props.getDataKey, fullNewDropdownValue);
    }
  }
);

const handleSubmit = async (e) => {
  e.preventDefault();
  await store
    .dispatch(props.submitDataKey, form.value)
    .then(() => {
      updateOldForm(true);
    })
    .catch(console.error);
};
</script>

<style>
.margin-inputs {
  margin-top: 2rem;
}

.row > * > * {
  width: 100%;
}
</style>
