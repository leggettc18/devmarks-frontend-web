<template>
  <header class="w-full bg-primary">
    <nav class="w-full bg-primary text-white">
      <div class="flex justify-between">
        <div>
          <div class="flex space-x-2 pl-2">
            <img src="@/assets/logo-inverted.svg" width="50" />
            <router-link class="nav-link" to="/">
              <h1 class="brand">Devmarks</h1>
            </router-link>
          </div>
        </div>
        <slot name="nav-right"></slot>
      </div>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "NavBar",
});
</script>