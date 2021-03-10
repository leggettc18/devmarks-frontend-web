<template>
  <div>
    <div class="top-bar bg-primary">
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
          <el-menu-item-group>
            <el-menu-item index="login">
              <i class="el-icon-user" />
              <template #title>
                <span>Login</span>
              </template>
            </el-menu-item>
          </el-menu-item-group>
        </el-menu>
      </el-aside>
      <el-main>
        <el-button @click.prevent="state.clearUser()">Logout</el-button>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useState } from "@/store/store";

export default defineComponent({
  setup() {
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

