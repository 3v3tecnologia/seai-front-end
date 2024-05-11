import TableInfo from "@/interfaces/table.interface";

export const routineTable: TableInfo[] = [
  {
    header: "Título",
    field: "name",
    type: "text",
  },
  {
    header: "Recorrência",
    field: "cron",
    type: "text",
  },
  {
    header: "Período de reexecução em caso de falha (min.)",
    field: "options.retryDelay",
    type: "text",
  },
  {
    header: "Tentativas de reexecução em caso de falha",
    field: "options.retryLimit",
    type: "text",
  },
  {
    header: "Prioridade",
    field: "options.priority",
    type: "text",
  },
];
