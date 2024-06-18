import TableInfo from "@/interfaces/table.interface";

export const newsTable: TableInfo[] = [
  {
    header: "Título",
    field: "Title",
    type: "text",
  },
  {
    header: "Data para envio",
    field: "SendDate",
    type: "date",
  },
  {
    header: "Autor",
    field: "Author.Email",
    type: "text",
  },
];
