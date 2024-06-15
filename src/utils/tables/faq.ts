import TableInfo from "@/interfaces/table.interface";

export const faqTable: TableInfo[] = [
  {
    header: "Pergunta",
    field: "question",
    type: "text",
  },
  {
    header: "Resposta",
    field: "answer",
    type: "text",
  },
  {
    header: "Categoria",
    field: "category.title",
    type: "text",
  },
  {
    header: "Criação",
    field: "created_at",
    type: "date",
  },
];

export const faqCategoriesTable: TableInfo[] = [
  {
    header: "Nome",
    field: "title",
    type: "text",
  },
  {
    header: "Descrição",
    field: "description",
    type: "text",
  },
];
