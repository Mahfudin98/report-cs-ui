<script setup>
import moment from "moment";
// eslint-disable-next-line no-unused-vars
import { mapActions, mapState, mapMutations } from "vuex";
import _ from "lodash";
import {
  Bars2Icon,
  PencilSquareIcon,
  XCircleIcon,
} from "@heroicons/vue/24/outline";
import VueTailwindDatepicker from "vue-tailwind-datepicker";
import LineChart from "@/components/Chart/LineChart.vue";
import BarChart from "@/components/Chart/BarChart.vue";
import Swal from "sweetalert2";
</script>
<template>
  <main>
    <div class="w-full flex justify-between items-center py-3 px-4">
      <h2 class="flex-none font-poppins font-semibold text-xl text-slate-800">
        {{ $route.meta.title }}
      </h2>
      <h3 class="flex-none font-poppins font-semibold text-lg text-slate-800">
        Join On
        <span
          class="px-2.5 py-1.5 text-white text-sm bg-red-400 rounded-lg shadow-md"
        >
          {{ moment(member.join_on).format("DD MMM, YYYY") }}
        </span>
      </h3>
    </div>
    <div class="w-full grid grid-cols-12 gap-6 mt-5 px-4">
      <div class="col-span-12 lg:col-span-4">
        <div class="flex flex-col">
          <div
            role="status"
            class="w-full p-5 mb-6 bg-gray-300 bg-opacity-50 rounded-lg shadow-md flex flex-col justify-center items-center animate-pulse md:p-6"
            :class="[isLoading ? '' : 'hidden']"
          >
            <div class="w-full mb-3 flex flex-col justify-center items-center">
              <div
                class="w-44 h-44 mb-3 rounded-full bg-white flex justify-center items-center"
              >
                <svg
                  class="text-gray-200 w-40 h-40 dark:text-gray-700"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <div class="h-2.5 bg-gray-400 rounded-full w-48 mb-4"></div>
              <div class="h-2.5 bg-gray-400 rounded-full w-32 mb-4"></div>
            </div>
            <div class="w-full border-t-2 border-gray-700">
              <div class="h-3 bg-gray-400 rounded-full w-44 mt-5 mb-4"></div>
              <div class="grid gap-3">
                <div class="h-2.5 bg-gray-400 rounded-full w-full mb-2"></div>
                <div class="h-2.5 bg-gray-400 rounded-full w-full mb-2"></div>
                <div class="h-2.5 bg-gray-400 rounded-full w-full mb-2"></div>
                <div class="h-2.5 bg-gray-400 rounded-full w-full mb-2"></div>
                <div class="h-2.5 bg-gray-400 rounded-full w-full mb-2"></div>
              </div>
            </div>
          </div>
          <div
            class="p-5 mb-6 bg-red-300 rounded-lg shadow-md flex flex-col justify-center items-center"
            :class="[!isLoading ? '' : 'hidden']"
          >
            <div class="w-full mb-3 flex flex-col justify-center items-center">
              <div
                class="w-44 h-44 mb-3 rounded-full bg-white flex justify-center items-center"
              >
                <img
                  :src="
                    member.image_member != null
                      ? member.image_member
                      : `https://ui-avatars.com/api/?name=${member.member_name}&background=random&size=350`
                  "
                  class="w-40 h-40 object-cover rounded-full"
                  alt=""
                />
              </div>
              <h2
                class="text-xl font-poppins font-semibold text-gray-900 uppercase text-center"
              >
                {{ member.member_name }}
              </h2>
              <h3
                class="text-sm font-poppins font-semibold text-gray-700 uppercase text-center mb-1"
              >
                {{ member.member_type }}
              </h3>
            </div>
            <div class="w-full border-t-2 border-gray-700">
              <h1
                class="text-xl font-poppins font-semibold my-5 text-gray-900 uppercase flex justify-between items-center"
              >
                Profile Data
                <button
                  @click="isEditOpen"
                  v-if="!isEdit"
                  type="button"
                  class="bg-yellow-400 px-4 py-1.5 rounded-lg shadow-md hover:bg-yellow-500"
                >
                  <PencilSquareIcon class="h-6 w-6 text-white" />
                </button>
                <div class="flex gap-2" v-show="isEdit">
                  <button
                    @click="isEditClose"
                    type="button"
                    class="bg-red-500 px-4 py-1.5 rounded-lg shadow-md hover:bg-red-600"
                  >
                    <XCircleIcon class="h-6 w-6 text-white" />
                  </button>
                  <button
                    @click.prevent="submit()"
                    type="submit"
                    class="bg-blue-500 px-4 py-1.5 rounded-lg shadow-md hover:bg-blue-600 pb-0"
                  >
                    <i class="fas fa-save h-6 w-6 text-white"></i>
                  </button>
                </div>
              </h1>
              <div class="gap-3" :class="[isEdit ? 'grid' : 'hidden']">
                <div
                  class="grid grid-cols-12 place-items-center w-full justify-items-start"
                >
                  <div class="col-span-4">
                    <h3
                      class="text-start text-sm 2xl:text-lg text-gray-800 font-medium flex justify-start font-poppins items-center"
                    >
                      <i class="fa-brands fa-whatsapp w-5 h-5 mr-2"></i>
                      Whatsapp
                    </h3>
                  </div>
                  <div class="col-span-1 text-center">:</div>
                  <div class="col-span-7">
                    <input
                      v-model="form.member_phone"
                      type="tel"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="nomor whatsappp"
                    />
                  </div>
                </div>
                <div
                  class="grid grid-cols-12 place-items-center w-full justify-items-start"
                >
                  <div class="col-span-4">
                    <h3
                      class="text-start text-sm 2xl:text-lg text-gray-800 font-medium flex justify-start font-poppins items-center"
                    >
                      <i class="fa-brands fa-facebook w-5 h-5 mr-2"></i>
                      Facebook
                    </h3>
                  </div>
                  <div class="col-span-1 text-center">:</div>
                  <div class="col-span-7">
                    <input
                      v-model="form.url_fb"
                      type="text"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="username facebook"
                    />
                  </div>
                </div>
                <div
                  class="grid grid-cols-12 place-items-center w-full justify-items-start"
                >
                  <div class="col-span-4">
                    <h3
                      class="text-start text-sm 2xl:text-lg text-gray-800 font-medium flex justify-start font-poppins items-center"
                    >
                      <i class="fa-brands fa-instagram w-5 h-5 mr-2"></i>
                      Instagram
                    </h3>
                  </div>
                  <div class="col-span-1 text-center">:</div>
                  <div class="col-span-7">
                    <input
                      v-model="form.url_ig"
                      type="text"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="username instagram"
                    />
                  </div>
                </div>
                <div
                  class="grid grid-cols-12 place-items-center w-full justify-items-start"
                >
                  <div class="col-span-4">
                    <h3
                      class="text-start text-sm 2xl:text-lg text-gray-800 font-medium flex justify-start font-poppins items-center"
                    >
                      <i class="fa-brands fa-tiktok w-5 h-5 mr-2"></i>
                      Tiktok
                    </h3>
                  </div>
                  <div class="col-span-1 text-center">:</div>
                  <div class="col-span-7">
                    <input
                      v-model="form.url_tiktok"
                      type="text"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="username tiktok"
                    />
                  </div>
                </div>
                <div
                  class="grid grid-cols-12 place-items-center w-full justify-items-start"
                >
                  <div class="col-span-4">
                    <h3
                      class="text-start text-sm 2xl:text-lg text-gray-800 font-medium flex justify-start font-poppins items-center"
                    >
                      <i class="fa-solid fa-globe w-5 h-5 mr-2"></i>
                      Website
                    </h3>
                  </div>
                  <div class="col-span-1 text-center">:</div>
                  <div class="col-span-7">
                    <input
                      v-model="form.url_website"
                      type="text"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="link website"
                    />
                  </div>
                </div>
              </div>
              <div class="gap-3" :class="[!isEdit ? 'grid' : 'hidden']">
                <div class="grid grid-cols-12">
                  <div class="col-span-4">
                    <h3
                      class="text-start text-sm 2xl:text-lg text-gray-800 font-medium flex justify-start font-poppins items-center"
                    >
                      <i class="fa-brands fa-whatsapp w-5 h-5 mr-2"></i>
                      Whatsapp
                    </h3>
                  </div>
                  <div class="col-span-1 text-center">:</div>
                  <div class="col-span-7">
                    <h3
                      class="text-start text-sm 2xl:text-lg text-gray-700 font-poppins font-normal"
                    >
                      {{ member.member_phone }}
                    </h3>
                  </div>
                </div>
                <div class="grid grid-cols-12">
                  <div class="col-span-4">
                    <h3
                      class="text-start text-sm 2xl:text-lg text-gray-800 font-medium flex justify-start font-poppins items-center"
                    >
                      <i class="fa-brands fa-facebook w-5 h-5 mr-2"></i>
                      Facebook
                    </h3>
                  </div>
                  <div class="col-span-1 text-center">:</div>
                  <div class="col-span-7">
                    <h3
                      class="text-start text-sm 2xl:text-lg text-gray-700 font-poppins font-normal"
                    >
                      {{
                        member.facebook != null && member.facebook != "null"
                          ? member.facebook
                          : "-"
                      }}
                    </h3>
                  </div>
                </div>
                <div class="grid grid-cols-12">
                  <div class="col-span-4">
                    <h3
                      class="text-start text-sm 2xl:text-lg text-gray-800 font-medium flex justify-start font-poppins items-center"
                    >
                      <i class="fa-brands fa-instagram w-5 h-5 mr-2"></i>
                      Instagram
                    </h3>
                  </div>
                  <div class="col-span-1 text-center">:</div>
                  <div class="col-span-7">
                    <h3
                      class="text-start text-sm 2xl:text-lg text-gray-700 font-poppins font-normal"
                    >
                      {{
                        member.instagram != null && member.instagram != "null"
                          ? member.instagram
                          : "-"
                      }}
                    </h3>
                  </div>
                </div>
                <div class="grid grid-cols-12">
                  <div class="col-span-4">
                    <h3
                      class="text-start text-sm 2xl:text-lg text-gray-800 font-medium flex justify-start font-poppins items-center"
                    >
                      <i class="fa-brands fa-tiktok w-5 h-5 mr-2"></i>
                      Tiktok
                    </h3>
                  </div>
                  <div class="col-span-1 text-center">:</div>
                  <div class="col-span-7">
                    <h3
                      class="text-start text-sm 2xl:text-lg text-gray-700 font-poppins font-normal"
                    >
                      {{
                        member.tiktok != null && member.tiktok != "null"
                          ? member.tiktok
                          : "-"
                      }}
                    </h3>
                  </div>
                </div>
                <div class="grid grid-cols-12">
                  <div class="col-span-4">
                    <h3
                      class="text-start text-sm 2xl:text-lg text-gray-800 font-medium flex justify-start font-poppins items-center"
                    >
                      <i class="fa-solid fa-globe w-5 h-5 mr-2"></i>
                      Website
                    </h3>
                  </div>
                  <div class="col-span-1 text-center">:</div>
                  <div class="col-span-7">
                    <h3
                      class="text-start text-sm 2xl:text-lg text-gray-700 font-poppins font-normal"
                    >
                      {{
                        member.website != null && member.website != "null"
                          ? member.website
                          : "-"
                      }}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            role="status"
            class="w-full p-5 mb-6 bg-gray-300 bg-opacity-50 rounded-lg shadow-md flex flex-col justify-center items-center animate-pulse md:p-6"
            :class="[isLoading ? '' : 'hidden']"
          >
            <div class="w-full">
              <div class="h-3 bg-gray-400 rounded-full w-44 mt-5 mb-4"></div>
              <div class="grid gap-3">
                <div class="h-2.5 bg-gray-400 rounded-full w-full mb-2"></div>
                <div class="h-2.5 bg-gray-400 rounded-full w-full mb-2"></div>
                <div class="h-2.5 bg-gray-400 rounded-full w-full mb-2"></div>
                <div class="h-2.5 bg-gray-400 rounded-full w-full mb-2"></div>
              </div>
            </div>
          </div>
          <div
            class="p-5 bg-red-300 rounded-lg shadow-md"
            :class="[!isLoading ? '' : 'hidden']"
          >
            <h3 class="text-lg font-poppins font-semibold text-gray-900 mb-3">
              Filter Data Chart
            </h3>
            <div class="flex justify-start gap-3 items-center">
              <div class="w-full max-w-lg">
                <label
                  for="bulan"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Bulan</label
                >
                <select
                  v-model="data.month"
                  id="bulan"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="01">Januari</option>
                  <option value="02">Februari</option>
                  <option value="03">Maret</option>
                  <option value="04">April</option>
                  <option value="05">Mei</option>
                  <option value="06">Juni</option>
                  <option value="07">Juli</option>
                  <option value="08">Agustus</option>
                  <option value="09">September</option>
                  <option value="10">Oktober</option>
                  <option value="11">November</option>
                  <option value="12">Desember</option>
                </select>
              </div>
              <div class="w-full max-w-lg">
                <label
                  for="tahun"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Tahun</label
                >
                <select
                  v-model="data.year"
                  id="tahun"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option v-for="(y, i) in years" :key="i" :value="y">
                    {{ y }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-12 lg:col-span-8">
        <div class="grid grid-cols-12 gap-6">
          <div class="col-span-12 md:col-span-8">
            <div
              class="p-5 bg-gray-300 rounded-lg shadow-md w-full h-[350px] animate-pulse"
              :class="[isLoading ? '' : 'hidden']"
            >
              <div
                class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"
              ></div>
              <div
                class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"
              ></div>
              <div
                class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"
              ></div>
              <div
                class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"
              ></div>
              <div
                class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"
              ></div>
              <div
                class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"
              ></div>
              <span class="sr-only">Loading...</span>
            </div>
            <div
              class="p-5 bg-red-300 rounded-lg shadow-md w-full h-[350px]"
              :class="[!isLoading ? '' : 'hidden']"
            >
              <BarChart
                :data="barData"
                :labels="barLabels"
                :legenda="'Data Transaksi'"
                :chartClass="'h-[300px]'"
              />
            </div>
          </div>
          <div class="col-span-12 md:col-span-4">
            <div
              class="p-5 bg-gray-300 rounded-lg shadow-md w-full h-[350px] animate-pulse"
              :class="[isLoading ? '' : 'hidden']"
            >
              <div
                class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"
              ></div>
              <div
                class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"
              ></div>
              <div
                class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"
              ></div>
              <div
                class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"
              ></div>
              <div
                class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"
              ></div>
              <div
                class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"
              ></div>
              <span class="sr-only">Loading...</span>
            </div>
            <div
              class="p-5 bg-red-300 rounded-lg shadow-md w-full h-[350px] flex flex-col justify-center items-center relative"
              :class="[!isLoading ? '' : 'hidden']"
            >
              <div class="absolute top-1 right-1">
                <button
                  @click="isOpenButton"
                  type="button"
                  class="inline-flex w-full justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                >
                  <Bars2Icon class="h-5 w-5" />
                </button>
                <div v-show="isOpen">
                  <transition
                    enter-active-class="transition duration-100 ease-out"
                    enter-from-class="transform scale-95 opacity-0"
                    enter-to-class="transform scale-100 opacity-100"
                    leave-active-class="transition duration-75 ease-in"
                    leave-from-class="transform scale-100 opacity-100"
                    leave-to-class="transform scale-95 opacity-0"
                  >
                    <div
                      class="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    >
                      <div class="px-2 py-1">
                        <h3
                          class="mb-1 text-base text-gray-800 font-poppins font-medium"
                        >
                          Filter Point
                        </h3>
                        <vue-tailwind-datepicker
                          placeholder="Periode"
                          :formatter="formatter"
                          v-model="data.dateRange"
                          :auto-apply="false"
                          :options="options"
                          :shortcuts="false"
                        />
                        <button
                          @click="isClose"
                          class="mt-2 px-3 py-2 bg-blue-600 text-white flex justify-center items-center rounded-lg shadow-md hover:bg-blue-500"
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  </transition>
                </div>
              </div>
              <h1
                class="uppercase text-2xl font-bold font-poppins text-gray-900 mb-3"
              >
                point
              </h1>
              <div
                class="flex h-[180px] w-[180px] border-4 border-red-400 rounded-full justify-center items-center mb-5"
              >
                <h1
                  class="uppercase text-3xl font-bold font-poppins text-gray-900 mb-0"
                >
                  {{ point }}
                </h1>
              </div>
              <h3
                class="text-sm font-poppins font-medium text-brown-800 flex flex-col gap-2 text-center"
              >
                Total Pembelian bulan
                {{ moment(data.month).format("MMMM") }}
                <span class="underline underline-offset-8 font-bold text-base">
                  Rp. {{ currency(total) }}
                </span>
              </h3>
            </div>
          </div>
          <div class="col-span-12">
            <div
              class="p-5 bg-gray-300 rounded-lg shadow-md w-full h-[350px] animate-pulse"
              :class="[isLoading ? '' : 'hidden']"
            >
              <div
                class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"
              ></div>
              <div
                class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"
              ></div>
              <div
                class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"
              ></div>
              <div
                class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"
              ></div>
              <div
                class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"
              ></div>
              <div
                class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"
              ></div>
              <span class="sr-only">Loading...</span>
            </div>
            <div
              class="p-5 bg-red-300 rounded-lg shadow-md w-full h-[350px]"
              :class="[!isLoading ? '' : 'hidden']"
            >
              <LineChart
                :data="transaction_data"
                :labels="labels"
                :legenda="'Data Transaksi'"
                :chartClass="'h-[300px]'"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
export default {
  created() {
    this.getMemberDetail(this.$route.params.username).then(() => {
      setTimeout(() => {
        this.isLoading = false;
      }, 300);
      this.getPoint({
        idMember: this.member.member_id,
        from: moment(this.data.dateRange[0]).format("YYYY-MM-DD"),
        to: moment(this.data.dateRange[1]).format("YYYY-MM-DD"),
      });
      this.getBarChart({
        idMember: this.member.member_id,
        year: this.data.year,
      });
      this.getLineChart({
        idMember: this.member.member_id,
        year: this.data.year,
        month: this.data.month,
      });
      this.form = {
        member_phone: this.member.member_phone,
        url_fb:
          this.member.facebook != null && this.member.facebook != "null"
            ? this.member.facebook
            : "",
        url_ig:
          this.member.instagram != null && this.member.instagram != "null"
            ? this.member.instagram
            : "",
        url_tiktok:
          this.member.tiktok != null && this.member.tiktok != "null"
            ? this.member.tiktok
            : "",
        url_website:
          this.member.website != null && this.member.website != "null"
            ? this.member.website
            : "",
      };
    });
  },
  data() {
    return {
      data: {
        month: moment().format("MM"),
        year: moment().format("Y"),
        dateRange: [],
      },
      isLoading: true,
      isOpen: false,
      isEdit: false,
      formatter: {
        date: "DD MMM YYYY",
        month: "MMM",
      },
      options: {
        footer: {
          apply: "Terapkan",
          cancel: "Batal",
        },
      },
      form: {
        member_phone: "",
        url_fb: "",
        url_ig: "",
        url_tiktok: "",
        url_website: "",
      },
    };
  },
  watch: {
    year() {
      this.getBarChart({
        idMember: this.member.member_id,
        year: this.data.year,
      });
      this.getLineChart({
        idMember: this.member.member_id,
        year: this.data.year,
        month: this.data.month,
      });
    },
    month() {
      this.getLineChart({
        idMember: this.member.member_id,
        year: this.data.year,
        month: this.data.month,
      });
    },
    dateRange() {
      this.getPoint({
        idMember: this.member.member_id,
        from: moment(this.data.dateRange[0]).format("YYYY-MM-DD"),
        to: moment(this.data.dateRange[1]).format("YYYY-MM-DD"),
      });
    },
  },
  computed: {
    ...mapState("member", {
      member: (state) => state.member_detail,
      point: (state) => state.point,
      line: (state) => state.lineChart,
      bar: (state) => state.barChart,
    }),
    dateRange() {
      return this.data.dateRange;
    },
    year() {
      return this.data.year;
    },
    month() {
      return this.data.month;
    },
    years() {
      return _.range(2019, moment().add(1, "years").format("Y"));
    },
    barLabels() {
      return _.map(this.bar, function (o) {
        return moment(o.date).format("MMMM");
      });
    },
    barData() {
      let total = _.map(this.bar, function (o) {
        return o.total;
      });
      return total;
    },
    labels() {
      return _.map(this.line, function (o) {
        return moment(o.date).format("DD");
      });
    },
    transaction_data() {
      let total = _.map(this.line, function (o) {
        return o.total;
      });
      return total;
    },
    total() {
      let data = _.map(this.line, function (o) {
        return o.total;
      });
      let total = data.reduce((a, i) => {
        return a + parseInt(i);
      }, 0);
      return total;
    },
  },
  methods: {
    ...mapActions("member", [
      "getMemberDetail",
      "getPoint",
      "getLineChart",
      "getBarChart",
    ]),
    currency(data) {
      return new Intl.NumberFormat("id-ID", {
        maximumSignificantDigits: 6,
      }).format(data);
    },
    isOpenButton() {
      this.isOpen = true;
    },
    isClose() {
      this.isOpen = false;
    },
    isEditOpen() {
      this.isEdit = true;
    },
    isEditClose() {
      this.isEdit = false;
    },
    ...mapActions("member", ["updateMemberDetail"]),
    ...mapMutations("member", ["SET_ID_UPDATE"]),
    submit() {
      let form = new FormData();
      form.append("member_phone", this.form.member_phone);
      form.append("facebook", this.form.url_fb);
      form.append("instagram", this.form.url_ig);
      form.append("tiktok", this.form.url_tiktok);
      form.append("website", this.form.url_website);

      this.SET_ID_UPDATE(this.member.member_id);
      this.updateMemberDetail(form)
        .then(() => {
          Swal.fire("Good job!", "You clicked the button!", "success");
          this.form = {
            member_phone: "",
            url_fb: "",
            url_ig: "",
            url_tiktok: "",
            url_website: "",
          };
          this.isLoading = true;
          this.getMemberDetail(this.$route.params.username).then(() => {
            setTimeout(() => {
              this.isLoading = false;
            }, 300);
            this.getPoint({
              idMember: this.member.member_id,
              from: moment(this.data.dateRange[0]).format("YYYY-MM-DD"),
              to: moment(this.data.dateRange[1]).format("YYYY-MM-DD"),
            });
            this.getBarChart({
              idMember: this.member.member_id,
              year: this.data.year,
            });
            this.getLineChart({
              idMember: this.member.member_id,
              year: this.data.year,
              month: this.data.month,
            });
            this.form = {
              url_fb:
                this.member.facebook != null && this.member.facebook != "null"
                  ? this.member.facebook
                  : "",
              url_ig:
                this.member.instagram != null && this.member.instagram != "null"
                  ? this.member.instagram
                  : "",
              url_tiktok:
                this.member.tiktok != null && this.member.tiktok != "null"
                  ? this.member.tiktok
                  : "",
              url_website:
                this.member.website != null && this.member.website != "null"
                  ? this.member.website
                  : "",
            };
          });
          this.isEdit = false;
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
