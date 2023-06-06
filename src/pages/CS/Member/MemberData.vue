<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { mapActions, mapState } from "vuex";
import Pagination from "@/components/Widget/PaginationWidget.vue";
import { PencilSquareIcon, EyeIcon } from "@heroicons/vue/24/outline";
import LoadingScreenVue from "@/components/Widget/LoadingScreen.vue";
</script>
<template>
  <main>
    <div class="w-full flex py-3 px-4">
      <h2 class="flex-none font-poppins font-semibold text-xl text-slate-800">
        Member Data
      </h2>
    </div>

    <!-- content -->
    <div class="w-full grid grid-cols-12 gap-6 mt-5 px-4">
      <div
        class="col-span-12 flex flex-wrap justify-between sm:flex-nowrap items-center mt-2"
      >
        <router-link
          :to="{ name: 'member-add' }"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Add Member
        </router-link>
        <form class="flex items-center gap-2">
          <div>
            <label for="simple-search" class="sr-only">Search</label>
            <div class="relative w-full">
              <div
                class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
              >
                <svg
                  aria-hidden="true"
                  class="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
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
              <option value="agen">Agen</option>
              <option value="reseller">Reseller</option>
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
          class="box-border bg-white rounded-lg shadow-sm shadow-black/40 hover:scale-105 relative overflow-hidden"
        >
          <div class="absolute top-6 -right-9">
            <div
              class="w-[150px] h-[30px] rotate-45 shadow-md"
              :class="[row.type == 'Reseller' ? 'bg-red-400' : 'bg-[#996515]']"
            >
              <div
                class="flex w-full h-full justify-center items-center text-white font-poppins font-medium text-base"
              >
                {{ row.type }}
              </div>
            </div>
          </div>
          <div class="p-5 flex flex-col justify-center items-center">
            <div
              class="w-[100px] h-[100px] rounded-full bg-red-400 flex justify-center items-center"
            >
              <img
                :src="row.image != 'belum ada image' ? row.image : fakeImage"
                class="rounded-full object-cover w-[90px] h-[90px] object-center aspect-square"
                alt=""
              />
            </div>
            <div class="mt-3">
              <a
                href=""
                class="font-medium text-center text-lg font-poppins capitalize"
              >
                {{ row.nama }}
              </a>
            </div>
            <div class="flex justify-center items-center mt-4 lg:mt-2">
              <button
                type="button"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 flex justify-center items-center font-medium rounded-lg text-sm py-1 px-2 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                <EyeIcon class="h-6 w-6 mr-2" />
                Profile
              </button>
              <router-link
                :to="{ name: 'member-edit', params: { id: `${row.id}` } }"
                class="text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 flex justify-center items-center font-medium rounded-lg text-base py-1 px-2 mr-2 mb-2 dark:bg-yellow-600 dark:hover:bg-yellow-700 focus:outline-none dark:focus:ring-yellow-800"
              >
                <PencilSquareIcon class="h-6 w-6 mr-2" />
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
        class="col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center"
      >
        <div class="grid mb-4">
          <Pagination
            :total-pages="members.last_page"
            :total="members.total"
            :per-page="members.per_page"
            :current-page="members.current_page"
            :has-more-pages="hasMorePages"
            @pagechanged="showMore"
          />
        </div>
      </div>
    </div>
  </main>
</template>
<script>
export default {
  created() {
    this.getIndexMember();
  },
  data() {
    return {
      data: {
        search: "",
        filterKey: "all",
      },
      fakeImage:
        "https://ui-avatars.com/api/?name=LS+Skincare&background=random&size=90&bold=true",
    };
  },
  computed: {
    ...mapState("member", { members: (state) => state.member_index }),
    page: {
      get() {
        return this.$store.state.member.page;
      },
      set(val) {
        this.$store.commit("member/SET_PAGE", val);
      },
    },
    dataFilter() {
      return this[this.data.filterKey];
    },
    all() {
      return this.members.data;
    },
    agen() {
      return this.members.data.filter((item) => {
        return item.type.indexOf("Agen") > -1;
      });
    },
    reseller() {
      return this.members.data.filter((item) => {
        return item.type.indexOf("Reseller") > -1;
      });
    },
    search() {
      return this.data.search;
    },
  },
  watch: {
    page() {
      this.getIndexMember();
    },
    search() {
      this.getIndexMember(this.data.search);
    },
  },
  methods: {
    ...mapActions("member", ["getIndexMember"]),
    showMore(page) {
      this.page = page;
      this.members.current_page = page;
    },
  },
};
</script>
