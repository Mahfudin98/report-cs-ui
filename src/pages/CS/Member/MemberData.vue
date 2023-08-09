<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { mapActions, mapState } from "vuex";
import {
  PencilSquareIcon,
  EyeIcon,
  MagnifyingGlassIcon,
} from "@heroicons/vue/24/outline";
import LoadingScreenVue from "@/components/Widget/LoadingScreen.vue";
</script>
<template>
  <main>
    <div class="flex w-full px-4 py-3">
      <h2 class="flex-none text-xl font-semibold font-poppins text-slate-800">
        Member Data
      </h2>
    </div>

    <!-- content -->
    <div class="grid w-full grid-cols-12 gap-6 px-4 mt-5">
      <div
        class="flex flex-wrap items-center justify-between col-span-12 mt-2 sm:flex-nowrap"
      >
        <router-link
          :to="{ name: 'member-add' }"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Add Member
        </router-link>
        <form class="flex items-center gap-2">
          <div>
            <select
              v-model="data.filterCS"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="all">All</option>
              <option
                v-for="(item, index) in usersCS"
                :key="index"
                :value="item.user_id"
              >
                {{ item.nama_depan }}
              </option>
            </select>
          </div>
          <div>
            <label for="simple-search" class="sr-only">Search</label>
            <div class="relative w-full">
              <div
                class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
              >
                <MagnifyingGlassIcon
                  class="w-5 h-5 text-gray-500 dark:text-gray-400"
                />
              </div>
              <input
                type="text"
                id="simple-search"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search"
                v-model="data.search"
                required
              />
            </div>
          </div>
          <div>
            <select
              v-model="data.filterKey"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="all">All</option>
              <option value="1">Agen</option>
              <option value="0">Reseller</option>
            </select>
          </div>
        </form>
      </div>

      <!-- list member -->
      <div
        class="col-span-12 gap-3 md:col-span-6 lg:col-span-4 2xl:col-span-3"
        v-for="(row, index) in dataFilter"
        :key="index"
      >
        <div
          class="box-border relative overflow-hidden rounded-lg shadow-sm shadow-black/40 hover:scale-105"
          :class="[
            row.member_provinsi == null || row.member_provinsi == 'Belum diatur'
              ? 'bg-red-600 text-white'
              : 'bg-white',
          ]"
        >
          <div class="absolute top-0 left-0">
            <div
              class="flex items-center p-2 font-medium text-white rounded-br-lg font-poppins"
              :class="[row.member_status == 1 ? 'bg-blue-500' : 'bg-slate-500']"
            >
              {{ row.member_status == 1 ? "Aktif" : "Tidak Aktif" }}
              <span
                v-if="row.member_status == 1"
                class="flex w-3 h-3 ml-2 bg-green-500 border rounded-full"
              ></span>
              <span
                v-if="row.member_status == 0"
                class="flex w-3 h-3 ml-2 bg-yellow-500 border rounded-full"
              ></span>
            </div>
          </div>
          <div class="absolute top-6 -right-9">
            <div
              class="w-[150px] h-[30px] rotate-45 shadow-md"
              :class="[row.member_type == 0 ? 'bg-red-400' : 'bg-[#996515]']"
            >
              <div
                class="flex items-center justify-center w-full h-full text-base font-medium text-white font-poppins"
              >
                {{ row.member_type == 0 ? "Reseller" : "Agen" }}
              </div>
            </div>
          </div>
          <div class="flex flex-col items-center justify-center p-5">
            <div
              class="w-[100px] h-[100px] rounded-full bg-red-400 flex justify-center items-center"
            >
              <img
                :src="
                  row.member_image != null
                    ? row.member_image
                    : `https://ui-avatars.com/api/?name=${row.member_name}&background=random&size=90&bold=true`
                "
                class="rounded-full object-cover w-[90px] h-[90px] object-center aspect-square"
                alt=""
              />
            </div>
            <div class="mt-3">
              <p
                class="text-base font-medium text-center capitalize 2xl:text-lg font-poppins"
              >
                {{ row.member_name }}
              </p>
              <div class="">
                {{
                  row.member_provinsi == null ||
                  row.member_provinsi == "Belum diatur"
                    ? "Harus Update!"
                    : row.member_provinsi
                }}
                -
                {{
                  row.member_kota == null || row.member_kota == "Belum diatur"
                    ? "Harus Update!"
                    : row.member_kota
                }}
                -
                {{
                  row.member_kecamatan == null ||
                  row.member_kecamatan == "Belum diatur"
                    ? "Harus Update!"
                    : row.member_kecamatan
                }}
              </div>
            </div>
            <div class="flex items-center justify-center mt-4 lg:mt-2">
              <router-link
                :to="{
                  name: 'member-detail',
                  params: { username: `${row.member_username}` },
                }"
                class="flex items-center justify-center px-2 py-1 mb-2 mr-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                <EyeIcon class="w-6 h-6 mr-2" />
                Profile
              </router-link>
              <router-link
                :to="{
                  name: 'member-edit',
                  params: { id: `${row.member_id}` },
                }"
                class="flex items-center justify-center px-2 py-1 mb-2 mr-2 text-base font-medium text-white bg-yellow-400 rounded-lg hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-700 focus:outline-none dark:focus:ring-yellow-800"
              >
                <PencilSquareIcon class="w-6 h-6 mr-2" />
                Edit
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <LoadingScreenVue
        v-if="all == undefined"
        :styles="'relative col-span-12 bg-transparent text-slate-600'"
        :text="'Sabar dulu ya teman-teman, ini lagi ngambil data dulu.'"
      />
      <!-- pagination -->
      <div
        class="flex flex-wrap items-center col-span-12 sm:flex-row sm:flex-nowrap"
      >
        <div class="grid mb-4"></div>
      </div>
    </div>
  </main>
</template>
<script>
export default {
  created() {
    this.getIndexMember();
    this.getUsersLogin().then(() => {
      this.data.filterCS = this.userLogin.id;
    });
    this.getUsersCS();
  },
  data() {
    return {
      data: {
        search: "",
        filterKey: "all",
        filterCS: "all",
      },
      fakeImage:
        "https://ui-avatars.com/api/?name=LS+Skincare&background=random&size=90&bold=true",
    };
  },
  computed: {
    ...mapState("member", { members: (state) => state.member_index }),
    ...mapState("user", {
      userLogin: (state) => state.userLogin,
      usersCS: (state) => state.usersCS,
    }),
    dataFilter() {
      let filter =
        this.data.filterCS == "all"
          ? this[this.data.filterCS]
          : this.filterData;
      return filter;
    },
    all() {
      let data = this.members.data;
      let filter =
        this.data.filterKey == "all"
          ? data
          : data.filter((i) => {
              return i.member_type == this.data.filterKey;
            });
      return filter;
    },
    filterData() {
      let data = this.members.data.filter((item) => {
        return item.cs_id == this.data.filterCS;
      });
      let filter =
        this.data.filterKey == "all"
          ? data
          : data.filter((i) => {
              return i.member_type == this.data.filterKey;
            });
      return filter;
    },

    search() {
      return this.data.search;
    },
  },
  watch: {
    search() {
      this.getIndexMember(this.data.search);
    },
  },
  methods: {
    ...mapActions("member", ["getIndexMember", "getSelectMember"]),
    ...mapActions("user", ["getUsersLogin", "getUsersCS"]),
  },
};
</script>
