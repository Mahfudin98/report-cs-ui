<script setup>
import logo from "../assets/logo.png";
import image from "../assets/illustration.svg";
import LoginPage from "../pages/Auth/LoginPage.vue";
</script>
<template>
  <div class="login">
    <div class="absolute w-full h-screen login-before login-after hidden xl:block"></div>
    <div class="relative overflow-hidden">
      <div class="container mx-auto sm:px-10">
        <div class="block xl:grid grid-cols-2 gap-4">
          <div class="hidden xl:flex flex-col min-h-screen">
            <a href="" class="flex items-center pt-5">
              <img :src="logo" class="w-6" alt="" />
              <span class="text-white text-lg ml-3"> LS Skincare </span>
            </a>
            <div class="my-auto">
              <img :src="image" class="w-1/2 -mt-16" alt="" />
              <div
                class="-mx-4 text-white font-medium text-4xl leading-tight mt-10"
              >
                A few more clicks to
                <br />
                sign in to your account.
              </div>
              <div
                class="-mx-4 mt-5 text-lg text-white text-opacity-70 dark:text-slate-400"
              >
                Manage all your e-commerce accounts in one place
              </div>
            </div>
          </div>
          <LoginPage />
        </div>
      </div>
    </div>
  </div>
</template>
