<template>
  <v-app id="devmarks">
    <v-app-bar v-if="name" app color="primary" dark clipped-left>
      <div class="d-flex align-center">
        <v-app-bar-nav-icon @click="drawer = !drawer" />
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
      <v-spacer />
      <v-divider class="mx-4" vertical />
      <div v-if="name">
        <v-avatar color="white" size="36">
          <v-icon color="primary">mdi-account</v-icon>
        </v-avatar>
      </div>
      <div v-if="!name">
        <router-link class="nav-link white--text" to="login">Login</router-link>
      </div>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list nav dense>
        <v-list-item-group v-model="group" active-class="primary--text text--accent-4">
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
          <v-btn color="primary" block @click="logout">Logout</v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-main>
      <v-container class="fill-height" fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import auth from "@/store/modules/auth";
import user from "@/store/modules/user";
import { Api } from "@/api/api";

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

  async logout() {
    await auth.logout();
    this.drawer = false;
    this.$router.push("login");
  }
}
</script>
