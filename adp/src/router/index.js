import Vue from "vue";
import VueRouter from "vue-router";
import Inicio from "@/views/Home.vue";
import PerfilADP from "@/views/PerfilADP.vue";
import VistaPrincipal from "@/views/GrupoCards.vue";
import firebase from "firebase";
import Timeline from "@/views/Timeline.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: "/",
      name: "Inicio",
      component: Inicio,
    },
    {
      path: "/general",
      name: "GrupoCards",
      component: VistaPrincipal,
      props: true,
      // meta: { requiresAuth: true },
    },
    {
      path: "/perfil",
      name: "PerfilADP",
      component: PerfilADP,
      props: true,
      // meta: { requiresAuth: true },
    },
    {
      path: "/timeline",
      name: "Timeline",
      component: Timeline,
      props: true,
      // meta: { requiresAuth: true },
    },
  ],
});

// router.beforeEach((to, from, next) => {
//   const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
//   const isAuthenticated = firebase.auth().currentUser;
//   requiresAuth && !isAuthenticated ? next("VistaPrincipal") : next();
// });

export default router;
