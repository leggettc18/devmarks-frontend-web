<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-primary">
      <router-link to="/" class="navbar-brand">
        <img id="logo-nav" src="./assets/logo-inverted.svg" alt="Logo" />
        Devmarks
      </router-link>
      <div class="navbar-nav mr-auto">
        <div v-if="name">
          <li class="nav-item">
            <router-link to="/bookmarks" class="nav-link">Bookmarks</router-link>
          </li>
        </div>
      </div>
      <div v-if="!name" class="navbar-nav">
        <li class="nav-item">
          <router-link to=/login class="nav-link">Login</router-link>
        </li>
      </div>
      <div v-if="name" class="navbar-nav">
        <li class="nav-item">
          <a href="#" class="nav-link">{{ name }}</a>
        </li>
      </div>
    </nav>

    <div class="container h-100 mt-3">
      <router-view />
    </div>
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
    user.loadUser();
  }
}
</script>
