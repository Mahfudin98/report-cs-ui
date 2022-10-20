<script setup>
import { Bar } from "vue-chartjs";
import {
  Chart,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
Chart.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
</script>
<template>
  <Bar
    :class="chartClass"
    :chart-data="chartData"
    :chart-options="optionsChart"
  />
</template>
<script>
export default {
  props: ["data", "labels", "legenda", "chartClass"],
  computed: {
    chartData() {
      return {
        labels: this.labels,
        datasets: [
          {
            label: this.legenda,
            backgroundColor: "#1d4ed8",
            data: this.data,
            barPercentage: 0.5,
            barThickness: 6,
            maxBarThickness: 8,
            minBarLength: 2,
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
            display: false,
          },
        },
        scales: {
          x: {
            ticks: {
              font: {
                family: "Poppins",
                size: 10,
                weight: "semibold",
                lineHeight: 1.2,
              },
              color: "#64748b",
            },
            grid: {
              display: false,
            },
          },
          y: {
            ticks: {
              font: {
                family: "Poppins",
                size: 10,
                weight: "semibold",
                lineHeight: 1.2,
              },
              color: "#64748b",
            },
            grid: {
              color: "#64748b",
              borderDash: [2, 2],
              zeroLineBorderDash: [2, 2],
              drawBorder: false,
              display: true,
            },
          },
        },
      };
    },
  },
};
</script>
