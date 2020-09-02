<template>
    <div class="row home-page h-100">
        <div class="col-sm-12 col-lg-6 align-items-center">
            <div class="mx-auto">
                <div class="d-flex my-5 py-5 align-items-center justify-content-center">
                    <img id="logo" class="pr-3" src="@/assets/logo.svg" alt="Logo" />
                    <span class="display-3 text-muted">Devmarks</span>
                </div>
            </div>
        </div>
        <div class="col-sm-12 col-lg-6 px-5" v-if="!isAuthenticated">
            <div class="col-md-8 offset-md-2 card col-xs-12 my-md-5">
                <div class="card-body">
                <h1 class="text-xs-center card-title">Register</h1>

                <p class="text-xs-center">
                    Already have an account?<router-link to="/login"> Sign in! </router-link>
                </p>

                <ul class="error-messages" v-if="registerError">
                    <li>{{ registerError }}</li>
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
                        Register
                    </b-button>
                </b-form>
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

    onSubmit(evt: Event) {
        evt.preventDefault();
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