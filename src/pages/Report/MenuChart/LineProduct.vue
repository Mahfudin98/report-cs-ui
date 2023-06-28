<script setup>
import moment from "moment";
import _ from "lodash";
import MultiLine from "@/components/Chart/MultiLine.vue";
import LodaingData from "@/components/Widget/LoadingData.vue";
import { mapActions, mapState } from "vuex";
import coming from "@/assets/coming.gif";
</script>
<template>
  <div
    v-if="!isLoading"
    class="flex items-center justify-center w-full h-full"
    :class="[lineChart == '' ? 'block' : 'hidden']"
  >
    <img :src="coming" class="object-cover w-full h-full max-w-xs" />
  </div>
  <MultiLine
    :data="dataOmset"
    :labels="labels"
    :chartClass="`h-full ${lineChart ? 'block' : 'hidden'}`"
    v-if="!isLoading"
  />
  <div v-if="isLoading" class="flex items-center justify-center w-full h-full">
    <LodaingData />
  </div>
</template>
<script>
export default {
  props: ["month", "year"],
  created() {
    this.getLineChart({
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
      this.getLineChart({
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
      this.getLineChart({
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
      lineChart: (state) => state.lineChart,
    }),
    years() {
      return _.range(2019, moment().add(1, "years").format("Y"));
    },
    labels() {
      return _.range(1, moment().daysInMonth() + 1);
    },
    dataOmset() {
      return _.map(this.lineChart, function (o, u) {
        var colors = ["#025464", "#E57C23", "#E8AA42", "#1F8A70"];
        return {
          label: o.market_place_name,
          data: _.map(o.orders, function (i) {
            return i.order_product;
          }),
          fill: false,
          borderColor: colors[u],
          tension: 0.1,
          linePercentage: 0.5,
          lineThickness: 6,
        };
      });
    },
  },
  methods: {
    ...mapActions("orderMP", ["getLineChart"]),
  },
};
</script>
