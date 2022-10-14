<script setup>
import { mapActions, mapState } from "vuex";
import DaterangeLayout from "@/components/Widget/DateRange/DaterangeLayout.vue";
import { ref } from "vue";
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
              <DaterangeLayout v-model="dateValue"></DaterangeLayout>
            </form>
            <div class="flex justify-between lg:justify-end lg:gap-3">
              <div class="flex self-center gap-3">
                1-50 of 1000
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
                  <th scope="col" class="py-3 px-6">Customer Data</th>
                  <th scope="col" class="py-3 px-6">Membership</th>
                  <th scope="col" class="py-3 px-6">Kode Transaksi</th>
                  <th scope="col" class="py-3 px-6">Ongkir</th>
                  <th scope="col" class="py-3 px-6">Tipe Transaksi</th>
                  <th scope="col" class="py-3 px-6">Produk</th>
                  <th scope="col" class="py-3 px-6">Tanggal Transaksi</th>
                  <th scope="col" class="py-3 px-6">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(transaction, index) in dataFilter"
                  :key="index"
                  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
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
                          'fa-regular fa-face-laugh-squint w-8 h-8':
                            transaction.type_customer == 'Agen',
                          'fa-regular fa-face-laugh-wink w-8 h-8':
                            transaction.type_customer == 'Reseller',
                          'fa-regular fa-face-smile-beam w-8 h-8':
                            transaction.type_customer == 'Customer',
                        }"
                      ></i>
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
                  <td class="py-3 px-6">
                    {{ transaction.type_customer }}
                  </td>
                  <td class="py-3 px-6">
                    {{ transaction.nomor_pesanan }}
                  </td>
                  <td class="py-3 px-6">
                    <div class="text-base font-semibold">
                      Rp.{{ currency(transaction.ongkir) }}
                    </div>
                    <div class="font-normal text-gray-500">
                      {{ transaction.expedisi }}
                    </div>
                  </td>
                  <td class="py-3 px-6">
                    <div class="text-base font-semibold">
                      {{ transaction.type_transaction }}
                    </div>
                    <div class="font-normal text-gray-500">
                      {{ transaction.origin_customer }}
                    </div>
                  </td>
                  <td class="py-3 px-6">
                    <div class="text-base font-semibold">
                      Rp.{{ currency(transaction.total_harga) }}
                    </div>
                    <div class="font-normal text-gray-500">
                      {{ transaction.produk.length }} Produk
                    </div>
                  </td>
                  <td class="py-3 px-6">
                    {{ transaction.tanggal }}
                  </td>
                  <td class="py-3 px-6">
                    <button
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
      </div>
    </div>
  </main>
</template>
<script>
export default {
  created() {
    this.getTransaction();
  },
  setup() {
    const dateValue = ref([]);
    return {
      dateValue,
    };
  },
  data() {
    return {
      dataFilterKey: "all",
    };
  },
  computed: {
    ...mapState("transaction", { transactions: (state) => state.transactions }),
    dataFilter() {
      return this[this.dataFilterKey];
    },
    all() {
      return this.transactions;
    },
    member() {
      return this.transactions.filter((item) => {
        return item.member.indexOf("member") > -1;
      });
    },
    customer() {
      return this.transactions.filter((item) => {
        return item.member.indexOf("customer") > -1;
      });
    },
  },
  methods: {
    ...mapActions("transaction", ["getTransaction"]),
    currency(data) {
      return new Intl.NumberFormat("id-ID", {
        maximumSignificantDigits: 6,
      }).format(data);
    },
  },
};
</script>
