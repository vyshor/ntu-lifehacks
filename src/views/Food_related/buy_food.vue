<template>
    <div>
        <v-snackbar v-model="snackbar" :timeout="4000" top color="success">
            <span>You have successfully logged in.</span>
            <v-btn flat color="white" @click="snackbar = false">Close</v-btn>
        </v-snackbar>
        <v-snackbar v-model="snackbar2" :timeout="4000" top color="success">
            <span>You have successfully signed up.</span>
            <v-btn flat color="white" @click="snackbar2 = false">Close</v-btn>
        </v-snackbar>

        <v-stepper v-model="e1">
            <v-stepper-header>
                <v-stepper-step :complete="e1 > 1" step="1">Pick your food</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step :complete="e1 > 2" step="2">Confirm your orders</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step step="3">Make payment</v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
                <v-stepper-content step="1" class="mx-0 px-0">
                    <v-card
                            class="mb-5"
                            color="grey lighten-1"
                            height="auto"
                    >
                        <v-expansion-panel>
                            <v-expansion-panel-content v-for="canteen in canteen_info" :key="canteen.canteenName">
                                <div slot="header">{{ canteen.canteenName }}</div>
                                <v-card>
                                    <v-flex xs12 sm12 d-flex>
                                        <v-select
                                                :items="Object.values(canteen).filter(store => store !== canteen.canteenName)"
                                                label="Food Store"
                                                outline
                                                item-text="storeName"
                                                item-value="storeName"
                                                @change="updateSelectedStore($event, canteen.canteenName)"
                                        ></v-select>

                                    </v-flex>
                                    <v-flex xs12 sm12 d-flex>
                                                    <v-data-table v-for="storee in canteen"
                                                                  :headers="headers"
                                                                  :items="conversionToArray(storee)"
                                                                  class="elevation-1"
                                                                  v-if="selected_store[canteen.canteenName] === storee.storeName"
                                                                  :rows-per-page-items="[4,8]"
                                                                  style="height: 5%; width: 70%;"
                                                    >
                                                        <template slot="items" slot-scope="props">
                                                <td style="margin: 0; padding: 0;" class="mx-1 px-1">{{ props.item.name
                                                    }}
                                                </td>
                                                <td style="margin: 0; padding: 0; width: 7%;" class="mx-0 px-0">
                                                    <v-layout>
                                                        <v-flex xs2>
                                                            <v-text-field
                                                                    type="number"
                                                                    value="1"
                                                                    min="1"
                                                                    step="1"
                                                                    v-model="menu_quantity[props.item.name]">
                                                                <!--:ref="props.item.name"-->
                                                            </v-text-field>
                                                        </v-flex>

                                                        <v-flex xs2>
                                                            <v-btn fab dark small color="indigo">
                                                                <v-icon dark small
                                                                        @click="increOne(props.item.name)">add
                                                                </v-icon>
                                                            </v-btn>
                                                        </v-flex>
                                                        <v-flex xs2>
                                                            <v-btn fab dark small color="blue">
                                                                <v-icon dark small
                                                                        @click="decreOne(props.item.name)">remove
                                                                </v-icon>
                                                            </v-btn>
                                                        </v-flex>
                                                        <v-flex xs2>
                                                            <v-btn fab color="info" dark small>
                                                                <v-icon
                                                                        small
                                                                        @click="addToCart(props.item.name, canteen.canteenName, storee.storeName, props.item.price)"
                                                                        center
                                                                >
                                                                    fa-cart-plus
                                                                </v-icon>
                                                            </v-btn>
                                                        </v-flex>
                                                    </v-layout>
                                                </td>
                                                <td class="text-xs-left" style="margin: 0; padding: 0;">{{
                                                    props.item.price }}
                                                </td>
                                            </template>
                                        </v-data-table>
                                    </v-flex>
                                </v-card>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-card>

                    <v-btn
                            color="primary"
                            @click="e1 = 2"
                    >
                        Go To Cart
                    </v-btn>

                    <v-btn flat>Cancel</v-btn>
                </v-stepper-content>

                <v-stepper-content step="2">
                    <v-card
                            class="mb-5"
                            color="grey lighten-1"
                            height="200px"
                    >
                        <v-flex xs12 sm12 d-flex>
                            <v-data-table
                                          :headers="headers_cart"
                                          :items="cart"
                                          class="elevation-1"
                                          :rows-per-page-items="[10,20]"
                                          style="height: 5%; width: 70%;"
                            >
                                <template slot="items" slot-scope="props">
                                    <td style="margin: 0; padding: 0;" class="mx-1 px-1">{{ props.item.location
                                        }}
                                    </td>
                                    <td class="text-xs-left" style="margin: 0; padding: 0;">{{
                                        props.item.store }}
                                    </td>
                                    <td class="text-xs-left" style="margin: 0; padding: 0;">{{
                                        props.item.dish }}
                                    </td>
                                    <td class="text-xs-left" style="margin: 0; padding: 0;">{{
                                        props.item.price }}
                                    </td>
                                    <td class="text-xs-left" style="margin: 0; padding: 0;">
                                        <v-text-field
                                                type="number"
                                                min="1"
                                                step="1"
                                                v-model="props.item.qty">
                                            <!--:ref="props.item.name"-->
                                        </v-text-field>
                                    </td>
                                    <td style="margin: 0; padding: 0; width: 7%;" class="mx-0 px-0">
                                        <v-btn fab dark small color="indigo">
                                            <v-icon dark small
                                                    @click="removeFromCart(props.item)">cross
                                            </v-icon>
                                        </v-btn>
                                    </td>
                                </template>
                            </v-data-table>
                        </v-flex>
                    </v-card>

                    <p>Total Cost: {{ this.total_cost }}</p>

                    <v-btn
                            color="primary"
                            @click="e1 = 3"
                    >
                        Proceed to payment
                    </v-btn>
                    <v-btn
                            color="success"
                            @click="e1 = 1"
                    >
                        Back
                    </v-btn>

                    <v-btn flat>Cancel</v-btn>
                </v-stepper-content>

                <v-stepper-content step="3">
                    <v-card
                            class="mb-5"
                            color="grey lighten-1"
                            height="200px"
                    ></v-card>

                    <Login @loggedIn="loggingIn()" @signedUp2="signingUp()" v-if="!loggedin"></Login>
                    <v-btn
                             v-else
                            color="primary"
                            @click="e1 = 1"
                    >
                        Confirm2

                    </v-btn>

                    <v-btn flat>Cancel</v-btn>
                </v-stepper-content>
            </v-stepper-items>
        </v-stepper>

    </div>
</template>

<script>
    import firebase from 'firebase';
    import Vue from 'vue';
    import processFireBase from '@/mixins/processFireBase';
    import locationMethods from '@/mixins/locationMethods';
    import Login from '@/views/pre_login/Login';


    export default {
        components: {
            Login
        },
        mixins: [processFireBase, locationMethods],
        data() {
            return {
                // for firebase auth
                loggedin: false,
                user_id: '',
                snackbar: false,
                snackbar2: false,
                //
                canteen_info: {},
                e1: 0, // for the step process
                selected_store: {},
                menu_quantity: {},
                headers: [
                    {
                        text: 'Menu',
                        align: 'left',
                        sortable: true,
                        value: 'name'
                    },
                    {
                        text: 'Quantity',
                        align: 'left',
                        sortable: false
                    },
                    {
                        text: 'Price ($)', value: 'dollars',
                        align: 'left'
                    }
                ],
                headers_cart: [
                    {
                        text: 'Location',
                        align: 'left',
                        sortable: true,
                        value: 'location'
                    },
                    {
                        text: 'Store',
                        align: 'left',
                        sortable: true,
                        value: 'store'
                    },
                    {
                        text: 'Selection',
                        value: 'dish',
                        align: 'left'
                    },
                    {
                        text: 'Price ($)', value: 'price',
                        align: 'left'
                    },
                    {
                        text: 'Qty', value: 'qty',
                        align: 'left'
                    }

                ],
                cart: []
            }
        },
        created() {
            this.preloadDishes();
        },
        mounted() {
            this.checkLoginStatus();
        },
        methods: {
            preloadDishes: function () {
                let self = this;
                this.getDocs("canteen").then(
                    function (res) {
                        for (let doc of res.docs) {
                            // console.log(doc.id);
                            let data = doc.data();
                            data.canteenName = doc.id;
                            self.selected_store[doc.id] = '';
                            // self.menu_quantity[doc.id] = {};
                            // console.log(data);
                            for (const key in data) {
                                if (key !== 'canteenName') {
                                    data[key].storeName = key;
                                    // self.menu_quantity[doc.id][key] = {};
                                    for (const key2 in data[key]) {
                                        self.menu_quantity[key2] = 1;
                                    }
                                }
                            }
                            Vue.set(self.canteen_info, doc.id, data);
                        }
                        // console.log(self.menu_quantity);

                        // console.log(self.canteen_info);
                    })
            },
            conversionToArray: function (obj) {
                let food_array = [];
                for (let key in obj) {
                    let price = obj[key];
                    if (key !== "storeName") {
                        food_array.push({
                            name: key,
                            price: price
                        });
                    }
                }
                return food_array;
            },
            updateSelectedStore: function (event, canteen) {
                // console.log(event, canteen);
                delete this.selected_store[canteen];
                Vue.set(this.selected_store, canteen, event);
                // for (let key in this.canteen_info[canteen][event]) {
                //     this.menu_quantity[canteen][event][key] = 1;
                // }
                // console.log(this.menu_quantity[canteen][event]);
            },
            increOne: function (ref) {
                // console.log(ref);
                // console.log(this.$refs[ref][0].$data.lazyValue);
                // this.$refs[ref][0].$data.lazyValue++;
                // console.log(canteen);
                // console.log(canteenName, storeName);
                const val = this.menu_quantity[ref];
                // this.menu_quantity[canteenName][storeName][ref]++;
                delete this.menu_quantity[ref];
                Vue.set(this.menu_quantity, ref, val + 1);
                // console.log(this.menu_quantity[ref]);
            },
            decreOne: function (ref) {
                // console.log(ref);
                // console.log(this.$refs[ref][0].$data.lazyValue);
                // this.$refs[ref][0].$data.lazyValue++;
                const val = this.menu_quantity[ref];
                if (val > 1) {
                    delete this.menu_quantity[ref];
                    Vue.set(this.menu_quantity, ref, val - 1);
                }
                // this.menu_quantity[ref]--;
            },
            addToCart: function (ref, canteenName, storeName, price) {
                const val = this.menu_quantity[ref];
                console.log(canteenName, storeName, ref, price, val);
                this.cart.push({
                    location: canteenName,
                    store: storeName,
                    dish: ref,
                    price: price,
                    qty: val,
                    total: 0
                })
            },
            removeFromCart: function(item)  {
                let index = this.cart.indexOf(item);
                this.cart.splice(index, 1);
            },
            saveOrderToDatabase: function() {

            },
            checkLoginStatus: function () {
                let user = firebase.auth().currentUser;
                console.log(user);
                if (user) {
                    this.loggedin = true;
                    this.user_id = user.uid;
                } else {
                    this.loggedin = false;
                }
                console.log(this.loggedin);
            },
            loggingIn: function() {
                this.loggedin = true;
                this.user_id = firebase.auth().currentUser.uid;
                this.snackbar = true;
            },
            signingUp: function() {
                this.loggedin = true;
                this.user_id = firebase.auth().currentUser.uid;
                this.snackbar2 = true;
            },
            submitOrder: function() {
                // check if logged in
                if (!this.loggedin) {
                    this.promptLogin();
                }
            }
        },
        updated() {
        },
        computed: {
            total_cost: function() {
                let total = 0.;
                for (let order of this.cart) {
                    total += parseFloat(order.price) * parseInt(order.qty);
                    console.log(order.price, order.qty);
                }
                return total;
            }
        }

    }
</script>

<style scoped>


</style>
