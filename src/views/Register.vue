<template>
  <el-row type="flex" justify="center">
    <el-col :span="10">
      <el-form ref="form" :model="form" label-width="120px" label-position="top">
        <el-form-item label="Username">
          <el-input v-model="form.email" type="email" placeholder="E-Mail"></el-input>
        </el-form-item>
        <el-form-item label="Password">
          <el-input v-model="form.password" type="password" placeholder="Password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-row type="flex" justify="center">
            <el-button type="primary" @click.prevent="register(form)">Login</el-button>
            <el-button>Cancel</el-button>
          </el-row>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Api } from "@/api/api";
import { useState } from "../store/store";
import { Credentials } from "@/models/auth";

export default defineComponent({
  name: "Register",
  setup() {
    const state = useState();

    const register = async (creds: Credentials) => {
      await Api.register(creds);
      const authState = await Api.login(creds);
      state.storeToken(authState);
      const user = await Api.fetchUser(authState.token);
      state.storeUser(user);
    };
    return {
      state,
      register,
    };
  },
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },
});
</script>
