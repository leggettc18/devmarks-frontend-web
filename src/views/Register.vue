<template>
  <el-row type="flex" justify="center">
    <el-col :span="10">
      <el-form ref="form" :model="form" label-width="120px" label-position="top">
        <el-form-item label="E-mail">
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
      <div v-if="registerError">Error: {{registerError.message}}</div>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useState } from "../store/store";
import { Credentials } from "@/models/auth";
import { useRegisterMutation } from "@/generated/graphql";
import router from "@/router";

export default defineComponent({
  name: "Register",
  setup() {
    const state = useState();

    const credentials = ref({
      email: "",
      password: "",
    } as Credentials);

    const {
      mutate: register,
      onDone,
      error: registerError,
    } = useRegisterMutation(() => ({
      variables: credentials.value,
    }));

    onDone((register) => {
      if (register.data?.register?.token && register.data.register.user) {
        state.storeToken({ token: register.data?.register.token });
        state.storeUser(register.data?.register?.user);
        router.push("/home");
      }
    });
    return {
      state,
      register,
      credentials,
      registerError,
    };
  },
  data() {
    return {
      form: this.credentials,
    };
  },
});
</script>
