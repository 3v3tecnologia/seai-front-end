import { route } from "./common";

const storeDataKey = ["weight", "update"];
const headerLabel = "Editando pesos";

const finishedDataButton = {
  text: "Retornar a edição de pesos",
  routeName: "weight",
};

export default {
  storeDataKey,
  finishedDataButton,
  headerLabel,
  fields: route.fields,
  workWithoutId: true,
};
