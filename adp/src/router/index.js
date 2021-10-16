import Vue from "vue";
import VueRouter from "vue-router";
import Inicio from "@/views/Home.vue";
import PerfilADP from "@/views/PerfilADP.vue";
import GrupoCards from "@/views/GrupoCards.vue";
import firebase from "firebase";
import Timeline from "@/views/Timeline.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "Inicio",
    component: Inicio,
  },
  {
    path: "/perfil",
    name: "PerfilADP",
    component: PerfilADP,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/general",
    name: "GrupoCards",
    component: GrupoCards,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/timeline",
    name: "Timeline",
    component: Timeline,
    props: true,
    meta: { requiresAuth: true },
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isAuthenticated = firebase.auth().currentUser;

  if (isAuthenticated && to.path === "/") {
    next("/login");
  }
  if (requiresAuth && !isAuthenticated) {
    next("/general");
  } else {
    next();
  }

  // if (isAuthenticated && to.name === "Timeline") {
  //   next({ name: "Inicio" });
  // }
  // else if (isAuthenticated && to.name === "PerfilADP") {
  //   next({ name: "Inicio" });
  // }
  // if (requiresAuth && !isAuthenticated) {
  //   next({ name: "GrupoCards" });
  // } else {
  //   next();
  // }
});

export default router;
