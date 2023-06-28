<script setup>
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale
);
</script>
<template>
  <Line
    :class="chartClass"
    :chart-data="chartData"
    :chart-options="optionsChart"
  />
</template>
<script>
export default {
  props: ["data", "labels", "chartClass"],
  computed: {
    chartData() {
      return {
        labels: this.labels,
        datasets: this.data,
      };
    },
    optionsChart() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
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
