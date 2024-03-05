import { defaultStatus } from "@/constants";
import { route } from "./common";
import status from "./update";

const headerLabel = "Cadastrando status de rotinas";

export default {
  fields: status.fields,
  getDataKey: "GET_CURRENT_STATUS",
  storeDataKey: ["status", "update"],
  submitDataKey: "CREATE_STATUS",
  headerLabel,
  finishedDataButton: status.finishedDataButton,
  defaultValue: defaultStatus,
};
