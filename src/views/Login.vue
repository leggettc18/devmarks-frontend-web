<template>
  <el-row type="flex" justify="center">
    <el-col :span="10">
      <el-form ref="form" label-width="120px" label-position="top">
        <el-form-item label="Username">
          <el-input v-model="form.email" type="email" placeholder="E-Mail"></el-input>
        </el-form-item>
        <el-form-item label="Password">
          <el-input v-model="form.password" type="password" placeholder="Password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-row type="flex" justify="center">
            <el-button type="primary" @click.prevent="login()">Login</el-button>
            <el-button>Cancel</el-button>
          </el-row>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useState } from "../store/store";
import { Credentials } from "@/models/auth";
import { useLoginMutation } from "@/generated/graphql";
import router from "@/router";

export default defineComponent({
  name: "Login",
  setup() {
    const state = useState();

    const credentials = ref({
      email: "",
      password: "",
    } as Credentials);

    const { mutate: login, onDone } = useLoginMutation(() => ({
      variables: credentials.value,
    }));

    onDone((login) => {
      if (login.data?.login?.token && login.data.login.user) {
        state.storeToken({ token: login.data?.login.token });
        state.storeUser(login.data?.login?.user);
        router.push("/home");
      }
    });

    return {
      state,
      login,
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
