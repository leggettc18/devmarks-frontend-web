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
            <dm-button type="primary" dark rounded @click.prevent="register(form)">Login</dm-button>
            <dm-button type="gray" rounded>Cancel</dm-button>
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
import DmButton from "@/components/Button.vue";

export default defineComponent({
  name: "Register",
  components: {
    DmButton,
  },
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
