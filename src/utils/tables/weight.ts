import TableInfo from "@/interfaces/table.interface";

export const weightsTable: TableInfo[] = [
  {
    header: "Cultura",
    field: "crop",
    type: "text",
    editable: false,
  },
  {
    header: "CC",
    tooltip: "Ciclo cultura",
    field: "crop_cycle",
    type: "number",
    editable: true,
  },
  {
    header: "SP (kg/ha)",
    tooltip: "Segurança Produtiva (kg/ha)",
    field: "productivity_ha",
    type: "number",
    editable: true,
  },
  {
    header: "SP (kg/m³)",
    tooltip: "Segurança Produtiva (kg/m³)",
    field: "productivity_m3",
    type: "number",
    editable: true,
  },
  {
    header: "SE (R$/ha)",
    tooltip: "Segurança Econômica (R$/ha)",
    field: "profitability_ha",
    type: "number",
    editable: true,
  },
  {
    header: "SE (R$/m³)",
    tooltip: "Segurança Econômica (R$/m³)",
    field: "profitability_m3",
    type: "number",
    editable: true,
  },
  {
    header: "SH (m³/ha)",
    tooltip: "Segurança Hídrica (m³/ha)",
    field: "water_consumption",
    type: "number",
    editable: true,
  },
  {
    header: "SS (Empregos/ha)",
    tooltip: "Segurança Social (Empregos/ha)",
    field: "jobs_ha",
    type: "number",
    editable: true,
  },
  {
    header: "SS(Empregos/m³)",
    tooltip: "Segurança Social (Empregos/m³)",
    field: "jobs_1000m3",
    type: "number",
    editable: true,
  },
];
