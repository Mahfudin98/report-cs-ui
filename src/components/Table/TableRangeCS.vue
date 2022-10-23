<template>
  <div>
    <div
      v-for="(item, index) in items"
      :key="index"
      class="bg-white transition hover:shadow-lg hover:shadow-slate-500/60 rounded-md ease-in-out delay-200 hover:-translate-y-1 hover:scale-105"
    >
      <div class="box px-4 py-4 mb-3 flex items-center zoom-in">
        <div class="w-10 h-10 flex-none image-fit rounded-md overflow-hidden">
          <img
            class="object-cover object-center aspect-square h-10 w-10 bg-red-400 rounded-full"
            alt="Image Profile"
            :src="item.image"
          />
        </div>
        <div class="ml-4 mr-auto">
          <div class="font-medium">{{ item.nama }}</div>
          <div class="text-slate-500 text-xs mt-0.5">
            {{ item.produk }} Produk
          </div>
        </div>
        <div
          class="py-1 px-2 rounded-full text-xs bg-success text-slate-700 cursor-pointer font-medium"
        >
          Rp. {{ currency(item.omset) }}
        </div>
      </div>
    </div>
    <a
      href=""
      class="w-full block text-center rounded-md py-4 border border-dotted border-slate-400 dark:border-darkmode-300 text-slate-500"
      >View More</a
    >
  </div>
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
