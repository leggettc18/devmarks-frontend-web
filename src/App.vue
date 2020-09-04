<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="primary">
      <b-navbar-brand to="/">
        <b-img id="logo-nav" src="./assets/logo-inverted.svg" alt="Logo" />
        Devmarks
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="mr-auto">
          <b-nav-item v-if="name" to="/bookmarks">Bookmarks</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav v-if="!name">
          <b-nav-item to=/login>Login</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav v-if="name">
          <b-nav-item href="#">{{ name }}</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <b-container fluid="md" class="h-100 mt-3">
      <router-view />
    </b-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Route } from 'vue-router';
import auth from "@/store/modules/auth";
import user from "@/store/modules/user";
import { User } from './models/user';
import { Api } from '@/api/api';

@Component
export default class App extends Vue {
  get name() {
    return user.name;
  }

  created() {
    Api.createAuthInterceptor();
    if (auth.isAuthenticated) {
      user.loadUser();
    }
  }
}
</script>
