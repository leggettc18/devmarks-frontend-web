<template>
  <aside v-if="mountSidebar" class="min-h-screen" :class="`bg-${bgColor}`">
    <slot></slot>
  </aside>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  name: "Sidebar",
  props: {
    bgColor: {
      type: String,
      default: "blue",
    },
    textColor: {
      type: String,
      default: "white",
    },
    modelValue: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const mountSidebar = ref(props.modelValue);

    const close = () => {
      emit("update:modelValue", false);
      mountSidebar.value = props.modelValue;
    };

    watch(
      () => props.modelValue,
      (value) => {
        mountSidebar.value = value;
      }
    );

    return {
      close,
      mountSidebar,
    };
  },
});
</script>

