<script setup lang="ts">
import { useStore } from '@/stores/state';
import { useRoute } from "vue-router";
import { ref } from 'vue'
import { Items } from '../stores/state';

const store = useStore()
const route = useRoute();
const param = ref()
param.value = route.params.index
const invoice = store.invoices[param.value];

const totalPriceItems = (totalPrice: Array<Items>) => {
    return totalPrice.reduce((accumulator, item) => {
        return accumulator + item.totalPriceItem;
    }, 0);
}
</script>

<template>
    <div class="p-5 bg-white rounded-lg pb-7 dark:bg-secondary border-slate-300 border dark:border-0 md:justify-between">
        <p class=" font-semibold text-lg"><span class="text-blue-500">#{{ invoice.codeInvoice }}</span></p>
        <div class="text-slate-400 mb-7">
            <p class="mb-7">Graphic Design</p>
            <p>{{ invoice.fromAddress }}</p>
            <p>{{ invoice.fromCity }}</p>
            <p>{{ invoice.fromPostCode }}</p>
            <p>{{ invoice.fromCountry }}</p>
        </div>
        <div class="flex mb-7 text-lg">
            <div class="w-1/2">
                <p class="text-slate-400">Invoice Date</p>
                <p class="font-bold text-xl mb-10">{{ invoice.selectedDate }}</p>
                <p class="text-slate-400">Payment Due</p>
                <p class="font-bold text-xl">{{ invoice.expiredInvoice }}</p>
            </div>
            <div class="text-slate-400 w-1/2">
                <p>Bill To</p>
                <p class="font-bold text-xl text-black dark:text-white">{{ invoice.toName }}</p>
                <p>{{ invoice.toAddress }}</p>
                <p>{{ invoice.toCity }}</p>
                <p>{{ invoice.toPostCode }}</p>
                <p>{{ invoice.toCountry }}</p>
            </div>
        </div>
        <div class="mb-7">
            <p class="text-slate-400">Sent to</p>
            <p class="font-bold text-xl">{{ invoice.toEmail }}</p>
        </div>
        <div v-for="(item, index) in invoice.items" :key="index">
            <div class="p-5 bg-quinto flex justify-between items-center rounded-t-lg dark:bg-cuarto">
                <div>
                    <p class="text-sm">{{ item.nameItem }}</p>
                    <p class="text-blue-500 font-medium">{{ item.qtyItem }} x ${{ item.priceItem }}.00</p>
                </div>
                <div>
                    <p class="font-bold text-xl">${{ item.totalPriceItem }}.00</p>
                </div>
            </div>
        </div>
        <div class="flex justify-between p-5 bg-terceary dark:bg-black text-white items-center rounded-b-lg">
            <p>Grand Total</p>
            <p class="font-bold text-3xl">${{ totalPriceItems(invoice.items) }}.00</p>
        </div>
    </div>
</template>