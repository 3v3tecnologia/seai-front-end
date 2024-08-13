import PageNotFoundView from "@/views/PageNotFoundView.vue";
import culture from "@/router/routes/culture";
import newsletter from "@/router/routes/newsletter";
import status from "@/router/routes/status";
import cron from "@/router/routes/cron";
import weights from "@/router/routes/weights";
import study from "@/router/routes/study";
import users from "@/router/routes/users";
import businessInteligence from "@/router/routes/businessInteligence";
import metereologicalBodies from "@/router/routes/metereologicalBodies";
import equipments from "@/router/routes/equipments";
import account from "@/router/routes/account";
import faq from "./faq";
import home from "./home";
import logs from "./logs";

export default [
  ...account,
  ...equipments,
  ...metereologicalBodies,
  ...businessInteligence,
  ...culture,
  ...users,
  ...newsletter,
  ...weights,
  ...study,
  ...faq,
  ...home,
  ...logs,
  {
    path: "/:catchAll(.*)",
    meta: {
      title: `Rota não encontrada`,
    },
    component: PageNotFoundView,
  },
];
