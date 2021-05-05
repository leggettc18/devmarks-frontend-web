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
    bgColor: {
      type: String,
      default: "blue-500",
    },
    textColor: {
      type: String,
      default: "white",
    },
    hoverColor: {
      type: String,
      default: "blue-900",
    },
    hoverTextColor: {
      type: String,
      default: "blue-100",
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
    if (props.dark) {
      const classes = {
        rounded: props.rounded,
      };
    }
    const classes = {
      rounded: props.rounded,
      [`bg-${props.bgColor}`]: true,
      [`text-${props.textColor}`]: true,
      [`hover:bg-${props.hoverColor}`]: true,
      [`hover:text-${props.hoverTextColor}`]: true,
    };
    return { classes };
  },
});
</script>
