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
      <div class="navbar-nav">
        <li class="nav-item">
          <router-link to=/login class="nav-link">Login</router-link>
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

@Component
export default class App extends Vue {}
</script>
