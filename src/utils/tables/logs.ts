import TableInfo from "@/interfaces/table.interface";

export const logsTable: TableInfo[] = [
  {
    header: "Usuário",
    field: "user.name",
    type: "text",
  },
  {
    header: "Recurso",
    field: "resource",
    type: "text",
  },
  {
    header: "Operação",
    field: "operation",
    type: "text",
  },
  {
    header: "Data",
    field: "time",
    type: "date",
  },
];
