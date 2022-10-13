<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import logo from "../../assets/logo.png";
import NavbarAdmin from "../Navbar/NavbarAdmin.vue";
</script>
<template>
  <div class="hidden md:block md:w-[85px] lg:w-[230px]">
    <a href="" class="flex items-center md:pl-4 lg:pl-5 pt-6 mx-4">
      <img :src="logo" class="md:w-8 lg:w-6" alt="" />
      <span class="hidden lg:block text-white text-lg ml-3 font-poppins">
        LS Skincare
      </span>
    </a>
    <hr
      class="md:mt-[10px] lg:mt-[14px] md:ml-[27px] lg:ml-7 mb-7 opacity-50 rounded-full mx-4"
    />
    <NavbarAdmin />
  </div>
</template>
