<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { mapActions, mapState } from "vuex";
import ProductCard from "../components/Card/ProductCard.vue";
import SearchInputVue from "@/components/Elements/SearchInput.vue";
import LoadingScreenVue from "../components/Widget/LoadingScreen.vue";
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
            <label for="simple-search" class="sr-only">Search</label>
            <div class="relative w-full">
              <SearchInputVue v-model="data.search" />
            </div>
          </div>
          <select
            class="py-3 px-4 lg:w-auto mt-3 lg:mt-0 ml-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
          <button
            v-on:click="dataFilterKey = 'all'"
            class="col-span-12 sm:col-span-4 2xl:col-span-3 box p-2 cursor-pointer hover:scale-105 bg-white rounded-lg shadow-lg shadow-black/10"
            :class="{
              'bg-theme-primary/50': dataFilterKey == 'all',
            }"
          >
            <div class="font-medium text-base">All</div>
            <div class="text-slate-300">{{ products.length }} Items</div>
          </button>
          <button
            v-for="(item, index) in categorys"
            :key="index"
            v-on:click="dataFilterKey = item.code"
            :class="{
              'bg-theme-primary/50': dataFilterKey == item.code,
            }"
            class="col-span-12 sm:col-span-4 2xl:col-span-3 p-2 cursor-pointer hover:scale-105 bg-white rounded-lg shadow-lg shadow-black/10"
          >
            <div class="font-medium text-md">
              {{ item.category }}
              <span
                class="bg-blue-100 text-blue-800 text-xs font-normal mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800"
              >
                {{ item.type }}
              </span>
            </div>
            <div class="text-slate-300">{{ item.product }} Items</div>
          </button>
        </div>
        <!-- list Produk -->
        <div class="grid grid-cols-12 gap-5 mt-5 pt-5 mb-8 border-t">
          <LoadingScreenVue
            v-if="all == ''"
            :styles="'relative col-span-12 bg-transparent text-slate-600'"
            :text="'Sabar dulu ya teman-teman, ini lagi ngambil data dulu.'"
          />
          <ProductCard :items="dataFilter" />
        </div>
      </div>
    </div>
  </main>
</template>
<script>
export default {
  created() {
    this.getProducts();
    this.getCategoryProduct();
  },
  data() {
    return {
      data: {
        search: "",
      },
      dataFilterKey: "all",
    };
  },
  computed: {
    ...mapState("product", {
      categorys: (state) => state.categoryProduct,
      products: (state) => state.products,
    }),
    dataFilter() {
      let data =
        this.dataFilterKey == "all"
          ? this[this.dataFilterKey]
          : this.filterData;
      return data;
    },
    all() {
      return this.products;
    },
    filterData() {
      return this.products.filter((item) => {
        return item.category_code.indexOf(this.dataFilterKey) > -1;
      });
    },
    search() {
      return this.data.search;
    },
  },
  watch: {
    search() {
      this.getProducts(this.data.search);
    },
    deep: true,
  },
  methods: {
    ...mapActions("product", ["getCategoryProduct", "getProducts"]),
  },
};
</script>
