<script setup lang="ts">
import { useStore } from '@/stores/state';
import { Items } from '../stores/state';

const store = useStore()

const totalPriceItems = (totalPrice: Array<Items>) => {
    return totalPrice.reduce((accumulator, item) => {
        return accumulator + item.totalPriceItem;
    }, 0);
}
</script>

<template>
    <div v-for="(invoice, index) in store.invoices" :key="index">
        <router-link :to="{ name: 'about', params: { index: index } }">
            <div
                class="bg-white p-6 rounded-md dark:bg-secondary dark:text-white border-slate-300 border dark:border-0 mt-4">
                <div class="flex justify-between mb-4">
                    <p class=" font-semibold text-lg"><span class="text-blue-300">#</span>{{ invoice.codeInvoice }}</p>
                    <p class="text-slate-400 font-light dark:text-white">{{ invoice.toName }}</p>
                </div>
                <div class="flex justify-between items-center">
                    <div>
                        <p class="text-slate-400 font-light dark:text-white">Due {{ invoice.expiredInvoice }}</p>
                        <p class="font-bold text-xl">${{ totalPriceItems(invoice.items) }}.00</p>
                    </div>
                    <div class="flex py-4 px-8 bg-orange-100 items-center rounded-lg h-[40px] dark:bg-slate-700">
                        <div class="h-2 w-2 rounded-full bg-green-400 mr-2"></div>
                        <p>Paid</p>
                    </div>
                </div>
            </div>
        </router-link>
    </div>
</template>