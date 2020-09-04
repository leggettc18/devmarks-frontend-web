<template>
    <b-row class="home-page h-100">
        <div class="col-sm-12 col-lg-6 align-items-center p-3">
            <b-carousel
                id="carousel-home"
                v-model="slide"
                :interval="6000"
                controls
                indicators
                background="#ababab"
                img-width="1024"
                img-height="580"
                style="text-shadow: 0.1rem 0.1rem 0.3rem #333;"
                @sliding-start="onSlideStart"
                @sliding-end="onSlideEnd"
            >
            <b-carousel-slide img-src="../assets/background.jpg">
            <div class="mx-auto">
                <div class="d-flex my-5 align-items-center justify-content-center">
                    <b-img id="logo" class="mr-3" src="../assets/logo.svg" alt="Logo" style="filter: drop-shadow( 0.1rem 0.4rem 0.3rem #333 );"/>
                    <span class="display-3">Devmarks</span>
                </div>
            </div>
            </b-carousel-slide>
            <b-carousel-slide caption="Organizations" img-blank img-alt="Organizations">
                <p>
                    Share bookmarks to valuable resources and documentation with your
                    co-workers using Organizations!
                </p>
            </b-carousel-slide>
            </b-carousel>
        </div>
        <div class="col-sm-12 col-lg-6 px-5" v-if="!isAuthenticated">
            <b-card class="col-md-10 offset-md-2 col-sm-12 my-md-5">
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
            </b-card>
        </div>
    </b-row>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import auth from '@/store/modules/auth';

@Component
export default class Home extends Vue{
    email = '';
    password = '';
    registerError = '';
    slide = 0;
    sliding: boolean | null = null;

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

    onSlideStart(slide: number) {
        this.sliding = true;
    }

    onSlideEnd(slide: number) {
        this.sliding = false;
    }
}
</script>