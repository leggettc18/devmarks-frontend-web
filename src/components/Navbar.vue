<template>
  <header class="w-full bg-primary">
    <nav class="w-full bg-primary text-white items-center p-2">
      <div class="flex justify-between items-center">
        <slot name="nav-left"></slot>
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