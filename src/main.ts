import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import auth from "@/store/modules/auth";
import {setToken} from "@/api/api";
import "./registerServiceWorker";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

import "@/assets/styles.scss"

Vue.config.productionTip = false;

if (auth.isAuthenticated) {
  const token = auth.authState.token
  if (token) {
    setToken(token)
  }
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
