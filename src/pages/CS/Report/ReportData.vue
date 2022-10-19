<script setup>
import { mapActions, mapState } from "vuex";
import DateRangeLayout from "@/components/Widget/DateRange/DaterangeLayout.vue";
import moment from "moment";
import Pagination from "@/components/Widget/PaginationWidget.vue";

import Swal from "sweetalert2";
// import { ref } from "vue";

// const date = ref([]);
</script>
<template>
  <main>
    <div class="w-full py-3 px-4">
      <h2 class="font-poppins font-semibold text-xl text-slate-800">
        Transaction
      </h2>
    </div>
    <!-- content -->
    <div class="w-full grid grid-cols-12 px-2 gap-6 mt-8 md:mt-2">
      <div class="col-span-12 lg:col-span-3 2xl:col-span-2">
        <div
          class="grid grid-cols-1 gap-y-2 py-5 px-2 bg-white shadow-md shadow-black/40 rounded-lg"
        >
          <router-link
            :to="{ name: 'report-form-cs' }"
            class="w-full text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2"
          >
            <i class="fa-solid fa-circle-plus mr-2 -ml-1 w-4 h-4"></i>
            Tambah Report
          </router-link>
          <hr class="mb-3 opacity-20" />
          <button
            v-on:click="dataFilterKey = 'all'"
            type="button"
            class="flex gap-2 rounded-xl place-items-center hover:bg-slate-700/10 mx-3 py-3 px-3"
            :class="{
              'drop-shadow-lg bg-slate-700/10': dataFilterKey == 'all',
            }"
          >
            <i class="fa-solid fa-rectangle-list h-5 w-5"></i>
            <h2 class="font-normal text-base">All Report</h2>
          </button>
          <button
            v-on:click="dataFilterKey = 'member'"
            type="button"
            class="flex gap-2 rounded-xl place-items-center hover:bg-slate-700/10 mx-3 py-3 px-3"
            :class="{
              'drop-shadow-lg bg-slate-700/10': dataFilterKey == 'member',
            }"
          >
            <i class="fa-solid fa-users-rectangle w-5 h-5"></i>
            <h2 class="font-normal text-base">Member</h2>
          </button>
          <button
            v-on:click="dataFilterKey = 'customer'"
            type="button"
            class="flex gap-2 rounded-xl place-items-center hover:bg-slate-700/10 mx-3 py-3 px-3"
            :class="{
              'drop-shadow-lg bg-slate-700/10': dataFilterKey == 'customer',
            }"
          >
            <i class="fa-regular fa-circle-user w-5 h-5"></i>
            <h2 class="font-normal text-base">Customer</h2>
          </button>
        </div>
      </div>
      <div class="col-span-12 lg:col-span-9 2xl:col-span-10">
        <div
          class="bg-white grid grid-cols-1 gap-5 shadow-md shadow-black/40 rounded-lg"
        >
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 gap-y-5 px-4 pt-5">
            <form>
              <DateRangeLayout v-model="dateRange" />
            </form>
            <div class="flex justify-between lg:justify-end lg:gap-3">
              <div class="flex self-center gap-3">
                1 - {{ transactions.per_page }} of {{ transactions.total }}
                <div class="flex gap-2">
                  <button>
                    <i class="fa-solid fa-chevron-left"></i>
                  </button>
                  <button>
                    <i class="fa-solid fa-chevron-right"></i>
                  </button>
                </div>
              </div>
              <div class="flex justify-end self-center">
                <button>
                  <i class="fa-solid fa-gear w-5 h-5"></i>
                </button>
              </div>
            </div>
          </div>
          <!-- table -->
          <div class="overflow-x-auto relative">
            <table
              class="w-full text-xs text-left text-gray-500 dark:text-gray-400 border-t"
            >
              <thead
                class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400"
              >
                <tr>
                  <th scope="col" class="py-3 px-6 whitespace-nowrap">
                    Customer Data
                  </th>
                  <th scope="col" class="py-3 px-6 whitespace-nowrap">
                    Membership
                  </th>
                  <th scope="col" class="py-3 px-6 whitespace-nowrap">
                    Kode Transaksi
                  </th>
                  <th scope="col" class="py-3 px-6 whitespace-nowrap">
                    Ongkir
                  </th>
                  <th scope="col" class="py-3 px-6 whitespace-nowrap">
                    Tipe Transaksi
                  </th>
                  <th scope="col" class="py-3 px-6 whitespace-nowrap">
                    Produk
                  </th>
                  <th scope="col" class="py-3 px-6 whitespace-nowrap">
                    Tanggal Transaksi
                  </th>
                  <th scope="col" class="py-3 px-6 whitespace-nowrap">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(transaction, index) in dataFilter"
                  :key="index"
                  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 group"
                >
                  <th
                    scope="row"
                    class="flex items-center py-4 px-6 text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <div
                      class="grid place-items-center w-10 h-10 rounded-full border border-slate-800"
                    >
                      <i
                        :class="{
                          'fa-regular fa-face-laugh-squint w-8 h-8 group-hover:hidden':
                            transaction.type_customer == 'Agen',
                          'fa-regular fa-face-laugh-wink w-8 h-8 group-hover:hidden':
                            transaction.type_customer == 'Reseller',
                          'fa-regular fa-face-smile-beam w-8 h-8 group-hover:hidden':
                            transaction.type_customer == 'Customer',
                        }"
                      ></i>
                      <router-link
                        :to="{
                          name: 'report-detail-cs',
                          params: { kode: transaction.nomor_pesanan },
                        }"
                      >
                        <i
                          class="fa-solid fa-eyes hidden cursor-pointer group-hover:block w-8 h-8"
                        ></i>
                      </router-link>
                    </div>
                    <div class="pl-3">
                      <div class="text-base font-semibold">
                        {{ transaction.nama }}
                      </div>
                      <div class="font-normal text-gray-500">
                        {{ transaction.alamat }}
                      </div>
                    </div>
                  </th>
                  <td class="py-3 px-6 whitespace-nowrap">
                    {{ transaction.type_customer }}
                  </td>
                  <td class="py-3 px-6 whitespace-nowrap">
                    {{ transaction.nomor_pesanan }}
                  </td>
                  <td class="py-3 px-6 whitespace-nowrap">
                    <div class="text-base font-semibold">
                      Rp. {{ currency(transaction.ongkir) }}
                    </div>
                    <div class="font-normal text-gray-500">
                      {{ transaction.expedisi }}
                    </div>
                  </td>
                  <td class="py-3 px-6 whitespace-nowrap">
                    <div class="text-base font-semibold">
                      {{ transaction.type_transaction }}
                    </div>
                    <div class="font-normal text-gray-500">
                      {{ transaction.origin_customer }}
                    </div>
                  </td>
                  <td class="py-3 px-6 whitespace-nowrap">
                    <div class="text-base font-semibold">
                      Rp. {{ currency(transaction.total_harga) }}
                    </div>
                    <div class="font-normal text-gray-500">
                      {{ transaction.produk.length }} Produk
                    </div>
                  </td>
                  <td class="py-3 px-6 whitespace-nowrap">
                    {{ moment(transaction.tanggal).format("MMM DD, YYYY") }}
                  </td>
                  <td class="py-3 px-6 whitespace-nowrap">
                    <button
                      @click="deleteData(transaction.nomor_pesanan)"
                      type="button"
                      class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                    >
                      <i class="fa-regular fa-trash-can"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- pagination -->

          <div class="grid mb-4">
            <Pagination
              :total-pages="transactions.last_page"
              :total="transactions.total"
              :per-page="transactions.per_page"
              :current-page="transactions.current_page"
              :has-more-pages="hasMorePages"
              @pagechanged="showMore"
            />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
export default {
  created() {
    this.getTransaction();
  },
  data() {
    return {
      dataFilterKey: "all",
      dateRange: [],
      hasMorePages: true,
    };
  },
  watch: {
    dateRange() {
      this.getTransaction(
        this.convert(this.dateRange[0]) +
          "+-+" +
          this.convert(this.dateRange[1])
      );
    },
    page() {
      this.getTransaction();
    },
  },
  computed: {
    ...mapState("transaction", { transactions: (state) => state.transactions }),
    // eslint-disable-next-line vue/no-dupe-keys
    page: {
      get() {
        return this.$store.state.transaction.page;
      },
      set(val) {
        this.$store.commit("transaction/SET_PAGE", val);
      },
    },
    dataFilter() {
      return this[this.dataFilterKey];
    },
    all() {
      return this.transactions.data;
    },
    member() {
      return this.transactions.data.filter((item) => {
        return item.member.indexOf("member") > -1;
      });
    },
    customer() {
      return this.transactions.data.filter((item) => {
        return item.member.indexOf("customer") > -1;
      });
    },
  },
  methods: {
    ...mapActions("transaction", ["getTransaction", "removeTransaction"]),
    currency(data) {
      return new Intl.NumberFormat("id-ID", {
        maximumSignificantDigits: 6,
      }).format(data);
    },
    showMore(page) {
      this.page = page;
      this.transactions.current_page = page;
    },
    convert(str) {
      var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      return [date.getFullYear(), mnth, day].join("-");
    },
    deleteData(code) {
      Swal.fire({
        title: "Kamu Yakin?",
        text: "Kamu tidak dapat mengembalikan ini!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, hapus!",
      }).then((result) => {
        if (result.isConfirmed) {
          this.removeTransaction(code);
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      });
    },
  },
};
</script>
