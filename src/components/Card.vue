<template>
  <div
    class="bg-opacity-95 border-opacity-60 | p-4 border-solid rounded-3xl border-2 | flex justify-around cursor-pointer | transition-colors duration-200"
    :class="classes"
  >
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Card",
  props: {
    color: {
      type: String,
      default: "indigo",
    },
    bgColor: {
      type: String,
      default: "",
    },
    textColor: {
      type: String,
      default: "",
    },
    borderColor: {
      type: String,
      default: "",
    },
    dark: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const classes = {
      [`bg-gray-800`]: props.dark && !props.bgColor,
      [`hover:bg-${props.color}-700`]: props.dark && !props.bgColor,
      [`bg-${props.bgColor}`]: !!props.bgColor,
      [`bg-gray-100`]: !props.dark && !props.bgColor,
      [`hover:bg-${props.color}-700`]: !props.dark && !props.bgColor,
      [`border-${props.color}-700`]: !props.borderColor,
      [`border-${props.borderColor}-700`]: !!props.borderColor,
      [`text-white`]: props.dark && !props.textColor,
      [`hover:text-gray-100`]: !props.dark && !props.textColor,
      [`text-gray-900`]: !props.dark && !props.textColor,
      [`text-${props.textColor}`]: !!props.textColor,
    };

    return {
      classes,
    };
  },
});
</script>
