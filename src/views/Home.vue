<template>
  <div align="center" justify="center">
    <BrandIcon></BrandIcon>
    <p class="text-3xl">Devmarks</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BrandIcon from "@/components/BrandIcon.vue";

export default defineComponent({
  name: "Home",
  components: {
    BrandIcon,
  },
});
</script>
