import FAQ from "@/views/FAQ/FAQ.vue";
import FormFaq from "@/views/FAQ/Form/Main.vue";

export default [
  {
    path: "/faq",
    name: "faq",
    meta: {
      ShowNav: true,
      title: "FAQ",
      navBarTab: 12,
    },
    component: FAQ,
  },
  {
    path: "/form-faq/:id?",
    name: "form-faq",
    component: FormFaq,
  },
];
