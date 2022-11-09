<script setup>
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
import moment from "moment";
</script>

<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-full transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                <!-- title -->
              </DialogTitle>
              <!-- component -->

              <div
                class="flex justify-center items-center h-screen bg-gray-200 text-gray-900 px-4 rounded-md"
              >
                <div
                  class="rounded-md relative md:w-full lg:w-[850px] xl:w-[1080px] shadow-2xl p-3 bg-white"
                >
                  <div class="py-2">
                    <div class="text-center text-xl font-bold">ORDER</div>
                    <div class="text-center text-xs font-bold">
                      CS {{ index.user }}
                    </div>
                  </div>
                  <div class="text-center text-xs font-bold">
                    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                  </div>
                  <div class="text-center text-md font-bold mb-2">
                    Tanggal Transaksi (
                    {{ moment(index.tanggal).format("DD-MM-YYYY") }} )
                  </div>
                  <div class="text-xs pl-2">
                    <div class="text-md mb-1 font-semibold">
                      Origin Order: {{ index.origin_customer }}
                    </div>
                    <div class="text-xs mb-1">Customer：{{ index.nama }}</div>
                    <div class="text-xs mb-1">Phone：{{ index.phone }}</div>
                    <div class="text-xs mb-1">Alamat：{{ index.alamat }}</div>
                    <div>OrderNumber：{{ index.nomor_pesanan }}</div>
                  </div>
                  <div
                    class="border-double border-t-4 border-b-4 border-l-0 border-r-0 border-gray-900 my-3"
                  >
                    <div class="flex text-sm pt-1 px-1">
                      <span class="w-4/6">Name</span>
                      <span class="w-2/6 text-right">Price</span>
                      <span class="w-2/6 text-right">Discount</span>
                      <span class="w-2/6 text-right">QTY</span>
                      <span class="w-2/6 text-right">Total Harga</span>
                    </div>
                    <div
                      class="border-dashed border-t border-b border-l-0 border-r-0 border-gray-900 mt-1 my-2 py-2 px-1"
                    >
                      <div
                        class="flex justify-between text-sm"
                        v-for="row in index.produk"
                        :key="row"
                      >
                        <span class="w-4/6 truncate">{{
                          row.product_name
                        }}</span>
                        <span class="w-2/6 text-right">{{
                          row.product_price
                        }}</span>
                        <span class="w-2/6 text-right">{{ row.discount }}</span>
                        <span class="w-2/6 text-right">{{ row.qty }}</span>
                        <span class="w-2/6 text-right">{{
                          row.jumlah_harga
                        }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="text-xs">
                    <div class="mb-1 text-md font-semibold">
                      Tipe Transaksi: {{ index.type_transaction }}
                    </div>
                    <div
                      class="mb-1"
                      :class="{
                        hidden: index.type_transaction != 'COD',
                        block: index.type_transaction == 'COD',
                      }"
                    >
                      Biaya COD: {{ getBiayaCOD }}
                    </div>
                    <div class="mb-1">Berat: {{ getWeight }}</div>
                    <div class="mb-1">Expedisi: {{ index.expedisi }}</div>
                    <div class="mb-48">Ongkir: {{ index.ongkir }}</div>
                    <div class="text-right">
                      <div>
                        Tanggal:
                        {{ moment(index.tanggal).format("DD-MM-YYYY") }}
                      </div>
                      <div class="font-bold text-sm">
                        Total Harga：{{ getTotal }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <slot name="button" />
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
<script>
export default {
  props: {
    isOpen: Boolean,
    index: String,
  },
  data() {
    return {
      open: this.isOpen,
    };
  },
  computed: {
    getWeight() {
      const w =
        this.index.weight > 1000
          ? this.index.weight / 1000 + " KG"
          : this.index.weight + " Gr";
      return w;
    },
    getBiayaCOD() {
      let harga = this.index.total_harga;
      let ongkir = this.index.ongkir;
      let expedisi = this.index.expedisi;
      if (expedisi == "jne") {
        const biaya = ((parseInt(harga) + parseInt(ongkir)) * 3) / 100;
        return biaya;
      } else if (expedisi == "jnt") {
        const biaya = (parseInt(harga) * 3) / 100;
        return biaya;
      } else {
        const biaya = (3 / 100) * parseInt(harga);
        return biaya;
      }
    },
    getTotal() {
      let harga = this.index.total_harga;
      let biayacod = this.getBiayaCOD;
      let ongkir = this.index.ongkir;
      let type = this.index.type_transaction;
      if (type == "COD") {
        return parseInt(harga) + parseInt(biayacod) + parseInt(ongkir);
      } else {
        return parseInt(harga) + parseInt(ongkir);
      }
    },
  },
  methods: {
    closeModal() {
      this.open = false;
    },
  },
};
</script>
