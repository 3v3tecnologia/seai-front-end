import TableInfo from "@/interfaces/table.interface";

export const equipmentsTable: TableInfo[] = [
  {
    header: "Nome",
    field: "Name",
    type: "text",
  },
  {
    header: "Identificador único externo",
    field: "Code",
    type: "text",
  },
  {
    header: "Órgão Meteorológico",
    field: "Organ.Name",
    type: "text",
  },
  {
    header: "Tipo",
    field: "Type.Name",
    type: "text",
  },
  {
    header: "Leituras",
    field: "link",
    type: "link",
  },
  {
    header: "Status",
    field: "Enable",
    type: "switch",
  },
];
