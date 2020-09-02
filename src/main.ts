import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import auth from "@/store/modules/auth";
import "./registerServiceWorker";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

import "@/assets/styles.scss"
import { Api } from './api/api';

Vue.config.productionTip = false;

if (auth.isAuthenticated) {
  Api.setToken(auth.authState.token);
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
