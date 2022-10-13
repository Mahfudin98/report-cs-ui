<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import produk from "../assets/produk.jpeg";
</script>
<template>
  <main>
    <div class="w-full flex py-3 px-4">
      <h2 class="flex-none font-poppins font-semibold text-xl text-slate-800">
        Produk
      </h2>
    </div>

    <div class="w-full grid grid-cols-12 gap-5 mt-5 px-4">
      <div class="col-span-12">
        <div class="lg:flex">
          <div class="relative">
            <input
              type="text"
              class="form-control py-3 px-4 w-full lg:w-64 box pr-10"
              placeholder="Search item..."
            />
            <i
              class="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0 text-slate-500"
              data-feather="search"
            ></i>
          </div>
          <select
            class="form-select py-3 px-4 box w-full lg:w-auto mt-3 lg:mt-0 ml-auto"
          >
            <option>Sort By</option>
            <option>A to Z</option>
            <option>Z to A</option>
            <option>Lowest Price</option>
            <option>Highest Price</option>
          </select>
        </div>
        <!-- category -->
        <div class="grid grid-cols-12 gap-5 mt-5">
          <div
            v-for="(item, index) in 6"
            :key="index"
            class="col-span-12 sm:col-span-4 2xl:col-span-3 box p-5 cursor-pointer hover:scale-105 bg-white rounded-lg shadow-lg shadow-black/10"
          >
            <div class="font-medium text-base">Acne</div>
            <div class="text-slate-500">5 Items</div>
          </div>
        </div>
        <!-- list Produk -->
        <div class="grid grid-cols-12 gap-5 mt-5 pt-5 mb-8 border-t">
          <a
            v-for="(item, index) in 9"
            :key="index"
            href="javascript:;"
            class="block col-span-12 sm:col-span-4 2xl:col-span-3"
          >
            <div
              class="box-border border-slate-700 bg-white rounded-md p-3 relative hover:scale-105 shadow-md shadow-black/10"
            >
              <div
                class="flex-none relative block before:block before:w-full before:pt-[100%]"
              >
                <div class="absolute top-0 left-0 w-full h-full image-fit">
                  <img
                    alt="Rubick Tailwind HTML Admin Template"
                    class="rounded-md"
                    :src="produk"
                  />
                </div>
              </div>
              <div class="block font-medium text-center truncate mt-3">
                Acne Series
              </div>
            </div>
          </a>
        </div>
        <!-- pagination -->
        <div
          class="col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center"
        >
          <nav class="w-full sm:w-auto sm:mr-auto">
            <ul class="inline-flex -space-x-px">
              <li>
                <a href="" class="py-2 px-3 ml-0 leading-tight text-gray-500">
                  <i class="fa-solid fa-angles-left"></i>
                </a>
              </li>
              <li>
                <a href="" class="py-2 px-3 ml-0 leading-tight text-gray-500">
                  <i class="fa-solid fa-angle-left"></i>
                </a>
              </li>

              <li>
                <a
                  href=""
                  class="py-2 px-3 ml-0 leading-tight text-gray-500"
                  v-for="n in 10"
                  :key="n"
                >
                  {{ n }}
                </a>
              </li>

              <li>
                <a href="" class="py-2 px-3 ml-0 leading-tight text-gray-500">
                  <i class="fa-solid fa-angle-right"></i>
                </a>
              </li>
              <li>
                <a href="" class="py-2 px-3 ml-0 leading-tight text-gray-500">
                  <i class="fa-solid fa-angles-right"></i>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </main>
</template>
