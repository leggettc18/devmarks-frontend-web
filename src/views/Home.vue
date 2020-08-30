<template>
    <div class="row home-page h-100">
        <div class="col-sm-12 col-lg-6 align-items-center">
            <div class="mx-auto">
                <div class="d-flex my-5 py-5 align-items-center justify-content-center">
                    <img id="logo" class="px-3" src="@/assets/logo.svg" alt="Logo" />
                    <span class="display-4 text-muted">Devmarks</span>
                </div>
            </div>
        </div>
        <div class="col-sm-12 col-lg-6 px-5" v-if="!isAuthenticated">
            <div class="col-md-8 card col-xs-12 my-5">
                <div class="card-body">
                <h1 class="text-xs-center card-title">Register</h1>

                <p class="text-xs-center">
                    Already have an account?<router-link to="/register"> Sign in! </router-link>
                </p>

                <ul class="error-messages" v-if="registerError">
                    <li>{{ registerError }}</li>
                </ul>

                <form v-on:submit.prevent>
                    <fieldset class="form-group">
                        <input 
                            type="text" 
                            class="form-control form-control-lg"
                            v-model="email"
                            placeholder="Email"
                        />
                    </fieldset>
                    <fieldset class="form-group">
                        <input
                            class="form-control form-control-lg"
                            type="password"
                            v-model="password"
                            placeholder="Password"
                        />
                    </fieldset>
                    <button
                        @click="register()"
                        class="btn btn-lg btn-primary pull-xs-right"
                    >
                        Register
                    </button>
                </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import auth from '@/store/modules/auth';

@Component
export default class Home extends Vue{
    email = '';
    password = '';
    registerError = '';

    get isAuthenticated() {
        return auth.isAuthenticated;
    }

    register() {
        auth.register({
            email: this.email,
            password: this.password,
        })
        .then(() => this.$router.push('/login'))
        .catch((err) => {
                console.error(err);
                this.registerError = 'Invalid username or password';
        });
    }
}
</script>