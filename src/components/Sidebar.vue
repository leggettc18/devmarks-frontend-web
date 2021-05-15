<template>
  <aside v-if="mountSidebar">
    <transition name="slide" appear @after-leave="close()">
      <div v-show="closeSidebar" class="h-full" :class="`bg-${bgColor}`">
        <slot></slot>
      </div>
    </transition>
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
    const closeSidebar = ref(props.modelValue);

    const close = () => {
      emit("update:modelValue", false);
      mountSidebar.value = props.modelValue;
    };

    watch(
      () => props.modelValue,
      (value) => {
        if (value) mountSidebar.value = true;
        closeSidebar.value = value;
      }
    );

    return {
      close,
      mountSidebar,
      closeSidebar,
    };
  },
});
</script>

<style>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.2s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
  transition: all 150ms ease-in 0s;
}
</style>

