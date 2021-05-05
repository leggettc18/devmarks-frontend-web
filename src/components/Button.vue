<template>
  <router-link v-if="routerLink" :to="link-to" :class="classes" class="p-1 shadow">
    <slot></slot>
  </router-link>
  <button v-else :class="classes" class="p-1 shadow">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Button",
  props: {
    rounded: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "blue",
    },
    dark: {
      type: Boolean,
      default: false,
    },
    hoverColor: {
      type: String,
      default: "blue-900",
    },
    routerLink: {
      type: Boolean,
      default: false,
    },
    linkTo: {
      type: String,
      default: "#",
    },
  },
  setup(props) {
    let classes: Record<string, boolean>;
    if (props.dark) {
      classes = {
        rounded: props.rounded,
        [`bg-${props.type}-700`]: true,
        "text-white": true,
        [`hover:bg-${props.type}-800`]: true,
      };
    } else {
      classes = {
        rounded: props.rounded,
        [`bg-${props.type}-100`]: true,
        [`text-${props.type}-700`]: true,
        [`hover:bg-${props.type}-300`]: true,
      };
    }
    return { classes };
  },
});
</script>
