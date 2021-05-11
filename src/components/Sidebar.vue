<template>
  <aside v-if="mountSidebar" class="min-h-screen">
    <transition name="slide-right" appear @after-leave="close">
      <div v-if="closeSidebar" class="min-h-screen" :class="`bg-${bgColor}`">
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
.slide-right-enter-active,
.slide-right-leave-active {
  transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transition-property: transform, left, margin-left;
  transform: translateX(0%);
}
.slide-right-enter,
.slide-right-leave-to {
  transform: translateX(-100%);
  left: 0 !important;
  margin-left: 0 !important;
}
</style>

