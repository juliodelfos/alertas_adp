import Vue from "vue";
import VueRouter from "vue-router";
// import firebase from "firebase";

//Vistas
import Inicio from "@/views/Inicio.vue";
import Tabla from "@/views/Tabla.vue";
import Tarjetas from "@/views/Tarjetas.vue";
import Perfil from "@/views/Perfil.vue";

//404
import NotFound from "@/views/NotFound.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Inicio",
      component: Inicio,
    },
    {
      path: "/tabla",
      name: "Tabla",
      component: Tabla,
    },
    {
      path: "/tarjetas",
      name: "Tarjetas",
      component: Tarjetas,
      props: true,
      // meta: { requiresAuth: true },
    },
    {
      path: "/perfil",
      name: "Perfil",
      component: Perfil,
      props: true,
      // meta: { requiresAuth: true },
    },
    {
      path: "*",
      name: "NotFound",
      component: NotFound,
    },
  ],
});

// router.beforeEach((to, from, next) => {
//   const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
//   const isAuthenticated = firebase.auth().currentUser;
//   requiresAuth && !isAuthenticated ? next("VistaPrincipal") : next();
// });

export default router;
