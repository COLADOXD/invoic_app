<script setup lang="ts">
import HeaderComponent from "@/components/HeaderComponent.vue";
import FilterComponent from "@/components/FilterComponent.vue"
import NewComponent from "@/components/NewComponent.vue"
import Invoices from "@/components/InvoicesComponent.vue"
import { useStore } from "@/stores/state";
import { onMounted } from "vue";

onMounted(() => {
  store.getInvoices()
})

const store = useStore()

</script>

<template>
  <HeaderComponent />
  <div class="px-5 pt-5">
    <div class="flex justify-between mb-5 dark:text-white mt-20">
      <div>
        <p class="text-2xl font-bold">Invoices</p>
        <p class="text-slate-400">{{ store.invoices.length }} voices</p>
      </div>
      <div class="flex flex-row">
        <FilterComponent />
        <div class="px-1"></div>
        <NewComponent />
      </div>
    </div>
    <Invoices />
  </div>
</template>
