<script setup lang="ts" >
import GoBackComponent from '@/components/GoBackComponent.vue';
import CreateItem from '../components/CreateItem.vue';
import { reactive, ref, defineEmits, defineProps } from 'vue';
import { addDays, format } from 'date-fns';


const props = defineProps({
    invoice: {
        type: Object,
        required: true
    }
})

const invoice = ref(props.invoice)

const emits = defineEmits(['viewEdit'])

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

const transformerDate = () => {
    const month: { [key: string]: string } = {
        "Jan": "01",
        "Feb": "02",
        "Mar": "03",
        "Apr": "04",
        "May": "05",
        "Jun": "06",
        "Jul": "07",
        "Aug": "08",
        "Sep": "09",
        "Oct": "10",
        "Nov": "11",
        "Dec": "12"
    };

    const parts = invoice.value.selectedDate.split(" ");
    const dia = parts[0];
    const mes = month[parts[1]];
    const año = parts[2];
    return `${año}-${mes}-${dia}`;
};



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

const payInvoice = () => {
    const date = new Date(state.selectedDate);
    const dateUpdate = addDays(date, invoice.value.paymentTerms);
    console.log(`date payInvoice ${dateUpdate}`)
    const año = dateUpdate.getFullYear();
    const mes = getMonthName((dateUpdate.getMonth() + 1).toString());
    const dia = dateUpdate.getDate().toString().padStart(2, '0');
    console.log(`EDIT formattedDate ${dia} ${mes} ${año}`)
    return ` ${dia} ${mes} ${año}`;
}

const state = reactive({
    invoice: invoice,
    selectedDate: transformerDate()
});

const checkInput = () => {
    if (state.invoice.fromAddress === '') checkInfo.checkFromAddress = false
    else { checkInfo.checkFromAddress = true }
    if (state.invoice.fromCity === '') checkInfo.checkFromCity = false
    else { checkInfo.checkFromCity = true }
    if (state.invoice.fromPostCode === undefined) checkInfo.checkFromPostCode = false
    else { checkInfo.checkFromPostCode = true }
    if (state.invoice.fromCountry === '') checkInfo.checkFromCountry = false
    else { checkInfo.checkFromCountry = true }
    if (state.invoice.toName === '') checkInfo.checkToName = false
    else { checkInfo.checkToName = true }
    if (state.invoice.toEmail === '' && state.invoice.toEmail.includes('@', '.com')) checkInfo.checkToEmail = false
    else { checkInfo.checkToEmail = true }
    if (state.invoice.toAddress === '') checkInfo.checkToAddress = false
    else { checkInfo.checkToAddress = true }
    if (state.invoice.toCity === '') checkInfo.checkToCity = false
    else { checkInfo.checkToCity = true }
    if (state.invoice.toPostCode === undefined) checkInfo.checkToPostCode = false
    else { checkInfo.checkToPostCode = true }
    if (state.invoice.toCountry === '') checkInfo.checkToCountry = false
    else { checkInfo.checkToCountry = true }
    if (state.invoice.toProject === '') checkInfo.checkToProject = false
    else { checkInfo.checkToProject = true }
    if (checkInfo.checkSelectedDate, checkInfo.checkFromAddress, checkInfo.checkFromCity, checkInfo.checkFromPostCode, checkInfo.checkToName, checkInfo.checkToEmail, checkInfo.checkToAddress, checkInfo.checkToCity, checkInfo.checkToPostCode, checkInfo.checkToPaymentTerms, checkInfo.checkToProject === true) {
        closeEdit()
        invoice.value.fromAddress = state.invoice.fromAddress
        invoice.value.fromCity = state.invoice.fromCity
        invoice.value.fromPostCode = state.invoice.fromPostCode
        invoice.value.fromCountry = state.invoice.fromCountry
        invoice.value.toName = state.invoice.toName
        invoice.value.toEmail = state.invoice.toEmail
        invoice.value.toAddress = state.invoice.toAddress
        invoice.value.toCity = state.invoice.toCity
        invoice.value.toPostCode = state.invoice.toPostCode
        invoice.value.toCountry = state.invoice.toCountry
        invoice.value.toProject = state.invoice.toProject
        invoice.value.items = state.invoice.items
        invoice.value.selectedDate = format(addDays(new Date(state.selectedDate), 1), 'dd MMM yyyy')
        invoice.value.paymentTerms = state.invoice.paymentTerms
        invoice.value.expiredInvoice = format(addDays(new Date(state.selectedDate), state.invoice.paymentTerms), 'dd MMM yyyy')

    }
}

const closeEdit = () => {
    emits("viewEdit", false)
}

const onPaymentTerms = ref(false);

const changePaymentTerms = (days: number) => {
    state.invoice.paymentTerms = days
    onPaymentTerms.value = !onPaymentTerms.value
}

const viewPaymentTerms = () => {
    onPaymentTerms.value = !onPaymentTerms.value
}

const removeItem = (index: number) => {
    state.invoice.items.splice(index, 1)
}

const addItem = () => {
    state.invoice.items.push({
        nameItem: '',
        qtyItem: 1,
        priceItem: 0,
        totalPriceItem: 0
    })
}

const changeValueItem = (index: number, price: number, qty: number, name: string) => {
    state.invoice.items[index].nameItem = name
    state.invoice.items[index].qtyItem = qty
    state.invoice.items[index].priceItem = price
    state.invoice.items[index].totalPriceItem = qty * price
}
</script>

<template>
    <div class="pb-20 p-5 bg-quinto dark:bg-primary dark:text-white">
        <div class="mt-16"></div>
        <GoBackComponent @click="closeEdit()" />
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
            <input v-model="state.invoice.fromAddress" class="w-full h-12 rounded-md  dark:bg-secondary  pl-5 border"
                type="text"
                :class="!checkInfo.checkFromAddress ? 'dark:border-sm dark:border-red-700' : 'border-slate-300 dark:border-0'">
        </div>
        <div class="mb-5 flex">
            <div>
                <p class="text-slate-500 text-sm mb-3"
                    :class="!checkInfo.checkFromCity ? 'dark:text-red-700' : 'dark:text-white'">City</p>
                <input v-model="state.invoice.fromCity" type="text"
                    class="w-full h-12 border-slate-300 dark:bg-secondary  pl-5 border rounded-md"
                    :class="!checkInfo.checkFromCity ? 'dark:border-sm dark:border-red-700' : 'border-slate-300 dark:border-0'">
                <div v-if="!checkInfo.checkFromCity" class="text-[10px] text-red-700">can't be empty</div>
            </div>
            <div class="ml-10">
                <p class="text-slate-500 text-sm mb-3 "
                    :class="!checkInfo.checkFromPostCode ? 'dark:text-red-700' : 'dark:text-white'">Post Code</p>
                <input v-model="state.invoice.fromPostCode" type="number"
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
            <input v-model="state.invoice.fromCountry" class="w-full h-12 rounded-md  dark:bg-secondary  pl-5 border"
                type="text"
                :class="!checkInfo.checkFromCountry ? 'dark:border-sm dark:border-red-700' : 'border-slate-300 dark:border-0'">
        </div>
        <p class="text-blue-500 font-semibold mb-5">Bill To</p>
        <div class="mb-5">
            <p class="text-slate-500 text-sm mb-3 "
                :class="!checkInfo.checkToName ? 'dark:text-red-700' : 'dark:text-white'">
                Client's
                Name</p>
            <input v-model="state.invoice.toName"
                class="w-full h-12 rounded-md border-slate-300 dark:bg-secondary  pl-5 border "
                :class="!checkInfo.checkToName ? 'dark:border-sm dark:border-red-700' : 'border-slate-300 dark:border-0'"
                type="text">
            <div v-if="!checkInfo.checkToName" class="text-[10px] text-red-700">can't be empty</div>
        </div>
        <div class="mb-5">
            <p class="text-slate-500 text-sm mb-3"
                :class="!checkInfo.checkToEmail ? 'dark:text-red-700' : 'dark:text-white'">
                Client's Email</p>
            <input v-model="state.invoice.toEmail"
                class="w-full h-12 rounded-md border-slate-300 dark:bg-secondary  pl-5 border "
                :class="!checkInfo.checkToEmail ? 'dark:border-sm dark:border-red-700' : 'border-slate-300 dark:border-0'"
                type="text">
            <div v-if="!checkInfo.checkToEmail" class="text-[10px] text-red-700">can't be empty</div>
        </div>
        <div class="mb-5">
            <p class="text-slate-500 text-sm mb-3"
                :class="!checkInfo.checkToAddress ? 'dark:text-red-700' : 'dark:text-white'">
                Street Address</p>
            <input v-model="state.invoice.toAddress"
                class="w-full h-12 rounded-md border-slate-300 dark:bg-secondary  pl-5 border"
                :class="!checkInfo.checkToAddress ? 'dark:border-sm dark:border-red-700' : 'border-slate-300 dark:border-0'"
                type="text">
            <div v-if="!checkInfo.checkToAddress" class="text-[10px] text-red-700">can't be empty</div>
        </div>
        <div class="mb-5 flex">
            <div>
                <p class="text-slate-500 text-sm mb-3"
                    :class="!checkInfo.checkToCity ? 'dark:text-red-700' : 'dark:text-white'">City</p>
                <input v-model="state.invoice.toCity" type="text"
                    class="w-full h-12 border-slate-300 dark:bg-secondary  pl-5 border rounded-md"
                    :class="!checkInfo.checkToCity ? 'dark:border-sm dark:border-red-700' : 'border-slate-300 dark:border-0'">
                <div v-if="!checkInfo.checkToCity" class="text-[10px] text-red-700">can't be empty</div>
            </div>
            <div class="ml-10">
                <p class="text-slate-500 text-sm mb-3"
                    :class="!checkInfo.checkToPostCode ? 'dark:text-red-700' : 'dark:text-white'">Post Code</p>
                <input v-model="state.invoice.toPostCode" type="number"
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
            <input v-model="state.invoice.toCountry" class="w-full h-12 rounded-md  dark:bg-secondary  pl-5 border"
                type="text"
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
                <p>Net {{ state.invoice.paymentTerms }} Days</p>
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
            <input v-model="state.invoice.toProject"
                class="w-full h-12 rounded-md border-slate-300 dark:bg-secondary  border pl-5"
                :class="!checkInfo.checkToProject ? 'dark:border-sm dark:border-red-700' : 'border-slate-300 dark:border-0'"
                placeholder="e.g. Graphic Design Service" type="text">
            <div v-if="!checkInfo.checkToProject" class="text-[10px] text-red-700">can't be empty</div>
        </div>

        <p class="dark:text-slate-400 font-bold text-2xl mb-5">Item list</p>
        <div v-for="(item, index) in state.invoice.items" :key="index">
            <CreateItem @deleteItem="removeItem(index)" @changeItem="changeValueItem" :item="item" :itemIndex="index" />
        </div>
        <div @click="addItem"
            class="flex rounded-3xl py-2 dark:bg-secondary flex-col justify-center items-center font-bold text-sm mt-4">
            <p>+ Add</p>
            <p>Item</p>
        </div>
    </div>
    <div
        class="bg-white dark:bg-secondary pr-5 text-sm flex justify-end items-center dark:text-white border-slate-300 border-t dark:border-0 fixed bottom-0 w-full h-[70px]">

        <button @click="closeEdit()" class="bg-slate-200 m-4 dark:bg-cuarto p-2 text-xs rounded-3xl font-semibold">
            Cancel
        </button>
        <button @click="checkInput()" class="p-2 text-xs rounded-3xl font-semibold bg-blue-500 text-white ">
            Save Changes
        </button>
    </div>
</template>