import Users from "@/views/Users/Users.vue";
import CreateUsers from "@/views/Users/Form/Main.vue";
import { actionPrefix, modulesSystem, modulesSystemLevel } from "@/constants";

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
