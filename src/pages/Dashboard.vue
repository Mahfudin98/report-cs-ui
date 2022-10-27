<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import StatusCard from "../components/Card/StatusCard.vue";
import _ from "lodash";
import moment from "moment";
import LineChart from "../components/Chart/LineChart.vue";
import DonutChart from "../components/Chart/DonutChart.vue";
import PieChart from "../components/Chart/PieChart.vue";
import DateRangeLayout from "../components/Widget/DateRange/DaterangeLayout.vue";
import TableRangeCS from "../components/Table/TableRangeCS.vue";
import { mapActions, mapState } from "vuex";
</script>
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
    <div class="w-full grid grid-cols-12 gap-6 px-4 pt-1">
      <div class="col-span-12 2xl:col-span-9">
        <div class="grid grid-cols-12 gap-6">
          <!-- BEGIN: General Report -->
          <div class="col-span-12">
            <div class="grid grid-cols-12 gap-6">
              <StatusCard
                :title="'Omset Hari Ini'"
                :data="currency(cardStatus.today_omset)"
              >
                <template #icon>
                  <svg
                    class="w-7 h-7 text-theme-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    ></path>
                  </svg>
                </template>
                <template #persen>
                  <div
                    class="px-2 py-0.5 rounded-xl text-white font-normal text-xs"
                    :class="{
                      'bg-green-500':
                        cardStatus.today_omset >= cardStatus.yesterday_omset,
                      'bg-red-500':
                        cardStatus.today_omset <= cardStatus.yesterday_omset,
                    }"
                  >
                    {{ cardStatus.today_produk }} Produk
                  </div>
                </template>
              </StatusCard>
              <StatusCard
                :title="'Omset Kemarin'"
                :data="currency(cardStatus.yesterday_omset)"
              >
                <template #icon>
                  <svg
                    class="w-7 h-7 text-theme-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    ></path>
                  </svg>
                </template>
                <template #persen>
                  <div
                    class="px-2 py-0.5 rounded-xl text-white font-normal text-xs"
                    :class="{
                      'bg-green-500':
                        cardStatus.yesterday_omset <= cardStatus.today_omset,
                      'bg-red-500':
                        cardStatus.yesterday_omset >= cardStatus.today_omset,
                    }"
                  >
                    {{ cardStatus.yesterday_omset }} Produk
                  </div>
                </template>
              </StatusCard>
              <StatusCard
                :title="'Minggu Ini'"
                :data="currency(cardStatus.thisWeek_omset)"
              >
                <template #icon>
                  <svg
                    class="w-7 h-7 text-theme-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    ></path>
                  </svg>
                </template>
                <template #persen>
                  <div
                    class="px-2 py-0.5 rounded-xl text-white font-normal text-xs"
                    :class="{
                      'bg-green-500':
                        cardStatus.thisWeek_omset <= cardStatus.lastWeek_omset,
                      'bg-red-500':
                        cardStatus.thisWeek_omset >= cardStatus.lastWeek_omset,
                    }"
                  >
                    {{ cardStatus.thisWeek_produk }} Produk
                  </div>
                </template>
              </StatusCard>
              <StatusCard
                :title="'Minggu Kemarin'"
                :data="currency(cardStatus.lastWeek_omset)"
              >
                <template #icon>
                  <svg
                    class="w-7 h-7 text-theme-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    ></path>
                  </svg>
                </template>
                <template #persen>
                  <div
                    class="px-2 py-0.5 rounded-xl text-white font-normal text-xs"
                    :class="{
                      'bg-green-500':
                        cardStatus.lastWeek_omset >= cardStatus.thisWeek_omset,
                      'bg-red-500':
                        cardStatus.lastWeek_omset <= cardStatus.thisWeek_omset,
                    }"
                  >
                    {{ cardStatus.lastWeek_produk }} Produk
                  </div>
                </template>
              </StatusCard>
            </div>
          </div>

          <div class="col-span-12 lg:col-span-6 mt-5">
            <div class="block sm:flex items-center h-10">
              <h2 class="text-lg font-medium truncate mr-5">Sales Report</h2>
              <div class="sm:ml-auto mt-3 sm:mt-0 relative text-slate-500">
                <select
                  v-model="year"
                  class="bg-gray-50 border w-full pr-10 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option v-for="(y, i) in years" :key="i" :value="y">
                    {{ y }}
                  </option>
                </select>
              </div>
            </div>
            <div
              class="relative shadow-md shadow-slate-500/40 rounded-md bg-white p-5 mt-12 sm:mt-5"
            >
              <div class="flex flex-col xl:flex-row xl:items-center">
                <div class="flex">
                  <div>
                    <div
                      class="text-slate-500 dark:text-slate-300 text-lg xl:text-xl font-medium"
                    >
                      Omset
                    </div>
                    <div class="mt-0.5 text-slate-500">
                      {{ moment().format("MMMM") }}
                    </div>
                  </div>
                  <div
                    class="w-px h-12 border border-r border-dashed border-slate-200 dark:border-darkmode-300 mx-4 xl:mx-5"
                  ></div>
                  <div class="flex self-center">
                    <div class="text-slate-800 text-lg xl:text-xl font-medium">
                      Rp. {{ currency(total) }}
                    </div>
                  </div>
                </div>
                <div class="dropdown xl:ml-auto mt-5 xl:mt-0">
                  <select
                    v-model="month"
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
              </div>
              <div class="pt-5">
                <LineChart
                  v-if="lineChart.length > 0"
                  :data="transaction_data"
                  :labels="labels"
                  :legenda="'Data Transaksi'"
                  :chartClass="'h-[280px]'"
                />
              </div>
            </div>
          </div>

          <div class="col-span-12 sm:col-span-6 lg:col-span-3 mt-5">
            <div class="flex items-center h-10">
              <h2 class="text-lg font-medium truncate mr-5">Produk Top</h2>
              <a href="" class="ml-auto text-theme-primary truncate text-xs"
                >Show More</a
              >
            </div>
            <div
              class="relative shadow-md shadow-slate-500/40 rounded-md bg-white p-5 mt-5"
            >
              <PieChart
                v-if="topProduct.length > 0"
                :data="pieData"
                :labels="pieLabels"
                :legenda="'Top Product'"
                :chartClass="'h-[350px]'"
              />
            </div>
          </div>

          <div class="col-span-12 sm:col-span-6 lg:col-span-3 mt-5">
            <div class="flex items-center h-10">
              <h2 class="text-lg font-medium truncate mr-5">CS Top</h2>
              <a href="" class="ml-auto text-theme-primary truncate text-xs"
                >Show More</a
              >
            </div>
            <div
              class="relative shadow-md shadow-slate-500/40 rounded-md bg-white p-5 mt-5"
            >
              <DonutChart
                v-if="topCS.length > 0"
                :data="donutData"
                :labels="donutLabels"
                :legenda="'Top CS'"
                :chartClass="'h-[350px]'"
              />
            </div>
          </div>

          <div class="col-span-12 xl:col-span-4 mt-6">
            <div class="flex flex-wrap items-center h-10">
              <h2 class="text-lg font-medium truncate w-1/2">Top 5 CS</h2>
              <div class="w-1/2">
                <DateRangeLayout v-model="dateRange" />
              </div>
            </div>
            <div class="mt-5">
              <TableRangeCS :items="topCS" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
export default {
  created() {
    this.getLineChart({
      month: this.month,
      year: this.year,
    });
    this.getTopCS();
    this.getTopProduct();
    this.getCardStatus();
  },
  data() {
    return {
      date: "",
      dateRange: [],
      month: moment().format("MM"),
      year: moment().format("Y"),
    };
  },
  watch: {
    month() {
      this.getLineChart({
        month: this.month,
        year: this.year,
      });
    },
    year() {
      this.getLineChart({
        month: this.month,
        year: this.year,
      });
    },
    dateRange() {
      this.getTopCS(
        this.convert(this.dateRange[0]) +
          "+-+" +
          this.convert(this.dateRange[1])
      );
    },
  },
  computed: {
    ...mapState("dashboard", {
      lineChart: (state) => state.lineChart,
      topCS: (state) => state.topCS,
      topProduct: (state) => state.topProduct,
      cardStatus: (state) => state.cardStatus,
    }),
    years() {
      return _.range(2019, moment().add(1, "years").format("Y"));
    },
    labels() {
      return _.map(this.lineChart, function (o) {
        return moment(o.date).format("DD");
      });
    },
    transaction_data() {
      let total = _.map(this.lineChart, function (o) {
        return o.total;
      });
      return total;
    },
    total() {
      let data = _.map(this.lineChart, function (o) {
        return o.total;
      });
      let total = data.reduce((a, i) => {
        return a + parseInt(i);
      }, 0);
      return total;
    },
    donutLabels() {
      return _.map(this.topCS, function (o) {
        return o.nama;
      });
    },
    donutData() {
      return _.map(this.topCS, function (o) {
        return o.omset;
      });
    },
    pieLabels() {
      return _.map(this.topProduct, function (o) {
        return o.produk;
      });
    },
    pieData() {
      return _.map(this.topProduct, function (o) {
        return o.qty;
      });
    },
  },
  methods: {
    ...mapActions("dashboard", [
      "getLineChart",
      "getTopCS",
      "getTopProduct",
      "getCardStatus",
    ]),
    currency(data) {
      return new Intl.NumberFormat("id-ID", {
        maximumSignificantDigits: 6,
      }).format(data);
    },
    convert(str) {
      var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      return [date.getFullYear(), mnth, day].join("-");
    },
  },
};
</script>
