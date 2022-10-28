<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { mapState, mapActions } from "vuex";
import Swal from "sweetalert2";
</script>
<template>
  <main>
    <div class="w-full flex py-3 px-4">
      <h2 class="flex-none font-poppins font-semibold text-xl text-slate-800">
        Report Form
      </h2>
      <a
        href=""
        class="w-full flex gap-2 justify-end self-center text-theme-primary"
      >
        <i class="fa-solid fa-rotate w-5 h-5"></i>
        <p class="font-poppins text-sm">Reload Data</p>
      </a>
    </div>
    <!-- content -->
    <form @submit.prevent="submit" class="w-full md:mt-2">
      <div class="flex flex-wrap mb-5">
        <div
          class="w-full px-4"
          :class="
            transaction.type_customer == ''
              ? 'lg:w-full transition duration-700 ease-in-out'
              : 'lg:w-4/12 transition duration-700 ease-in-out'
          "
        >
          <div
            class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0 bg-slate-200"
          >
            <div class="rounded-t bg-slate-800 mb-0 px-6 py-6">
              <div class="text-center flex justify-between">
                <h6 class="text-white text-xl font-semibold">Pilih Customer</h6>
              </div>
            </div>

            <div class="flex-auto px-4 py-5 pt-5 rounded-b bg-slate-200">
              <div class="flex-wrap">
                <div class="w-full mb-5">
                  <label for="reseller" class="sr-only"
                    >Pilih Tipe Customer</label
                  >
                  <select
                    v-model="transaction.type_customer"
                    class="bg-gray-50 border border-slate-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  >
                    <option value="">Pilih Tipe Customer</option>
                    <option value="0">Reseller</option>
                    <option value="1">Agen</option>
                    <option value="2">End User</option>
                  </select>
                </div>
                <div class="w-full mb-5">
                  <label for="reseller" class="sr-only"
                    >Pilih Asal Customer</label
                  >
                  <select
                    v-model="transaction.origin_customer"
                    class="bg-gray-50 border border-slate-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  >
                    <option value="">Pilih Asal Customer</option>
                    <option value="0">Iklan ADV</option>
                    <option value="1">Market Place</option>
                    <option value="2">Repeat Order</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Data Reseller -->
        <div
          class="w-full px-4"
          :class="
            transaction.type_customer == 0 && transaction.type_customer != ''
              ? 'lg:w-4/6'
              : 'hidden'
          "
        >
          <div
            class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0 bg-slate-200"
          >
            <div class="rounded-t bg-slate-800 mb-0 px-6 py-6">
              <div class="text-center flex justify-between">
                <h6 class="text-white text-xl font-semibold">Data Reseller</h6>
              </div>
            </div>

            <div class="flex-auto px-4 py-5 pt-5 rounded-b bg-slate-200">
              <div class="flex flex-wrap">
                <div class="w-full lg:w-6/12 px-4 mb-5">
                  <label for="reseller" class="sr-only">Pilih Reseller</label>
                  <select
                    v-model="reseller.reseller_id"
                    @click="setReseller($event)"
                    :required="transaction.type_customer == 0"
                    id="reseller"
                    class="block py-2.5 px-0 w-full text-sm text-slate-600 bg-transparent border-0 border-b-2 border-slate-300 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-slate-300 peer"
                  >
                    <option value="">Pilih Reseller</option>
                    <option
                      v-for="(reseller, index) in getReseller"
                      :key="index"
                      :value="reseller.id"
                    >
                      {{ reseller.member_name }}
                    </option>
                  </select>
                </div>

                <div class="w-full lg:w-6/12 px-4 mb-5">
                  <div class="relative z-0">
                    <input
                      type="text"
                      id="reseller_name"
                      class="block cursor-not-allowed py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-slate-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      disabled
                      placeholder=" "
                      v-model="reseller.reseller_name"
                    />
                    <label
                      for="reseller_name"
                      class="absolute text-sm text-slate-600 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >Nama Reseller</label
                    >
                  </div>
                </div>

                <div class="w-full lg:w-6/12 px-4 mb-5">
                  <div class="relative z-0">
                    <input
                      type="text"
                      id="reseller_alamat"
                      class="block cursor-not-allowed py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-slate-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      disabled
                      placeholder=" "
                      v-model="reseller.reseller_alamat"
                    />
                    <label
                      for="reseller_alamat"
                      class="absolute text-sm text-slate-600 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >Alamat Reseller</label
                    >
                  </div>
                </div>

                <div class="w-full lg:w-6/12 px-4 mb-5">
                  <div class="relative z-0">
                    <input
                      type="text"
                      id="reseller_phone"
                      class="block cursor-not-allowed py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-slate-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      disabled
                      placeholder=" "
                      v-model="reseller.reseller_phone"
                    />
                    <label
                      for="reseller_phone"
                      class="absolute text-sm text-slate-600 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >Nomor Telepon</label
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Data Agen -->
        <div
          class="w-full px-4"
          :class="
            transaction.type_customer == 1 && transaction.type_customer != ''
              ? 'lg:w-4/6'
              : 'hidden'
          "
        >
          <div
            class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0 bg-slate-200"
          >
            <div class="rounded-t bg-slate-800 mb-0 px-6 py-6">
              <div class="text-center flex justify-between">
                <h6 class="text-white text-xl font-semibold">Data Agen</h6>
              </div>
            </div>

            <div class="flex-auto px-4 py-5 pt-5 rounded-b bg-slate-200">
              <div class="flex flex-wrap">
                <div class="w-full lg:w-6/12 px-4 mb-5">
                  <label for="agen" class="sr-only">Pilih Agen</label>
                  <select
                    :required="transaction.type_customer == 1"
                    v-model="agen.agen_id"
                    @click="setAgen($event)"
                    id="agen"
                    class="block py-2.5 px-0 w-full text-sm text-slate-600 bg-transparent border-0 border-b-2 border-slate-300 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-slate-300 peer"
                  >
                    <option value="">Pilih Agen</option>
                    <option
                      v-for="(agen, index) in getAgen"
                      :key="index"
                      :value="agen.id"
                    >
                      {{ agen.member_name }}
                    </option>
                  </select>
                </div>

                <div class="w-full lg:w-6/12 px-4 mb-5">
                  <div class="relative z-0">
                    <input
                      type="text"
                      id="agen_name"
                      class="block cursor-not-allowed py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-slate-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      disabled
                      placeholder=" "
                      v-model="agen.agen_name"
                    />
                    <label
                      for="agen_name"
                      class="absolute text-sm text-slate-600 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >Nama Agen</label
                    >
                  </div>
                </div>

                <div class="w-full lg:w-6/12 px-4 mb-5">
                  <div class="relative z-0">
                    <input
                      type="text"
                      id="agen_alamat"
                      class="block cursor-not-allowed py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-slate-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      disabled
                      placeholder=" "
                      v-model="agen.agen_alamat"
                    />
                    <label
                      for="agen_alamat"
                      class="absolute text-sm text-slate-600 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >Alamat Agen</label
                    >
                  </div>
                </div>

                <div class="w-full lg:w-6/12 px-4 mb-5">
                  <div class="relative z-0">
                    <input
                      type="text"
                      id="agen_phone"
                      class="block cursor-not-allowed py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-slate-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      disabled
                      placeholder=" "
                      v-model="agen.agen_phone"
                    />
                    <label
                      for="agen_phone"
                      class="absolute text-sm text-slate-600 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >Nomor Telepon</label
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Data Customer -->
        <div
          class="w-full px-4"
          :class="
            transaction.type_customer == 2 && transaction.type_customer != ''
              ? 'lg:w-4/6'
              : 'hidden'
          "
        >
          <div
            class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0 bg-slate-200"
          >
            <div class="rounded-t bg-slate-800 mb-0 px-6 py-6">
              <div class="text-center flex justify-between">
                <h6 class="text-white text-xl font-semibold">Data Customer</h6>
              </div>
            </div>

            <div class="flex-auto px-4 py-5 pt-5 rounded-b bg-slate-200">
              <div class="flex flex-wrap">
                <div class="w-full lg:w-6/12 px-4 mb-5">
                  <div class="relative z-0">
                    <input
                      type="text"
                      id="customer_name"
                      class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-slate-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      :required="transaction.type_customer == 2"
                      v-model="customer.customer_name"
                    />
                    <label
                      for="customer_name"
                      class="absolute text-sm text-slate-600 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >Nama Customer</label
                    >
                  </div>
                </div>

                <div class="w-full lg:w-6/12 px-4 mb-5">
                  <div class="relative z-0">
                    <input
                      type="text"
                      id="customer_phone"
                      class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-slate-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      :required="transaction.type_customer == 2"
                      v-model="customer.customer_phone"
                    />
                    <label
                      for="customer_phone"
                      class="absolute text-sm text-slate-600 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >HP Customer</label
                    >
                  </div>
                </div>

                <div class="w-full lg:w-6/12 px-4 mb-5">
                  <label for="provinsi" class="sr-only">Provinsi</label>
                  <select
                    id="provinsi"
                    class="block py-2.5 px-0 w-full text-sm text-slate-600 bg-transparent border-0 border-b-2 border-slate-300 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-slate-300 peer"
                    v-model="ongkir.provinsi"
                    @click="setProvinsi($event)"
                    :required="transaction.type_customer == 2"
                  >
                    <option value="">Pilih Provinsi</option>
                    <option
                      v-for="(provinsi, index) in provinsi"
                      :key="index"
                      :value="provinsi.province_id"
                    >
                      {{ provinsi.province }}
                    </option>
                  </select>
                </div>

                <div class="w-full lg:w-6/12 px-4 mb-5">
                  <label for="kota" class="sr-only">Kota</label>
                  <select
                    id="kota"
                    class="block py-2.5 px-0 w-full text-sm text-slate-600 bg-transparent border-0 border-b-2 border-slate-300 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-slate-300 peer"
                    v-model="ongkir.kota"
                    @click="setKota($event)"
                    :required="transaction.type_customer == 2"
                  >
                    <option value="">Pilih Kota</option>
                    <option
                      v-for="(kota, index) in kota"
                      :key="index"
                      :value="kota.city_id"
                    >
                      {{ kota.city_name }}
                    </option>
                  </select>
                </div>

                <div class="w-full lg:w-6/12 px-4 mb-5">
                  <label for="district_id" class="sr-only">Kecamatan</label>
                  <select
                    id="district_id"
                    class="block py-2.5 px-0 w-full text-sm text-slate-600 bg-transparent border-0 border-b-2 border-slate-300 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-slate-300 peer"
                    v-model="ongkir.kecamatan"
                    :required="transaction.type_customer == 2"
                  >
                    <option value="">Pilih Kecamatan</option>
                    <option
                      v-for="(kecamatan, index) in kecamatan"
                      :key="index"
                      :value="kecamatan.subdistrict_id"
                    >
                      {{ kecamatan.subdistrict_name }}
                    </option>
                  </select>
                </div>

                <div class="w-full lg:w-6/12 px-4 mb-5">
                  <div class="relative z-0">
                    <input
                      type="text"
                      id="customer_alamat"
                      class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-slate-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      :required="transaction.type_customer == 2"
                      v-model="customer.customer_alamat"
                    />
                    <label
                      for="customer_alamat"
                      class="absolute text-sm text-slate-600 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >Alamat Customer</label
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Data Product -->
        <div
          class="w-full px-4"
          :class="
            transaction.type_customer != ''
              ? 'lg:w-1/2 transition duration-700 ease-in-out'
              : 'hidden'
          "
        >
          <div
            class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0 bg-slate-200"
          >
            <div class="rounded-t bg-slate-800 mb-0 px-6 py-6">
              <div class="text-center flex justify-between">
                <h6 class="text-white text-xl font-semibold">Pilih Produk</h6>
                <button
                  class="bg-emerald-500 text-white active:bg-emerald-600 font-semibold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button"
                  @click="addProduct"
                >
                  Add product
                  <i class="fa-solid fa-circle-plus ml-1"></i>
                </button>
              </div>
            </div>

            <div
              class="flex-auto px-4 py-5 pt-5 rounded-b bg-slate-200"
              v-for="(item, index) in productArr"
              :key="index"
            >
              <div class="relative">
                <div
                  class="absolute -top-3 -right-1 bg-emerald-500 rounded-md shadow-md px-4 py-1 text-white"
                >
                  Produk {{ index + 1 }}
                </div>
              </div>
              <div class="relative">
                <div class="absolute -top-3 -left-3 h-8 w-8 text-red-500">
                  <button type="button" @click="removeProduct(index)">
                    <i
                      class="fa-solid fa-circle-xmark h-8 w-8 rounded-full shadow-md"
                    ></i>
                  </button>
                </div>
              </div>
              <div
                class="p-6 bg-slate-800 rounded-lg border border-gray-200 shadow-md"
              >
                <div class="flex flex-wrap">
                  <div class="w-full px-4">
                    <div class="relative w-full mb-5">
                      <label
                        for="product_weight"
                        class="block mb-2 text-sm font-medium text-white dark:text-gray-300"
                        >Pilih Produk</label
                      >
                      <select
                        v-model="product.product_id[index]"
                        @change="
                          setHarga($event, index),
                            setBerat($event, index),
                            setNama($event, index)
                        "
                        class="bg-gray-50 border border-slate-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                      >
                        <option value="">Pilih Produk</option>
                        <option
                          v-for="(product, index) in products"
                          :key="index"
                          :value="product.product_id"
                        >
                          {{ product.product_name }} {{ product.category_pay }}
                        </option>
                      </select>
                    </div>
                  </div>

                  <div class="w-full lg:w-6/12 px-4">
                    <div class="relative w-full mb-5">
                      <label
                        for="qty"
                        class="block mb-2 text-sm font-medium text-white dark:text-gray-300"
                        >Jumlah Produk</label
                      >
                      <input
                        type="number"
                        id="qty"
                        class="bg-gray-50 border border-slate-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        v-model="product.qty[index]"
                        required
                      />
                    </div>
                  </div>

                  <div class="w-full lg:w-6/12 px-4">
                    <div class="relative w-full mb-5">
                      <label
                        for="product_price"
                        class="block mb-2 text-sm font-medium text-white dark:text-gray-300"
                        >Harga Produk</label
                      >
                      <input
                        type="number"
                        id="product_price"
                        aria-label="disabled input"
                        class="mb-6 bg-gray-100 border border-slate-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        v-model="product.product_price[index]"
                        disabled
                      />
                    </div>
                  </div>

                  <div class="w-full lg:w-6/12 px-4">
                    <div class="relative w-full mb-5">
                      <label
                        for="product_weight"
                        class="block mb-2 text-sm font-medium text-white dark:text-gray-300"
                        >Berat Produk</label
                      >
                      <input
                        type="number"
                        id="product_weight"
                        aria-label="disabled input"
                        class="mb-6 bg-gray-100 border border-slate-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        v-model="product.product_weight[index]"
                        disabled
                      />
                    </div>
                  </div>

                  <div class="w-full lg:w-6/12 px-4">
                    <div class="relative w-full mb-5">
                      <label
                        for="discount"
                        class="block mb-2 text-sm font-medium text-white dark:text-gray-300"
                        >Diskon Produk</label
                      >
                      <input
                        type="number"
                        id="discount"
                        class="bg-gray-50 border border-slate-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        v-model="product.discount[index]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Transaction -->
        <div
          class="w-full px-4"
          :class="
            transaction.type_customer != ''
              ? 'lg:w-1/2 transition duration-700 ease-in-out'
              : 'hidden'
          "
        >
          <div
            class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0 bg-slate-200"
          >
            <div class="rounded-t bg-slate-800 mb-0 px-6 py-6">
              <div class="text-center flex justify-between">
                <h6 class="text-white text-xl font-semibold">Data Transaksi</h6>
              </div>
            </div>

            <div class="flex-auto px-4 py-5 pt-5 rounded-b bg-slate-200">
              <div class="flex flex-wrap">
                <div class="w-full lg:w-6/12 px-4 mb-5">
                  <label
                    for="tanggal_transaksi"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >Tanggal Transaksi</label
                  >
                  <input
                    type="date"
                    id="tanggal_transaksi"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    v-model="transaction.tanggal_transaksi"
                    required
                  />
                </div>
                <div class="w-full lg:w-6/12 px-4 mb-5">
                  <label
                    for="countries"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                    >Expedisi</label
                  >
                  <select
                    id="countries"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    v-model="transaction.expedisi"
                    @change="setOngkir($event)"
                    required
                  >
                    <option value="">Pilih Expedisi</option>
                    <option value="jne">JNE</option>
                    <option value="jnt">J&T</option>
                    <option value="sicepat">SICEPAT</option>
                    <option value="ninja">NINJA</option>
                    <option value="anteraja">ANTER AJA</option>
                  </select>
                </div>
                <div class="w-full lg:w-6/12 px-4 mb-5">
                  <label
                    for="product_price"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >Harga Ongkir</label
                  >
                  <input
                    type="text"
                    id="product_price"
                    aria-label="disabled input"
                    class="bg-gray-100 border border-slate-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    disabled
                    v-model="transaction.ongkir"
                  />
                </div>
                <div class="w-full lg:w-6/12 px-4 mb-5">
                  <label
                    for="type"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                    >Tipe Transaksi</label
                  >
                  <select
                    id="type"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    v-model="transaction.type_transaction"
                    required
                  >
                    <option value="">Tipe Transaksi</option>
                    <option value="0">COD</option>
                    <option value="1">TRANSFER</option>
                  </select>
                </div>
                <div class="w-full px-4 mb-5">
                  <label
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    for="file_input"
                    >Bukti Transfer</label
                  >
                  <input
                    class="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    id="file_input"
                    type="file"
                    accept="image/*"
                    ref="imageInput"
                    @change="onFileChange"
                  />
                  <p class="mt-1 text-sm text-gray-500" id="file_input_help">
                    kosongkan jika tidak ingin mengisi.
                  </p>
                </div>
                <div class="w-full px-4 mx-auto mb-5 object-center" v-if="url">
                  <div class="relative">
                    <div class="absolute -top-3 -left-3 h-8 w-8 text-red-500">
                      <button @click="removeImage()" type="button">
                        <i
                          class="fa-solid fa-circle-xmark h-8 w-8 rounded-full shadow-md"
                        ></i>
                      </button>
                    </div>
                  </div>
                  <div
                    class="hero bg-slate-800 rounded-lg container max-w-screen-lg mx-auto"
                  >
                    <img
                      :src="url"
                      class="object-contain mx-auto h-48 w-48"
                      alt="Bukti Transfer"
                    />
                  </div>
                </div>
                <div class="w-full px-4 mb-5">
                  <label
                    for="message"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                    >Catatan</label
                  >
                  <textarea
                    id="message"
                    rows="4"
                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Catatan..."
                    v-model="transaction.catatan"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Submit Button -->
        <div
          class="px-4"
          :class="
            transaction.type_customer != ''
              ? 'lg:w-full transition duration-700 ease-in-out'
              : 'hidden'
          "
        >
          <div class="bg-slate-800 flex-auto px-4 py-3 shadow-lg rounded-lg">
            <div class="text-center flex justify-between">
              <div
                class="text-white bottom-0 right-0 font-medium rounded-lg text-sm py-2.5 text-center inline-flex items-center mr-2"
              >
                Pastikan Semua Data Benar!!!
              </div>
              <button
                type="submit"
                class="text-white bottom-0 right-0 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <i class="fa-solid fa-circle-plus mr-2 -ml-1 w-5 h-5"></i>
                Add Transaction
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  </main>
</template>

<script>
export default {
  data() {
    return {
      transaction: {
        tanggal_transaksi: "",
        expedisi: "",
        ongkir: 0,
        image: "",
        origin_customer: "",
        type_customer: "",
        type_transaction: "",
        catatan: "",
      },
      customer: {
        customer_name: "",
        customer_phone: "",
        customer_alamat: "",
      },
      reseller: {
        reseller_id: "",
        district_id: "",
        reseller_name: "",
        reseller_alamat: "",
        reseller_phone: "",
      },
      agen: {
        agen_id: "",
        district_id: "",
        agen_name: "",
        agen_alamat: "",
        agen_phone: "",
      },
      productArr: [],
      product: {
        product_id: [""],
        product_name: [""],
        product_weight: [0],
        product_price: [0],
        qty: [0],
        discount: [0],
      },
      ongkir: {
        provinsi: "",
        kota: "",
        kecamatan: "",
      },
      url: "",
    };
  },
  created() {
    this.getProductSelect();
    this.getSelectMember();
    this.getProvinsi();
    this.getKota();
    this.getKecamatan();
  },
  computed: {
    ...mapState("product", {
      products: (state) => state.select_products,
    }),
    ...mapState("member", {
      members: (state) => state.select_member,
    }),
    ...mapState("ongkir", {
      provinsi: (state) => state.provinsi,
      kota: (state) => state.kota,
      kecamatan: (state) => state.kecamatan,
      cost: (state) => state.ongkir,
    }),

    getAgen() {
      let data = this.members;
      let filtered = data.filter((item) => {
        return item.member_type == 1;
      });
      return filtered;
    },
    getReseller() {
      let data = this.members;
      let filtered = data.filter((item) => {
        return item.member_type == 0;
      });
      return filtered;
    },

    getWeight() {
      var weight = this.product.product_weight;
      Object.keys(weight).map(function (key) {
        return parseInt(weight[key]);
      });

      var jumlah = this.product.qty;
      var qty = Object.keys(jumlah).map(function (key) {
        return parseInt(jumlah[key]);
      });

      var multi = weight.map(function (w, i) {
        return w * qty[i];
      });

      var sum = multi.reduce((acc, item) => acc + item);

      return sum;
    },
  },
  watch: {},
  methods: {
    ...mapActions("product", ["getProductSelect"]),
    ...mapActions("member", ["getSelectMember"]),
    ...mapActions("ongkir", [
      "getProvinsi",
      "getKota",
      "getKecamatan",
      "getOngkir",
    ]),
    ...mapActions("transaction", ["postTransaction"]),
    onFileChange(e) {
      const file = e.target.files[0];
      this.url = URL.createObjectURL(file);
      this.transaction.image = file;
    },
    removeImage() {
      this.url = null;
      this.transaction.image = "";
      this.$refs.imageInput.value = null;
    },
    addProduct() {
      this.productArr.push({
        value: "",
      });
    },
    removeProduct(index) {
      this.product = {
        product_id: [""],
        product_name: [""],
        product_weight: [0],
        product_price: [0],
        qty: [0],
        discount: [0],
        total: [0],
      };
      this.productArr.splice(index, 1);
    },
    setHarga(event, index) {
      let data = this.products;
      if (event.target.value[index] != "") {
        let filtered = data.filter((item) => {
          return item.product_id == event.target.value;
        });
        if (this.transaction.type_customer == 0) {
          this.product.product_price[index] = filtered[0].reseller;
        } else if (this.transaction.type_customer == 1) {
          this.product.product_price[index] = filtered[0].agen;
        } else if (this.transaction.type_customer == 2) {
          this.product.product_price[index] = filtered[0].end_user;
        }
        return this.product.product_price[index];
      }
    },
    setBerat(event, index) {
      let data = this.products;
      if (event.target.value[index] != "") {
        let filtered = data.filter((item) => {
          return item.product_id == event.target.value;
        });
        this.product.product_weight[index] = filtered[0].product_weight;
        return this.product.product_weight[index];
      }
    },
    setNama(event, index) {
      let data = this.products;
      if (event.target.value[index] != "") {
        let filtered = data.filter((item) => {
          return item.product_id == event.target.value;
        });
        this.product.product_name[index] = filtered[0].product_name;
        return this.product.product_name[index];
      }
    },

    setReseller(event) {
      let data = this.getReseller;
      if (event.target.value != "") {
        let filtered = data.filter((item) => {
          return item.id == event.target.value;
        });
        this.reseller.reseller_name = filtered[0].member_name;
        this.reseller.reseller_alamat = filtered[0].member_alamat;
        this.reseller.district_id = filtered[0].district_id;
        this.reseller.reseller_phone = filtered[0].member_phone;
      } else {
        this.reseller = {
          reseller_id: "",
          district_id: "",
          reseller_name: "",
          reseller_alamat: "",
          reseller_phone: "",
        };
      }
    },
    setAgen(event) {
      let data = this.getAgen;
      if (event.target.value != "") {
        let filtered = data.filter((item) => {
          return item.id == event.target.value;
        });
        this.agen.agen_name = filtered[0].member_name;
        this.agen.agen_alamat = filtered[0].member_alamat;
        this.agen.district_id = filtered[0].district_id;
        this.agen.agen_phone = filtered[0].member_phone;
      } else {
        this.agen = {
          agen_id: "",
          district_id: "",
          agen_name: "",
          agen_alamat: "",
          agen_phone: "",
        };
      }
    },

    setProvinsi(event) {
      this.getKota(event.target.value);
    },
    setKota(event) {
      this.getKecamatan(event.target.value);
    },

    setOngkir(event) {
      var form = new FormData();
      if (this.transaction.type_customer == 0) {
        form.append("destination", this.reseller.district_id);
      } else if (this.transaction.type_customer == 1) {
        form.append("destination", this.agen.district_id);
      } else if (this.transaction.type_customer == 2) {
        form.append("destination", this.ongkir.kecamatan);
      }
      form.append("weight", this.getWeight);
      form.append("courier", event.target.value);
      this.transaction.ongkir = "loading..."
      this.getOngkir(form).then(() => {
        this.transaction.ongkir = this.cost.data;
      });
    },

    submit() {
      var form = new FormData();

      if (this.transaction.type_customer == 0) {
        form.append("member_id", this.reseller.reseller_id);
      }

      if (this.transaction.type_customer == 1) {
        form.append("member_id", this.agen.agen_id);
      }

      form.append("tanggal_transaksi", this.transaction.tanggal_transaksi);
      form.append("image", this.transaction.image);
      form.append("expedisi", this.transaction.expedisi);
      form.append("ongkir", this.transaction.ongkir);
      form.append("origin_customer", this.transaction.origin_customer);
      form.append("type_transaction", this.transaction.type_transaction);
      form.append("type_customer", this.transaction.type_customer);
      form.append("catatan", this.transaction.catatan);

      if (this.transaction.type_customer == 2) {
        form.append("customer_name", this.customer.customer_name);
        form.append("customer_phone", this.customer.customer_phone);
        form.append("customer_alamat", this.customer.customer_alamat);
      }

      for (let i = 0; i < this.product.qty.length; i++) {
        let product_id = this.product.product_id[i];
        let product_name = this.product.product_name[i];
        let product_price = this.product.product_price[i];
        let qty = this.product.qty[i];
        let discount = this.product.discount[i];

        form.append("product_id[" + i + "]", product_id);
        form.append("product_name[" + i + "]", product_name);
        form.append("product_price[" + i + "]", product_price);
        form.append("qty[" + i + "]", qty);
        form.append("discount[" + i + "]", discount);
      }

      this.postTransaction(form)
        .then(() => {
          Swal.fire("Good job!", "You clicked the button!", "success");
          this.transaction = {
            tanggal_transaksi: "",
            expedisi: "",
            ongkir: 0,
            image: "",
            origin_customer: "",
            type_customer: "",
            type_transaction: "",
            catatan: "",
          };
          this.customer = {
            customer_name: "",
            customer_phone: "",
            customer_alamat: "",
          };
          this.reseller = {
            reseller_id: "",
            district_id: "",
            reseller_name: "",
            reseller_alamat: "",
            reseller_phone: "",
          };
          this.agen = {
            agen_id: "",
            district_id: "",
            agen_name: "",
            agen_alamat: "",
            agen_phone: "",
          };
          this.productArr = [];
          this.product = {
            product_id: [""],
            product_name: [""],
            product_weight: [0],
            product_price: [0],
            qty: [0],
            discount: [0],
          };
          this.ongkir = {
            provinsi: "",
            kota: "",
            kecamatan: "",
          };
          this.url = "";
          this.removeImage;
        })
        .catch(() => {
          // eslint-disable-next-line no-undef
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
