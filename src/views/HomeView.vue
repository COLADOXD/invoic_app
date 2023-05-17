<script setup lang="ts">
import HeaderComponent from "@/components/HeaderComponent.vue";
import FilterComponent from "@/components/FilterComponent.vue"
import NewComponent from "@/components/NewComponent.vue"
import Invoices from "@/components/InvoicesComponent.vue"
</script>

<template>
  <HeaderComponent />
  <div class="px-5 pt-5">
    <div class="flex justify-between mb-5 dark:text-white mt-16">
      <div>
        <p class="text-2xl font-bold">Invoices</p>
        <p class="text-slate-400">0 voices</p>
      </div>
      <div class="flex flex-row">
        <FilterComponent />
        <router-link to="/invoic">
          <NewComponent />
        </router-link>
      </div>
    </div>
    <router-link to="/about">
      <Invoices />
    </router-link>
  </div>
</template>
