<template>
  <header class="w-full bg-primary">
    <nav class="w-full bg-primary text-white items-center p-2">
      <div class="flex justify-between items-center">
        <div>
          <div class="flex space-x-2 pl-2 items-center">
            <img src="@/assets/logo-inverted.svg" width="35" />
            <router-link to="/" class="hover:text-primary-100">
              <div>Devmarks</div>
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