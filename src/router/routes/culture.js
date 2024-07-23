import { actionPrefix, modulesSystem, modulesSystemLevel } from "@/constants";
import cultureList from "@/router/props/culture/list";
import cultureCreate from "@/router/props/culture/create";
import cultureUpdate from "@/router/props/culture/update";
import CultureForm from "@/views/Cultures/Form/CultureForm.vue";
import Culture from "@/views/Cultures/Culture.vue";

export default [
  {
    path: "/culture",
    name: "culture",
    meta: {
      ShowNav: true,
      title: `Culturas`,
      navBarTab: 8,
      modulesNeeded: [modulesSystem.crop, modulesSystemLevel.read],
    },
    component: Culture,
    props: cultureList,
  },
  {
    path: "/culture/create",
    name: "create-culture",
    meta: {
      ShowNav: false,
      title: `${actionPrefix.create} cultura`,
      modulesNeeded: [modulesSystem.crop, modulesSystemLevel.write],
    },
    component: CultureForm,
    props: cultureCreate,
  },
  {
    path: "/culture/edit/:id",
    name: "edit-culture",
    meta: {
      ShowNav: false,
      title: `${actionPrefix.edit} cultura`,
      modulesNeeded: [modulesSystem.crop, modulesSystemLevel.write],
    },
    component: CultureForm,
    props: cultureUpdate,
  },
].map((r) => {
  r.meta.navBarTab = 8;

  return r;
});
