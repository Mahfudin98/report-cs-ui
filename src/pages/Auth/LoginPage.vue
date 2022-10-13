<script setup>
import { mapActions, mapMutations, mapGetters, mapState } from "vuex";
</script>
<template>
  <div class="h-screen xl:h-auto flex py-5 xl:py-0 my-10 xl:my-0 mx-auto px-2">
    <div
      class="my-auto mx-auto bg-slate-700 xl:ml-20 xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto"
    >
      <h2
        class="font-bold text-2xl xl:text-3xl text-center xl:text-left text-white"
      >
        Sign In
      </h2>
      <div class="mt-2 text-slate-400 xl:hidden text-center">
        A few more clicks to sign in to your account. Manage all your e-commerce
        accounts in one place
      </div>
      <div class="mt-8">
        <label
          for="input-group-1"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >Username</label
        >
        <div class="relative mb-6">
          <div
            class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
          >
            <i
              class="fa-regular fa-circle-user w-5 h-5 text-gray-500 dark:text-gray-400"
            ></i>
          </div>
          <input
            type="text"
            id="input-group-1"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="username"
            v-model="data.username"
            required
          />
          <p class="text-base font-normal text-red-700" v-if="errors.username">
            {{ errors.username[0] }}
          </p>
        </div>
        <label
          for="input-group-1"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >Password</label
        >
        <div class="relative mb-6">
          <div
            class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
          >
            <i
              class="fa-solid fa-key w-5 h-5 text-gray-500 dark:text-gray-400"
            ></i>
          </div>
          <input
            type="password"
            id="input-group-1"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="********"
            v-model="data.password"
            required
          />
          <p class="text-base font-normal text-red-700" v-if="errors.password">
            {{ errors.password[0] }}
          </p>
        </div>
      </div>
      <p class="text-base font-normal text-red-700" v-if="errors.invalid">
        {{ errors.invalid }}
      </p>
      <div
        class="flex lg:gap-x-32 text-slate-600 dark:text-slate-500 text-xs sm:text-sm mt-4"
      >
        <div class="flex items-center mr-auto">
          <div class="flex items-center mb-4">
            <input
              v-model="remember_me"
              id="default-checkbox"
              type="checkbox"
              value=""
              class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              for="default-checkbox"
              class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >Remember Me</label
            >
          </div>
        </div>
        <a href="">Forgot Password?</a>
      </div>
      <div class="mt-5 xl:mt-8 text-center xl:text-left">
        <button
          type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          @click.prevent="submitLogin"
        >
          Login
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isDisabled: false,
      data: {
        username: "",
        password: "",
        remember_me: false,
      },
    };
  },
  created() {
    if (this.isAuth) {
      this.$router.push({
        name: "dashboard",
      });
    }
  },
  computed: {
    ...mapGetters(["isAuth"]),
    ...mapState(["errors"]),
  },
  methods: {
    ...mapActions("auth", ["submit", "getUser"]),
    ...mapMutations(["CLEAR_ERRORS"]),
    submitLogin() {
      this.submit(this.data).then(() => {
        if (this.isAuth) {
          this.isDisabled = true;
          this.CLEAR_ERRORS();
          window.location.reload();
          this.$router.push({
            name: "home",
          });
        }
      });
    },
  },
  // eslint-disable-next-line vue/no-deprecated-destroyed-lifecycle
  destroyed() {
    this.getUser();
  },
};
</script>
