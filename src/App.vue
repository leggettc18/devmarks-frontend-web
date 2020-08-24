<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-primary">
      <router-link to="/dashboard" class="navbar-brand">
        <img id="logo" src="./assets/logo-inverted.svg" alt="Logo" />
        Devmarks
      </router-link>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <a href="/bookmarks" class="nav-link">Bookmarks</a>
        </li>
      </div>
      <div v-if="!name" class="navbar-nav">
        <li class="nav-item">
          <router-link to=/login class="nav-link">Login</router-link>
        </li>
      </div>
      <div v-if="name" class="navbar-nav">
        <li class="nav-item">
          {{ name }}
        </li>
      </div>
    </nav>

    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import auth from "@/store/modules/auth";
import user from "@/store/modules/user";
import { setToken } from "@/api/api";

@Component
export default class App extends Vue {
  get name() {
    if (auth.isAuthenticated) {
      user.loadUser()
      .catch((err) => {
        auth.logout();
        this.$router.push('/login');
      });
    }
    return user.name;
  }
}
</script>
