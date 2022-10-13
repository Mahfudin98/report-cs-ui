<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <main>
    <div class="w-full flex justify-between py-3 px-4">
      <h2 class="font-poppins font-semibold text-xl text-slate-800">
        Dashboard
      </h2>
      <a href="" class="flex gap-2 self-center text-theme-primary">
        <i class="fa-solid fa-rotate w-5 h-5"></i>
        <p class="font-poppins text-sm">Reload Data</p>
      </a>
    </div>

    <!-- content -->
    <div class="w-full grid grid-cols-12 gap-6 px-4">
      <div class="col-span-12 2xl:col-span-9">
        <!-- card status layout -->
        <div class="grid grid-cols-12 gap-6 pt-5">
          <!-- card status -->
          <div class="col-span-12 sm:col-span-6 xl:col-span-3" v-for="n in 4" :key="n">
            <div
              class="grid grid-cols-1 gap-3 bg-white rounded-lg shadow-md shadow-black/10 hover:shadow-lg hover:scale-105 px-5 py-5"
            >
              <div class="flex justify-between">
                <i class="fa-solid fa-cart-plus w-8 h-8"></i>
                <div class="flex gap-2 bg-theme-success rounded-xl py-1 px-3 text-base">
                  {{n}}0%
                  <i class="fa-solid fa-caret-up"></i>
                </div>
              </div>
              <h2 class="font-bold text-2xl">Rp. {{ n }}.500.000</h2>
              <h3 class="font-normal text-base text-slate-500">
                Omset Bulanan
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
