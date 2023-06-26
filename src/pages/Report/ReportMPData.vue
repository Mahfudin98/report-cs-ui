<script setup>
import VueTailwindDatepicker from "vue-tailwind-datepicker";
import { mapActions, mapState } from "vuex";
import ReportMPTable from "./ReportMPTable.vue";
</script>
<template>
  <main>
    <div class="w-full py-3 px-4">
      <h2 class="font-poppins font-semibold text-xl text-slate-800">
        Report Order Marketplace
      </h2>
    </div>
    <section class="w-full px-4">
      <div class="block lg:flex justify-between items-center mb-3">
        <div class="flex items-center justify-center mb-3 lg:mb-0">
          <vue-tailwind-datepicker
            v-model="filter.dateRange"
            v-slot="{ value, placeholder, clear }"
          >
            <div class="block lg:flex">
              <div class="flex-1 mb-3 lg:mb-0">
                <button
                  type="button"
                  class="block w-full bg-gray-50 text-gray-400 hover:text-gray-900 leading-6 py-2 sm:px-6 border border-gray-200 rounded-lg items-center justify-center space-x-2 sm:space-x-4 focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-300 focus:outline-none transition ease-out duration-300"
                >
                  <span class="text-gray-900">
                    {{ value || placeholder }}
                  </span>
                </button>
              </div>
              <div class="flex-shrink-0">
                <button
                  type="button"
                  class="lg:ml-4 font-poppins w-full lg:w-fit font-medium block px-4 flex-none bg-blue-50 text-blue-400 hover:text-blue-900 leading-6 py-2 sm:px-6 border border-blue-200 rounded-lg items-center justify-center space-x-2 sm:space-x-4 focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-300 focus:outline-none transition ease-out duration-300"
                  @click="clear"
                >
                  <i class="fa-solid fa-filter"></i>
                  Filter
                </button>
              </div>
            </div>
          </vue-tailwind-datepicker>
          <button
            @click="shortUp()"
            type="button"
            class="lg:ml-2 font-poppins w-full lg:w-fit font-medium block px-4 text-lg flex-none bg-blue-50 text-blue-400 hover:text-blue-900 leading-6 py-2 border border-blue-200 rounded-lg items-center justify-center space-x-2 sm:space-x-4 focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-300 focus:outline-none transition ease-out duration-300"
            :class="{ hidden: shortData }"
          >
            <i class="fa-solid fa-arrow-down-9-1"></i>
          </button>
          <button
            @click="shortDown()"
            type="button"
            class="lg:ml-2 font-poppins w-full lg:w-fit font-medium block px-4 text-lg flex-none bg-blue-50 text-blue-400 hover:text-blue-900 leading-6 py-2 border border-blue-200 rounded-lg items-center justify-center space-x-2 sm:space-x-4 focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-300 focus:outline-none transition ease-out duration-300"
            :class="{ hidden: !shortData }"
          >
            <i class="fa-solid fa-arrow-up-1-9"></i>
          </button>
        </div>
        <router-link
          :to="{ name: 'report-mp-form' }"
          class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
        >
          <span
            class="relative px-5 py-2.5 transition-all flex justify-center items-center ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
          >
            Add Order <i class="fa-solid fa-cart-plus ml-2"></i>
          </span>
        </router-link>
      </div>

      <ReportMPTable :orderData="displayedOrder" :isLoading="isLoading" />

      <div class="flex justify-end items-center">
        <nav class="mr-2">
          <ul class="inline-flex items-center -space-x-px">
            <li>
              <button
                :disabled="filter.page == 1"
                @click="filter.page--"
                type="button"
                class="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                :class="{ 'cursor-not-allowed': filter.page == 1 }"
              >
                <span class="sr-only">Previous</span>
                <i class="fa-solid fa-circle-arrow-left w-4 h-4"></i>
              </button>
            </li>
            <li v-for="(item, index) in setPages" :key="index">
              <button
                type="button"
                @click="filter.page = item"
                :class="[
                  filter.page == item
                    ? 'z-10 border border-blue-300 bg-blue-50 px-3 py-2 leading-tight text-blue-600 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
                    : 'border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white',
                ]"
              >
                {{ item }}
              </button>
            </li>
            <li>
              <button
                @click="filter.page++"
                :disabled="filter.page >= setPages"
                type="button"
                class="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                :class="{ 'cursor-not-allowed': filter.page >= setPages }"
              >
                <span class="sr-only">Next</span>
                <i class="fa-solid fa-circle-arrow-right w-4 h-4"></i>
              </button>
            </li>
          </ul>
        </nav>
        <select
          v-model="filter.pageViews"
          class="block w-fit p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>
    </section>
  </main>
</template>
<script>
export default {
  created() {
    this.getListOrderMP({
      orderBy: this.shortData ? "ASC" : "DESC",
      dateRange: "",
    }).then(() => {
      setTimeout(() => {
        this.isLoading = false;
      }, 300);
    });
  },
  data() {
    return {
      filter: {
        dateRange: [],
        pageViews: 20,
        page: 1,
      },
      options: {
        footer: {
          apply: "Terapkan",
          cancel: "Batal",
        },
      },
      shortData: true,
      isLoading: true,
    };
  },
  watch: {
    dateRange() {
      this.getListOrderMP({
        orderBy: this.shortData ? "ASC" : "DESC",
        dateRange:
          this.convert(this.filter.dateRange[0]) +
          "+-+" +
          this.convert(this.filter.dateRange[1]),
      }).then(() => {
        setTimeout(() => {
          this.isLoading = false;
        }, 300);
      });
    },
    shortDataType() {
      this.getListOrderMP({
        orderBy: this.shortData ? "ASC" : "DESC",
        dateRange:
          this.convert(this.filter.dateRange[0]) +
          "+-+" +
          this.convert(this.filter.dateRange[1]),
      }).then(() => {
        setTimeout(() => {
          this.isLoading = false;
        }, 300);
      });
    },
  },
  computed: {
    ...mapState("orderMP", {
      listOrderMP: (state) => state.listOrderMP,
    }),
    setPages() {
      var numberOfPages = Math.ceil(
        this.listOrderMP.length / this.filter.pageViews
      );
      return numberOfPages;
    },
    displayedOrder() {
      return this.paginate(this.listOrderMP);
    },
    dateRange() {
      return this.filter.dateRange;
    },
    shortDataType() {
      return this.shortData;
    },
  },
  methods: {
    ...mapActions("orderMP", ["getListOrderMP"]),
    paginate(order) {
      let page = this.filter.page;
      let perPage = this.filter.pageViews;
      let from = page * perPage - perPage;
      let to = page * perPage;
      return order.slice(from, to);
    },
    convert(str) {
      var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      return [date.getFullYear(), mnth, day].join("-");
    },
    shortUp() {
      this.shortData = true;
      this.isLoading = true;
    },
    shortDown() {
      this.shortData = false;
      this.isLoading = true;
    },
  },
};
</script>
