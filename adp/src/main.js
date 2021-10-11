import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

//Bootstrap Vue
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

//Theme Bootstrap
import "bootswatch/dist/superhero/bootstrap.min.css";

//Vue Notifications
import Notifications from "vue-notification";
Vue.use(Notifications);

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

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
