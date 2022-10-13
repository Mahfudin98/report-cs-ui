<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import logo from "../../../assets/logo.png";
</script>
<template>
  <main>
    <div class="w-full flex py-3 px-4">
      <h2 class="flex-none font-poppins font-semibold text-xl text-slate-800">
        Member Data
      </h2>
    </div>

    <!-- content -->
    <div class="w-full grid grid-cols-12 gap-6 mt-5 px-4">
      <div
        class="col-span-12 flex flex-wrap justify-between sm:flex-nowrap items-center mt-2"
      >
        <router-link
          to="/member-form"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Add Member
        </router-link>
        <form class="flex items-center">
          <label for="simple-search" class="sr-only">Search</label>
          <div class="relative w-full">
            <div
              class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
            >
              <svg
                aria-hidden="true"
                class="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="simple-search"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search"
              required
            />
          </div>
          <button
            type="submit"
            class="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
            <span class="sr-only">Search</span>
          </button>
        </form>
      </div>

      <!-- list member -->
      <div class="col-span-12 gap-3 md:col-span-6" v-for="n in 20" :key="n">
        <div
          class="box-border bg-white rounded-lg shadow-sm shadow-black/40 hover:scale-105"
        >
          <div class="flex flex-col lg:flex-row items-center p-5">
            <div class="w-24 h-24 lg:w-12 lg:h-12 image-fit lg:mr-1">
              <img :src="logo" class="rounded-full" alt="" />
            </div>
            <div
              class="lg:ml-2 lg:mr-auto text-center lg:text-left mt-3 lg:mt-0"
            >
              <a href="" class="font-medium">Robert De Niro</a>
              <div class="text-slate-500 text-xs mt-0.5">DevOps Engineer</div>
            </div>
            <div class="flex mt-4 lg:mt-0">
              <button
                type="button"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm py-1 px-2 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Message
              </button>
              <button
                type="button"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm py-1 px-2 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Profile
              </button>
            </div>
          </div>
        </div>
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
  </main>
</template>
