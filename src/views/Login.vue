<template>
  <v-row align="center" justify="center" class="text-center">
    <v-col cols="12" sm="8" md="4">
      <v-row justify="center">
        <v-img src="../assets/logo.svg" max-width="100" />
      </v-row>
      <div class="text-h4 text-center">Sign in</div>

      <ul v-if="loginError" class="error-messages">
        <li>{{ loginError }}</li>
      </ul>

      <v-form ref="form" @submit="onSubmit">
        <v-text-field
          id="input-email"
          v-model="email"
          type="email"
          required
          placeholder="Email"
          label="Email address:"
        ></v-text-field>
        <v-text-field
          id="input-password"
          v-model="password"
          required
          type="password"
          placeholder="Password"
          label="Password:"
        ></v-text-field>
        <v-btn type="submit" color="primary">
          Sign in
        </v-btn>
        <p class="text-right">
          <router-link to="/register"> Need an account? </router-link>
        </p>
      </v-form>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import auth from "@/store/modules/auth";

@Component
export default class Login extends Vue {
  email = "";
  password = "";
  loginError = "";

  onSubmit(evt: Event) {
    evt.preventDefault();
    auth
      .login({
        email: this.email,
        password: this.password
      })
      .then(() => this.$router.push("/"))
      .catch(err => {
        console.error(err);
        this.loginError = "Invalid username or password";
      });
  }
}
</script>
