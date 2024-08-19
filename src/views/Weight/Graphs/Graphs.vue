<template>
  <div class="w-full">
    <apexchart type="bar" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";

export default {
  components: {
    apexchart: VueApexCharts,
  },
  props: {
    cropsData: {
      type: Array,
      required: true,
    },
  },
  computed: {
    series() {
      return [
        {
          data: this.cropsData.map((crop) => crop.water_cut),
        },
      ];
    },
    chartOptions() {
      return {
        chart: {
          type: "bar",
          toolbar: {
            show: true,
          },
        },
        plotOptions: {
          bar: {
            horizontal: true,
            barHeight: "80%",
            distributed: true,
          },
        },
        colors: [
          "#5C6BC0",
          "#00838F",
          "#00ACC1",
          "#827717",
          "#083B7C",
          "#388E3C",
        ],
        xaxis: {
          categories: this.cropsData.map((crop) => crop.crop),
        },
        legend: {
          show: false,
        },
        yaxis: {
          labels: {
            align: "left",
            offsetX: -10,
          },
        },
        dataLabels: {
          enabled: true,
          offsetX: 30,
        },
        grid: {
          padding: {
            left: 20,
            right: 20,
          },
          row: {
            colors: ["#f3f3f3", "transparent"],
          },
        },
      };
    },
  },
};
</script>

<style scoped>
.apexcharts-yaxis-label {
  text-anchor: start !important;
}
</style>
