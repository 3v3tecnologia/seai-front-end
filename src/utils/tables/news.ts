import TableInfo from "@/interfaces/table.interface";

export const newsTable: TableInfo[] = [
  {
    header: "Título",
    field: "Name",
    type: "text",
  },
  {
    header: "Data de envio",
    field: "CreatedAt",
    type: "date",
  },
  {
    header: "Autor",
    field: "Author.Email",
    type: "text",
  },
];
