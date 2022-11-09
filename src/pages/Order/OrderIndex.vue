<script setup>
import DaterangeLayout from "@/components/Widget/DateRange/DaterangeLayout.vue";
import moment from "moment";
import ModalDetail from "./ModalDetail.vue";
import LoadingScreenVue from "../../components/Widget/LoadingScreen.vue";
import { mapActions, mapState } from "vuex";
import Swal from "sweetalert2";
</script>
<template>
  <main>
    <div class="w-full flex justify-between py-3 px-4">
      <h2 class="font-poppins font-semibold text-xl text-slate-800">Order</h2>
      <a href="" class="flex gap-2 self-center text-theme-primary">
        <i class="fa-solid fa-rotate w-5 h-5"></i>
        <p class="font-poppins text-sm">Reload Data</p>
      </a>
    </div>

    <div class="w-full grid grid-cols-12 gap-6 px-4 pt-1">
      <div class="col-span-12 2xl:col-span-9 xxl:col-span-12">
        <div class="grid grid-cols-12 gap-6">
          <div class="col-span-12 sm:col-span-4">
            <div class="flex flex-col min-h-screen bg-center bg-cover pt-2">
              <div
                class="max-w-full w-full h-full mx-auto z-10 bg-theme-bg-light rounded-3xl p-4"
              >
                <div class="grid gap-2 w-full bg-white rounded-lg p-4">
                  <DaterangeLayout v-model="data.dateRange" />
                  <div
                    class="bg-theme-bg-light/85 text-white rounded-2xl shadow-xl py-5 px-3 w-full"
                  >
                    <div class="flex justify-between">
                      <div class="grid gap-1">
                        <h3 class="text-lg font-semibold leading-tight flex-1">
                          Total Order
                        </h3>
                        <p class="text-xs font-normal text-gray-500">
                          {{ moment().format("MMMM DD, YYYY") }}
                        </p>
                      </div>
                      <div class="grid gap-1">
                        <h3
                          class="text-lg text-right font-semibold leading-tight flex-1"
                        >
                          500
                        </h3>
                        <p class="text-xs font-normal text-gray-500">
                          Transaksi
                        </p>
                      </div>
                    </div>
                  </div>
                  <button
                    v-on:click="dataFilterKey = 'done'"
                    type="button"
                    class="bg-green-700 text-white rounded-2xl shadow-xl py-5 px-3 w-full hover:bg-green-600"
                    :class="{
                      'drop-shadow-lg bg-green-500 border-2 border-theme-bg-light':
                        dataFilterKey == 'done',
                    }"
                  >
                    <div class="flex justify-between">
                      <h3 class="text-lg font-semibold leading-tight">Done</h3>
                      <h3 class="text-lg font-semibold leading-tight">100</h3>
                    </div>
                  </button>
                  <button
                    v-on:click="dataFilterKey = 'unproccessed'"
                    type="button"
                    class="bg-yellow-400 text-white rounded-2xl shadow-xl py-5 px-3 w-full hover:bg-yellow-300 border-2 border-yellow-200"
                    :class="{
                      'drop-shadow-lg bg-yellow-300 border-2 border-theme-bg-light':
                        dataFilterKey == 'unproccessed',
                    }"
                  >
                    <div class="flex justify-between">
                      <h3 class="text-lg font-semibold leading-tight">
                        Unprocessed
                      </h3>
                      <h3 class="text-lg font-semibold leading-tight">400</h3>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="col-span-12 sm:col-span-8">
            <div
              class="overflow-x-scroll relative scrollbar hover:scrollbar-thin hover:scrollbar-thumb-slate-700 hover:scrollbar-track-transparent h-[650px] hover:overflow-y-scroll hover:scrollbar-thumb-rounded-full hover:scrollbar-track-rounded-full"
            >
              <table
                v-if="allTR != ''"
                class="relative w-full text-sm text-left text-gray-500 dark:text-gray-400 border-separate border-spacing-y-2"
              >
                <thead
                  class="text-xs text-white font-normal uppercase bg-theme-bg-light dark:bg-gray-700 dark:text-gray-400 sticky top-0 z-40"
                >
                  <tr>
                    <th scope="col" class="py-3 px-6 rounded-l-lg">
                      Nama Customers
                    </th>
                    <th scope="col" class="py-3 px-6">Qty</th>
                    <th scope="col" class="py-3 px-6">Date</th>
                    <th scope="col" class="py-3 px-6">Origin</th>
                    <th scope="col" class="py-3 px-6">Status</th>
                    <th scope="col" class="py-3 px-6 rounded-r-lg">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, index) in dataFilter"
                    :key="index"
                    class="bg-white dark:bg-gray-800 border hover:shadow-lg shadow-slate-500/40 hover:shadow-slate-500/60 rounded-md ease-in-out delay-75 hover:-translate-y-1 hover:scale-95"
                  >
                    <th
                      scope="row"
                      class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white rounded-l-lg"
                    >
                      {{ item.nama }}
                    </th>
                    <td class="py-4 px-6">{{ item.produk.length }}</td>
                    <td
                      class="py-4 px-6 font-semibold text-slate-800 whitespace-nowrap"
                    >
                      {{ moment(item.tanggal).format("DD-MM-YYYY") }}
                    </td>
                    <td
                      class="py-4 px-6 font-semibold text-slate-800 whitespace-nowrap"
                    >
                      {{ item.origin_customer }}
                    </td>
                    <td class="py-4 px-6">
                      <span
                        :class="[item.status == 1 ? 'block' : 'hidden']"
                        class="bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded mr-2 dark:bg-gray-700 dark:text-gray-300"
                      >
                        <i class="fa-regular fa-circle-check mr-1 w-3 h-3"></i>
                        Done
                      </span>
                      <span
                        :class="[item.status == 0 ? 'block' : 'hidden']"
                        class="bg-red-100 text-red-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded mr-2 dark:bg-gray-700 dark:text-gray-300"
                      >
                        <i
                          class="fa-solid fa-triangle-exclamation mr-1 w-3 h-3"
                        ></i>
                        Unprocessed
                      </span>
                    </td>
                    <td class="py-4 px-2 rounded-r-lg">
                      <div class="flex justify-between gap-2">
                        <button
                          @click="openModal(item)"
                          type="button"
                          class="text-white bg-[#2557D6] hover:bg-[#2557D6]/90 focus:ring-4 focus:ring-[#2557D6]/50 focus:outline-none font-medium rounded-lg text-xs w-fit px-3 py-1 text-center inline-flex items-center dark:focus:ring-[#2557D6]/50"
                        >
                          <i class="fa-solid fa-eye mr-2 -ml-1 w-4 h-4"></i>
                          View
                        </button>
                        <button
                          @click="update(item.nomor_pesanan)"
                          type="submit"
                          class="text-white font-medium rounded-lg text-xs w-fit px-3 py-1 text-center inline-flex items-center dark:focus:ring-[#2557D6]/50"
                          :class="{
                            'bg-[#2557D6] hover:bg-[#2557D6]/90 focus:ring-4 focus:ring-[#2557D6]/50 focus:outline-none':
                              item.status == 0,
                            'bg-red-600 hover:bg-red-600/90 focus:ring-4 focus:ring-[#2557D6]/50 focus:outline-none':
                              item.status == 1,
                          }"
                        >
                          <i
                            class="fa-solid fa-circle-check"
                            :class="{
                              'scale-0': item.status == 1,
                              'scale-100 mr-2 -ml-1 w-4 h-4': item.status == 0,
                            }"
                          ></i>
                          <i
                            class="fa-solid fa-triangle-exclamation"
                            :class="{
                              'scale-0': item.status == 0,
                              'scale-100 mr-2 -ml-1 w-4 h-4': item.status == 1,
                            }"
                          ></i>
                          {{ item.status == 1 ? "Undone" : "Done" }}
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr
                    v-if="all == ''"
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 group"
                  >
                    <td
                      colspan="4"
                      class="py-3 px-6 whitespace-nowrap font-semibold text-lg text-center"
                    >
                      Data Kosong
                    </td>
                  </tr>
                </tbody>
              </table>
              <LoadingScreenVue
                v-if="allTR == ''"
                :styles="'relative bg-white text-slate-600'"
                :text="'Ditunggu ya.'"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <ModalDetail :isOpen="isOpen" :index="value" @closeModal="onCloseModal">
      <template #button>
        <div class="mt-4">
          <button
            type="button"
            class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            @click="onCloseModal"
          >
            Close
          </button>
        </div>
      </template>
    </ModalDetail>
  </main>
</template>

<script>
export default {
  created() {
    this.getAllTR();
  },
  data() {
    return {
      data: {
        dateRange: [],
      },
      isOpen: false,
      value: "",
      dataFilterKey: "all",
    };
  },
  watch: {
    dateRange() {
      this.getAllTR(
        this.convert(this.data.dateRange[0]) +
          "+-+" +
          this.convert(this.data.dateRange[1])
      );
    },
  },
  computed: {
    ...mapState("transaction", { allTR: (state) => state.allTR }),
    dateRange() {
      return this.data.dateRange;
    },
    dataFilter() {
      return this[this.dataFilterKey];
    },
    all() {
      return this.allTR.filter((item) => {
        return item.status == 0;
      });
    },
    done() {
      return this.allTR.filter((item) => {
        return item.status == 1;
      });
    },
    unproccessed() {
      return this.allTR.filter((item) => {
        return item.status == 0;
      });
    },
  },
  methods: {
    ...mapActions("transaction", ["getAllTR", "updateOrder"]),
    update(code) {
      this.updateOrder(code);
      Swal.fire("Updated!", "Your data has been updated.", "success");
    },
    openModal(event) {
      this.value = event;
      this.isOpen = true;
    },
    onCloseModal() {
      this.isOpen = false;
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
