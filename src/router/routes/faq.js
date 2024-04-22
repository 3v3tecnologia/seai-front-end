import studyUpdate from "@/router/props/study/update";
import BaseForm from "@/views/BaseForm.vue";
import FAQ from "@/views/FAQ/FAQ.vue";

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
];
