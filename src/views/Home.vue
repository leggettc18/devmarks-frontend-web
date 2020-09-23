<template>
  <div>
    <v-row align="center">
      <v-col cols="6" sm="4">
      <v-img
        src="../assets/logo.svg"
        max-width="250"
      />
      </v-col>
      <v-col cols="6" sm="4">
      <p class="text-h1">
        Devmarks
      </p>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Home extends Vue {

}
</script>