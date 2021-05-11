<template>
  <div>
    <el-form ref="form" label-width="120px" label-position="top">
      <dm-input v-model="form.email" name="email" label="E-Mail"></dm-input>
      <template v-if="loginErrors.email">
        <div v-for="(error, i) in loginErrors.email" :key="i">
          <span v-if="error.extensions" class="error">{{error.extensions.message}}</span>
        </div>
      </template>
      <dm-input v-model="form.password" type="password" name="password" label="Password"></dm-input>
      <template v-if="loginErrors.password">
        <div v-for="(error, i) in loginErrors.password" :key="i">
          <span v-if="error.extensions" class="error">{{error.extensions.message}}</span>
        </div>
      </template>
      <el-form-item>
        <el-row type="flex" justify="center">
          <dm-button type="primary" dark rounded @click.prevent="login()">Login</dm-button>
          <dm-button type="gray" rounded>Cancel</dm-button>
        </el-row>
      </el-form-item>
    </el-form>
    <div v-if="loginErrors && !loading">
      <div v-for="(e, i) of loginErrors.email" :key="i">{{e.extensions.message}}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useState } from "../store/store";
import { Credentials } from "@/models/auth";
import { useLoginMutation } from "@/generated/graphql";
import router from "@/router";
import { GraphQLError } from "graphql";
import DmButton from "@/components/Button.vue";
import DmInput from "@/components/Input.vue";

export default defineComponent({
  name: "Login",
  components: {
    DmButton,
    DmInput,
  },
  setup() {
    const state = useState();

    const credentials = ref({
      email: "",
      password: "",
    } as Credentials);

    const loginErrors = ref({
      email: null,
      password: null,
    } as {
      email: null | GraphQLError[];
      password: null | GraphQLError[];
    });

    const {
      mutate: login,
      onDone,
      error: loginError,
      loading,
    } = useLoginMutation(() => ({
      variables: credentials.value,
      errorPolicy: "all",
    }));

    onDone((login) => {
      if (login.data?.login?.token && login.data.login.user) {
        state.storeToken({ token: login.data?.login.token });
        state.storeUser(login.data?.login?.user);
        router.push("/home");
      }
      if (login.errors) {
        loginErrors.value.email = login.errors.filter((e) => {
          return e.extensions?.field === "email";
        });
        loginErrors.value.password = login.errors.filter((e) => {
          return e.extensions?.field === "password";
        });
      }
    });

    return {
      state,
      login,
      loginError,
      loginErrors,
      loading,
      credentials,
    };
  },
  data() {
    return {
      form: this.credentials,
    };
  },
});
</script>
