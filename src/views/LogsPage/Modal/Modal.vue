<template>
  <Dialog
    v-model:visible="visible"
    modal
    header="Descrição"
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    @hide="closeModal"
  >
    <div class="w-full flex flex-col justify-start items-start">
      <h1 class="text-[#003B66] text-[16px]">
        <strong>{{ log.user.name }}</strong> - {{ log.operation }} -
        {{ log.resource }}
      </h1>
      <p class="mt-5 text-[14px]">{{ log.description }}</p>
    </div>
  </Dialog>
</template>

<script setup>
import { ref, onMounted, defineProps, defineEmits } from "vue";

const emit = defineEmits(["onCloseModal"]);

const visible = ref(false);

const props = defineProps({
  showModal: {
    type: Boolean,
  },
  log: {
    type: Object,
    required: true,
  },
});

onMounted(() => {
  visible.value = props.showModal;
});

function closeModal() {
  emit("onCloseModal");
}
</script>
