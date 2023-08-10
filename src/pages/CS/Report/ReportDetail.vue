<script setup>
import { mapActions, mapState } from "vuex";
import Logo from "../../../assets/logo.png";
import moment from "moment";
import { ArrowPathIcon } from "@heroicons/vue/24/outline";
</script>
<template>
  <main class="grid grid-cols-12 gap-6">
    <div class="col-span-12">
      <div class="p-4 bg-white rounded-lg shadow-md">
        <h2 class="text-xl font-semibold font-poppins text-slate-800">
          Invoice
          <span class="text-green-500">{{ detailData.nomor_pesanan }}</span>
        </h2>
      </div>
    </div>
    <div class="col-span-12">
      <div class="flex items-center justify-center w-full">
        <div
          v-if="!isLoading"
          class="flex flex-col w-full max-w-2xl gap-3 p-4 bg-white rounded-lg shadow-md"
        >
          <div
            class="flex items-center justify-between gap-3 pt-3 pb-5 border-b-2"
          >
            <div class="flex items-center gap-3">
              <div class="w-[70px] rounded-lg p-1 border-2">
                <img :src="Logo" alt="" class="object-cover w-full" />
              </div>
              <div>
                <p class="text-sm font-normal text-gray-500 font-poppins">
                  Invoice
                </p>
                <h1
                  class="text-base font-semibold text-gray-800 uppercase font-poppins"
                >
                  {{ detailData.nomor_pesanan }}
                </h1>
                <p class="text-xs font-normal text-gray-500 font-poppins">
                  {{ detailData.expedisi }}/{{ detailData.type_transaction }}
                </p>
              </div>
            </div>
            <div class="flex flex-col">
              <p
                class="text-sm font-normal text-gray-500 font-poppins text-end"
              >
                Date
              </p>
              <h1
                class="text-sm font-semibold text-gray-800 uppercase font-poppins"
              >
                {{ moment(detailData.tanggal).format("DD MMM, YYYY") }}
              </h1>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3 px-2 py-3 border-b-2 pb-7">
            <div>
              <p
                class="mb-3 text-sm font-medium text-gray-500 uppercase font-poppins"
              >
                To
              </p>
              <h3
                class="text-base font-semibold text-gray-800 truncate font-poppins"
              >
                {{ detailData.nama }}
              </h3>
              <p class="text-sm font-medium text-gray-500 font-poppins">
                {{ detailData.member }}
              </p>
            </div>
            <div>
              <p
                class="mb-3 text-sm font-medium text-gray-500 uppercase font-poppins"
              >
                from
              </p>
              <h3 class="text-base font-semibold text-gray-800 font-poppins">
                {{ detailData.nama_cs }}
              </h3>
              <p
                class="text-sm font-medium text-gray-500 truncate font-poppins"
              >
                {{ detailData.email_cs }}
              </p>
            </div>
          </div>
          <div class="pb-3 border-b-2">
            <div class="relative overflow-x-auto md:overflow-y-hidden">
              <table
                class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
              >
                <thead
                  class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400"
                >
                  <tr>
                    <th scope="col" class="px-4 py-3 rounded-l-lg">
                      Product name
                    </th>
                    <th scope="col" class="px-4 py-3">Qty</th>
                    <th scope="col" class="px-4 py-3">Discount</th>
                    <th scope="col" class="px-4 py-3">Discount</th>
                    <th scope="col" class="px-4 py-3">Price</th>
                    <th scope="col" class="px-4 py-3 rounded-r-lg">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, index) in products"
                    :key="index"
                    class="bg-white"
                  >
                    <td scope="row" class="px-4 py-4">
                      <h1 class="w-32 font-medium text-gray-900 truncate">
                        {{ item.product_name }}
                      </h1>
                    </td>
                    <td class="px-4 py-4">{{ item.qty }}</td>
                    <td class="px-4 py-4">{{ item.addition }}</td>
                    <td class="px-4 py-4">{{ item.discount }}</td>
                    <td class="px-4 py-4">
                      {{ currency(item.product_price) }}
                    </td>
                    <td class="px-4 py-4">{{ currency(item.jumlah_harga) }}</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr class="font-semibold text-white bg-gray-500 rounded-lg">
                    <th scope="row" class="px-4 py-3 text-base rounded-l-lg">
                      Total
                    </th>
                    <td class="px-4 py-3">{{ currency(totalQty) }}</td>
                    <td
                      colspan="4"
                      class="px-4 py-3 font-semibold text-center rounded-r-lg"
                    >
                      Rp. {{ currency(detailData.total_harga) }}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
          <div
            class="grid grid-cols-1 gap-3 px-2 pb-3 border-b-2 md:grid-cols-3"
          >
            <div class="text-start">
              <p class="mb-2 text-sm font-medium text-gray-500 font-poppins">
                Subtotal
              </p>
              <h1 class="text-lg font-semibold text-gray-700 font-poppins">
                Rp. {{ currency(detailData.total_harga) }}
              </h1>
            </div>
            <div class="text-start md:text-center">
              <p class="mb-2 text-sm font-medium text-gray-500 font-poppins">
                Ongkir
                <span v-if="detailData.type_transaction == 'COD'">
                  (COD 3%)
                </span>
              </p>
              <h1
                class="relative text-lg font-semibold text-gray-700 font-poppins"
              >
                Rp. {{ currency(detailData.ongkir) }}
                <span
                  v-if="detailData.type_transaction == 'COD'"
                  class="absolute top-0 text-xs font-medium text-gray-500 font-poppins"
                >
                  ({{ currency(biayaCOD) }})
                </span>
              </h1>
            </div>
            <div class="text-start md:text-end">
              <p class="mb-2 text-sm font-medium text-gray-500 font-poppins">
                Total Amount
              </p>
              <h1 class="text-lg font-semibold text-gray-700 font-poppins">
                Rp. {{ currency(totalAmount) }}
              </h1>
            </div>
          </div>
          <div class="flex flex-col px-2 pb-1">
            <p
              class="mb-3 text-sm font-normal text-gray-500 uppercase font-poppins"
            >
              Detail Lainnya
            </p>
            <div class="mb-2">
              <p class="mb-0 text-sm font-normal text-gray-500 font-poppins">
                Alamat
              </p>
              <h3 class="text-base font-semibold text-gray-700 font-poppins">
                {{ detailData.alamat }}
              </h3>
            </div>
            <div class="flex gap-6">
              <div>
                <p class="mb-0 text-sm font-normal text-gray-500 font-poppins">
                  Customer Order
                </p>
                <h3 class="text-base font-semibold text-gray-700 font-poppins">
                  {{ detailData.origin_customer }}
                </h3>
              </div>
              <div>
                <p class="mb-0 text-sm font-normal text-gray-500 font-poppins">
                  Nomor HP
                </p>
                <h3 class="text-base font-semibold text-gray-700 font-poppins">
                  {{ detailData.phone }}
                </h3>
              </div>
            </div>
          </div>
        </div>

        <div
          v-if="isLoading"
          class="flex flex-col justify-center items-center w-full max-w-2xl gap-3 p-4 bg-white rounded-lg shadow-md h-[405px]"
        >
          <ArrowPathIcon class="w-8 h-8 text-gray-800 animate-spin" />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  created() {
    this.getDetailTR(this.$route.params.kode).then(() => {
      setTimeout(() => {
        (this.isLoading = false), 5000;
      });
    });
  },
  data() {
    return {
      isLoading: true,
    };
  },
  computed: {
    ...mapState("transaction", {
      detailData: (state) => state.detailTR,
    }),
    products() {
      let data = [];
      data = this.detailData.produk;
      return data;
    },
    totalQty() {
      var data = 0;
      if (!this.isLoading) {
        data = this.products.reduce((a, i) => {
          return a + parseInt(i.qty);
        }, 0);
      }
      return data;
    },
    biayaCOD() {
      let data = 0;
      if (!this.isLoading) {
        let harga = this.detailData.total_harga;
        let biaya = (3 / 100) * harga;
        data = Math.trunc(biaya);
      }
      return data;
    },
    totalAmount() {
      let data = 0;
      if (!this.isLoading) {
        let harga = this.detailData.total_harga;
        let biaya = (3 / 100) * harga;
        if (this.detailData.type_transaction == "COD") {
          data = harga + this.detailData.ongkir + biaya;
        }
        data = harga + this.detailData.ongkir;
      }
      return data;
    },
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
