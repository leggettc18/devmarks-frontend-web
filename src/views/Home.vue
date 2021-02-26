<template>
  <v-row>
    <v-col cols="12">
      <v-row align="center" justify="center">
        <v-img src="../assets/logo.svg" max-width="150" class="ma-5" />
        <p class="text-h1 text--secondary">
          Devmarks
        </p>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Home extends Vue {}
</script>
