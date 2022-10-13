<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import Sidebar from "../components/Sidebar/Sidebar.vue";
import HeaderAdmin from "../components/Header/HeaderAdmin.vue";
import { RouterView } from "vue-router";
import NavbarMobile from "../components/Navbar/NavbarMobile.vue";
</script>
<template>
  <div class="py-5 px-2 md:px-5">
    <NavbarMobile />
    <div class="flex">
      <!-- sidebar -->
      <Sidebar />
      <!-- content -->
      <div
        class="min-w-0 relative min-h-screen drop-shadow-xl md:drop-shadow-none bg-slate-100 flex-1 pb-10 rounded-[25px] lg:rounded-[45px] dark:bg-darkmode-700 px-1 md:px-4"
      >
        <!-- header -->
        <HeaderAdmin />
        <!-- content -->
        <div class="pt-7">
          <RouterView />
        </div>
      </div>
    </div>
  </div>
</template>
