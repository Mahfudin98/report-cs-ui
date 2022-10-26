<script setup>
import Tooltip from "../Elements/Tooltip.vue";
</script>
<template>
  <a
    v-for="(item, index) in items"
    :key="index"
    href="javascript:;"
    class="block col-span-12 sm:col-span-4 2xl:col-span-3"
  >
    <div
      class="flex-shrink-0 relative overflow-hidden bg-theme-bg-light rounded-lg max-w-xs shadow-sm shadow-black/60"
    >
      <svg
        class="absolute bottom-0 left-0 mb-8"
        viewBox="0 0 375 283"
        fill="none"
        style="transform: scale(1.5); opacity: 0.1"
      >
        <rect
          x="159.52"
          y="175"
          width="152"
          height="152"
          rx="8"
          transform="rotate(-45 159.52 175)"
          fill="white"
        />
        <rect
          y="107.48"
          width="152"
          height="152"
          rx="8"
          transform="rotate(-45 0 107.48)"
          fill="white"
        />
      </svg>
      <div class="relative pt-4 px-4 flex items-center justify-center">
        <img class="relative rounded-md" :src="item.image" alt="" />
      </div>
      <div class="relative text-white px-6 pb-6 mt-6">
        <div class="flex justify-between">
          <span class="block opacity-75 -mb-1">{{ item.category }}</span>
          <span class="block opacity-75 -mb-1">Stok {{ item.stock }}</span>
        </div>
        <span class="block font-semibold text-lg">{{ item.nama_produk }}</span>
        <div class="flex justify-between pt-2">
          <Tooltip
            :button="'Harga Agen'"
            :title="'Rp. ' + currency(item.harga_agen)"
          />
          <Tooltip
            :button="'Harga Reseller'"
            :title="'Rp. ' + currency(item.harga_reseller)"
          />
          <Tooltip
            :button="'Harga Customer'"
            :title="'Rp. ' + currency(item.harga_end_user)"
          />
        </div>
      </div>
    </div>
  </a>
</template>
<script>
export default {
  props: ["items"],
  methods: {
    currency(data) {
      return new Intl.NumberFormat("id-ID", {
        maximumSignificantDigits: 6,
      }).format(data);
    },
  },
};
</script>
