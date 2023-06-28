<script setup>
import moment from "moment";
import LineOmset from "./MenuChart/LineOmset.vue";
import LineProduct from "./MenuChart/LineProduct.vue";
import _ from "lodash";
import PieOmset from "./MenuChart/PieOmset.vue";
import PieProduct from "./MenuChart/PieProduct.vue";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
</script>
<template>
  <section class="w-full px-4 mb-3">
    <div class="flex gap-2 mb-3 w-fit">
      <button
        type="button"
        class="items-center justify-center flex-none block w-full px-4 py-2 space-x-2 font-medium leading-6 text-blue-400 transition duration-300 ease-out border border-blue-200 rounded-lg font-poppins lg:w-fit bg-blue-50 hover:text-blue-900 sm:px-6 sm:space-x-4 focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-300 focus:outline-none"
      >
        <i class="fa-solid fa-filter"></i>
        Filter
      </button>
      <select
        v-model="filter.year"
        class="bg-gray-50 border w-full pr-10 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option v-for="(y, i) in years" :key="i" :value="y">
          {{ y }}
        </option>
      </select>
      <select
        v-model="filter.month"
        class="bg-gray-50 border w-fit border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="01">Januari</option>
        <option value="02">Februari</option>
        <option value="03">Maret</option>
        <option value="04">April</option>
        <option value="05">Mei</option>
        <option value="06">Juni</option>
        <option value="07">Juli</option>
        <option value="08">Agustus</option>
        <option value="09">September</option>
        <option value="10">Oktober</option>
        <option value="11">November</option>
        <option value="12">Desember</option>
      </select>
    </div>
    <div class="grid grid-cols-12 gap-6">
      <div class="col-span-8">
        <div class="p-4 bg-white shadow-md rounded-xl">
          <TabGroup>
            <TabList
              as="div"
              class="flex items-center justify-between pb-3 mb-3 border-b-2 border-gray-400"
            >
              <h2 class="text-lg font-semibold text-gray-800 font-poppins">
                Grafik
              </h2>
              <div class="flex p-1 space-x-1 w-fit">
                <Tab
                  as="template"
                  v-for="item in Object.keys(categoryLines)"
                  :key="item"
                  v-slot="{ selected }"
                >
                  <button
                    :class="[
                      'w-full rounded-lg py-2.5 px-4 text-sm font-medium leading-5',
                      'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                      selected
                        ? 'bg-red-400 shadow text-gray-100'
                        : 'text-gray-500 hover:bg-white/[0.12] hover:text-gray-400',
                    ]"
                  >
                    {{ item }}
                  </button>
                </Tab>
              </div>
            </TabList>
            <TabPanels>
              <TabPanel
                v-for="item in Object.values(categoryLines)"
                :key="item"
                class="w-full h-[350px]"
              >
                <LineOmset v-if="item == 'Omset'" :month="month" :year="year" />
                <LineProduct
                  v-if="item == 'Produk'"
                  :month="month"
                  :year="year"
                />
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </div>
      </div>
      <div class="col-span-4">
        <div class="p-4 bg-white shadow-md rounded-xl">
          <TabGroup>
            <TabList
              as="div"
              class="flex items-center justify-between pb-3 mb-3 border-b-2 border-gray-400"
            >
              <h2 class="text-lg font-semibold text-gray-800 font-poppins">
                Pie Grafik
              </h2>
              <div class="flex p-1 space-x-1 w-fit">
                <Tab
                  as="template"
                  v-for="item in Object.keys(categoryDonat)"
                  :key="item"
                  v-slot="{ selected }"
                >
                  <button
                    :class="[
                      'w-full rounded-lg py-2.5 px-4 text-sm font-medium leading-5',
                      'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                      selected
                        ? 'bg-red-400 shadow text-gray-100'
                        : 'text-gray-500 hover:bg-white/[0.12] hover:text-gray-400',
                    ]"
                  >
                    {{ item }}
                  </button>
                </Tab>
              </div>
            </TabList>
            <TabPanels>
              <TabPanel
                v-for="item in Object.values(categoryDonat)"
                :key="item"
                class="w-full h-[350px]"
              >
                <PieOmset v-if="item == 'Omset'" :year="year" :month="month" />
                <PieProduct
                  v-if="item == 'Produk'"
                  :year="year"
                  :month="month"
                />
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  created() {},
  data() {
    return {
      categoryLines: {
        Omset: "Omset",
        Produk: "Produk",
      },
      categoryDonat: {
        Omset: "Omset",
        Produk: "Produk",
      },
      filter: {
        month: moment().format("MM"),
        year: moment().format("Y"),
      },
    };
  },
  computed: {
    month() {
      return this.filter.month;
    },
    year() {
      return this.filter.year;
    },
    years() {
      return _.range(2019, moment().add(1, "years").format("Y"));
    },
  },
  methods: {},
};
</script>
