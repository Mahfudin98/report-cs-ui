<script setup>
import { mapActions, mapState } from "vuex";
import DateRangeLayout from "@/components/Widget/DateRange/DaterangeLayout.vue";
import moment from "moment";
import Pagination from "@/components/Widget/PaginationWidget.vue";
import LoadingScreenVue from "../../../components/Widget/LoadingScreen.vue";
import Swal from "sweetalert2";
import { EyeIcon, TrashIcon } from "@heroicons/vue/24/outline";
// import { ref } from "vue";

// const date = ref([]);
</script>
<template>
  <main>
    <div class="w-full px-4 py-3">
      <h2 class="text-xl font-semibold font-poppins text-slate-800">
        Transaction
      </h2>
    </div>
    <!-- content -->
    <div class="grid w-full grid-cols-12 gap-6 px-2 mt-8 md:mt-2">
      <div class="col-span-12 lg:col-span-3 2xl:col-span-2">
        <div
          class="grid grid-cols-1 px-2 py-5 bg-white rounded-lg shadow-md gap-y-2 shadow-black/40"
        >
          <router-link
            :to="{ name: 'report-form-cs' }"
            class="w-full text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2"
          >
            <i class="w-4 h-4 mr-2 -ml-1 fa-solid fa-circle-plus"></i>
            Tambah Report
          </router-link>
          <hr class="mb-3 opacity-20" />
          <button
            v-on:click="dataFilterKey = 'all'"
            type="button"
            class="flex gap-2 px-3 py-3 mx-3 rounded-xl place-items-center hover:bg-slate-700/10"
            :class="{
              'drop-shadow-lg bg-slate-700/10': dataFilterKey == 'all',
            }"
          >
            <i class="w-5 h-5 fa-solid fa-rectangle-list"></i>
            <h2 class="text-base font-normal">All Report</h2>
          </button>
          <button
            v-on:click="dataFilterKey = 'member'"
            type="button"
            class="flex gap-2 px-3 py-3 mx-3 rounded-xl place-items-center hover:bg-slate-700/10"
            :class="{
              'drop-shadow-lg bg-slate-700/10': dataFilterKey == 'member',
            }"
          >
            <i class="w-5 h-5 fa-solid fa-users-rectangle"></i>
            <h2 class="text-base font-normal">Member</h2>
          </button>
          <button
            v-on:click="dataFilterKey = 'customer'"
            type="button"
            class="flex gap-2 px-3 py-3 mx-3 rounded-xl place-items-center hover:bg-slate-700/10"
            :class="{
              'drop-shadow-lg bg-slate-700/10': dataFilterKey == 'customer',
            }"
          >
            <i class="w-5 h-5 fa-regular fa-circle-user"></i>
            <h2 class="text-base font-normal">Customer</h2>
          </button>
        </div>
      </div>
      <div class="col-span-12 lg:col-span-9 2xl:col-span-10">
        <div
          class="grid grid-cols-1 gap-5 bg-white rounded-lg shadow-md shadow-black/40"
        >
          <div class="grid grid-cols-1 gap-5 px-4 pt-5 lg:grid-cols-2 gap-y-5">
            <form>
              <DateRangeLayout v-model="data.dateRange" />
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
              <div class="flex self-center justify-end">
                <button>
                  <i class="w-5 h-5 fa-solid fa-gear"></i>
                </button>
              </div>
            </div>
          </div>
          <!-- table -->
          <div
            class="relative max-h-screen overflow-x-scroll scrollbar hover:scrollbar-thin hover:scrollbar-thumb-slate-700 hover:scrollbar-track-transparent hover:overflow-y-scroll hover:scrollbar-thumb-rounded-full hover:scrollbar-track-rounded-full"
          >
            <table
              v-if="all != undefined"
              class="w-full text-xs text-left text-gray-500 border-t dark:text-gray-400"
            >
              <thead
                class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400"
              >
                <tr>
                  <th scope="col" class="px-6 py-3 whitespace-nowrap">
                    Customer Data
                  </th>
                  <th scope="col" class="px-6 py-3 whitespace-nowrap">
                    Membership
                  </th>
                  <th scope="col" class="px-6 py-3 whitespace-nowrap">
                    Ongkir
                  </th>
                  <th scope="col" class="px-6 py-3 whitespace-nowrap">
                    Tipe Transaksi
                  </th>
                  <th scope="col" class="px-6 py-3 whitespace-nowrap">
                    Harga Produk
                  </th>
                  <th scope="col" class="px-6 py-3 whitespace-nowrap">
                    Tanggal Transaksi
                  </th>
                  <th scope="col" class="px-6 py-3 whitespace-nowrap">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(transaction, index) in dataFilter"
                  :key="index"
                  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 group"
                >
                  <th scope="row" class="px-6 py-4">
                    <div
                      class="w-[250px] text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <div class="font-normal text-gray-500 truncate">
                        {{ transaction.nomor_pesanan }}
                      </div>
                      <div class="text-base font-semibold truncate">
                        {{ transaction.nama }}
                      </div>
                      <div class="font-normal text-gray-500 truncate">
                        {{ transaction.alamat }}
                      </div>
                    </div>
                  </th>
                  <td class="px-6 py-3 whitespace-nowrap">
                    {{ transaction.type_customer }}
                  </td>
                  <td class="px-6 py-3 whitespace-nowrap">
                    <div class="text-base font-semibold">
                      Rp. {{ currency(transaction.ongkir) }}
                    </div>
                    <div class="font-normal text-gray-500">
                      {{ transaction.expedisi }}
                    </div>
                  </td>
                  <td class="px-6 py-3 whitespace-nowrap">
                    <div class="text-base font-semibold">
                      {{ transaction.type_transaction }}
                    </div>
                    <div class="font-normal text-gray-500">
                      {{ transaction.origin_customer }}
                    </div>
                  </td>
                  <td class="px-6 py-3 whitespace-nowrap">
                    <div class="text-base font-semibold text-gray-800">
                      Rp. {{ currency(transaction.total_harga) }}
                    </div>
                    <div class="font-normal text-gray-500">
                      {{ transaction.produk.length }} Produk
                    </div>
                  </td>
                  <td
                    class="px-6 py-3 text-base font-semibold text-gray-800 font-poppins whitespace-nowrap"
                  >
                    {{ moment(transaction.tanggal).format("MMM DD, YYYY") }}
                  </td>
                  <td class="flex items-center px-6 py-3">
                    <router-link
                      :to="{
                        name: 'report-detail-cs',
                        params: { kode: transaction.nomor_pesanan },
                      }"
                      class="text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-3 py-1.5 text-center mr-2"
                    >
                      <EyeIcon class="w-6 h-6" />
                    </router-link>

                    <button
                      @click="deleteData(transaction.nomor_pesanan)"
                      type="button"
                      class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-3 py-1.5 text-center"
                    >
                      <TrashIcon class="w-6 h-6" />
                    </button>
                  </td>
                </tr>
                <tr
                  v-if="transactions.data == ''"
                  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 group"
                >
                  <td
                    colspan="9"
                    class="px-6 py-3 text-lg font-semibold text-center whitespace-nowrap"
                  >
                    Data Kosong
                  </td>
                </tr>
              </tbody>
            </table>
            <LoadingScreenVue
              v-if="all == undefined"
              :styles="'relative bg-white text-slate-600'"
              :text="'Ditunggu ya.'"
            />
          </div>
          <!-- pagination -->

          <div class="grid mb-4">
            <Pagination
              v-if="all != undefined"
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
      data: {
        dateRange: [],
      },
      hasMorePages: true,
    };
  },
  watch: {
    dateRange() {
      this.getTransaction(
        this.convert(this.data.dateRange[0]) +
          "+-+" +
          this.convert(this.data.dateRange[1])
      );
    },
    page() {
      this.getTransaction();
    },
  },
  computed: {
    ...mapState("transaction", { transactions: (state) => state.transactions }),
    // eslint-disable-next-line vue/no-dupe-keys
    dateRange() {
      return this.data.dateRange;
    },
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
