import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// axios
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);

//Bootstrap Vue
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

//Theme Bootstrap
// import "bootswatch/dist/litera/bootstrap.min.css";

//Vue Toast Notification
import VueToast from "vue-toast-notification";
//import 'vue-toast-notification/dist/theme-default.css';
import "vue-toast-notification/dist/theme-sugar.css";
Vue.use(VueToast, {
  // One of the options
  duration: 4000,
});

//Firebase
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBzbYsbg9B4_F9is3T7R48UfGfhQgId74o",
  authDomain: "dnsc-ccaf2.firebaseapp.com",
  projectId: "dnsc-ccaf2",
  storageBucket: "dnsc-ccaf2.appspot.com",
  messagingSenderId: "354745127673",
  appId: "1:354745127673:web:31a30e80e606941ad8c828",
};

firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged((user) => {
  store.dispatch("fetchUser", user);
});

//MomentJS
import moment from "moment";
Vue.filter("formatDate", (value) => {
  moment.locale("es-mx");
  if (value) {
    return moment(String(value))
      .add(1, "days")
      .format("LL");
  }
});

//GridJS
import { GridGlobal } from "gridjs-vue";
Vue.use(GridGlobal);

//Sidebar
import VueSidebarMenu from "vue-sidebar-menu";
import "vue-sidebar-menu/dist/vue-sidebar-menu.css";
Vue.use(VueSidebarMenu);

//Font Awesome
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";

//Vue Meta
import VueMeta from "vue-meta";
Vue.use(VueMeta);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
