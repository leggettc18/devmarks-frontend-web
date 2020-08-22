import axios from "axios";
import {
    UserSubmit,
    UserResponse,
    User,
} from "@/models/user";
import {
    Credentials,
    AuthState,
} from '@/models/auth';

export const api = axios.create({
    baseURL: window.location.protocol + "//" + window.location.host + "/api",
});

export function setToken(token: string) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export function clearToken() {
    delete api.defaults.headers.common['Authorization'];
}

export async function login(creds: Credentials): Promise<AuthState> {
    let authState: AuthState = {
        token: "",
        status: "",
    };
    const response = await api.post('/auth/token', {
        creds,
    }).then(resp => {
        authState.token = resp.data.token;
        authState.status = "success";
    }).catch(err => {
        authState.token = "";
        authState.status = "error";
    });
    return authState;
}

export async function fetchUser(): Promise<User> {
    const response = await api.get('/user');
    return (response.data as UserResponse).user;
}
