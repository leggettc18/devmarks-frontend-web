import {
    getModule,
    Module,
    MutationAction,
    VuexModule,
} from 'vuex-module-decorators';
import store from '@/store';
import { AuthState, Credentials } from '@/models/auth';
import { login, setToken, clearToken } from '@/api/api';

@Module({
    namespaced: true,
    name: 'auth',
    store,
    dynamic: true,
})
class AuthModule extends VuexModule {
    authState: AuthState = {
        token: localStorage.getItem("user-token") || "",
        status: "",
    }

    get isAuthenticated() {
        return !!this.authState.token;
    }

    @MutationAction
    async login(creds: Credentials) {
        const authState = await login(creds);
        setToken(authState.token);
        localStorage.setItem("user-token", authState.token);
        return { authState };
    }

    @MutationAction
    async logout() {
        localStorage.removeItem("user-token");
        clearToken();
        let authState: AuthState = {
            token: "",
            status: "",
        };
        return {
            authState
        };
    }
}

export default getModule(AuthModule);