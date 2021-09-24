import Vue from "vue";
import VueRouter from "vue-router";
import Inicio from "@/views/Home.vue";
import PerfilADP from "@/views/PerfilADP.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Inicio",
    component: Inicio,
  },
  {
    path: "/perfil",
    name: "PerfilADP",
    component: PerfilADP,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
