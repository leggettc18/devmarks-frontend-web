import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import auth from "@/store/modules/auth";
import "./registerServiceWorker";

import "@/assets/styles.scss";
import { Api } from "./api/api";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

if (auth.isAuthenticated) {
  Api.setToken(auth.authState.token);
}

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
