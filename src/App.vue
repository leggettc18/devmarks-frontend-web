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
    <navbar bg-color="primary" text-color="white">
      <template #nav-left>
        <div class="flex space-x-2 pl-2 items-center">
          <img src="@/assets/logo-inverted.svg" width="35" />
          <router-link to="/" class="hover:text-primary-100">
            <div>Devmarks</div>
          </router-link>
        </div>
      </template>
      <template #nav-right>
        <template v-if="!isLoggedIn">
          <div class="flex space-x-2 align-center">
            <div>
              <router-link to="/register" class="hover:text-primary-100">Register</router-link>
            </div>
            <div class="pr-2">
              <router-link to="/login" class="hover:text-primary-100">Login</router-link>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="flex space-x-2 align-center">
            <div class="pr-2">
              <router-link to="/logout" class="hover:text-primary-100">Logout</router-link>
            </div>
          </div>
        </template>
      </template>
    </navbar>
    <div class="flex flex-row min-h-screen bg-gray-100 text-gray-800">
      <aside
        v-if="isLoggedIn()"
        class="sidebar w-64 md:shadow transform -translate-x-full md:translate-x-0 transition-transform duration-150 ease-in bg-primary"
      >
        <div router="true" class="sidebar-content px-4 py-4">
          <ul class="flext flex-col w-full">
            <li class="my-px">
              <router-link
                to="/home"
                class="flex flex-row items-center h-10 px-3 rounded-lg text-white hover:bg-primary-100 hover:text-primary"
              >
                <span class="flex items-center justify-center text-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </span>
                <span class="ml-3">Home</span>
              </router-link>
            </li>
            <li class="my-px">
              <router-link
                to="/bookmarks"
                class="flex flex-row items-center h-10 px-3 rounded-lg text-white hover:bg-primary-100 hover:text-primary"
              >
                <span class="flex items-center justify-center text-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                    />
                  </svg>
                </span>
                <span class="ml-3">Bookmarks</span>
              </router-link>
            </li>
          </ul>
        </div>
      </aside>
      <div class="flex justify-center w-full">
        <router-view />
      </div>
    </div>
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

