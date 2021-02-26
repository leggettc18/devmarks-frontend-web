import {
  getModule,
  Module,
  Mutation,
  MutationAction,
  VuexModule
} from "vuex-module-decorators";
import store from "@/store";
import { User } from "@/models/user";
import { Api } from "@/api/api";

@Module({
  namespaced: true,
  name: "users",
  store,
  dynamic: true
})
class UsersModule extends VuexModule {
  user: User | null = null;

  get name() {
    return (this.user && this.user.email) || null;
  }

  @MutationAction
  async loadUser() {
    let user: User | null;
    try {
      user = await Api.fetchUser();
    } catch {
      user = null;
    }
    return { user };
  }

  @Mutation
  unloadUser() {
    this.user = null;
  }
}

export default getModule(UsersModule);
