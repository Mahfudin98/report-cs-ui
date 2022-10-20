<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { mapActions, mapState } from "vuex";
import { createPopper } from "@popperjs/core";
import Pagination from "@/components/Widget/PaginationWidget.vue";
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
                v-model="search"
                type="text"
                id="simple-search"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search"
                required
              />
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
            class="col-span-12 sm:col-span-4 2xl:col-span-3 box p-5 cursor-pointer hover:scale-105 bg-white rounded-lg shadow-lg shadow-black/10"
            :class="{
              'bg-theme-primary/50': dataFilterKey == 'all',
            }"
          >
            <div class="font-medium text-base">All</div>
            <div class="text-slate-300">{{ products.total }} Items</div>
          </button>
          <button
            v-for="(item, index) in categorys"
            :key="index"
            v-on:click="dataFilterKey = item.code"
            :class="{
              'bg-theme-primary/50': dataFilterKey == item.code,
            }"
            class="col-span-12 sm:col-span-4 2xl:col-span-3 box p-5 cursor-pointer hover:scale-105 bg-white rounded-lg shadow-lg shadow-black/10"
          >
            <div class="font-medium text-base">
              {{ item.category }}
              <span
                class="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800"
              >
                {{ item.type }}
              </span>
            </div>
            <div class="text-slate-300">{{ item.product }} Items</div>
          </button>
        </div>
        <!-- list Produk -->
        <div class="grid grid-cols-12 gap-5 mt-5 pt-5 mb-8 border-t">
          <a
            v-for="(item, index) in dataFilter"
            :key="index"
            href="javascript:;"
            class="block col-span-12 sm:col-span-4 2xl:col-span-3"
          >
            <div
              class="flex-shrink-0 relative overflow-hidden bg-theme-bg-light rounded-lg max-w-xs shadow-sm shadow-black/60"
            >
              <svg
                class="absolute bottom-0 left-0 mb-8"
                viewBox="0 0 375 283"
                fill="none"
                style="transform: scale(1.5); opacity: 0.1"
              >
                <rect
                  x="159.52"
                  y="175"
                  width="152"
                  height="152"
                  rx="8"
                  transform="rotate(-45 159.52 175)"
                  fill="white"
                />
                <rect
                  y="107.48"
                  width="152"
                  height="152"
                  rx="8"
                  transform="rotate(-45 0 107.48)"
                  fill="white"
                />
              </svg>
              <div class="relative pt-4 px-4 flex items-center justify-center">
                <img class="relative rounded-md" :src="item.image" alt="" />
              </div>
              <div class="relative text-white px-6 pb-6 mt-6">
                <div class="flex justify-between">
                  <span class="block opacity-75 -mb-1">{{ item.category }}</span>
                  <span class="block opacity-75 -mb-1">Stok {{ item.stock }}</span>
                </div>
                <span class="block font-semibold text-lg">{{
                  item.nama_produk
                }}</span>
                <div
                  class="flex justify-between pt-2"
                  ref="btnRef"
                  v-on:mouseenter="toggleTooltip()"
                  v-on:mouseleave="toggleTooltip()"
                >
                  <span
                    class="block bg-white rounded-full text-theme-bg-light text-xs font-bold px-3 py-2 leading-none items-center"
                    >Rp. {{ item.harga_agen }}</span
                  >
                  <span
                    class="block bg-white rounded-full text-theme-bg-light text-xs font-bold px-3 py-2 leading-none items-center"
                    >Rp. {{ item.harga_reseller }}</span
                  >
                  <span
                    class="block bg-white rounded-full text-theme-bg-light text-xs font-bold px-3 py-2 leading-none items-center"
                    >Rp. {{ item.harga_end_user }}</span
                  >
                </div>
                <div
                  ref="tooltipRef"
                  v-bind:class="{
                    'invisible opacity-0 transition-opacity': !tooltipShow,
                    block: tooltipShow,
                  }"
                  role="tooltip"
                  class="inline-block items-center absolute top-0 right-2 left-2 z-10 py-2 text-xs font-medium text-center text-white bg-gray-900 rounded-lg shadow-sm tooltip dark:bg-gray-700"
                >
                  <div>Harga Agen | Harga Reseller | Harga Customer</div>
                  <div class="absolute right-0 left-0 text-gray-900">
                    <i class="fa-solid fa-play h-5 w-5 rotate-90"></i>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
        <!-- pagination -->
        <div
          class="col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center"
        >
          <Pagination
            :total-pages="products.last_page"
            :total="products.total"
            :per-page="products.per_page"
            :current-page="products.current_page"
            :has-more-pages="hasMorePages"
            @pagechanged="showMore"
          />
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
      tooltipShow: false,
      search: "",
      dataFilterKey: "all",
    };
  },
  computed: {
    ...mapState("product", {
      categorys: (state) => state.categoryProduct,
      products: (state) => state.products,
    }),
    page: {
      get() {
        return this.$store.state.product.page;
      },
      set(val) {
        this.$store.commit("product/SET_PAGE", val);
      },
    },
    dataFilter() {
      let data =
        this.dataFilterKey == "all"
          ? this[this.dataFilterKey]
          : this.filterData;
      return data;
    },
    all() {
      return this.products.data;
    },
    filterData() {
      return this.products.data.filter((item) => {
        return item.category_code.indexOf(this.dataFilterKey) > -1;
      });
    },
  },
  watch: {
    page() {
      this.getProducts();
    },
    search() {
      this.getProducts(this.search);
    },
  },
  methods: {
    ...mapActions("product", ["getCategoryProduct", "getProducts"]),
    toggleTooltip: function () {
      if (this.tooltipShow) {
        this.tooltipShow = false;
      } else {
        this.tooltipShow = true;
        createPopper(this.$refs.btnRef, this.$refs.tooltipRef, {
          placement: "top",
        });
      }
    },
    showMore(page) {
      this.page = page;
      this.products.current_page = page;
    },
  },
};
</script>
