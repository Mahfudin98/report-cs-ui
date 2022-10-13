<script setup>
import logo from "../../assets/logo.png";
import { createPopper } from "@popperjs/core";
import MobileMenuDropdown from "../Dropdown/MobileMenuDropdown.vue";
</script>
<template>
  <div class="border-b border-white/[0.08] -mt-5 -mx-2 mb-6 md:hidden">
    <div class="h-[70px] px-2 flex items-center">
      <a href="javascript:;" class="flex mr-auto">
        <img :src="logo" class="w-10" alt="" />
      </a>
      <a href="javascript:;" v-on:click="toggleDropdown($event)">
        <i class="fa-solid fa-bars-staggered h-8 w-8 text-white"></i>
      </a>
    </div>
    <ul
      class="border-t border-white/[0.08] py-5"
      v-bind:class="{
        hidden: !dropdownPopoverShow,
        block: dropdownPopoverShow,
      }"
    >
      <MobileMenuDropdown />
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dropdownPopoverShow: false,
    };
  },
  methods: {
    toggleDropdown: function (event) {
      event.preventDefault();
      if (this.dropdownPopoverShow) {
        this.dropdownPopoverShow = false;
      } else {
        this.dropdownPopoverShow = true;
        createPopper(this.$refs.btnDropdownRef, this.$refs.popoverDropdownRef, {
          placement: "bottom-start",
        });
      }
    },
  },
};
</script>
