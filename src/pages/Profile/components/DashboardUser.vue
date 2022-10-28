<script setup>
import moment from "moment";
import _ from "lodash";
import { mapActions, mapState } from "vuex";
import BarChart from "../../../components/Chart/BarChart.vue";
import LineChart from "../../../components/Chart/LineChart.vue";
import DonutChart from "../../../components/Chart/DonutChart.vue";
</script>
<template>
  <div class="grid grid-cols-12 gap-6 mt-5">
    <div
      class="block bg-white shadow-md shadow-black/40 rounded-md col-span-12 lg:col-span-6"
    >
      <div
        class="flex items-center px-5 py-5 sm:py-3 border-b border-slate-200/60 dark:border-darkmode-400"
      >
        <h2 class="font-medium text-base mr-auto">User Activity</h2>
        <form class="sm:flex items-center">
          <div class="relative w-full">
            <div
              class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
            >
              <i
                class="fa-solid fa-calendar-days w-5 h-5 text-gray-500 dark:text-gray-400"
              ></i>
            </div>
            <input
              v-model="data.date"
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
        class="p-5 pb-0 scrollbar hover:scrollbar-thin hover:scrollbar-thumb-blue-700 hover:scrollbar-track-blue-300 h-[300px] hover:overflow-y-scroll"
      >
        <ol class="relative border-l border-gray-200 dark:border-gray-700">
          <li class="mb-10 ml-6" v-for="row in activitys" :key="row">
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
              {{ row.method }}
            </h3>
            <time
              class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500"
              >Created on {{ moment(row.date).format("MMM DD, YYYY") }} at
              {{ moment(row.date).format("LT") }}</time
            >
            <p
              class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400"
            >
              {{ row.activity }}
            </p>
          </li>
        </ol>
      </div>
    </div>

    <div
      class="block bg-white shadow-md shadow-black/40 rounded-md col-span-12 lg:col-span-6"
    >
      <div
        class="flex items-center px-5 py-5 sm:py-3 border-b border-slate-200/60 dark:border-darkmode-400"
      >
        <h2 class="font-medium text-base mr-auto">Transaction</h2>
        <form class="sm:flex items-center gap-1">
          <select
            v-model="data.month"
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
          <select
            v-model="data.year"
            class="bg-gray-50 border w-fit border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option v-for="(y, i) in years" :key="i" :value="y">{{ y }}</option>
          </select>
        </form>
      </div>

      <div class="p-5 pb-0 pt-1 h-[300px]">
        <BarChart
          v-if="barProfile.length > 0"
          :data="transaction_data"
          :labels="labels"
          :legenda="'Data Transaksi'"
          :chartClass="'h-[280px]'"
        />
      </div>
    </div>
    <div
      class="block bg-white shadow-md shadow-black/40 rounded-md col-span-12 lg:col-span-6"
    >
      <div
        class="flex items-center px-5 py-5 sm:py-3 border-b border-slate-200/60 dark:border-darkmode-400"
      >
        <h2 class="font-medium text-base mr-auto">Transaction</h2>
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

      <div class="p-5 pb-0 pt-1 h-[300px]">
        <LineChart
          v-if="barProfile.length > 0"
          :data="transaction_data"
          :labels="labels"
          :legenda="'Data Transaksi'"
          :chartClass="'h-[280px]'"
        />
      </div>
    </div>
    <div
      class="block bg-white shadow-md shadow-black/40 rounded-md col-span-12 lg:col-span-6"
    >
      <div
        class="flex items-center px-5 py-5 sm:py-3 border-b border-slate-200/60 dark:border-darkmode-400"
      >
        <h2 class="font-medium text-base mr-auto">Transaction</h2>
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

      <div class="p-5 pb-0 pt-1 h-[300px]">
        <DonutChart
          v-if="barProfile.length > 0"
          :data="transaction_data"
          :labels="labels"
          :legenda="'Data Transaksi'"
          :chartClass="'h-[280px]'"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  created() {
    this.getBarProfile({
      username: this.$route.params.username,
      month: this.data.month,
      year: this.data.year,
    });
    this.getActivity({
      username: this.$route.params.username,
      date: this.data.date,
    });
  },
  data() {
    return {
      data: {
        date: "",
        month: moment().format("MM"),
        year: moment().format("Y"),
      },
    };
  },
  watch: {
    month() {
      this.getBarProfile({
        username: this.$route.params.username,
        month: this.data.month,
        year: this.data.year,
      });
    },
    year() {
      this.getBarProfile({
        username: this.$route.params.username,
        month: this.data.month,
        year: this.data.year,
      });
    },
    date() {
      this.getActivity({
        username: this.$route.params.username,
        date: this.data.date,
      });
    },
  },
  computed: {
    ...mapState("dashboardPR", { barProfile: (state) => state.barProfile }),
    ...mapState("activity", { activitys: (state) => state.activitys }),
    // reactivity
    year() {
      return this.data.year;
    },
    month() {
      return this.data.month;
    },
    date() {
      return this.data.date;
    },
    // end reactivity
    years() {
      return _.range(2019, moment().add(1, "years").format("Y"));
    },
    labels() {
      return _.map(this.barProfile, function (o) {
        return moment(o.date).format("DD");
      });
    },
    transaction_data() {
      let total = _.map(this.barProfile, function (o) {
        return o.total;
      });
      return total;
    },
  },
  methods: {
    ...mapActions("dashboardPR", ["getBarProfile"]),
    ...mapActions("activity", ["getActivity"]),
  },
};
</script>
