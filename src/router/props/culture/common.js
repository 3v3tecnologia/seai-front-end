import { farmsStageDefault } from "@/constants";

export const route = {
  fields: [
    {
      label: "Nome",
      formKey: "Name",
      type: "text",
    },
    {
      formKey: "cycle",
      colSize: 12,
      component: {
        name: "CreateFarmDap",
        props: {
          label: "",
          columns: [
            {
              title: "Estágio",
              field: "Stage_Title",
              editor: "input",
              mutator: (a, b, c, d, e) => {
                if (a && a.length >= 50) {
                  return a.slice(50);
                } else if (a) {
                  return a;
                }
                return farmsStageDefault;
              },
            },
            {
              title: "id",
              field: "id",
              visible: false,
            },
            {
              title: "Duração (dias)",
              field: "Duration_In_Days",
              editor: "number",
              mutator: (value) => (value && value > 0 ? Math.floor(value) : 1),
              editorParams: {
                min: 1,
              },
            },
            {
              title: "KC",
              field: "KC",
              editor: "number",
              editorParams: {
                min: 0.1,
                step: 0.1,
              },
              mutator: (value) => (value > 0 ? value : 0),
            },
          ],
        },
      },
    },
  ],
};
