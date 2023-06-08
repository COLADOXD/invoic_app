<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from '@/stores/state';

const store = useStore()

const selectFilter = ref(false);

const viewFilter = (filterName: string) => {
    const index = store.filters.indexOf(filterName);
    if (index !== -1) {
        store.filters.splice(index, 1);
    } else {
        store.filters.push(filterName);
    }
    store.invoicesFiltered = store.invoices.filter(item => store.filters.includes(item.stateInvoice));
}

const showContainer = () => {
    selectFilter.value = !selectFilter.value
}
</script>

<template>
    <div class="flex flex-col">
        <div @click="showContainer" class="flex items-center mt-2 justify-center">
            <div v-if="selectFilter" class="h-8 mr-4 w-[2px] bg-black dark:bg-white"></div>
            <p class="font-bold mr-2">Filter</p>
            <svg width="11" height="7" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1l4.228 4.228L9.456 1" stroke="#7C5DFA" stroke-width="2" fill="none" fill-rule="evenodd" />
            </svg>
        </div>
        <div v-if="selectFilter"
            class="p-4 rounded-lg drop-shadow-lg mt-4 bg-white absolute top-[140px] right-[105px] dark:bg-cuarto">
            <div class="flex">
                <input @click="viewFilter('Draft')" type="checkbox" class="bg-slate-400 p-2" id="Draft">
                <label for="Draft" class="ml-2 font-semibold text-sm">Draft</label>
            </div>
            <div class="flex my-3">
                <input @click="viewFilter('Pending')" type="checkbox" class="bg-slate-400 p-2" id="Pending">
                <label for="Pending" class="ml-2 font-semibold text-sm">Pending</label>
            </div>
            <div class="flex">
                <input @click="viewFilter('Paid')" type="checkbox" class="bg-slate-400 p-2" id="Paid">
                <label for="Paid" class="ml-2 font-semibold text-sm">Paid</label>
            </div>
        </div>
    </div>
</template>