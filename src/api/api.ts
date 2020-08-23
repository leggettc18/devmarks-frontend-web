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
    baseURL: window.location.protocol + "//" + window.location.hostname + ":" + 9092 + "/api",
});

export function setToken(token: string) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export function clearToken() {
    delete api.defaults.headers.common['Authorization'];
}

export async function login(creds: Credentials): Promise<AuthState> {
    const response = await api.post('/auth/token/', {
        creds,
    });
    console.log(response.data.token);
    return response.data as AuthState;
}

export async function fetchUser(): Promise<User> {
    const response = await api.get('/user');
    return (response.data as UserResponse).user;
}
