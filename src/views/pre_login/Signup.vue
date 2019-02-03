<template>
    <v-dialog max-width="600px" v-model="dialog">
        <v-btn flat slot="activator" class="success">SignUp</v-btn>
        <v-card>
            <v-card-title>
                <h2>Login</h2>
            </v-card-title>
            <v-card-text>
                <v-form class="px-3" ref="form">
                    <label for="name">Name</label>
                    <v-text-field label="Name" v-model="name" prepend-icon="folder"></v-text-field>

                    <label for="email">Email</label>
                    <v-text-field label="Email" v-model="email" prepend-icon="folder"></v-text-field>
                    <span class="helper-text" data-error="Invalid email" data-success="Valid email"></span>


                    <label for="password">Password</label>
                    <div class="input-field">
                        <!--<input type="password" name="password" v-model="password" id="password" class="validate">-->
                        <password
                                v-model="password"
                                :toggle="true"
                                @score="showScore"
                                @feedback="showFeedback"
                        />
                        <div id="password-strength-text-container">
                            <p id="password-strength-text">{{ password_strength }}</p>
                        </div>
                        <span class="error_message" v-if="error_message">{{ error_message }}</span>
                        <!--<vue-recaptcha-->
                        <!--ref="recaptcha"-->
                        <!--@verify="onCaptchaVerified"-->
                        <!--@expired="onCaptchaExpired"-->
                        <!--sitekey="6LeTW3cUAAAAAKHuXqpMOU5k_oP4ywr_oqMJIU_o" ></vue-recaptcha>-->

                        <v-btn flat class="success" @click="signUp()">Sign up</v-btn>
                    </div>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
    import firebase from 'firebase';
    // import image from "../../assets/logo.png";
    import SHA256 from "crypto-js/sha256";
    import Password from 'vue-password-strength-meter';

    export default {
        name: "signUp",
        components: {
            Password
        },
        data() {
            return {
                // image,
                name: '',
                email: '',
                password: '',
                meter_value: 0,
                // recaptchaBool: true,
                // recaptchaToken: '',
                strength: {
                    0: "Worst",
                    1: "Bad",
                    2: "Weak",
                    3: "Good",
                    4: "Strong"
                },
                inputRules: [
                    v => v.length >= 3 || 'Minimum length is 3 characters'
                ],
                password_score: '',
                error_message: '',
                loading: false,
                dialog: false
            }
        },
        computed: {
            password_strength: function () {
                if (this.password !== "") {
                    return "Strength: " + this.strength[this.meter_value];
                } else {
                    return "";
                }
            }
        },

        mounted() {
        },

        methods: {
            signUp: function () {
                // this.verifyToken();
                // return;
                let self = this;
                this.error_message = "";
                // Check if input fields are empty : Please check your input. All must be filled
                if (this.name === "" || this.email === "" || this.password === "") {
                    self.error_message = "Please check your input. All fields must be filled";
                    return;
                } else if (this.meter_value <= 1) {
                    self.error_message = "Please choose a stronger password";
                    return;
                } else if (this.recaptchaBool === false) {
                    self.error_message = "Please tick reCAPTCHA checkbox";
                    return;
                }
                // If the strength/meter value is 1 and below, reject : Please choose a stronger password

                firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
                    (user) => {
                        // console.log(user.user.uid);

                        const uid = user.user.uid;
                        const name = self.name;
                        const email = self.email;
                        const password = self.password;
                        self.post(uid, name, email, password);

                        this.loading = false;
                        this.dialog = false;
                        this.$emit('signedUp');
                    },
                    (err) => {
                        // alert("Oops. " + err.message);
                        console.log(err);

                        if (err.code === "auth/weak-password") {
                            self.error_message = "Password should at least be 6 characters";
                        } else if (err.code === "auth/weak-password") {
                            self.error_message = "You are already registered under our system";
                            // auth/weak-password : Password should at least be 6 characters
                            // auth/email-already-in-use : You are already registered under our system.
                        } else if (err.code === "auth/invalid-email") {
                            self.error_message = "Please check your input. Please enter a valid email"
                        }
                    }
                );
            },
            post: function (uid, name, email, password) {
                var db = firebase.firestore();

                db.settings({
                    timestampsInSnapshots: true
                });

                // Initialise the user info
                db.collection('users').doc('' + uid).set({
                    name: name,
                    email: email,
                    password: SHA256(password).toString(),
                    planCount: 0,
                    currentPlan: '',
                    currentProgress: ''
                });
            },
            onCaptchaVerified: function (recaptchaToken) {
                this.recaptchaBool = true;
                this.recaptchaToken = recaptchaToken;
            },
            onCaptchaExpired: function () {
                this.$refs.recaptcha.reset();
                this.recaptchaBool = false;
            },
            showFeedback({suggestions, warning}) {
                // console.log('🙏', suggestions);
                // console.log('⚠', warning);
            },
            showScore(score) {
                this.meter_value = score;
            },
            verifyToken: function () {
                let self = this;
                let data = {
                    secret: '6LeTW3cUAAAAAByLClP5M1RtB4cqeg4i5YOmGyBb',
                    response: this.recaptchaToken
                };
                data = JSON.stringify(data);
                let xhr = new XMLHttpRequest();
                // xhr.withCredentials = true;
                xhr.addEventListener("readystatechange", function () {
                    if (this.readyState === this.DONE) {
                        let res = JSON.parse(this.responseText);
                        console.log(res);
                    }
                });
                xhr.open("POST", "https://www.google.com/recaptcha/api/siteverify", true);
                xhr.setRequestHeader("Content-type", "application/json");
                xhr.send(data);
            }

        }
    }
</script>

<style scoped>
    .grey_btn {
        margin-top: 3%;
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
        height: 75%;
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
        padding-top: 5%;
    }

    meter {
        width: 100%;
    }

    #password-strength-text {
        font-weight: bold;
    }

    #password-strength-text-container {
        height: 20px;
    }

    .error_message {
        font-size: 1.2rem;
        font-family: 'Arial';
        color: red;
    }

</style>
