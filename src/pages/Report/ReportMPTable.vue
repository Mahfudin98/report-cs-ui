<script setup>
import LodaingData from "@/components/Widget/LoadingData.vue";
import moment from "moment";
import Swal from "sweetalert2";
import { mapActions } from "vuex";
</script>
<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg mb-3">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="px-6 py-3">Order Code</th>
          <th scope="col" class="px-6 py-3">Order Origin</th>
          <th scope="col" class="px-6 py-3">Order Product</th>
          <th scope="col" class="px-6 py-3">Order Omset</th>
          <th scope="col" class="px-6 py-3">Order Date</th>
          <th scope="col" class="px-6 py-3">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          :class="{ hidden: isLoading }"
          v-for="(item, index) in orderData"
          :key="index"
        >
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ item.code }}
          </th>
          <td class="px-6 py-4 uppercase font-medium">
            {{ item.market_place }}
          </td>
          <td class="px-6 py-4">
            {{ currency(item.order_qty) }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            Rp. {{ currency(item.order_omset) }}
          </td>
          <td class="px-6 py-4">
            {{ moment(item.order_date).format("DD MMM, YYYY") }}
          </td>
          <td class="px-6 py-4">
            <button
              @click="destroy(item.code)"
              type="button"
              class="font-medium text-lg text-white bg-red-600 px-3 py-1.5 rounded-lg shadow-md hover:bg-red-700"
            >
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </td>
        </tr>
        <tr v-if="orderData == '' && !isLoading">
          <td class="px-6 py-4" colspan="6">
            <h2 class="text-center font-poppins font-medium text-base">
              Data Tidak Ditemukan!
            </h2>
          </td>
        </tr>
        <tr v-if="isLoading">
          <td class="px-6 py-4" colspan="6">
            <div class="w-full h-full flex items-center justify-center">
              <LodaingData />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  props: ["orderData", "isLoading"],
  methods: {
    ...mapActions("orderMP", ["removeOrderMP"]),
    currency(data) {
      return new Intl.NumberFormat("id-ID", {
        maximumSignificantDigits: 6,
      }).format(data);
    },
    destroy(code) {
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
          this.removeOrderMP(code);
          Swal.fire("Terhapus!", "Report Order berhasil dihapus.", "success");
        }
      });
    },
  },
};
</script>
