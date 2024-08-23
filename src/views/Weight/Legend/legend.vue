<template>
  <div class="w-full flex flex-col p-4 pt-2">
    <div class="w-full flex gap-8 mt-2 text-[#003B66] justify-between">
      <p
        v-for="(item, index) in items"
        :key="index"
        class="text-left text-[14px]"
      >
        <strong>{{ item.abbr }}:</strong> {{ item.description }}
      </p>
    </div>
  </div>
</template>

<script setup>
const items = [
  { abbr: "CC", description: "Ciclo cultura" },
  { abbr: "SP", description: "Segurança Produtiva" },
  { abbr: "SE", description: "Segurança Econômica" },
  { abbr: "SH", description: "Segurança Hídrica" },
  { abbr: "SS", description: "Segurança Social" },
];
</script>
