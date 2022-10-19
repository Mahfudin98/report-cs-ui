<script setup>
import { mapActions, mapState } from "vuex";
import { createPopper } from "@popperjs/core";
</script>
<template>
  <div class="w-1/2 px-4 grid justify-items-stretch">
    <a
      href="javascript:;"
      v-on:click="toggleDropdown($event)"
      class="grid place-items-center justify-self-end rounded-full shadow-sm shadow-black/30 w-10 h-10"
    >
      <img :src="image" class="object-cover object-center aspect-square rounded-full" alt="" />
    </a>
    <!-- dropdown -->
    <div
      class="absolute top-20 right-3 rounded-lg py-2 bg-theme-primary px-3 max-w-fit border-b border-white/[0.10]"
      v-bind:class="{
        hidden: !dropdownPopoverShow,
        block: dropdownPopoverShow,
      }"
    >
      <div class="px-4 py-2">
        <h3 class="text-white text-base">{{ user.nama_depan }}</h3>
        <p class="text-slate-200 text-xs">{{ user.division_name }}</p>
      </div>
      <ul class="border-t border-white/[0.10] py-2 mt-2">
        <li>
          <router-link
            :to="{ name: 'profile', params: {username: `${user.username}`}}"
          >
            <a
              href="javascript:;"
              class="text-white font-poppins flex gap-2 my-auto rounded-full py-3 px-4"
            >
              <i class="fa-solid fa-circle-user h-5 w-5"></i>
              Profile
            </a>
          </router-link>
        </li>
        <li>
          <a
            @click="logoutPost"
            href="javascript:;"
            class="text-white font-poppins flex gap-2 my-auto rounded-full py-3 px-4"
          >
            <i class="fa-solid fa-power-off h-5 w-5"></i>
            Logout
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  created() {
    this.getUser();
    this.getImage();
  },
  data() {
    return {
      dropdownPopoverShow: false,
    };
  },
  computed: {
    ...mapState("auth", {
      user: (state) => state.user,
      image: (state) => state.image,
    }),
  },
  methods: {
    ...mapActions("auth", ["getUser", "getImage", "logout"]),
    logoutPost() {
      this.logout().then(() => {
        this.$store.state.token = localStorage.getItem("token");
        this.$router.push({ name: "login" });
      });
    },
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
