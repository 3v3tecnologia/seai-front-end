import BaseForm from "@/views/BaseForm.vue";
import BaseCrudView from "@/views/templates/BaseCrudView.vue";
import { actionPrefix, modulesSystem, modulesSystemLevel } from "@/constants";
import routeProps from "@/router/props";
import Routines from "@/views/Routines/Routines.vue";
import FormRoutines from "@/views/Routines/Form/Main.vue";

export default [
  {
    path: "/cron/",
    name: "cron",
    meta: {
      ShowNav: true,
      title: `Rotina de dados`,
    },
    component: Routines,
    props: routeProps.cron.list,
  },
  // {
  //   path: "/form-routine/:id?",
  //   name: "form-routine",
  //   meta: {
  //     title: `${actionPrefix.edit} rotina de dados`,
  //     modulesNeeded: [modulesSystem.jobs, modulesSystemLevel.write],
  //   },
  //   component: FormRoutines,
  //   props: routeProps.cron.update,
  // },
  // {
  //   path: "/cron/create",
  //   name: "create-cron",
  //   meta: {
  //     title: `${actionPrefix.create} rotina de dados`,
  //     modulesNeeded: [modulesSystem.jobs, modulesSystemLevel.write],
  //   },
  //   component: BaseForm,
  //   props: routeProps.cron.create,
  // },
].map((r) => {
  r.meta.navBarTab = 6;

  return r;
});
