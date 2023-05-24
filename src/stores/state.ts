import { defineStore } from "pinia";

export interface Items {
    qty: number;
    price: number;
    totalPrice: number;
}

export interface Invoice {
    // codeInvoic: string;
    fromAdrees: string, // address
    fromCity: string,
    fromPostCode: number | undefined,
    toName: string,
    toEmail: string,
    toAddress: string,
    toCity: string,
    toPostCode: number | undefined,
    toPaymentTerms: string,
    toProyect: string, // project
    items: Items[],
    // selectedDate: string,
}


export const useStore = defineStore({
    id:"store",
    state: () => ({
        nameProyect:"invoic_app",
        isDark: false,
        invoices: [] as Invoice[]
    }),
    actions: {
        
        getInvoices(){
            if(this.invoices.length == 0)
            this.invoices.push({
                // codeInvoic: 'RT3080',
                fromAdrees: 'centro',
                fromCity: 'logrono',
                fromPostCode: 1000,
                toName: 'mateo',
                toEmail: 'xdmateo',
                toAddress: 'under',
                toCity: 'cuenca',
                toPostCode: 2000,
                toPaymentTerms: '1 dia',
                toProyect: 'probar',
                items: [{
                    qty: 2, 
                    price: 10, 
                    totalPrice: 20}]
            })
        }
    },
    persist: true,
})