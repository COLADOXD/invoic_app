<script setup lang="ts">
import { ref, computed, defineEmits, defineProps } from "vue"

const emits = defineEmits(["deleteItem", "changeItem"]);
const props = defineProps({
    itemIndex: {
        type: Number,
        required: true
    },
    item: {
        type: Object,
        required: true
    }
})

const priceItem = ref(props.item.priceItem);
const qtyItem = ref(props.item.qtyItem);
const nameItem = ref(props.item.nameItem);

const priceTotal = computed(() => {
    emits("changeItem", props.itemIndex, priceItem.value, qtyItem.value, nameItem.value);
    return priceItem.value * qtyItem.value
})

const removeItem = () => {
    emits("deleteItem")
}

</script>

<template>
    <div>
        <p class="mt-5">item name</p>
        <input v-model="nameItem" type="text" class="h-12 dark:bg-secondary p-2 w-full my-4">
        <div class="grid grid-cols-4 gap-1 ">
            <div class="mr-2">
                <p>Qty.</p>
                <input v-model="qtyItem" type="number" class="h-12 dark:bg-secondary rounded-lg p-2 w-16">
            </div>
            <div class="mr-2 ">
                <p>Price</p>
                <input v-model="priceItem" type="number" class="h-12 dark:bg-secondary rounded-lg p-2 w-20">
            </div>
            <div class="mr-2 ml-4">
                <p>Total</p>
                <p class="mt-3 text-slate-400">${{ priceTotal }}</p>
            </div>
            <div @click="removeItem" class="flex items-center justify-end">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
            </div>
        </div>
    </div>
</template>