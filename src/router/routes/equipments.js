import BaseForm from "@/views/BaseForm.vue";
import { actionPrefix, modulesSystem, modulesSystemLevel } from "@/constants";
import routeProps from "@/router/props";
import Equipments from "@/views/Equipments/Equipments.vue";

export default [
  {
    path: "/equipments",
    name: "equipments",
    meta: {
      ShowNav: true,
      title: `Equipamentos e leituras`,
      modulesNeeded: [modulesSystem.equipments, modulesSystemLevel.read],
    },
    component: Equipments,
    props: routeProps.equipments.list,
  },
  {
    path: "/equipments/edit/:id",
    name: "edit-equipment",
    meta: {
      title: `${actionPrefix.edit} equipamento`,
      modulesNeeded: [modulesSystem.equipments, modulesSystemLevel.write],
    },
    component: BaseForm,
    props: routeProps.equipments.update,
  },
  {
    path: "/equipments/create",
    name: "create-equipment",
    meta: {
      title: `${actionPrefix.create} equipamento`,
      modulesNeeded: [modulesSystem.equipments, modulesSystemLevel.write],
    },
    component: BaseForm,
    props: routeProps.equipments.create,
  },
].map((r) => {
  r.meta.navBarTab = 1;

  return r;
});
