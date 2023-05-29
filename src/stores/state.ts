import { defineStore } from "pinia";

export interface Items {
    qty: number;
    price: number;
    totalPrice: number;
}

export interface Invoice {
    codeInvoice: string;
    fromAddress: string, 
    fromCity: string,
    fromPostCode: number | undefined,
    toName: string,
    toEmail: string,
    toAddress: string,
    toCity: string,
    toPostCode: number | undefined,
    toPaymentTerms: string,
    toProject: string,
    items: Items[],
    selectedDate: string,
}


export const useStore = defineStore({
    id:"store",
    state: () => ({
        nameProject:"invoic_app",
        isDark: false,
        invoices: [] as Invoice[]
    }),
    actions: {
        
        getInvoices(){
            if(this.invoices.length == 0)
            this.invoices.push({
                codeInvoice: 'RT3080',
                fromAddress: 'centro',
                fromCity: 'logrono',
                fromPostCode: 1000,
                toName: 'mateo',
                toEmail: 'xdmateo',
                toAddress: 'under',
                toCity: 'cuenca',
                toPostCode: 2000,
                toPaymentTerms: '1 dia',
                toProject: 'probar',
                items: [{
                    qty: 2, 
                    price: 10, 
                    totalPrice: 20}],
                selectedDate: 'Due 19 Aug 2021'
            })
        }
    },
    persist: true,
})