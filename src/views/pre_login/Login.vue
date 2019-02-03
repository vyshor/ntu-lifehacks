<template>
    <v-dialog max-width="600px" v-model="dialog">
        <v-btn flat slot="activator" class="success">Confirm</v-btn>
        <v-card>
            <v-card-title>
                <h2>Login</h2>
            </v-card-title>
            <v-card-text>
                <v-form class="px-3" ref="form">
                    <label for="email">Email</label>
                    <v-text-field label="Email" v-model="email" prepend-icon="folder"></v-text-field>

                    <label for="password">Password</label>
                    <v-text-field label="Password" type="password" v-model="password"
                                  prepend-icon="folder"></v-text-field>

                    <router-link to="/signup" class="error_message" v-if="no_account_message">{{ no_account_message }}
                    </router-link>
                    <p class="error_message" v-if="error_message">{{ error_message }}</p>

                    <v-spacer></v-spacer>
                    <v-btn flat class="success" @click="signIn()" :loading="loading">Login</v-btn>
                    <Signup @signedUp="signedUp()"></Signup>

                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>

</template>

<script>
    import firebase from 'firebase';
    import Signup from '@/views/pre_login/Signup.vue';

    export default {
        name: 'login',
        components: {
            Signup
        },
        data() {
            return {
                email: 'hara@hara.com',
                password: 'dingdong1231',
                no_account_message: '',
                error_message: '',
                loading: false,
                dialog: false
            }
        },
        methods: {
            signIn: function () {
                let self = this;
                this.no_account_message = "";
                this.error_message = "";
                firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
                    (user) => {
                        this.loading = false;
                        this.dialog = false;
                        this.$emit('loggedIn')
                    },
                    (err) => {
                        // console.log(err);
                        // alert('Oops. ' + err.message)
                        if (err.code === 'auth/user-not-found') {
                            // no such account
                            self.no_account_message = "Account does not exist. Sign up?";
                        } else if (err.code === "auth/wrong-password") {
                            self.error_message = "Error! Please check your input";
                        }
                    }
                )
            },
            signedUp: function() {
                this.loading = false;
                this.dialog = false;
                this.$emit('signedUp2')
            }
        }
    }
</script>

<style scoped>
    label {
        font-family: 'Hobo Std';
        font-size: 2.25rem;
        color: #272A43;
        line-height: 250%;
        text-align: right;
    }

    form {
        padding-top: 10%;
    }

    .error_message {
        font-size: 1.2rem;
        font-family: 'Arial';
        color: red;
    }
</style>
