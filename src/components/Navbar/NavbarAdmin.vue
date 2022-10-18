<script setup>
import { RouterLink } from "vue-router";
</script>
<template>
  <nav class="">
    <ul>
      <router-link :to="{ name: 'dashboard' }" v-slot="{ href, navigate, isActive }">
        <li
          :class="[isActive ? 'nav-active' : '']"
          class="ml-5 py-3 flex items-center self-center"
        >
          <a
            :href="href"
            @click="navigate"
            class="flex mx-4 gap-3 font-poppins text-md"
          >
            <div :class="[isActive ? 'text-slate-800' : 'text-slate-100']">
              <i class="fa-solid fa-house w-5 h-5"></i>
            </div>
            <div
              :class="[isActive ? 'text-slate-800' : 'text-slate-100']"
              class="hidden lg:block"
            >
              Dashboard
            </div>
          </a>
        </li>
      </router-link>
      <router-link :to="{ name: 'report-data' }" v-slot="{ href, navigate, isActive }">
        <li
          :class="[isActive ? 'nav-active' : '']"
          class="ml-5 py-3 flex items-center self-center"
        >
          <a
            :href="href"
            @click="navigate"
            class="flex mx-4 gap-3 font-poppins text-md"
          >
            <div :class="[isActive ? 'text-slate-800' : 'text-slate-100']">
              <i class="fa-solid fa-clipboard-list w-5 h-5"></i>
            </div>
            <div
              :class="[isActive ? 'text-slate-800' : 'text-slate-100']"
              class="hidden lg:block"
            >
              Report
            </div>
          </a>
        </li>
      </router-link>
      <router-link :to="{ name: 'member-data' }" v-slot="{ href, navigate, isActive }">
        <li
          :class="[isActive ? 'nav-active' : '']"
          class="ml-5 py-3 flex items-center self-center"
        >
          <a
            :href="href"
            @click="navigate"
            class="flex mx-4 gap-3 font-poppins text-md"
          >
            <div :class="[isActive ? 'text-slate-800' : 'text-slate-100']">
              <i class="fa-solid fa-users-rectangle w-5 h-5"></i>
            </div>
            <div
              :class="[isActive ? 'text-slate-800' : 'text-slate-100']"
              class="hidden lg:block"
            >
              Member
            </div>
          </a>
        </li>
      </router-link>
      <router-link to="/product" v-slot="{ href, navigate, isActive }">
        <li
          :class="[isActive ? 'nav-active' : '']"
          class="ml-5 py-3 flex items-center self-center"
        >
          <a
            :href="href"
            @click="navigate"
            class="flex mx-4 gap-3 font-poppins text-md"
          >
            <div :class="[isActive ? 'text-slate-800' : 'text-slate-100']">
              <i class="fa-solid fa-cart-arrow-down w-5 h-5"></i>
            </div>
            <div
              :class="[isActive ? 'text-slate-800' : 'text-slate-100']"
              class="hidden lg:block"
            >
              Produk
            </div>
          </a>
        </li>
      </router-link>
      <router-link to="/team" v-slot="{ href, navigate, isActive }">
        <li
          :class="[isActive ? 'nav-active' : '']"
          class="ml-5 py-3 flex items-center self-center"
        >
          <a
            :href="href"
            @click="navigate"
            class="flex mx-4 gap-3 font-poppins text-md"
          >
            <div :class="[isActive ? 'text-slate-800' : 'text-slate-100']">
              <i class="fa-solid fa-users w-5 h-5"></i>
            </div>
            <div
              :class="[isActive ? 'text-slate-800' : 'text-slate-100']"
              class="hidden lg:block"
            >
              Team
            </div>
          </a>
        </li>
      </router-link>
    </ul>
  </nav>
</template>
