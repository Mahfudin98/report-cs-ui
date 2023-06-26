<script setup>
import { mapActions, mapState } from "vuex";
import VueTailwindDatepicker from "vue-tailwind-datepicker";
import Swal from "sweetalert2";
import moment from "moment";
</script>
<template>
  <main>
    <div class="w-full py-3 px-4">
      <h2 class="font-poppins font-semibold text-xl text-slate-800">
        Form Report Order Marketplace
      </h2>
    </div>
    <section class="w-full px-4">
      <form
        @submit.prevent="submit"
        class="w-full flex justify-center items-center"
      >
        <div class="bg-white shadow-md flex flex-col rounded-xl p-4 w-fit">
          <div class="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                for="marketplace"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Marketplace
              </label>
              <select
                v-model="forms.market_place_id"
                id="marketplace"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              >
                <option value="">Pilih Marketplace</option>
                <option
                  v-for="(item, index) in listMP"
                  :key="index"
                  :value="item.id"
                >
                  {{ item.market_place_name }}
                </option>
              </select>
            </div>
            <div>
              <label
                for="order_date"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Order Date</label
              >
              <vue-tailwind-datepicker
                id="order_date"
                input-classes="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                :disable-date="disabledDate"
                :formatter="formatter"
                as-single
                overlay
                v-model="forms.order_date"
                required
              />
            </div>
          </div>
          <div class="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                for="order_product"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Order product</label
              >
              <input
                v-model="forms.order_product"
                type="number"
                id="order_product"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                for="order-omset"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Order Omset</label
              >
              <input
                v-model="forms.order_omset"
                type="number"
                id="order-omset"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
          </div>
          <div class="mb-6">
            <label
              for="description"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Keterangan</label
            >
            <textarea
              v-model="forms.description"
              id="description"
              rows="4"
              class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Tulisakan keterangan disini..."
            ></textarea>
          </div>
          <div class="self-end">
            <button
              type="submit"
              class="text-white flex justify-center items-center bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2"
            >
              Simpan
              <i class="fa-solid fa-floppy-disk ml-2"></i>
            </button>
          </div>
        </div>
      </form>
    </section>
  </main>
</template>
<script>
export default {
  created() {
    this.getListMP();
  },
  data() {
    return {
      formatter: {
        date: "DD MMM YYYY",
        month: "MMM",
      },
      forms: {
        market_place_id: "",
        order_product: 0,
        order_omset: 0,
        order_date: [],
        description: "",
      },
    };
  },
  computed: {
    ...mapState("orderMP", {
      listMP: (state) => state.listMP,
    }),
  },
  methods: {
    ...mapActions("orderMP", ["getListMP", "storeOrderMP"]),
    disabledDate(date) {
      return date == new Date() || date > new Date();
    },
    submit() {
      var form = new FormData();

      form.append("market_place_id", this.forms.market_place_id);
      form.append("order_product", this.forms.order_product);
      form.append("order_omset", this.forms.order_omset);
      form.append(
        "order_date",
        moment(this.forms.order_date[0]).format("YYYY-MM-DD")
      );
      form.append("description", this.forms.description);

      this.storeOrderMP(form)
        .then(() => {
          Swal.fire("Good job!", "You clicked the button!", "success");
          this.forms = {
            market_place_id: "",
            order_product: 0,
            order_omset: 0,
            order_date: "",
            description: "",
          };
          this.$router.push({
            name: "report-mp-data",
          });
        })
        .catch(() => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: '<a href="">Why do I have this issue?</a>',
          });
        });
    },
  },
};
</script>
