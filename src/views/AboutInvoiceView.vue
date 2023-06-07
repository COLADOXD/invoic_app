<script setup lang="ts">
import HeaderComponent from "@/components/HeaderComponent.vue";
import DetailsInvoiceComponent from "@/components/DetailsInvoiceComponent.vue";
import GoBackComponent from "@/components/GoBackComponent.vue";
import editInvoice from "./editInvoice.vue";
import { useStore } from '@/stores/state';
import { useRoute } from "vue-router";
import { useRouter } from 'vue-router';
import { ref } from 'vue'

const store = useStore()
const route = useRoute();
const router = useRouter();
const param = ref()
param.value = route.params.index
const invoice = store.invoices[param.value];
const viewDeleteInvoice = ref(false)

const deleteInvoice = () => {
  router.push('/');
  store.invoices.splice(param.value, 1)
}

const confirmDeleteInvoice = () => {
  viewDeleteInvoice.value = !viewDeleteInvoice.value
}

const onEditInvoice = ref(false)

const viewEditInvoice = (boolean: boolean) => {
  onEditInvoice.value = boolean
}

const onStatePaid = () => {
  invoice.stateInvoice = 'Paid'
}

</script>

<template>
  <HeaderComponent />
  <div v-if="!onEditInvoice">
    <div v-if="viewDeleteInvoice" class="p-6 flex justify-center">
      <div class="fixed inset-0 bg-black opacity-50 z-10"></div>
      <div v-if="store.invoices.length > 0"
        class="fixed z-20 h-[190px] max-w-[480px] bg-white dark:text-white dark:bg-secondary p-5 w-[87.5%] top-[350px] rounded-lg">
        <p class="font-bold text-2xl">Confirm Delete</p>
        <p class="text-sm text-slate-400">Are you sure you want to delete invoice #{{
          invoice.codeInvoice
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
          <p>{{ invoice.stateInvoice }}</p>
        </div>
      </div>
      <DetailsInvoiceComponent />
    </div>
    <div
      class="bg-white dark:bg-secondary p-5 text-sm flex justify-center items-center dark:text-white border-slate-300 border-t dark:border-0 fixed bottom-0 w-full h-[50px]">
      <button @click="viewEditInvoice(true)"
        class="bg-slate-200 dark:bg-cuarto p-2 text-xs rounded-3xl font-semibold">Edit</button>
      <button @click="confirmDeleteInvoice"
        class="bg-red-500 p-2 text-xs rounded-3xl mx-3 font-semibold text-white">Delete</button>
      <button @click="onStatePaid" class="bg-blue-500 p-2 text-xs rounded-3xl font-semibold text-white">Mark as
        Paid</button>
    </div>
  </div>
  <div v-else>
    <editInvoice @view-edit="viewEditInvoice" :invoice="store.invoices[param]" />
  </div>
</template>
