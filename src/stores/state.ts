import { defineStore } from "pinia";
import { ComputedRef } from "vue";

export interface Items {
    nameItem: string;
    qtyItem: number;
    priceItem: number;
    totalPriceItem: number;
}

export interface Invoice {
    codeInvoice: string;
    fromAddress: string, 
    fromCity: string,
    fromPostCode: string,
    fromCountry: string,
    toName: string,
    toEmail: string,
    toAddress: string,
    toCity: string,
    toPostCode: string,
    toCountry: string,
    toProject: string,
    items: Items[],
    selectedDate: ComputedRef<string>,
    paymentTerms: number,
}


export const useStore = defineStore({
    id:"store",
    state: () => ({
        isDark: false,
        invoices: [] as Invoice[],
    }),
    actions: {
        
        getInvoices(){
            if(this.invoices.length == 0)
            this.invoices.push({
                codeInvoice: 'RT3080',
                fromAddress: 'centro',
                fromCity: 'logrono',
                fromPostCode: '0000',
                fromCountry: '  Ecuador',
                toName: 'mateo',
                toEmail: 'xdmateo',
                toAddress: 'cerca',
                toCity: 'cuenca',
                toPostCode: '0000',
                toCountry: 'dor',
                toProject: 'probar',
                items: [{
                    nameItem: 'primer item',
                    qtyItem: 2, 
                    priceItem: 10, 
                    totalPriceItem: 20}],
                selectedDate: '19 Aug 2021',
                paymentTerms: 10,
            })
        }
    },
    persist: true,
})