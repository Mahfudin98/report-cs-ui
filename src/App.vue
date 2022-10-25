<script setup>
import { mapState, mapGetters } from "vuex";
import Admin from "./layouts/Admin.vue";
import Login from "./layouts/AuthLogin.vue";
</script>

<template>
  <Admin v-if="isAuth" />
  <Login v-if="!isAuth" />
</template>

<script>
export default {
  computed: {
    ...mapState(["token"]),
    ...mapGetters(["isAuth"]),
  },
};
</script>
