<template>
    <div class="auth-page">
        <div class="row">
            <div class="col-md-6 offset-md-3 col-xs-12">
                <h1 class="text-xs-center">Sign in</h1>
                <p class="text-xs-center">
                    <router-link to="/register"> Need an account? </router-link>
                </p>

                <ul class="error-messages" v-if="loginError">
                    <li>{{ loginError }}</li>
                </ul>

                <b-form @submit = "onSubmit">
                    <b-form-group
                        id="input-email-group"
                        label="Email address:"
                        label-for="input-email"
                    >
                        <b-form-input 
                            id="input-email"
                            type="email" 
                            required
                            v-model="email"
                            placeholder="Email"
                        />
                    </b-form-group>
                    <b-form-group
                        id="input-password-group"
                        label="Password:"
                        label-for="input-password"
                    >
                        <b-form-input
                            required
                            id="input-password"
                            type="password"
                            v-model="password"
                            placeholder="Password"
                        />
                    </b-form-group>
                    <b-button
                        type="submit"
                        variant="primary"
                        class="pull-xs-right"
                    >
                        Sign in
                    </b-button>
                </b-form>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import auth from '@/store/modules/auth';

@Component
export default class Login extends Vue{
    email = '';
    password = '';
    loginError = '';

    onSubmit(evt: Event) {
        evt.preventDefault();
        auth
            .login({
                email: this.email,
                password: this.password,
            })
            .then(() => this.$router.push('/'))
            .catch((err) => {
                console.error(err);
                this.loginError = 'Invalid username or password';
            });
    }
}
</script>