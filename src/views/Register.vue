<template>
  <v-row
    align="center"
    justify="center"
    class="text-center"
  >
    <v-col
      cols="12"
      sm="8"
      md="4"
    >
      <v-row justify="center">
        <v-img
          src="../assets/logo.svg"
          max-width="100"
        />
      </v-row>
      <div class="text-h4 text-center">
        Sign Up
      </div>

      <ul
        v-if="registerError"
        class="error-messages"
      >
        <li>{{ registerError }}</li>
      </ul>

      <v-form
        ref="form"
        @submit="onSubmit"
      >
        <v-text-field
          id="input-email"
          v-model="email"
          type="email"
          required
          placeholder="Email"
          label="Email address:"
        />
        <v-text-field
          id="input-password"
          v-model="password"
          required
          type="password"
          placeholder="Password"
          label="Password:"
        />
        <v-btn
          type="submit"
          color="primary"
        >
          Sign in
        </v-btn>
        <p class="text-right">
          <router-link to="/login">
            Already have an account?
          </router-link>
        </p>
      </v-form>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import auth from "@/store/modules/auth";

@Component
export default class Register extends Vue {
  email = "";
  password = "";
  registerError = "";
  slide = 0;
  sliding: boolean | null = null;

  onSubmit(evt: Event) {
    evt.preventDefault();
    auth
      .register({
        email: this.email,
        password: this.password,
      })
      .then(() => this.$router.push("/login"))
      .catch((err) => {
        console.error(err);
        this.registerError = "Invalid username or password";
      });
  }
}
</script>
