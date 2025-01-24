import BI from "@/views/BI/BI.vue";
import { modulesSystem, modulesSystemLevel } from "@/constants";

export default [
  {
    path: "/bi",
    name: "bi",
    meta: {
      ShowNav: true,
      title: "Análise de dados",
      modulesNeeded: [
        modulesSystem.business_analysis,
        modulesSystemLevel.write,
      ],
    },
    component: BI,
  },
];
