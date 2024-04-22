<template>
  <Dialog
    v-model:visible="visible"
    modal
    header="Header"
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <p class="mb-5">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </p>
  </Dialog>
</template>
<script setup>
import { ref, onMounted, defineProps } from "vue";
import { toast } from "vue3-toastify";
import { useRouter } from "vue-router";

const props = defineProps({
  showModal: {
    type: Boolean,
  },
});

const visible = ref(false);

onMounted(() => {
  visible.value = props.showModal;
});
</script>
