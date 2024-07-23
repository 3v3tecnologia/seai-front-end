import BaseForm from "@/views/BaseForm.vue";
import BaseCrudView from "@/views/templates/BaseCrudView.vue";
import { actionPrefix } from "@/constants";
import routeProps from "@/router/props";
import Organs from "@/views/Organs/Organs.vue";
import FormOrgans from "@/views/Organs/Form/Main.vue";

export default [
  // {
  //   path: "/meteorological-bodies",
  //   name: "meteorological-bodies",
  //   meta: {
  //     ShowNav: true,
  //     title: `Órgãos meteorológicos`,
  //   },
  //   component: Organs,
  //   props: routeProps.metereologicalBodies.list,
  // },
  {
    path: "/meteorological-bodies/form-organs/:id?",
    name: "form-organs",
    meta: {
      title: `Formulário órgão meteorológico`,
    },
    component: FormOrgans,
    props: routeProps.metereologicalBodies.update,
  },
  {
    path: "/meteorological-bodies/create",
    name: "create-body",
    meta: {
      title: `${actionPrefix.create} órgão meteorológico`,
    },
    component: BaseForm,
    props: routeProps.metereologicalBodies.create,
  },
].map((r) => {
  r.meta.navBarTab = 1;

  return r;
});
