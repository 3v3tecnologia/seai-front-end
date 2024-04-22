import TableInfo from "@/interfaces/table.interface";

export const usersTable: TableInfo[] = [
  {
    header: "Nome",
    field: "name",
    type: "text",
  },
  {
    header: "Email",
    field: "email",
    type: "text",
  },
  {
    header: "Função",
    field: "type",
    type: "text",
  },
  {
    header: "Data de criação",
    field: "createdAt",
    type: "text",
  },
];
