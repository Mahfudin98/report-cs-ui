<script setup>
import { Pie } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
} from "chart.js";
import { bottom } from "@popperjs/core";

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);
</script>
<template>
  <Pie
    :class="chartClass"
    :chart-data="chartData"
    :chart-options="optionsChart"
  />
</template>
<script>
export default {
  props: ["data", "options", "labels", "legenda", "chartClass"],
  computed: {
    chartData() {
      return {
        labels: this.labels,
        datasets: [
          {
            label: this.legenda,
            data: this.data,
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(54, 162, 235)",
              "rgb(255, 205, 86)",
            ],
            hoverOffset: 4,
          },
        ],
      };
    },
    optionsChart() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              usePointStyle: true,
              pointStyle: "rectRounded",
              font: {
                family: "Poppins",
                weight: "semibold",
              },
              color: "#64748b",
            },
            position: bottom,
            align: "start",
            display: true,
          },
        },
        cutoutPercentage: 80,
      };
    },
  },
};
</script>
