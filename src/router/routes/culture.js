import { actionPrefix } from "@/constants";
import ManagementRegister from "../../views/templates/ManagementRegister.vue";
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
      navBarTab: 8,
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
      navBarTab: 8,
    },
    component: CultureForm,
    props: cultureUpdate,
  },
];
