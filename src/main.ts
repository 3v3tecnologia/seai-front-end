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
} from "@fortawesome/free-solid-svg-icons";

import Tooltip from "primevue/tooltip";
/* add icons to the library */
library.add(faUserSecret, faPlus, faRefresh, faPen, faTrash, faSignOut);

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(store)
  .use(router)
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
  .mount("#app");
