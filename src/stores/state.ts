import { defineStore } from "pinia";

export const useStore = defineStore({
    id:"store",
    state: () => ({
        nameProyect:"invoic_app",
        isDark: false,
        invoic: {
            fromAdrees: '',
    fromCity: '',
    fromPostCode: 0,    
        }
    }),
    persist: true,
})