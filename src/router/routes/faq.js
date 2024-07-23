import FAQ from "@/views/FAQ/FAQ.vue";
import FormFaq from "@/views/FAQ/Form/Main.vue";
import { modulesSystem, modulesSystemLevel } from "@/constants";

export default [
  {
    path: "/faq",
    name: "faq",
    meta: {
      ShowNav: true,
      title: "FAQ",
      modulesNeeded: [modulesSystem.faq, modulesSystemLevel.read],
    },
    component: FAQ,
  },
  {
    path: "/form-faq/:id?",
    name: "form-faq",
    meta: {
      ShowNav: false,
      title: "FAQ",
      modulesNeeded: [modulesSystem.faq, modulesSystemLevel.write],
    },
    component: FormFaq,
  },
].map((r) => {
  r.meta.navBarTab = 12;

  return r;
});
