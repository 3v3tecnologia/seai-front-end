import BaseCrudView from "@/views/templates/BaseCrudView.vue";
import Users from "@/views/Users/Users.vue";
import CreateUsers from "@/views/Users/Form/Main.vue";
import CreateUserView from "@/views/UserRegisterView.vue";
import { actionPrefix, modulesSystem, modulesSystemLevel } from "@/constants";
import routeProps from "@/router/props";

export default [
  {
    path: "/users",
    name: "users",
    meta: {
      title: `Usuários`,
      ShowNav: true,
      modulesNeeded: [modulesSystem.user, modulesSystemLevel.read],
    },
    component: Users,
  },
  {
    path: "/users/form/:id?",
    name: "create-user",
    meta: {
      title: `${actionPrefix.create} usuário`,
      modulesNeeded: [modulesSystem.user, modulesSystemLevel.write],
    },
    component: CreateUsers,
  },
].map((r) => {
  r.meta.navBarTab = 0;

  return r;
});
