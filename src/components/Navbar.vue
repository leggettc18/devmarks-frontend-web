<template>
  <header class="w-full" :class="`bg-${bgColor}`">
    <nav class="w-full items-center p-2" :class="`text-${textColor}`">
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
  props: {
    bgColor: {
      type: String,
      default: "blue",
    },
    textColor: {
      type: String,
      default: "white",
    },
  },
});
</script>