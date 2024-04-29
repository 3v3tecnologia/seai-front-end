import TableInfo from "@/interfaces/table.interface";

export const weightsTable: TableInfo[] = [
  {
    header: "Cultura",
    field: "Crop",
    type: "text",
  },
  {
    header: "SP (kg/ha)",
    tooltip: "Segurança Produtiva (kg/ha)",
    field: "ProductivityPerHectare",
    type: "text",
  },
  {
    header: "SP (kg/m³)",
    tooltip: "Segurança Produtiva (kg/m³)",
    field: "ProductivityPerMeters",
    type: "text",
  },
  {
    header: "SE (R$/ha)",
    tooltip: "Segurança Econômica (R$/ha)",
    field: "ProfitabilityPerHectare",
    type: "text",
  },
  {
    header: "SE (R$/m³)",
    tooltip: "Segurança Econômica (R$/m³)",
    field: "ProfitabilityPerMeters",
    type: "text",
  },
  {
    header: "SH (m³/ha)",
    tooltip: "Segurança Hídrica (m³/ha)",
    field: "WaterConsumption",
    type: "text",
  },
  {
    header: "SS (Empregos/ha)",
    tooltip: "Segurança Social (Empregos/ha)",
    field: "JobsPerHectare",
    type: "text",
  },
  {
    header: "SS(Empregos/m³)",
    tooltip: "Segurança Social (Empregos/m³)",
    field: "JobsPerMeters",
    type: "text",
  },
];
