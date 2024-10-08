import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import VueApexCharts from "vue3-apexcharts";
import router from "./router";
import { store } from "./store";
import { library } from "@fortawesome/fontawesome-svg-core";
import PrimeVue from "primevue/config";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import "primevue/resources/themes/lara-light-indigo/theme.css";
import "primeicons/primeicons.css";
import Calendar from "primevue/calendar";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ProgressSpinner from "primevue/progressspinner";
import Paginator from "primevue/paginator";
import Dropdown from "primevue/dropdown";
import InputSwitch from "primevue/inputswitch";
import Button from "primevue/button";
import ConfirmDialog from "primevue/confirmdialog";
import ConfirmationService from "primevue/confirmationservice";
import Dialog from "primevue/dialog";
import Password from "primevue/password";
import Editor from "primevue/editor";
import AutoComplete from "primevue/autocomplete";
import Textarea from "primevue/textarea";
import Checkbox from "primevue/checkbox";
import MultiSelect from "primevue/multiselect";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import {
  faUserSecret,
  faPlus,
  faPen,
  faTrash,
  faSignOut,
  faRefresh,
  faClose,
  faSearch,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";

import Tooltip from "primevue/tooltip";
/* add icons to the library */
library.add(
  faUserSecret,
  faPlus,
  faRefresh,
  faPen,
  faTrash,
  faSignOut,
  faSearch,
  faPencil,
  faClose
);

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(store)
  .use(router)
  .use(ConfirmationService)
  .directive("tooltip", Tooltip)
  .use(PrimeVue, {
    locale: {
      dayNames: [
        "Domingo",
        "Segunda-feira",
        "Terça-feira",
        "Quarta-feira",
        "Quinta-feira",
        "Sexta-feira",
        "Sábado",
      ],
      dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
      dayNamesMin: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
      monthNames: [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro",
      ],
      monthNamesShort: [
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Mai",
        "Jun",
        "Jul",
        "Ago",
        "Set",
        "Out",
        "Nov",
        "Dez",
      ],
    },
  })
  .use(VueApexCharts)
  .component("InputText", InputText)
  .component("Calendar", Calendar)
  .component("InputNumber", InputNumber)
  .component("DataTable", DataTable)
  .component("Column", Column)
  .component("ProgressSpinner", ProgressSpinner)
  .component("Paginator", Paginator)
  .component("Dropdown", Dropdown)
  .component("InputSwitch", InputSwitch)
  .component("Button", Button)
  .component("ConfirmDialog", ConfirmDialog)
  .component("Dialog", Dialog)
  .component("Password", Password)
  .component("Editor", Editor)
  .component("AutoComplete", AutoComplete)
  .component("Textarea", Textarea)
  .component("Checkbox", Checkbox)
  .component("MultiSelect", MultiSelect)
  .mount("#app");
