import axios from "axios";
import {
    User,
} from "@/models/user";
import { Bookmark } from "@/models/bookmark";
import {
    Credentials,
    AuthState,
} from '@/models/auth';
import auth from '@/store/modules/auth';
import Router from '@/router';

export abstract class Api {
    private static api = axios.create({
        baseURL: window.location.protocol + "//" + window.location.hostname + ":" + 9092 + "/api",
    });

    static setToken(token: string) {
        this.api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    static clearToken() {
        delete this.api.defaults.headers.common['Authorization'];
    }

    static createAuthInterceptor() {
        this.api.interceptors.response.use(undefined, function(err) {
            return new Promise(function (resolve, reject) {
                if (err.response.status === 403 && err.config && !err.config.__isRetryRequest) {
                    auth.logout();
                    Router.push('/login');
                }
                throw err;
            });
        });
    }

    static async login(creds: Credentials): Promise<AuthState> {
        const response = await this.api.post('/auth/token/',
            creds,
        );
        return response.data as AuthState;
    }

    static async fetchUser(): Promise<User> {
        const response = await this.api.get('/user/');
        return response.data as User;
    }

    static async fetchBookmarks(): Promise<Bookmark[]> {
        const response = await this.api.get('/bookmarks/');
        return response.data as Bookmark[];
    }
}