import {
  Action,
  getModule,
  Module,
  Mutation,
  MutationAction,
  VuexModule
} from "vuex-module-decorators";
import store from "@/store";
import { AuthState, Credentials } from "@/models/auth";
import { Api } from "@/api/api";
import user from "./user";

@Module({
  namespaced: true,
  name: "auth",
  store,
  dynamic: true
})
class AuthModule extends VuexModule {
  authState: AuthState = {
    token: localStorage.getItem("user-token") || ""
  };

  get isAuthenticated() {
    return !!this.authState.token;
  }

  @MutationAction
  async login(creds: Credentials) {
    const authState = await Api.login(creds);
    Api.setToken(authState.token);
    localStorage.setItem("user-token", authState.token);
    user.loadUser();
    return { authState };
  }

  @Action
  async register(creds: Credentials) {
    await Api.register(creds);
  }

  @Mutation
  logout() {
    localStorage.removeItem("user-token");
    Api.clearToken();
    this.authState.token = "";
    user.unloadUser();
  }
}

export default getModule(AuthModule);
