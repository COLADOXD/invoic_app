<script setup lang="ts">
import HeaderComponent from "@/components/HeaderComponent.vue";
import DetailsInvoiceComponent from "@/components/DetailsInvoiceComponent.vue";
import GoBackComponent from "@/components/GoBackComponent.vue";
</script>

<template>
  <HeaderComponent />
  <div class="p-5 bg-quinto pb-20 dark:bg-primary dark:text-white">
    <div class="mt-16"></div>
    <router-link to="/">
      <GoBackComponent />
    </router-link>
    <div
      class="px-5 py-7 flex justify-between bg-white rounded-lg items-center mb-5 dark:bg-secondary border-slate-300 border dark:border-0">
      <div class="text-slate-400">Status</div>
      <div class="flex py-4 px-8 bg-orange-100 items-center rounded-lg h-[40px] dark:bg-slate-700">
        <div class="h-2 w-2 rounded-full bg-green-400 mr-2"></div>
        <p>Paid</p>
      </div>
    </div>
    <DetailsInvoiceComponent />
  </div>
  <div
    class="bg-white dark:bg-secondary p-5 text-sm flex justify-center items-center dark:text-white border-slate-300 border-t dark:border-0">
    <div class="bg-slate-200 dark:bg-cuarto p-3 rounded-3xl font-semibold">Edit</div>
    <div class="bg-red-500 p-3 rounded-3xl mx-3 font-semibold text-white">Delete</div>
    <div class="bg-blue-500 p-3 rounded-3xl font-semibold text-white">Mark as Paid</div>
  </div>
</template>
