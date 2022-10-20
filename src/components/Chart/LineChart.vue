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
  props: ["data", "labels", "legenda", "chartClass"],
  computed: {
    chartData() {
      return {
        labels: this.labels,
        datasets: [
          {
            label: this.legenda,
            data: this.data,
            fill: false,
            borderColor: "#1d4ed8",
            tension: 0.1,
            linePercentage: 0.5,
            lineThickness: 6,
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
