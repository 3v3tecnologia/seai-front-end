import { modulesSystem, modulesSystemLevel } from "@/constants";
import routeProps from "@/router/props";
import News from "@/views/News/News.vue";
import NewsForm from "@/views/News/Form/Main.vue";

export default [
  {
    path: "/newsletter",
    name: "newsletter",
    meta: {
      ShowNav: true,
      title: `Newsletter`,
      modulesNeeded: [modulesSystem.newsletter, modulesSystemLevel.read],
    },
    component: News,
    props: routeProps.newsletter.list,
  },
  {
    path: "/newsletter/form/:id?",
    name: "form-newsletter",
    meta: {
      title: `Formulário de notícia`,
      modulesNeeded: [modulesSystem.newsletter, modulesSystemLevel.write],
    },
    component: NewsForm,
    props: routeProps.newsletter.update,
  },
].map((r) => {
  r.meta.navBarTab = 2;

  return r;
});
