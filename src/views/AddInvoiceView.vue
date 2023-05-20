<script setup lang="ts">
import GoBackComponent from '@/components/GoBackComponent.vue'
import HeaderComponent from '@/components/HeaderComponent.vue';
// import { useStore } from '@/stores/state';
import { reactive } from 'vue';
import Datepicker from 'vue3-datepicker';

// const store = useStore();

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
    console.log(state.selectedDate)
    console.log("starting")
    if (state.fromAdrees === '') state.checkFromAdrees = false
    else { state.checkFromAdrees = true }
    if (state.fromCity === '') state.checkFromCity = false
    else { state.checkFromCity = true }
    if (state.fromPostCode === undefined) state.checkFromPostCode = false
    else { state.checkFromPostCode = true }
    if (state.toName === '') state.checkToName = false
    else { state.checkToName = true }
    if (state.toEmail === '') state.checkToEmail = false
    else { state.checkToEmail = true }
    if (state.toAddress === '') state.checkToAddress = false
    else { state.checkToAddress = true }
    if (state.toCity === '') state.checkToCity = false
    else { state.checkToCity = true }
    if (state.toPostCode === undefined) state.checkToPostCode = false
    else { state.checkToPostCode = true }
    if (state.selectedDate === Date) state.checkSelectedDate = false
    else { state.checkSelectedDate = true }
    if (state.toPaymentTerms === '') state.checkToPaymentTerms = false
    else { state.checkToPaymentTerms = true }
    if (state.toProyect === '') state.checkToProyect = false
    else { state.checkToProyect = true }
    console.log("ending")
};

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
                <p class="text-slate-500 mb-3 " :class="!state.checkFromAdrees ? 'dark:text-red-700' : 'dark:text-white'">
                    Street Adrees
                </p>
                <div v-if="!state.checkFromAdrees" class="text-[10px] text-red-700 flex items-center">can't be empty</div>
            </div>
            <input v-model="state.fromAdrees" class="w-full h-12 rounded-md  dark:bg-secondary  pl-5 border" type="text"
                :class="!state.checkFromAdrees ? 'dark:border-sm border-red-700' : 'border-slate-300 dark:border-0'">

        </div>
        <div class="mb-5 flex">
            <div>
                <p class="text-slate-500 text-sm mb-3"
                    :class="!state.checkFromCity ? 'dark:text-red-700' : 'dark:text-white'">City</p>
                <input v-model="state.fromCity" type="text"
                    class="w-full h-12 border-slate-300 dark:bg-secondary  pl-5 border rounded-md"
                    :class="!state.checkFromCity ? 'dark:border-sm border-red-700' : 'border-slate-300 dark:border-0'">
                <div v-if="!state.checkFromCity" class="text-[10px] text-red-700">can't be empty</div>
            </div>
            <div class="ml-10">
                <p class="text-slate-500 text-sm mb-3 "
                    :class="!state.checkFromPostCode ? 'dark:text-red-700' : 'dark:text-white'">Post Code</p>

                <input v-model="state.fromPostCode" type="number"
                    class="w-full h-12 border-slate-300 dark:bg-secondary pl-5 border rounded-md"
                    :class="!state.checkFromPostCode ? 'dark:border-sm border-red-700' : 'border-slate-300 dark:border-0'">
                <div v-if="!state.checkFromPostCode" class="text-[10px] text-red-700">can't be empty</div>
            </div>
        </div>
        <p class="text-blue-500 font-semibold mb-5">Bill To</p>
        <div class="mb-5">
            <p class="text-slate-500 text-sm mb-3 " :class="!state.checkToName ? 'dark:text-red-700' : 'dark:text-white'">
                Client's
                Name</p>
            <input v-model="state.toName" class="w-full h-12 rounded-md border-slate-300 dark:bg-secondary  pl-5 border "
                :class="!state.checkToName ? 'dark:border-sm border-red-700' : 'border-slate-300 dark:border-0'"
                type="text">
            <div v-if="!state.checkToName" class="text-[10px] text-red-700">can't be empty</div>
        </div>
        <div class="mb-5">
            <p class="text-slate-500 text-sm mb-3" :class="!state.checkToEmail ? 'dark:text-red-700' : 'dark:text-white'">
                Client's Email</p>
            <input v-model="state.toEmail" class="w-full h-12 rounded-md border-slate-300 dark:bg-secondary  pl-5 border "
                :class="!state.checkToEmail ? 'dark:border-sm border-red-700' : 'border-slate-300 dark:border-0'"
                type="text">
            <div v-if="!state.checkToEmail" class="text-[10px] text-red-700">can't be empty</div>
        </div>
        <div class="mb-5">
            <p class="text-slate-500 text-sm mb-3" :class="!state.checkToAddress ? 'dark:text-red-700' : 'dark:text-white'">
                Street Adrees</p>
            <input v-model="state.toAddress" class="w-full h-12 rounded-md border-slate-300 dark:bg-secondary  pl-5 border"
                :class="!state.checkToAddress ? 'dark:border-sm border-red-700' : 'border-slate-300 dark:border-0'"
                type="text">
            <div v-if="!state.checkToAddress" class="text-[10px] text-red-700">can't be empty</div>
        </div>
        <div class="mb-5 flex">
            <div>
                <p class="text-slate-500 text-sm mb-3"
                    :class="!state.checkToCity ? 'dark:text-red-700' : 'dark:text-white'">City</p>
                <input v-model="state.toCity" type="text"
                    class="w-full h-12 border-slate-300 dark:bg-secondary  pl-5 border rounded-md"
                    :class="!state.checkToCity ? 'dark:border-sm border-red-700' : 'border-slate-300 dark:border-0'">
                <div v-if="!state.checkToCity" class="text-[10px] text-red-700">can't be empty</div>
            </div>
            <div class="ml-10">
                <p class="text-slate-500 text-sm mb-3"
                    :class="!state.checkToPostCode ? 'dark:text-red-700' : 'dark:text-white'">Post Code</p>
                <input v-model="state.toPostCode" type="text"
                    class="w-full h-12 border-slate-300 dark:bg-secondary  pl-5 border rounded-md"
                    :class="!state.checkToPostCode ? 'dark:border-sm border-red-700' : 'border-slate-300 dark:border-0'">
                <div v-if="!state.checkToPostCode" class="text-[10px] text-red-700">can't be empty</div>
            </div>
        </div>
        <div class="mb-5">
            <p class="text-slate-500 text-sm mb-3"
                :class="!state.checkSelectedDate ? 'dark:text-red-700' : 'dark:text-white'">Invoice Data</p>
            <Datepicker class="w-full h-12 rounded-md border-slate-300 dark:bg-secondary  pl-5 border"
                :class="!state.checkSelectedDate ? 'dark:border-sm border-red-700' : 'border-slate-300 dark:border-0'"
                v-model="state.selectedDate" />
            <div v-if="!state.checkSelectedDate" class="text-[10px] text-red-700">can't be empty</div>
        </div>
        <div class="mb-5">
            <p class="text-slate-500 text-sm mb-3"
                :class="!state.checkToPaymentTerms ? 'dark:text-red-700' : 'dark:text-white'">Payment Terms</p>
            <input v-model="state.toPaymentTerms"
                class="w-full h-12 rounded-md border-slate-300 dark:bg-secondary  pl-5 border "
                :class="!state.checkToPaymentTerms ? 'dark:border-sm border-red-700' : 'border-slate-300 dark:border-0'"
                type="text">
            <div v-if="!state.checkToPaymentTerms" class="text-[10px] text-red-700">can't be empty</div>
        </div>
        <div class="mb-5">
            <p class="text-slate-500 text-sm mb-3" :class="!state.checkToProyect ? 'dark:text-red-700' : 'dark:text-white'">
                Project Description</p>
            <input v-model="state.toProyect" class="w-full h-12 rounded-md border-slate-300 dark:bg-secondary  border pl-5"
                :class="!state.checkToProyect ? 'dark:border-sm border-red-700' : 'border-slate-300 dark:border-0'"
                placeholder="e.g. Graphic Design Service" type="text">
            <div v-if="!state.checkToProyect" class="text-[10px] text-red-700">can't be empty</div>
        </div>
    </div>
    <div
        class="p-5 drop-shadow-2xl relative bg-white dark:bg-secondary w-full dark:text-white flex justify-center text-xs font-semibold">
        <button class="p-3 rounded-full bg-cuarto text-slate-400 dark:text-white">Discard</button>
        <button @click="checkInput()" class="p-3 rounded-full bg-terceary mx-3 text-slate-400 dark:text-white">Save as Draft
        </button>
        <button @click="checkInput()" class="p-3 rounded-full bg-blue-500 text-white ">Save & Send</button>
    </div>
</template>