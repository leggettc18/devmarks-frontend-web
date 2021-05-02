<template>
  <div>
    <!--     <el-header class="top-bar bg-primary">
      <div class="flex">
        <div class="align-center">
          <i
            v-if="isLoggedIn()"
            class="collapse-icon"
            :class="collapseIcon"
            @click.prevent="isCollapse = !isCollapse"
          />
        </div>
        <img id="logo-nav" src="@/assets/logo-inverted.svg" />
        <router-link class="nav-link" to="/">
          <h1 class="brand">Devmarks</h1>
        </router-link>
      </div>

      <div class="flex align-center">
        <div v-if="!isLoggedIn()">
          <ul class="nav-links">
            <li class="nav-link-item">
              <router-link class="nav-link" to="/login">Login</router-link>
            </li>
            <li class="nav-link-item">
              <router-link class="nav-link" to="/register">Register</router-link>
            </li>
          </ul>
        </div>
        <div v-else>
          <el-button type="text" class="nav-link" @click.prevent="state.logOut()">Logout</el-button>
        </div>
      </div>
    </el-header>-->
    <navbar>
      <template v-slot:nav-right>
        <template v-if="!isLoggedIn">
          <div class="flex space-x-2 align-center">
            <div>
              <router-link to="/register">Register</router-link>
            </div>
            <div class="pr-2">
              <router-link to="/login">Login</router-link>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="flex space-x-2 align-center">
            <div class="pr-2">
              <router-link to="/logout">Logout</router-link>
            </div>
          </div>
        </template>
      </template>
    </navbar>
    <el-container>
      <el-aside v-if="isLoggedIn()">
        <el-menu router="true" class="el-menu-vertical" :collapse="isCollapse">
          <el-menu-item-group>
            <el-menu-item index="home">
              <i class="el-icon-house" />
              <template #title>
                <span>Home</span>
              </template>
            </el-menu-item>
            <el-menu-item index="bookmarks">
              <i class="el-icon-collection-tag" />
              <template #title>
                <span>Bookmarks</span>
              </template>
            </el-menu-item>
          </el-menu-item-group>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useState } from "@/store/store";
import Navbar from "@/components/Navbar.vue";

export default defineComponent({
  components: {
    Navbar,
  },
  setup() {
    document.title = "Devmarks";
    const state = useState();
    const isCollapse = ref(false);

    const isLoggedIn = () => {
      return state.isUserSet();
    };

    return {
      state,
      isCollapse,
      isLoggedIn,
    };
  },
  computed: {
    collapseIcon(): string {
      return this.isCollapse ? "el-icon-s-unfold" : "el-icon-s-fold";
    },
  },
});
</script>

<style lang="scss">
</style>

