import { defineStore } from "pinia";

export const useStore = defineStore({
    id:"store",
    state: () => ({
        nameProyect:"invoic_app"
    }),
    persist: true,
})