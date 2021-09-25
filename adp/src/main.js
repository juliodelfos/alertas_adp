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

//MomentJS
import moment from "moment";
Vue.filter("formatDate", (value) => {
  moment.locale("es-mx");
  if (value) {
    return moment(String(value)).format("LL");
  }
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
