import Logs from "@/views/LogsPage/Logs.vue";
import { modulesSystem, modulesSystemLevel } from "@/constants";

export default [
  {
    path: "/logs",
    name: "logs",
    meta: {
      ShowNav: true,
      title: "Logs",
      modulesNeeded: [modulesSystem.logs, modulesSystemLevel.read],
    },
    component: Logs,
  },
];
