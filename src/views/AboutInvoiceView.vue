<script setup lang="ts">
import HeaderComponent from "@/components/HeaderComponent.vue";
import DetailsInvoiceComponent from "@/components/DetailsInvoiceComponent.vue";
import GoBackComponent from "@/components/GoBackComponent.vue";
import { useStore } from '@/stores/state';
import { useRoute } from "vue-router";
import { useRouter } from 'vue-router';
import { ref } from 'vue'

const store = useStore()
const route = useRoute();
const router = useRouter();
const param = ref()
param.value = route.params.index
const viewDeleteInvoice = ref(false)

const deleteInvoice = () => {
  router.push('/');
  store.invoices.splice(param.value, 1)
  console.log(`view Invoice: ${store.invoices.length}`)
}

const confirmDeleteInvoice = () => {
  viewDeleteInvoice.value = !viewDeleteInvoice.value
}
</script>

<template>
  <HeaderComponent />
  <div v-if="viewDeleteInvoice" class="p-6 flex justify-center">
    <div class="fixed inset-0 bg-black opacity-50 z-10"></div>
    <div v-if="store.invoices.length > 0"
      class="fixed z-20 h-[190px] max-w-[480px] bg-white dark:text-white dark:bg-secondary p-5 w-[87.5%] top-[350px] rounded-lg">
      <p class="font-bold text-2xl">Confirm Delete</p>
      <!-- {{ param }} -->
      <p class="text-sm text-slate-400">Are you sure you want to delete invoice #{{
        store.invoices[param].codeInvoice
      }}? This action
        cannot be undone.</p>
      <div class="flex justify-end mt-3">
        <button @click="confirmDeleteInvoice"
          class="bg-slate-100 font-semibold text-sm text-slate-400 rounded-full p-3">Cancel</button>
        <button @click="deleteInvoice()"
          class="bg-red-500 font-semibold text-sm text-white rounded-full p-3 ml-3">Delete</button>
      </div>
    </div>
  </div>
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
    <button @click="confirmDeleteInvoice" class="bg-red-500 p-3 rounded-3xl mx-3 font-semibold text-white">Delete</button>
    <div class="bg-blue-500 p-3 rounded-3xl font-semibold text-white">Mark as Paid</div>
  </div>
</template>
