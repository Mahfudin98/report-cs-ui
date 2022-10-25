<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <main>
    <div class="w-full flex py-3 px-4">
      <h2 class="flex-none font-poppins font-semibold text-xl text-slate-800">
        Team
      </h2>
    </div>

    <div class="w-full grid grid-cols-12 gap-6 mt-5 px-4">
      <div
        class="col-span-12 flex flex-wrap justify-between sm:flex-nowrap items-center mt-2"
      >
        <div class="hidden md:block text-slate-500">
          Showing 1 to {{ users.per_page }} of {{ users.total }} entries
        </div>
        <form class="flex items-center">
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
              v-model="search"
              type="text"
              id="simple-search"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search"
              required
            />
          </div>
        </form>
      </div>

      <!-- team list -->
      <div
        class="col-span-12 md:col-span-6 lg:col-span-4"
        v-for="(item, index) in users.data"
        :key="index"
      >
        <div
          class="box-border bg-white shadow-md shadow-black/10 rounded-md hover:scale-105"
        >
          <div class="flex items-start px-5 pt-5">
            <div class="w-full flex flex-col lg:flex-row items-center">
              <div class="w-16 h-16 image-fit">
                <img
                  :src="item.image"
                  class="rounded-full object-cover object-center aspect-square"
                  alt=""
                />
              </div>
              <div class="lg:ml-4 text-center lg:text-left mt-3 lg:mt-0">
                <a href="" class="font-medium">{{ item.nama }}</a>
                <div class="text-slate-500 text-xs mt-0.5">
                  {{ item.division }}
                </div>
              </div>
            </div>
          </div>
          <div class="text-center lg:text-left p-5">
            <div
              class="flex items-center justify-center lg:justify-start text-slate-500 mt-5"
            >
              <i class="fa-solid fa-at w-3 h-3 mr-2"></i>
              {{ item.email }}
            </div>
            <div
              class="flex items-center justify-center lg:justify-start text-slate-500 mt-1"
            >
              <i class="fa-solid fa-phone w-3 h-3 mr-2"></i>
              {{ item.phone }}
            </div>
          </div>
          <div
            class="text-center lg:text-right p-5 border-t border-slate-200/60"
          >
            <button
              type="button"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm py-1 px-2 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Message
            </button>
            <RouterLink
              :to="{
                name: 'profile',
                params: { username: `${item.username}` },
              }"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm py-1 px-2 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Profile
            </RouterLink>
          </div>
        </div>
      </div>

      <!-- pagination -->
      <div
        class="col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center"
      >
        <Pagination
          :total-pages="users.last_page"
          :total="users.total"
          :per-page="users.per_page"
          :current-page="users.current_page"
          :has-more-pages="hasMorePages"
          @pagechanged="showMore"
        />
      </div>
    </div>
  </main>
</template>

<script setup>
import { mapActions, mapState } from "vuex";

import Pagination from "@/components/Widget/PaginationWidget.vue";
</script>

<script>
export default {
  created() {
    this.getUsers();
  },
  data() {
    return {
      search: "",
    };
  },
  computed: {
    ...mapState("user", { users: (state) => state.users }),
    page: {
      get() {
        return this.$store.state.user.page;
      },
      set(val) {
        this.$store.commit("user/SET_PAGE", val);
      },
    },
  },
  watch: {
    page() {
      this.getUsers();
    },
    search() {
      this.getUsers(this.search);
    },
  },
  methods: {
    ...mapActions("user", ["getUsers"]),
    showMore(page) {
      this.page = page;
      this.users.current_page = page;
    },
  },
};
</script>
