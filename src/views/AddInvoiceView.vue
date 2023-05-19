<script setup lang="ts">
import GoBackComponent from '@/components/GoBackComponent.vue'
import HeaderComponent from '@/components/HeaderComponent.vue';
import { useStore } from '@/stores/state';
import { reactive } from 'vue';
import Datepicker from 'vue3-datepicker';

const store = useStore();

const state = reactive({
    selectedDate: Date,
    fromAdrees: '',
    fromCity: '',
    fromPostCode: undefined as number | undefined,
    toName: '',
    toEmail: '',
    toAddress: '',
    toCity: '',
    toPostCode: undefined as number | undefined,
    toPaymentTerms: '',
    toProyect: '',
    checkSelectedDate: true,
    checkFromAdrees: true,
    checkFromCity: true,
    checkFromPostCode: true,
    checkToName: true,
    checkToEmail: true,
    checkToAddress: true,
    checkToCity: true,
    checkToPostCode: true,
    checkToPaymentTerms: true,
    checkToProyect: true,
});

const checkInput = () => {
    console.log(state.fromAdrees);
};
console.log(state.fromAdrees);
</script>

<template>
    <HeaderComponent />
    <div class="p-5 bg-quinto pb-5 dark:bg-primary dark:text-white">
        <div class="mt-16"></div>
        <router-link to="/">
            <GoBackComponent />
        </router-link>
        <div class="mb-5">
            <p class="text-3xl font-bold mb-5">New Invoice</p>
            <p class="text-blue-500 font-semibold">Bill From</p>
        </div>
        <div class="mb-5">
            <div class="flex justify-between">
                <p class="text-slate-500 text-sm mb-3 dark:text-white"
                    :class="state.fromAdrees === '' ? 'dark:text-white border-red-500 border-sm' : 'dark:text-red-700'">
                    Street Adrees
                </p>
                <div v-if="state.fromAdrees">can't be empty</div>
            </div>
            <input v-model="state.fromAdrees" @blur="checkInput"
                class="w-full h-12 rounded-md border-slate-300 dark:bg-secondary dark:border-0 pl-5 border" type="text">
        </div>
        <div class="mb-5 flex">
            <div>
                <p class="text-slate-500 text-sm mb-3 dark:text-white">City</p>
                <input v-model="state.fromCity" type="text"
                    class="w-full h-12 border-slate-300 dark:bg-secondary dark:border-0 pl-5 border rounded-md">
            </div>
            <div class="ml-10">
                <p class="text-slate-500 text-sm mb-3 dark:text-white">Post Code</p>
                <input v-model="state.fromPostCode" type="number"
                    class="w-full h-12 border-slate-300 dark:bg-secondary dark:border-0 pl-5 border rounded-md">
            </div>
        </div>
        <p class="text-blue-500 font-semibold mb-5">Bill To</p>
        <div class="mb-5">
            <p class="text-slate-500 text-sm mb-3 dark:text-white">Client's Name</p>
            <input v-model="state.toName"
                class="w-full h-12 rounded-md border-slate-300 dark:bg-secondary dark:border-0 pl-5 border " type="text">
        </div>
        <div class="mb-5">
            <p class="text-slate-500 text-sm mb-3 dark:text-white">Client's Email</p>
            <input v-model="state.toEmail"
                class="w-full h-12 rounded-md border-slate-300 dark:bg-secondary dark:border-0 pl-5 border " type="text">
        </div>
        <div class="mb-5">
            <p class="text-slate-500 text-sm mb-3 dark:text-white">Street Adrees</p>
            <input v-model="state.toAddress"
                class="w-full h-12 rounded-md border-slate-300 dark:bg-secondary dark:border-0 pl-5 border" type="text">
        </div>
        <div class="mb-5 flex">
            <div>
                <p class="text-slate-500 text-sm mb-3 dark:text-white">City</p>
                <input v-model="state.toCity" type="text"
                    class="w-full h-12 border-slate-300 dark:bg-secondary dark:border-0 pl-5 border rounded-md">
            </div>
            <div class="ml-10">
                <p class="text-slate-500 text-sm mb-3 dark:text-white">Post Code</p>
                <input v-model="state.toPostCode" type="text"
                    class="w-full h-12 border-slate-300 dark:bg-secondary dark:border-0 pl-5 border rounded-md">
            </div>
        </div>
        <div class="mb-5">
            <p class="text-slate-500 text-sm mb-3 dark:text-white">Invoice Data</p>
            <Datepicker class="w-full h-12 rounded-md border-slate-300 dark:bg-secondary dark:border-0 pl-5 border"
                v-model="state.selectedDate" />
        </div>
        <div class="mb-5">
            <p class="text-slate-500 text-sm mb-3 dark:text-white">Payment Terms</p>
            <input v-model="state.toPaymentTerms"
                class="w-full h-12 rounded-md border-slate-300 dark:bg-secondary dark:border-0 pl-5 border " type="text">

        </div>
        <div class="mb-5">
            <p class="text-slate-500 text-sm mb-3 dark:text-white">Project Description</p>
            <input v-model="state.toProyect"
                class="w-full h-12 rounded-md border-slate-300 dark:bg-secondary dark:border-0 border pl-5"
                placeholder="e.g. Graphic Design Service" type="text">
        </div>
    </div>
    <div
        class="p-5 drop-shadow-2xl relative bg-white dark:bg-secondary w-full dark:text-white flex justify-center text-xs font-semibold">
        <div class="p-3 rounded-full bg-cuarto text-slate-400 dark:text-white">Discard</div>
        <div class="p-3 rounded-full bg-terceary mx-3 text-slate-400 dark:text-white">Save as Draft</div>
        <div class="p-3 rounded-full bg-blue-500 text-white ">Save & Send</div>
    </div>
</template>