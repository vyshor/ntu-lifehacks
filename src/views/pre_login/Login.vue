<template>
    <div>
        <div id="homepage_top">
            <div class="center row" id="login_field_container">
                <form action="">
                    <label for="email">Email</label>
                    <v-text-field label="Email" v-model="email" prepend-icon="folder"></v-text-field>

                    <label for="password">Password</label>
                    <v-text-field label="Password" type="password" v-model="password"
                                  prepend-icon="folder"></v-text-field>

                    <router-link to="/signup" class="error_message" v-if="no_account_message">{{ no_account_message }}
                    </router-link>
                    <p class="error_message" v-if="error_message">{{ error_message }}</p>
                    <v-btn flat class="success" @click="signIn">Login</v-btn>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import firebase from 'firebase';

    export default {
        name: 'login',
        data() {
            return {
                email: 'hara@hara.com',
                password: 'dingdong1231',
                no_account_message: '',
                error_message: ''
            }
        },
        methods: {
            signIn: function (e) {
                e.preventDefault();
                let self = this;
                this.no_account_message = "";
                this.error_message = "";
                firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
                    (user) => {
                        this.$router.replace('dashboard')
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
            }
        }
    }
</script>

<style scoped>
    .grey_btn {
        margin-top: 12%;
        height: 7%;
        width: 20%;
        line-height: 200%;
        border-radius: 15px;

        font-family: 'Hobo Std';
        font-size: 2.25rem;
        color: #000;

        background-color: #BFB2BF;
    }

    #homepage_top {
        height: 840px;

        /*background-image: url('../../assets/backdrop_clear.png');*/
        background-position: center bottom;
        background-repeat: no-repeat;
        background-size: cover;

    }

    #login_field_container {
        width: 50%;
        height: 70%;
        background-color: #FFF;
        opacity: 0.9;
        border: 1px solid #707070;

    }

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
