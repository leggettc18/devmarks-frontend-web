<template>
    <div class="home-page">
    <div class="row align-items-center h-100">
        <div class="col-9 mx-auto">
            <div class="d-flex my-5 py-5 align-items-center justify-content-center">
                <img id="logo" class="px-3" src="@/assets/logo.svg" alt="Logo" />
                <span class="display-4 text-muted">Devmarks</span>
            </div>
        </div>
    </div>
    <div class="row" v-if="!isAuthenticated">
            <div class="col-md-6 offset-md-3 col-xs-12">
                <h1 class="text-xs-center">Register</h1>

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