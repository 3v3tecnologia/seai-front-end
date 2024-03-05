const getDataKey = "GET_CURRENT_PLUVIOMETER_READ";

const submitDataKey = "UPDATE_PLUVIOMETER_READ";

const storeDataKey = "currentPluviometerRead";

const headerLabel = "Editando leitura";

const fields = [
  {
    formKey: "Time",
    component: {
      name: "FilterDate",
      props: {
        selectionMode: "single",
        label: "Data",
        showTime: true,
        hourFormat: "24",
      },
    },
  },
  {
    label: "Precipitação",
    formKey: "Precipitation",
    type: "number",
    requireMinMax: false,
  },
];

const finishedDataButton = {
  text: "Retornar a listagem de leituras de pluviômetros",
  routeName: "pluviometer-reads",
};

export default {
  getDataKey,
  storeDataKey,
  submitDataKey,
  finishedDataButton,
  headerLabel,
  fields,
};
