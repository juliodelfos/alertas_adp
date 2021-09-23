import Vue from "vue";
import VueRouter from "vue-router";
import Inicio from "../views/Home.vue";
import Perfil from "../views/Perfil.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Inicio",
    component: Inicio,
  },
  {
    path: "/perfil",
    name: "Perfil",
    component: Perfil,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
