import Vue from "vue";
import VueRouter from "vue-router";
import Inicio from "@/views/Home.vue";
import PerfilADP from "@/views/PerfilADP.vue";
import GrupoCards from "@/views/GrupoCards.vue";
import firebase from "firebase";

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
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isAuthenticated = firebase.auth().currentUser;
  if (isAuthenticated && to.name === "Inicio") {
    next({ name: "GrupoCards" });
  } 
  // else if (isAuthenticated && to.name === "PerfilADP") {
  //   next({ name: "Inicio" });
  // }
  if (requiresAuth && !isAuthenticated) {
    next({ name: "Inicio" });
  } else {
    next();
  }
});

export default router;
