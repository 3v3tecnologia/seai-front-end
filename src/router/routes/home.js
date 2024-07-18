import Home from "@/views/Home/home.vue";

export default [
  {
    path: "/home",
    name: "home",
    meta: {
      ShowNav: false,
      title: "FAQ",
      navBarTab: 0,
    },
    component: Home,
  },
];
