<script setup lang="ts">
import GoBackComponent from '@/components/GoBackComponent.vue'
import HeaderComponent from '@/components/HeaderComponent.vue';
import { useStore } from '@/stores/state';
import { reactive, ref, computed } from 'vue';
import CreateItem from '../components/CreateItem.vue'
import { useRouter } from 'vue-router';
import { Items } from '../stores/state';

const store = useStore();
const router = useRouter();

const state = reactive({
    selectedDate: Date,
    fromAddress: '',
    fromCity: '',
    fromPostCode: undefined as number | undefined,
    toName: '',
    toEmail: '',
    toAddress: '',
    toCity: '',
    toPostCode: undefined as number | undefined,
    toPaymentTerms: '',
    toProject: '',
});

const checkInfo = reactive({
    checkSelectedDate: true,
    checkFromAddress: true,
    checkFromCity: true,
    checkFromPostCode: true,
    checkToName: true,
    checkToEmail: true,
    checkToAddress: true,
    checkToCity: true,
    checkToPostCode: true,
    checkToPaymentTerms: true,
    checkToProject: true,
})

const formattedDate = computed(() => {
    const dateString = state.selectedDate.toLocaleString()
    const dateParts = dateString.split("-");
    const year = dateParts[0];
    const month = getMonthName(dateParts[1]);
    const day = dateParts[2];

    return ` ${day} ${month} ${year}`;
});

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

const checkInput = () => {
    if (state.fromAddress === '') checkInfo.checkFromAddress = false
    else { checkInfo.checkFromAddress = true }
    if (state.fromCity === '') checkInfo.checkFromCity = false
    else { checkInfo.checkFromCity = true }
    if (state.fromPostCode === undefined) checkInfo.checkFromPostCode = false
    else { checkInfo.checkFromPostCode = true }
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
    if (state.selectedDate === Date) checkInfo.checkSelectedDate = false
    else { checkInfo.checkSelectedDate = true }
    if (state.toPaymentTerms === '') checkInfo.checkToPaymentTerms = false
    else { checkInfo.checkToPaymentTerms = true }
    if (state.toProject === '') checkInfo.checkToProject = false
    else { checkInfo.checkToProject = true }
    if (checkInfo.checkSelectedDate, checkInfo.checkFromAddress, checkInfo.checkFromCity, checkInfo.checkFromPostCode, checkInfo.checkToName, checkInfo.checkToEmail, checkInfo.checkToAddress, checkInfo.checkToCity, checkInfo.checkToPostCode, checkInfo.checkToPaymentTerms, checkInfo.checkToProject === true) {
        router.push('/');
        store.invoices.push({
            codeInvoice: codeInvoice(),
            fromAddress: state.fromAddress,
            fromCity: state.fromCity,
            fromPostCode: state.fromPostCode,
            toName: state.toName,
            toEmail: state.toEmail,
            toAddress: state.toAddress,
            toCity: state.toCity,
            toPostCode: state.toPostCode,
            toPaymentTerms: state.toPaymentTerms,
            toProject: state.toProject,
            items: items.value,
            selectedDate: formattedDate.value,
        })
        console.log(items.value)
    } else { console.log("no funciona") }
}

const items = ref<Items[]>([]);

const addItem = () => {
    items.value.push({
        qtyItem: 1,
        priceItem: 0,
        totalPriceItem: 0
    })
}

const changeValueItem = (index: number, price: number, qty: number) => {
    items.value[index].qtyItem = qty
    items.value[index].priceItem = price
    items.value[index].totalPriceItem = qty * price
}

const removeItem = (index: number) => {
    items.value.splice(index, 1)
}
</script>

<template>
    <HeaderComponent />
    <div class="p-5 bg-quinto pb-5 dark:bg-primary dark:text-white">
        <div class="mt-16"></div>
        {{ checkInfo.checkFromAddress }}
        {{ checkInfo.checkFromCity }}
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
                :class="!checkInfo.checkFromAddress ? 'dark:border-sm border-red-700' : 'border-slate-300 dark:border-0'">
        </div>
        <div class="mb-5 flex">
            <div>
                <p class="text-slate-500 text-sm mb-3"
                    :class="!checkInfo.checkFromCity ? 'dark:text-red-700' : 'dark:text-white'">City</p>
                <input v-model="state.fromCity" type="text"
                    class="w-full h-12 border-slate-300 dark:bg-secondary  pl-5 border rounded-md"
                    :class="!checkInfo.checkFromCity ? 'dark:border-sm border-red-700' : 'border-slate-300 dark:border-0'">
                <div v-if="!checkInfo.checkFromCity" class="text-[10px] text-red-700">can't be empty</div>
            </div>
            <div class="ml-10">
                <p class="text-slate-500 text-sm mb-3 "
                    :class="!checkInfo.checkFromPostCode ? 'dark:text-red-700' : 'dark:text-white'">Post Code</p>

                <input v-model="state.fromPostCode" type="number"
                    class="w-full h-12 border-slate-300 dark:bg-secondary pl-5 border rounded-md"
                    :class="!checkInfo.checkFromPostCode ? 'dark:border-sm border-red-700' : 'border-slate-300 dark:border-0'">
                <div v-if="!checkInfo.checkFromPostCode" class="text-[10px] text-red-700">can't be empty</div>
            </div>
        </div>
        <p class="text-blue-500 font-semibold mb-5">Bill To</p>
        <div class="mb-5">
            <p class="text-slate-500 text-sm mb-3 "
                :class="!checkInfo.checkToName ? 'dark:text-red-700' : 'dark:text-white'">
                Client's
                Name</p>
            <input v-model="state.toName" class="w-full h-12 rounded-md border-slate-300 dark:bg-secondary  pl-5 border "
                :class="!checkInfo.checkToName ? 'dark:border-sm border-red-700' : 'border-slate-300 dark:border-0'"
                type="text">
            <div v-if="!checkInfo.checkToName" class="text-[10px] text-red-700">can't be empty</div>
        </div>
        <div class="mb-5">
            <p class="text-slate-500 text-sm mb-3"
                :class="!checkInfo.checkToEmail ? 'dark:text-red-700' : 'dark:text-white'">
                Client's Email</p>
            <input v-model="state.toEmail" class="w-full h-12 rounded-md border-slate-300 dark:bg-secondary  pl-5 border "
                :class="!checkInfo.checkToEmail ? 'dark:border-sm border-red-700' : 'border-slate-300 dark:border-0'"
                type="text">
            <div v-if="!checkInfo.checkToEmail" class="text-[10px] text-red-700">can't be empty</div>
        </div>
        <div class="mb-5">
            <p class="text-slate-500 text-sm mb-3"
                :class="!checkInfo.checkToAddress ? 'dark:text-red-700' : 'dark:text-white'">
                Street Address</p>
            <input v-model="state.toAddress" class="w-full h-12 rounded-md border-slate-300 dark:bg-secondary  pl-5 border"
                :class="!checkInfo.checkToAddress ? 'dark:border-sm border-red-700' : 'border-slate-300 dark:border-0'"
                type="text">
            <div v-if="!checkInfo.checkToAddress" class="text-[10px] text-red-700">can't be empty</div>
        </div>
        <div class="mb-5 flex">
            <div>
                <p class="text-slate-500 text-sm mb-3"
                    :class="!checkInfo.checkToCity ? 'dark:text-red-700' : 'dark:text-white'">City</p>
                <input v-model="state.toCity" type="text"
                    class="w-full h-12 border-slate-300 dark:bg-secondary  pl-5 border rounded-md"
                    :class="!checkInfo.checkToCity ? 'dark:border-sm border-red-700' : 'border-slate-300 dark:border-0'">
                <div v-if="!checkInfo.checkToCity" class="text-[10px] text-red-700">can't be empty</div>
            </div>
            <div class="ml-10">
                <p class="text-slate-500 text-sm mb-3"
                    :class="!checkInfo.checkToPostCode ? 'dark:text-red-700' : 'dark:text-white'">Post Code</p>
                <input v-model="state.toPostCode" type="number"
                    class="w-full h-12 border-slate-300 dark:bg-secondary  pl-5 border rounded-md"
                    :class="!checkInfo.checkToPostCode ? 'dark:border-sm border-red-700' : 'border-slate-300 dark:border-0'">
                <div v-if="!checkInfo.checkToPostCode" class="text-[10px] text-red-700">can't be empty</div>
            </div>
        </div>
        <div class="mb-5">
            <p class="text-slate-500 text-sm mb-3"
                :class="!checkInfo.checkSelectedDate ? 'dark:text-red-700' : 'dark:text-white'">Invoice Date</p>
            <input type="date" class="w-full h-12 rounded-md border-slate-300 dark:bg-secondary  pl-5 border"
                :class="!checkInfo.checkSelectedDate ? 'dark:border-sm border-red-700' : 'border-slate-300 dark:border-0'"
                v-model="state.selectedDate" />
            <div v-if="!checkInfo.checkSelectedDate" class="text-[10px] text-red-700">can't be empty</div>
        </div>
        <div class="mb-5">
            <p class="text-slate-500 text-sm mb-3"
                :class="!checkInfo.checkToPaymentTerms ? 'dark:text-red-700' : 'dark:text-white'">Payment Terms</p>
            <input v-model="state.toPaymentTerms"
                class="w-full h-12 rounded-md border-slate-300 dark:bg-secondary  pl-5 border "
                :class="!checkInfo.checkToPaymentTerms ? 'dark:border-sm border-red-700' : 'border-slate-300 dark:border-0'"
                type="text">
            <div v-if="!checkInfo.checkToPaymentTerms" class="text-[10px] text-red-700">can't be empty</div>
        </div>
        <div class="mb-5">
            <p class="text-slate-500 text-sm mb-3"
                :class="!checkInfo.checkToProject ? 'dark:text-red-700' : 'dark:text-white'">
                Project Description</p>
            <input v-model="state.toProject" class="w-full h-12 rounded-md border-slate-300 dark:bg-secondary  border pl-5"
                :class="!checkInfo.checkToProject ? 'dark:border-sm border-red-700' : 'border-slate-300 dark:border-0'"
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