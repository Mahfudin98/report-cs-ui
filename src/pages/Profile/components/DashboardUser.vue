<template>
  <div class="grid grid-cols-12 gap-6 mt-5">
    <div
      class="block bg-white shadow-md shadow-black/40 rounded-md col-span-12 lg:col-span-6"
    >
      <div
        class="flex items-center px-5 py-5 sm:py-3 border-b border-slate-200/60 dark:border-darkmode-400"
      >
        <h2 class="font-medium text-base mr-auto">Latest Activity</h2>
        <form class="sm:flex items-center">
          <label for="simple-search" class="sr-only">Search</label>
          <div class="relative w-full">
            <div
              class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
            >
              <i
                class="fa-solid fa-calendar-days w-5 h-5 text-gray-500 dark:text-gray-400"
              ></i>
            </div>
            <input
              type="date"
              id="simple-search"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search"
              required
            />
          </div>
        </form>
      </div>

      <div
        class="p-5 pb-0 hover:scrollbar-thin hover:scrollbar-thumb-blue-700 hover:scrollbar-track-blue-300 h-[300px] hover:overflow-y-scroll"
      >
        <ol class="relative border-l border-gray-200 dark:border-gray-700">
          <li class="mb-10 ml-6" v-for="n in 100" :key="n">
            <span
              class="flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900"
            >
              <i
                class="fa-solid fa-calendar-days w-3 h-3 text-blue-600 dark:text-blue-400"
              ></i>
            </span>
            <h3
              class="flex items-center mb-1 text-md font-semibold text-gray-900 dark:text-white"
            >
              http://127.0.0.1:8000/product-controller
            </h3>
            <time
              class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500"
              >Released on January 13th, 2022</time
            >
            <p
              class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400"
            >
              administator Edit user
            </p>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>
