<script setup>
import PieChart from "@/components/Chart/PieChart.vue";
import LodaingData from "@/components/Widget/LoadingData.vue";
import coming from "@/assets/coming.gif";
import { mapActions, mapState } from "vuex";
import moment from "moment";
import _ from "lodash";
</script>
<template>
  <div
    v-if="!isLoading"
    class="flex items-center justify-center w-full h-full"
    :class="[pieData == '' ? 'block' : 'hidden']"
  >
    <img :src="coming" class="object-cover w-full h-full max-w-xs" />
  </div>
  <PieChart
    v-if="!isLoading"
    :data="pieData"
    :labels="pieLabels"
    :legenda="'Pie Omset MP'"
    :chartClass="`h-full ${pieData ? 'block' : 'hidden'}`"
  />
  <div v-if="isLoading" class="flex items-center justify-center w-full h-full">
    <LodaingData />
  </div>
</template>
<script>
export default {
  props: ["year", "month"],
  created() {
    this.getDonatChart({
      month: this.month,
      year: this.year,
    }).then(() => {
      setTimeout(() => {
        this.isLoading = false;
      }, 300);
    });
  },
  data() {
    return {
      isLoading: true,
    };
  },
  watch: {
    month() {
      this.isLoading = true;
      this.getDonatChart({
        month: this.month,
        year: this.year,
      }).then(() => {
        setTimeout(() => {
          this.isLoading = false;
        }, 300);
      });
    },
    year() {
      this.isLoading = true;
      this.getDonatChart({
        month: this.month,
        year: this.year,
      }).then(() => {
        setTimeout(() => {
          this.isLoading = false;
        }, 300);
      });
    },
  },
  computed: {
    ...mapState("orderMP", {
      donatChart: (state) => state.donatChart,
    }),
    years() {
      return _.range(2019, moment().add(1, "years").format("Y"));
    },
    pieLabels() {
      return _.map(this.donatChart, function (o) {
        return o.market_place_name;
      });
    },
    pieData() {
      return _.map(this.donatChart, function (o) {
        return o.products;
      });
    },
  },
  methods: {
    ...mapActions("orderMP", ["getDonatChart"]),
  },
};
</script>
