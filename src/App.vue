<template>
  <div class="min-h-screen flex flex-col">
    <navbar bg-color="primary" text-color="white" class="h-auto">
      <template #nav-left>
        <div class="flex space-x-2 pl-2 items-center">
          <svg
            v-show="isLoggedIn()"
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 hover:text-primary-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            @click="showSidebar = !showSidebar"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <BrandIcon class="h-8 w-8" fill-color="#ffffff" inner-color="#59344f"></BrandIcon>
          <router-link to="/" class="hover:text-primary-100">
            <div>Devmarks</div>
          </router-link>
        </div>
      </template>
      <template #nav-right>
        <template v-if="!isLoggedIn()">
          <div class="flex space-x-2 align-center">
            <div>
              <dm-button router-link to="/register" type="info">Register</dm-button>
            </div>
            <div class="pr-2">
              <dm-button router-link to="/login" type="secondary">Login</dm-button>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="flex space-x-2 align-center">
            <div class="pr-2">
              <dm-button type="danger" @click="logout">Logout</dm-button>
            </div>
          </div>
        </template>
      </template>
    </navbar>
    <div class="flex-1 flex flex-row bg-gray-100 text-gray-800 h-full">
      <div class="flex fixed md:relative min-h-full">
        <sidebar v-if="isLoggedIn()" v-model="showSidebar" bg-color="primary" text-color="white">
          <div router="true" class="sidebar-content px-4 py-4">
            <ul class="flext flex-col w-full">
              <li class="my-px">
                <router-link
                  to="/home"
                  class="flex flex-row items-center h-10 px-3 rounded-lg text-white hover:bg-primary-100 hover:text-primary transition duration-300"
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
                  class="flex flex-row items-center h-10 px-3 rounded-lg text-white hover:bg-primary-100 hover:text-primary transition duration-300"
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
        </sidebar>
      </div>
      <div class="flex justify-center w-full h-full p-5">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useState } from "@/store/store";
import Navbar from "@/components/Navbar.vue";
import Sidebar from "@/components/Sidebar.vue";
import DmButton from "@/components/Button.vue";
import BrandIcon from "@/components/BrandIcon.vue";
import router from "./router";

export default defineComponent({
  components: {
    Navbar,
    Sidebar,
    DmButton,
    BrandIcon,
  },
  setup() {
    document.title = "Devmarks";
    const state = useState();
    const showSidebar = ref(true);

    const isLoggedIn = () => {
      return state.isUserSet();
    };

    const logout = () => {
      state.logOut();
      router.push("/");
    };

    return {
      state,
      isLoggedIn,
      showSidebar,
      logout,
    };
  },
});
</script>

<style lang="scss">
</style>

