import { reactive, provide, inject } from "vue";
import { User } from "@/models/user";
import { AuthState } from "@/models/auth";

export const stateSymbol = Symbol("state");

class State {
  private user: User | null = null;
  private auth: AuthState | null = null;

  constructor() {
    const userJson = localStorage.getItem("user");
    if (userJson) {
      this.user = JSON.parse(userJson) as User;
    }
    const token = localStorage.getItem("user-token");
    if (token) {
      this.auth = { token };
    }
  }

  storeUser(user: User) {
    this.user = user;
    localStorage.setItem("user", JSON.stringify(user));
  }

  storeToken(authState: AuthState) {
    this.auth = authState;
  }

  clearUser() {
    this.user = null;
    localStorage.removeItem("user");
  }

  isUserSet(): boolean {
    console.log(this.user !== null);
    return this.user !== null;
  }
}

export const createState = () => {
  return reactive(new State());
};

export const useState = () => inject(stateSymbol) as State;
export const provideState = () => provide(stateSymbol, createState());
