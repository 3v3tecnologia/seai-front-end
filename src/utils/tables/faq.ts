import TableInfo from "@/interfaces/table.interface";

export const faqTable: TableInfo[] = [
  {
    header: "Pergunta",
    field: "question",
    type: "text",
  },
  {
    header: "Resposta",
    field: "Answer",
    type: "text",
  },
  {
    header: "Categoria",
    field: "categories",
    subField: "title",
    type: "category",
  },
  {
    header: "Criação",
    field: "created_at",
    type: "text",
  },
];
