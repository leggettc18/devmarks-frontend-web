import Vue from "vue";
import VueRouter, { RouteConfig, Route } from "vue-router";

import auth from "@/store/modules/auth";

const ifNotAuthenticated = (to: Route, from: Route, next: Function) => {
  if (!auth.isAuthenticated) {
    next();
    return;
  }
  next('/');
}

const ifAuthenticated = (to: Route, from: Route, next: Function) => {
  if (auth.isAuthenticated) {
    next();
    return;
  }
  next('/login');
}

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    alias: "/home",
    name: "home",
    component: () => import("@/views/Home.vue")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login.vue"),
    beforeEnter: ifNotAuthenticated
  },
  {
    path: "/bookmarks",
    name: "bookmarks",
    component: () => import("@/views/Bookmarks.vue"),
    beforeEnter: ifAuthenticated
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
