import Vue from "vue";
import VueRouter from "vue-router";
import firebase from "firebase";

//Vistas
import Inicio from "@/views/Inicio.vue";
import Tabla from "@/views/Tabla.vue";
import Tarjetas from "@/views/Tarjetas.vue";
import Perfil from "@/views/Perfil.vue";
import EnviaEvaluacionesMensuales from "@/views/EnviaEvaluacionesMensuales.vue";
import EnviarCorreosMasivos from "@/views/EnviarCorreosMasivos.vue";
import RegistroExitoso from "@/views/RegistroExitoso.vue";
// import AlertasEnviadas from "@/views/AlertasEnviadas.vue";
import Plantillas from "@/views/Plantillas.vue";

//404
import NotFound from "@/views/NotFound.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
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
      meta: { requiresAuth: true },
    },
    {
      path: "/tarjetas",
      name: "Tarjetas",
      component: Tarjetas,
      props: true,
      meta: { requiresAuth: true },
    },
    {
      path: "/perfil/:indice",
      name: "Perfil",
      component: Perfil,
      props: true,
      meta: { requiresAuth: true },
    },
    {
      path: "/evaluaciones-mensuales",
      name: "EnviaEvaluacionesMensuales",
      component: EnviaEvaluacionesMensuales,
      props: true,
      meta: { requiresAuth: true },
    },
    {
      path: "/correos-masivos",
      name: "EnviarCorreosMasivos",
      component: EnviarCorreosMasivos,
      props: true,
      meta: { requiresAuth: true },
    },
    {
      path: "/exito",
      name: "RegistroExitoso",
      component: RegistroExitoso,
      props: true,
      meta: { requiresAuth: true },
    },
    {
      path: "*",
      name: "NotFound",
      component: NotFound,
    },
    // {
    //   path: "/alertas-enviadas",
    //   name: "AlertasEnviadas",
    //   component: AlertasEnviadas,
    //   meta: { requiresAuth: true },
    // },
    {
      path: "/plantillas",
      name: "Plantillas",
      component: Plantillas,
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isAuthenticated = firebase.auth().currentUser;
  // requiresAuth && !isAuthenticated ? next("Tarjetas") : next();
  if (requiresAuth && !isAuthenticated) {
    next("/");
  } else if (!requiresAuth && isAuthenticated) {
    next("tarjetas");
  } else {
    next();
  }
});

export default router;
