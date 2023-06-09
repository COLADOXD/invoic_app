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
    expiredInvoice: string,
    stateInvoice: string,
}


export const useStore = defineStore({
    id:"store",
    state: () => ({
        isDark: true,
        invoices: [] as Invoice[],
        invoicesFiltered: [] as Invoice[],
        filters: [] as string[],
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
                selectedDate: '15 Aug 2021',
                paymentTerms: 10,
                expiredInvoice: '25 Aug 2021',
                stateInvoice: 'Paid'
            })
        }
    },
    persist: true,
})