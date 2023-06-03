<script setup lang="ts">
import GoBackComponent from '@/components/GoBackComponent.vue'
import HeaderComponent from '@/components/HeaderComponent.vue';
import { useStore } from '@/stores/state';
import { reactive, ref, computed } from 'vue';
import CreateItem from '../components/CreateItem.vue'
import { useRouter } from 'vue-router';
import { Items } from '../stores/state';
import { addDays, format } from 'date-fns';

const store = useStore();
const router = useRouter();
const onPaymentTerms = ref(false);

const state = reactive({
    selectedDate: getDateActual(),
    fromAddress: '',
    fromCity: '',
    fromPostCode: '',
    fromCountry: '',
    toName: '',
    toEmail: '',
    toAddress: '',
    toCity: '',
    toPostCode: '',
    toCountry: '',
    toProject: '',
    paymentTerms: 30
});

const checkInfo = reactive({
    checkSelectedDate: true,
    checkFromAddress: true,
    checkFromCity: true,
    checkFromPostCode: true,
    checkFromCountry: true,
    checkToName: true,
    checkToEmail: true,
    checkToAddress: true,
    checkToCity: true,
    checkToPostCode: true,
    checkToCountry: true,
    checkToPaymentTerms: true,
    checkToProject: true,
})

const formattedDate = computed(() => {
    const dateString = state.selectedDate.toLocaleString()
    const dateParts = dateString.split("-");
    const year = dateParts[0];
    const month = getMonthName(dateParts[1]);
    const day = dateParts[2];
    console.log(state.selectedDate.toLocaleString());
    return ` ${day} ${month} ${year}`;
});

// const paymentDate = computed(() => {

// });
const dateActual = ref(getDateActual());

function getDateActual() {
    const date = new Date();
    const año = date.getFullYear();
    let mes = (date.getMonth() + 1).toString().padStart(2, '0');
    let dia = date.getDate().toString().padStart(2, '0');

    return `${año}-${mes}-${dia}`;
}

function getMonthName(month: string): string {
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ];

    const monthIndex = parseInt(month, 10) - 1;
    return months[monthIndex];
}

const codeInvoice = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomName = '';

    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomName += characters[randomIndex];
    }
    return randomName;
}

const payInvoice = () => {
    const date = new Date(state.selectedDate.toLocaleString());
    const dateAdded = addDays(date, 30);
    console.log(state.selectedDate)
    return format(dateAdded, 'yyyy-MM-dd');
}

const checkInput = () => {
    if (state.fromAddress === '') checkInfo.checkFromAddress = false
    else { checkInfo.checkFromAddress = true }
    if (state.fromCity === '') checkInfo.checkFromCity = false
    else { checkInfo.checkFromCity = true }
    if (state.fromPostCode === undefined) checkInfo.checkFromPostCode = false
    else { checkInfo.checkFromPostCode = true }
    if (state.fromCountry === '') checkInfo.checkFromCountry = false
    else { checkInfo.checkFromCountry = true }
    if (state.toName === '') checkInfo.checkToName = false
    else { checkInfo.checkToName = true }
    if (state.toEmail === '') checkInfo.checkToEmail = false
    else { checkInfo.checkToEmail = true }
    if (state.toAddress === '') checkInfo.checkToAddress = false
    else { checkInfo.checkToAddress = true }
    if (state.toCity === '') checkInfo.checkToCity = false
    else { checkInfo.checkToCity = true }
    if (state.toPostCode === undefined) checkInfo.checkToPostCode = false
    else { checkInfo.checkToPostCode = true }
    if (state.toCountry === '') checkInfo.checkToCountry = false
    else { checkInfo.checkToCountry = true }
    if (state.toProject === '') checkInfo.checkToProject = false
    else { checkInfo.checkToProject = true }
    console.log(typeof state.fromCountry)
    if (checkInfo.checkSelectedDate, checkInfo.checkFromAddress, checkInfo.checkFromCity, checkInfo.checkFromPostCode, checkInfo.checkToName, checkInfo.checkToEmail, checkInfo.checkToAddress, checkInfo.checkToCity, checkInfo.checkToPostCode, checkInfo.checkToPaymentTerms, checkInfo.checkToProject === true) {
        router.push('/');
        store.invoices.push({
            codeInvoice: codeInvoice(),
            fromAddress: state.fromAddress,
            fromCity: state.fromCity,
            fromPostCode: state.fromPostCode,
            fromCountry: state.fromCountry,
            toName: state.toName,
            toEmail: state.toEmail,
            toAddress: state.toAddress,
            toCity: state.toCity,
            toPostCode: state.toPostCode,
            toCountry: state.toCountry,
            toProject: state.toProject,
            items: items.value,
            selectedDate: formattedDate.value,
            paymentTerms: state.paymentTerms,
        })
    }
}

const items = ref<Items[]>([]);
const changePaymentTerms = (days: number) => {
    state.paymentTerms = days
    onPaymentTerms.value = !onPaymentTerms.value
}

const addItem = () => {
    items.value.push({
        nameItem: '',
        qtyItem: 1,
        priceItem: 0,
        totalPriceItem: 0
    })
}

const changeValueItem = (index: number, price: number, qty: number, name: string) => {
    payInvoice()
    items.value[index].nameItem = name
    items.value[index].qtyItem = qty
    items.value[index].priceItem = price
    items.value[index].totalPriceItem = qty * price
}

const removeItem = (index: number) => {
    items.value.splice(index, 1)
}

const viewPaymentTerms = () => {
    onPaymentTerms.value = !onPaymentTerms.value
}
</script>

<template>
    <HeaderComponent />
    <div class="p-5 bg-quinto pb-5 dark:bg-primary dark:text-white">
        <div class="mt-16"></div>
        <!-- {{ payInvoice() }} -->
        <router-link to="/">
            <GoBackComponent />
        </router-link>
        <div class="mb-5">
            <p class="text-3xl font-bold mb-5">New Invoice</p>
            <p class="text-blue-500 font-semibold">Bill From</p>
        </div>
        <div class="mb-5">
            <div class="flex justify-between">
                <p class="text-slate-500 mb-3 "
                    :class="!checkInfo.checkFromAddress ? 'dark:text-red-700' : 'dark:text-white'">
                    Street Address
                </p>
                <div v-if="!checkInfo.checkFromAddress" class="text-[10px] text-red-700 flex items-center">can't be empty
                </div>
            </div>
            <input v-model="state.fromAddress" class="w-full h-12 rounded-md  dark:bg-secondary  pl-5 border" type="text"
                :class="!checkInfo.checkFromAddress ? 'dark:border-sm dark:border-red-700' : 'border-slate-300 dark:border-0'">
        </div>
        <div class="mb-5 flex">
            <div>
                <p class="text-slate-500 text-sm mb-3"
                    :class="!checkInfo.checkFromCity ? 'dark:text-red-700' : 'dark:text-white'">City</p>
                <input v-model="state.fromCity" type="text"
                    class="w-full h-12 border-slate-300 dark:bg-secondary  pl-5 border rounded-md"
                    :class="!checkInfo.checkFromCity ? 'dark:border-sm dark:border-red-700' : 'border-slate-300 dark:border-0'">
                <div v-if="!checkInfo.checkFromCity" class="text-[10px] text-red-700">can't be empty</div>
            </div>
            <div class="ml-10">
                <p class="text-slate-500 text-sm mb-3 "
                    :class="!checkInfo.checkFromPostCode ? 'dark:text-red-700' : 'dark:text-white'">Post Code</p>
                <input v-model="state.fromPostCode" type="number"
                    class="w-full h-12 border-slate-300 dark:bg-secondary pl-5 border rounded-md"
                    :class="!checkInfo.checkFromPostCode ? 'dark:border-sm dark:border-red-700' : 'border-slate-300 dark:border-0'">
                <div v-if="!checkInfo.checkFromPostCode" class="text-[10px] text-red-700">can't be empty</div>
            </div>
        </div>
        <div class="mb-5">
            <div class="flex justify-between">
                <p class="text-slate-500 mb-3 "
                    :class="!checkInfo.checkFromCountry ? 'dark:text-red-700' : 'dark:text-white'">
                    Country
                </p>
                <div v-if="!checkInfo.checkFromCountry" class="text-[10px] text-red-700 flex items-center">can't be empty
                </div>
            </div>
            <input v-model="state.fromCountry" class="w-full h-12 rounded-md  dark:bg-secondary  pl-5 border" type="text"
                :class="!checkInfo.checkFromCountry ? 'dark:border-sm dark:border-red-700' : 'border-slate-300 dark:border-0'">
        </div>
        <p class="text-blue-500 font-semibold mb-5">Bill To</p>
        <div class="mb-5">
            <p class="text-slate-500 text-sm mb-3 "
                :class="!checkInfo.checkToName ? 'dark:text-red-700' : 'dark:text-white'">
                Client's
                Name</p>
            <input v-model="state.toName" class="w-full h-12 rounded-md border-slate-300 dark:bg-secondary  pl-5 border "
                :class="!checkInfo.checkToName ? 'dark:border-sm dark:border-red-700' : 'border-slate-300 dark:border-0'"
                type="text">
            <div v-if="!checkInfo.checkToName" class="text-[10px] text-red-700">can't be empty</div>
        </div>
        <div class="mb-5">
            <p class="text-slate-500 text-sm mb-3"
                :class="!checkInfo.checkToEmail ? 'dark:text-red-700' : 'dark:text-white'">
                Client's Email</p>
            <input v-model="state.toEmail" class="w-full h-12 rounded-md border-slate-300 dark:bg-secondary  pl-5 border "
                :class="!checkInfo.checkToEmail ? 'dark:border-sm dark:border-red-700' : 'border-slate-300 dark:border-0'"
                type="text">
            <div v-if="!checkInfo.checkToEmail" class="text-[10px] text-red-700">can't be empty</div>
        </div>
        <div class="mb-5">
            <p class="text-slate-500 text-sm mb-3"
                :class="!checkInfo.checkToAddress ? 'dark:text-red-700' : 'dark:text-white'">
                Street Address</p>
            <input v-model="state.toAddress" class="w-full h-12 rounded-md border-slate-300 dark:bg-secondary  pl-5 border"
                :class="!checkInfo.checkToAddress ? 'dark:border-sm dark:border-red-700' : 'border-slate-300 dark:border-0'"
                type="text">
            <div v-if="!checkInfo.checkToAddress" class="text-[10px] text-red-700">can't be empty</div>
        </div>
        <div class="mb-5 flex">
            <div>
                <p class="text-slate-500 text-sm mb-3"
                    :class="!checkInfo.checkToCity ? 'dark:text-red-700' : 'dark:text-white'">City</p>
                <input v-model="state.toCity" type="text"
                    class="w-full h-12 border-slate-300 dark:bg-secondary  pl-5 border rounded-md"
                    :class="!checkInfo.checkToCity ? 'dark:border-sm dark:border-red-700' : 'border-slate-300 dark:border-0'">
                <div v-if="!checkInfo.checkToCity" class="text-[10px] text-red-700">can't be empty</div>
            </div>
            <div class="ml-10">
                <p class="text-slate-500 text-sm mb-3"
                    :class="!checkInfo.checkToPostCode ? 'dark:text-red-700' : 'dark:text-white'">Post Code</p>
                <input v-model="state.toPostCode" type="number"
                    class="w-full h-12 border-slate-300 dark:bg-secondary  pl-5 border rounded-md"
                    :class="!checkInfo.checkToPostCode ? 'dark:border-sm dark:border-red-700' : 'border-slate-300 dark:border-0'">
                <div v-if="!checkInfo.checkToPostCode" class="text-[10px] text-red-700">can't be empty</div>
            </div>
        </div>
        <div class="mb-5">
            <div class="flex justify-between">
                <p class="text-slate-500 mb-3 "
                    :class="!checkInfo.checkToCountry ? 'dark:text-red-700' : 'dark:text-white'">
                    Country
                </p>
                <div v-if="!checkInfo.checkToCountry" class="text-[10px] text-red-700 flex items-center">can't be empty
                </div>
            </div>
            <input v-model="state.toCountry" class="w-full h-12 rounded-md  dark:bg-secondary  pl-5 border" type="text"
                :class="!checkInfo.checkToCountry ? 'dark:border-sm dark:border-red-700' : 'border-slate-300 dark:border-0'">
        </div>
        <div class="mb-5">
            <p class="text-slate-500 text-sm mb-3">Invoice Date</p>
            <input type="date" class="w-full h-12 rounded-md border-slate-300 dark:bg-secondary  pl-5 border"
                v-model="state.selectedDate" />
        </div>
        <div class="mb-5">
            <p class="text-slate-500 text-sm mb-3"
                :class="!checkInfo.checkToPaymentTerms ? 'dark:text-red-700' : 'dark:text-white'">Payment Terms</p>
            <button @click="viewPaymentTerms()"
                class="w-full h-12 rounded-md border-slate-300 dark:bg-secondary flex justify-between items-center px-5 border dark:border-0">
                <p>Net {{ state.paymentTerms }} Days</p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
            </button>
            <div v-if="onPaymentTerms" class="absolute dark:bg-secondary  drop-shadow-lg mt-3 rounded-lg w-52">
                <p @click="changePaymentTerms(2)" class="my-3 mx-6 font-medium">Net 2 days</p>
                <div class="w-full h-px bg-slate-800"></div>
                <p @click="changePaymentTerms(7)" class="my-3 mx-6 font-medium">Net 7 days</p>
                <div class="w-full h-px bg-slate-800"></div>
                <p @click="changePaymentTerms(14)" class="my-3 mx-6 font-medium">Net 14 days</p>
                <div class="w-full h-px bg-slate-800"></div>
                <p @click="changePaymentTerms(30)" class="my-3 mx-6 font-medium">Net 30 days</p>
                <div class="w-full h-px bg-slate-800"></div>
            </div>
        </div>
        <div class="mb-5">
            <p class="text-slate-500 text-sm mb-3"
                :class="!checkInfo.checkToProject ? 'dark:text-red-700' : 'dark:text-white'">
                Project Description</p>
            <input v-model="state.toProject" class="w-full h-12 rounded-md border-slate-300 dark:bg-secondary  border pl-5"
                :class="!checkInfo.checkToProject ? 'dark:border-sm dark:border-red-700' : 'border-slate-300 dark:border-0'"
                placeholder="e.g. Graphic Design Service" type="text">
            <div v-if="!checkInfo.checkToProject" class="text-[10px] text-red-700">can't be empty</div>
        </div>

        <p class="dark:text-slate-400 font-bold text-2xl mb-5">Item list</p>
        <div v-for="(item, index) in items" :key="index">
            <CreateItem @deleteItem="removeItem(index)" @changeItem="changeValueItem" :itemIndex="index" />
        </div>
        <div @click="addItem"
            class="flex rounded-3xl py-2 dark:bg-secondary flex-col justify-center items-center font-bold text-sm mt-4">
            <p>+ Add</p>
            <p>Item</p>
        </div>
    </div>
    <div
        class="p-5 drop-shadow-2xl relative bg-white dark:bg-secondary w-full dark:text-white flex justify-center text-xs font-semibold">
        <router-link to="/">
            <button class="p-3 rounded-full bg-cuarto text-slate-400 dark:text-white">Discard</button>
        </router-link>
        <button @click="checkInput()" class="p-3 rounded-full bg-terceary mx-3 text-slate-400 dark:text-white">Save as
            Draft
        </button>
        <button @click="checkInput()" class="p-3 rounded-full bg-blue-500 text-white ">
            Save & Send
        </button>
    </div>
</template>