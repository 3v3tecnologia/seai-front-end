import TableInfo from "@/interfaces/table.interface";

export const studiesTable: TableInfo[] = [
  {
    header: "Cultura",
    field: "Crop",
    type: "text",
  },
  {
    header: "Duração da safra (dias)",
    field: "HarvestDuration",
    type: "text",
  },
  {
    header: "Período de cultivo (dias)",
    field: "CultivationPeriod",
    type: "text",
  },
  {
    header: "Produtividade (kg/ha)",
    field: "Productivity",
    type: "text",
  },
  {
    header: "Consumo hídrico (m³/ha",
    field: "Consumption",
    type: "text",
  },
];
