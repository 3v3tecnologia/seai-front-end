<template>
  <form
    class="flex w-full max-w-[1600px] min-w-[700px] gap-4 flex-col items-start"
    v-if="organ"
  >
    <div class="w-full flex gap-4 mt-4">
      <div
        class="form-group form-group-text text-left p-float-label mt-2 w-[50%]"
      >
        <InputText
          name="firstName"
          aria-describedby="culture-name-help"
          v-model="info.Name"
          :class="`w-full`"
          required
        />
        <label for="e-mail" class="font-weight-bold">Nome</label>
      </div>
      <div
        class="form-group form-group-text text-left p-float-label mt-2 w-[50%]"
      >
        <InputText
          name="firstName"
          aria-describedby="culture-name-help"
          v-model="info.Host"
          :class="`w-full`"
          required
        />
        <label class="font-weight-bold">Host</label>
        <small v-if="emailError.data" class="text-danger">{{
          emailError.text
        }}</small>
      </div>
    </div>
    <div class="w-full flex gap-4 mt-4">
      <div
        class="form-group form-group-text text-left p-float-label mt-2 w-[50%]"
      >
        <InputText
          name="firstName"
          aria-describedby="culture-name-help"
          v-model="info.User"
          :class="`w-full`"
          required
        />
        <label class="font-weight-bold">Usuário</label>
      </div>
      <div
        class="form-group form-group-text text-left p-float-label mt-2 w-[50%]"
      >
        <Password
          disabled
          autocomplete="off"
          class="password w-full"
          v-model="info.Password"
          toggleMask
        />
        <label for="e-mail" class="font-weight-bold">Senha</label>
      </div>
    </div>
  </form>
</template>
<script setup>
import { onMounted, ref, defineProps } from "vue";

const props = defineProps({
  organ: {
    type: Object,
    required: true,
  },
  emailError: {
    type: Object,
    required: true,
  },
});

const info = ref({});

onMounted(() => {
  info.value = props.organ;
  setTimeout(() => {
    removeAutoComplete();
  }, 700);
});

function removeAutoComplete() {
  var passwordInputs = document.querySelectorAll(".p-password-input");
  if (passwordInputs && passwordInputs.length > 0) {
    passwordInputs[0].removeAttribute("disabled");
    passwordInputs[0].classList.remove("p-disabled");
  }
}
</script>
<style>
.invalidInput {
  border: 1px solid rgb(117, 0, 0) !important;
  border-radius: 5px;
}
.p-password-input {
  width: 100% !important;
}
</style>
