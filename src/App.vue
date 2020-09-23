<template>
  <v-app>
    <v-app-bar app color="primary" dark clipped-left v-if="name">
      <div class="d-flex align-center">
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="./assets/logo-inverted.svg"
          transition="scale-transition"
          width="40"
        />

        <v-toolbar-title>Devmarks</v-toolbar-title>
      </div>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="primary--text text--accent-4"
        >
          <router-link class="nav-link" to="home">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item>
          </router-link>
          <router-link class="nav-link" to="bookmarks">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-bookmark</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Bookmarks</v-list-item-title>
            </v-list-item>
          </router-link>
        </v-list-item-group>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn
            color="primary"
            block
          >
            Logout
          </v-btn>
        </div>
      </template>

    </v-navigation-drawer>
    <v-main>
      <v-container
        class="fill-height"
        fluid
      >
        <router-view />
      </v-container>
    </v-main>
  </v-app>
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
  drawer = false;
  group = null;

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
