<script setup lang="ts">
</script>

<template>
  <div class="px-5 py-7 flex justify-between bg-white rounded-lg items-center mb-5">
    <div class="text-slate-400">Status</div>
    <div class="flex py-4 px-8 bg-orange-100 items-center rounded-lg h-[40px] dark:bg-slate-700">
      <div class="h-2 w-2 rounded-full bg-green-400 mr-2"></div>
      <p>Paid</p>
    </div>
  </div>
  <div class="p-5 bg-white rounded-lg">
    <p class=" font-semibold text-lg"><span class="text-blue-500">#</span>RT3080</p>
    <div class="text-slate-400 mb-7">
      <p class="mb-7">Grphic Design</p>
      <p>19 Union Terrace</p>
      <p>London</p>
      <p>El 3EZ</p>
      <p>United Kingdom</p>
    </div>
    <div class="flex mb-7 text-lg">
      <div class="w-1/2">
        <p class="text-slate-400">Invoice Date</p>
        <p class="font-bold text-xl mb-10">21 Aug 2021</p>
        <p class="text-slate-400">Payment Due</p>
        <p class="font-bold text-xl">20 Sep 2021</p>
      </div>
      <div class="text-slate-400 w-1/2">
        <p>Bill To</p>
        <p class="font-bold text-xl text-black">Alex Grim</p>
        <p>84 Church Way</p>
        <p>Bradford</p>
        <p>BD1 9PB</p>
        <p>United Kingdom</p>
      </div>
    </div>
    <div class="mb-7">
      <p class="text-slate-400">Sent to</p>
      <p class="font-bold text-xl text-black">alexgrim@mail.com</p>
    </div>
    <div class="p-5 bg-slate-200 flex justify-between items-center rounded-t-lg">
      <div>
        <p class="font-bold">Banner Design</p>
        <p class="text-blue-500 font-medium">1 x $156.00</p>
      </div>
      <div>
        <p class="font-bold text-xl">$156.00</p>
      </div>
    </div>
    <div class="flex justify-between p-5 bg-terceary text-white items-center rounded-b-lg">
      <p>Grand Total</p>
      <p class="font-bold text-3xl">$556.00</p>
    </div>
  </div>
</template>
