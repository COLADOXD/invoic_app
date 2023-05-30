<script setup lang="ts">
import { ref, onMounted } from 'vue';
const isMobile = ref<boolean>(false);

const handleMediaQuery = (event: object) => {
    isMobile.value = event.matches;
};

onMounted(() => {
    const mediaQuery = window.matchMedia('(min-width: 340px)');
    handleMediaQuery(mediaQuery);
    mediaQuery.addEventListener('change', handleMediaQuery);
});
</script>

<template>
    <router-link to="/invoice">
        <div class="bg-blue-500 pr-1 py-1 pl-1 rounded-3xl flex items-center">
            <div class="bg-white p-3 rounded-full">
                <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.313 10.023v-3.71h3.71v-2.58h-3.71V.023h-2.58v3.71H.023v2.58h3.71v3.71z" fill="#7C5DFA"
                        fill-rule="nonzero" />
                </svg>
            </div>
            <div v-if="isMobile" class="text-white ml-2 mr-2">New</div>
        </div>
    </router-link>
</template>