<script setup>
import { mapActions, mapState } from "vuex";
import moment from "moment";
</script>
<template>
  <main>
    <div class="w-full flex py-3 px-4">
      <h2 class="flex-none font-poppins font-semibold text-xl text-slate-800">
        Detail Transaksi
      </h2>
      <div class="w-full flex gap-2 justify-end self-center text-theme-primary">
        <button
          type="button"
          class="text-white bg-[#2557D6] hover:bg-[#2557D6]/90 focus:ring-4 focus:ring-[#2557D6]/50 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#2557D6]/50 mr-2 mb-2"
        >
          <i class="fa-solid fa-print mr-2 -ml-1 w-4 h-4"></i>
          Print
        </button>
      </div>
    </div>
    <!-- content -->
    <div
      class="w-full overflow-hidden mt-5 bg-white shadow-sm shadow-black/50 rounded-md"
    >
      <div
        class="flex flex-col lg:flex-row pt-10 px-5 sm:px-20 sm:pt-20 lg:pb-20 text-center sm:text-left"
      >
        <div class="font-semibold text-theme-primary text-3xl">INVOICE</div>
        <div class="mt-20 lg:mt-0 lg:ml-auto lg:text-right">
          <div class="text-xl text-theme-primary font-medium">
            {{ data.nama_cs }}
          </div>
          <div class="mt-1">{{ data.email_cs }}</div>
          <div class="mt-1">{{ data.phone_cs }}</div>
        </div>
      </div>

      <div
        class="flex flex-col lg:flex-row border-b px-5 sm:px-20 pt-10 pb-10 sm:pb-20 text-center sm:text-left"
      >
        <div>
          <div class="text-base text-slate-500">Client Details</div>
          <div class="text-lg font-medium text-theme-primary mt-2">
            {{ data.nama }}
          </div>
          <div class="mt-1">{{ data.alamat }}</div>
          <div class="mt-1">{{ data.phone }}</div>
        </div>
        <div class="mt-10 lg:mt-0 lg:ml-auto lg:text-right">
          <div class="text-base text-slate-500">Receipt</div>
          <div class="text-lg text-theme-primary font-medium mt-2">
            #{{ data.nomor_pesanan }}
          </div>
          <div class="mt-1">
            {{ moment(data.tanggal).format("MMM DD, YYY") }}
          </div>
        </div>
      </div>

      <div class="overflow-x-auto relative px-5 sm:px-16 py-10 sm:py-20">
        <table
          class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
        >
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400"
          >
            <tr>
              <th scope="col" class="py-3 px-6 rounded-l-lg">Product name</th>
              <th scope="col" class="py-3 px-6">Qty</th>
              <th scope="col" class="py-3 px-6">Price</th>
              <th scope="col" class="py-3 px-6">Discount</th>
              <th scope="col" class="py-3 px-6 rounded-r-lg">Total Harga</th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="bg-white dark:bg-gray-800"
              v-for="(row, index) in data.produk"
              :key="index"
            >
              <th
                scope="row"
                class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {{ row.product_name }}
              </th>
              <td class="py-4 px-6">{{ row.qty }}</td>
              <td class="py-4 px-6">Rp. {{ currency(row.product_price) }}</td>
              <td class="py-4 px-6">{{ row.discount }}</td>
              <td class="py-4 px-6">
                Rp. {{ currency(row.qty * row.product_price - row.discount) }}
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr
              class="font-semibold bg-slate-400/30 text-gray-900 dark:text-white"
            >
              <th scope="row" class="py-3 px-6 text-base">Total</th>
              <td class="py-3 px-6">{{ data.produk.length }}</td>
              <th colspan="2"></th>
              <td class="py-3 px-6">Rp. {{ currency(data.total_harga) }}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div
        class="px-5 sm:px-20 pb-10 sm:pb-20 flex flex-col-reverse sm:flex-row"
      >
        <div class="text-center sm:text-left mt-10 sm:mt-0">
          <div class="text-base text-slate-500">Transaksi</div>
          <div class="text-lg text-theme-primary font-medium mt-2">
            {{ data.type_customer }}
          </div>
          <div class="mt-1">Tipe Transaksi : {{ data.type_transaction }}</div>
          <div class="mt-1">origin Order : {{ data.origin_customer }}</div>
        </div>
        <div class="text-center sm:text-right sm:ml-auto">
          <div class="text-base text-slate-500">Total Amount</div>
          <div class="text-xl text-theme-primary font-medium mt-2">
            Rp. {{ currency(data.total_harga) }}
          </div>
          <div class="mt-1">Taxes included</div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  created() {
    this.getDetailTR(this.$route.params.kode);
  },
  computed: {
    ...mapState("transaction", {
      data: (state) => state.detailTR,
    }),
  },
  methods: {
    ...mapActions("transaction", ["getDetailTR"]),
    currency(data) {
      return new Intl.NumberFormat("id-ID", {
        maximumSignificantDigits: 6,
      }).format(data);
    },
  },
};
</script>
