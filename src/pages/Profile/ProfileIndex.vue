<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <main>
    <div class="w-full flex py-3 px-4">
      <h2 class="flex-none font-poppins font-semibold text-xl text-slate-800">
        Profile Page
      </h2>
    </div>
    <div class="w-full px-4">
      <div
        class="intro-y bg-white rounded-md shadow-md shadow-black/40 px-5 pt-5 mt-5"
      >
        <div
          class="flex flex-col lg:flex-row border-b border-slate-200/60 dark:border-darkmode-400 pb-5 -mx-5"
        >
          <div
            class="flex flex-1 px-5 items-center justify-center lg:justify-start"
          >
            <div
              class="w-20 h-20 sm:w-24 sm:h-24 flex-none lg:w-32 lg:h-32 object-cover relative"
            >
              <img
                alt="Profile"
                class="rounded-full object-cover object-center aspect-square shadow-sm shadow-slate-500"
                :src="profile.image"
              />
              <div
                class="inline-flex absolute px-2 -bottom-2 -right-2 justify-center items-center w-fit h-6 text-xs font-bold text-white bg-red-500 rounded-md border-2 border-white shadow-sm shadow-slate-500 dark:border-gray-900"
                :class="{ hidden: profile.adv == null }"
              >
                {{ profile.adv }}
              </div>
            </div>
            <div class="ml-5">
              <div
                class="w-24 sm:w-40 truncate sm:whitespace-normal font-medium text-lg"
              >
                {{ profile.nama }}
              </div>
              <div class="text-slate-500">{{ profile.division }}</div>
            </div>
          </div>
          <div
            class="mt-6 lg:mt-0 flex-1 px-5 border-l border-r border-slate-200/60 dark:border-darkmode-400 border-t lg:border-t-0 pt-5 lg:pt-0"
          >
            <div class="font-medium text-center lg:text-left lg:mt-3">
              Contact Details
            </div>
            <div
              class="flex flex-col justify-center items-center lg:items-start mt-4"
            >
              <div class="truncate sm:whitespace-normal flex items-center">
                <i class="fa-regular fa-envelope w-4 h-4 mr-2"></i>
                {{ profile.email }}
              </div>
              <div class="truncate sm:whitespace-normal flex items-center mt-3">
                <i class="fa-solid fa-phone w-4 h-4 mr-2"></i>
                {{ profile.phone }}
              </div>
              <div class="truncate sm:whitespace-normal flex items-center mt-3">
                <i class="fa-solid fa-location-dot w-4 h-4 mr-2"></i>
                {{ profile.alamat }}
              </div>
            </div>
          </div>
          <div
            class="mt-6 lg:mt-0 flex-1 px-5 border-l border-r border-slate-200/60 dark:border-darkmode-400 border-t lg:border-t-0 pt-5 lg:pt-0"
          >
            <div class="font-medium text-center lg:text-left lg:mt-3">
              Information Details
            </div>
            <div
              class="flex flex-col justify-center items-center lg:items-start mt-4"
            >
              <div class="truncate sm:whitespace-normal flex items-center">
                <i
                  class="w-4 h-4 mr-2"
                  :class="{
                    'fa-solid fa-venus': 'Wanita' == profile.gender,
                    'fa-solid fa-mars-stroke': profile.gender == 'Pria',
                  }"
                ></i>
                {{ profile.gender }}
              </div>
              <div class="truncate sm:whitespace-normal flex items-center mt-3">
                <i class="fa-solid fa-cake-candles w-4 h-4 mr-2"></i> Tanggal
                Lahir
                {{ moment(profile.tanggal_lahir).format("MMM DD, YYYY") }}
              </div>
              <div class="truncate sm:whitespace-normal flex items-center mt-3">
                <i class="fa-solid fa-file-signature w-4 h-4 mr-2"></i> Tanggal
                Masuk
                {{ moment(profile.tanggal_masuk).format("MMM DD, YYYY") }}
              </div>
            </div>
          </div>
        </div>
        <ul
          class="flex flex-col gap-2 sm:flex-row justify-center lg:justify-start text-center"
          role="tablist"
        >
          <li
            id="profile-tab"
            class="border-b-[2px] border-theme-primary"
            role="presentation"
          >
            <a
              href="javascript:;"
              class="py-4 mx-4 flex items-center"
              data-tw-target="#profile"
              aria-controls="profile"
              aria-selected="true"
              role="tab"
            >
              <i class="fa-solid fa-gauge w-4 h-4 mr-2"></i> Dashboard
            </a>
          </li>
          <li id="account-tab" class="" role="presentation">
            <a
              href="javascript:;"
              class="py-4 px-4 flex items-center"
              data-tw-target="#account"
              aria-controls="account"
              aria-selected="false"
              role="tab"
            >
              <i class="fa-solid fa-shield-halved w-4 h-4 mr-2"></i> Account
            </a>
          </li>
          <li id="change-password-tab" class="" role="presentation">
            <a
              href="javascript:;"
              class="py-4 px-4 flex items-center"
              data-tw-target="#change-password"
              aria-controls="change-password"
              aria-selected="false"
              role="tab"
            >
              <i class="fa-solid fa-lock w-4 h-4 mr-2"></i> Change Password
            </a>
          </li>
          <li id="settings-tab" class="" role="presentation">
            <a
              href="javascript:;"
              class="py-4 px-4 flex items-center"
              data-tw-target="#settings"
              aria-controls="settings"
              aria-selected="false"
              role="tab"
            >
              <i class="fa-solid fa-gear w-4 h-4 mr-2"></i> Settings
            </a>
          </li>
        </ul>
      </div>

      <DashboardUser />
    </div>
  </main>
</template>
<script setup>
import { mapActions, mapState } from "vuex";
import moment from "moment";
import DashboardUser from "./components/DashboardUser.vue"
</script>
<script>
export default {
  created() {
    this.getUserDetail(this.$route.params.username);
  },
  computed: {
    ...mapState("user", { profile: (state) => state.profile }),
  },
  methods: {
    ...mapActions("user", ["getUserDetail"]),
  },
};
</script>
