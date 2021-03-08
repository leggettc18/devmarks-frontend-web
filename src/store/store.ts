import { reactive, provide, inject } from "vue";
import { User } from "@/models/user";
import { AuthState } from "@/models/auth";

export const stateSymbol = Symbol("state");

class State {
  user: User | null = null;
  auth: AuthState | null = null;

  storeUser(user: User) {
    this.user = user;
  }

  storeToken(authState: AuthState) {
    this.auth = authState;
  }
}

export const createState = () => {
  return reactive(new State());
};

export const useState = () => inject(stateSymbol) as State;
export const provideState = () => provide(stateSymbol, createState());
