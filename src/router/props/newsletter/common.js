export const route = {
  fields: [
    {
      label: "Título",
      formKey: "Title",
      type: "text",
    },
    {
      formKey: "SendDate",
      component: {
        name: "FilterDate",
        props: {
          label: "Data de envio",
          showTime: true,
          selectionMode: "single",
          stepMinute: 1,
        },
      },
    },
    {
      label: "Descrição",
      formKey: "Description",
      type: "text",
      min: 1,
      max: 50,
    },
    {
      formKey: "Text",
      colSize: 12,
      component: {
        name: "FieldEditor",
        props: {
          label: "Mensagem",
        },
      },
    },
  ],
};
