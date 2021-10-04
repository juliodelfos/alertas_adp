import Vue from "vue";
import VueRouter from "vue-router";
import Inicio from "@/views/Home.vue";
import PerfilADP from "@/views/PerfilADP.vue";
import GrupoCards from "@/views/GrupoCards.vue";
import Timeline from "@/views/Timeline.vue";

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
    props: true,
  },
  {
    path: "/general",
    name: "GrupoCards",
    component: GrupoCards,
    props: true,
  },
  {
    path: "/timeline",
    name: "Timeline",
    component: Timeline,
    props: true,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
