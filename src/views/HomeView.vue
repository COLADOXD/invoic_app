<script setup lang="ts">
import FilterComponent from "../components/FilterComponent.vue"
import NewComponent from "../components/NewComponent.vue"
import Invoices from "../components/InvoicesComponent.vue"
</script>

<template>
  <div class="flex justify-between mb-5 dark:text-white">
    <div>
      <p class="text-2xl font-bold">Invoices</p>
      <p class="text-slate-400">0 voices</p>
    </div>
    <div class="flex flex-row">
      <FilterComponent />
      <NewComponent />
    </div>
  </div>
  <Invoices />
</template>
