<template>
  <v-app>
    <v-app-bar app color="primary" dark v-if="name">
      <div class="d-flex align-center">
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
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
      absolute
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="primary--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-bookmark</v-icon>
            </v-list-item-icon>
            <v-list-item-title><router-link to="bookmarks">Bookmarks</router-link></v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
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
