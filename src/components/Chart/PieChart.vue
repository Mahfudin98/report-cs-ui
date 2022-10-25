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
              "#0284c7",
              "#e11d48",
              "#eab308",
              "#16a34a",
              "#4f46e5"
            ],
            borderWidth: 3,
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
