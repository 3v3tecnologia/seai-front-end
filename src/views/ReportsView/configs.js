import BarChart from "@/components/charts/BarChart.vue";
import StackedBarChart from "@/components/charts/StackedBarChart.vue";

const labelBy = {
  month: { type: "month", key: "Mes" },
  creation: { type: "value", key: "TipoCriacao" },
  farmName: { type: "value", key: "Cultura" },
  value: "valor",
};

class ReportsBaseConfigs {
  data = {};
  id = 1;

  formatConfiguration({
    component,
    title,
    seriesName,
    valueKey,
    stackKey,
    labelBy,
    isHorizontal = false,
    height = 270,
  }) {
    return {
      component,
      title,
      seriesName,
      valueKey,
      stackKey,
      labelBy,
      width: 400,
      id: `chart-item-${this.id++}`,
      isHorizontal,
      height,
    };
  }

  addChart(key, chart) {
    this.data[key] = this.formatConfiguration(chart);

    return this;
  }
}

const ReportsConfigsInstance = new ReportsBaseConfigs();

ReportsConfigsInstance.addChart("registereds", {
  component: BarChart,
  title: "Recenseados (quantidade)",
  seriesName: "Recenseados",
  valueKey: "Quantidade",
})
  .addChart("workers", {
    component: StackedBarChart,
    title: "Trabalhadores (quantidade)",
    seriesName: "Trabalhadores",
    valueKey: "Média de trabalhadores",
    stackKey: "Tipo",
  })
  .addChart("tanks", {
    component: BarChart,
    title: "Tanques (quantidade)",
    seriesName: "Tanques",
    valueKey: "Tanques",
  })
  .addChart("animals", {
    component: StackedBarChart,
    title: "Animais (quantidade)",
    seriesName: "Animais",
    stackKey: "TipoCriacao",
    valueKey: "Quantidade",
    height: 380,
  })
  .addChart("animalsByType", {
    component: BarChart,
    title: "Animais (quantidade)",
    seriesName: "Animais",
    valueKey: "Consumo",
    stackKey: "TipoCriacao",
    labelBy: labelBy.creation,
    height: 380,
  })
  .addChart("underVolTanks", {
    component: StackedBarChart,
    title: "Volume de captação de tanques subterrâneos (m³)",
    seriesName: "Volume",
    valueKey: "Volume/tanque",
    labelBy: labelBy.month,
  })
  .addChart("underFlowTanks", {
    component: StackedBarChart,
    title: "Vazão média de captação de tanques subterrâneos (m³)",
    seriesName: "Vazão média",
    valueKey: "Volume/tanque",
    labelBy: labelBy.month,
  })
  .addChart("superMonthVol", {
    component: StackedBarChart,
    title: "Volume de captação mensal superficial (m³)",
    seriesName: "Volume",
    valueKey: "Volume médio",
    labelBy: labelBy.month,
  })
  .addChart("underMonthVol", {
    component: StackedBarChart,
    title: "Volume de captação mensal subterrânea (m³)",
    seriesName: "Volume",
    valueKey: "Volume médio",
    labelBy: labelBy.month,
  })
  .addChart("underMonthFlow", {
    component: StackedBarChart,
    title: "Vazão média de captação mensal subterrânea (m³/h)",
    seriesName: "Vazão média",
    valueKey: "Vazão média",
    labelBy: labelBy.month,
  })
  .addChart("superMonthFlow", {
    component: StackedBarChart,
    title: "Vazão média de captação mensal superficial (m³/h)",
    seriesName: "Vazão média",
    labelBy: labelBy.month,
    valueKey: "Vazão média",
  })
  .addChart("secEconomic", {
    component: BarChart,
    title: "Segurança econômica (R$/ha)",
    seriesName: "Rentabilidade por área",
    valueKey: "RentabilidadePorArea",
    labelBy: labelBy.value,
  })
  .addChart("secSocial", {
    component: BarChart,
    title: "Segurança social (Emprego/ha)",
    seriesName: "Empregos por área",
    valueKey: "EmpregosPorArea",
  })
  .addChart("secHydro", {
    component: BarChart,
    title: "Segurança hídrica (m³/ha)",
    seriesName: "Volume por área",
    valueKey: "VolumePorArea",
  })
  .addChart("secProd", {
    component: BarChart,
    title: "Segurança Produtiva (kg/ha)",
    seriesName: "Peso por área",
    valueKey: "PesoPorArea",
  })
  .addChart("secCultureEconomic", {
    component: BarChart,
    title: "Segurança econômica (R$/ha)",
    seriesName: "Rentabilidade por área",
    valueKey: "RentabilidadePorArea",
    labelBy: labelBy.farmName,
    isHorizontal: true,
  })
  .addChart("secCultureSocial", {
    component: BarChart,
    title: "Segurança social (Emprego/ha)",
    seriesName: "Empregos por área",
    valueKey: "EmpregosPorArea",
    labelBy: labelBy.farmName,
    isHorizontal: true,
  })
  .addChart("secCultureHydro", {
    component: BarChart,
    title: "Segurança hídrica (m³/ha)",
    seriesName: "Volume por área",
    valueKey: "VolumePorArea",
    labelBy: labelBy.farmName,
    isHorizontal: true,
  })
  .addChart("secCultureProd", {
    component: BarChart,
    title: "Segurança Produtiva (kg/ha)",
    seriesName: "Peso por área",
    valueKey: "PesoPorArea",
    labelBy: labelBy.farmName,
    isHorizontal: true,
  })
  .addChart("hydricResources", {
    component: BarChart,
    title: "Corte hídrico (m³/ha)",
    seriesName: "Volume por área",
    valueKey: "CorteHidrico",
    isHorizontal: true,
    labelBy: labelBy.farmName,
    height: 380,
  });

export const reportsBaseConfigs = ReportsConfigsInstance.data;
