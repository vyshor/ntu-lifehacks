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
            <v-stepper-header class="px-5">
                <v-stepper-step :complete="e1 > 1" step="1">Pick your food</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step :complete="e1 > 2" step="2">Confirm your orders</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step step="3">Make payment</v-stepper-step>
            </v-stepper-header>
            <v-flex xs12 style="height:0px;">
                <v-btn absolute icon large right color="primary" dark style="position: fixed; bottom: 10%; z-index: 5;" @click="e1 = 2">
                    <v-badge color="orange darken-2" left>
                        <span slot="badge">{{cart.length}}</span>
                        <v-icon>fa-shopping-cart</v-icon>
                    </v-badge>
                </v-btn>
            </v-flex>
            <hr color="#880E4F">
            <v-stepper-items>
                <v-stepper-content step="1" class="ma-0 pa-0 mb-4">
                    <v-card class="mb-5" color="grey lighten-1" height="auto">
                        <v-expansion-panel>
                            <v-expansion-panel-content v-for="canteen in canteen_info" :key="canteen.canteenName">
                                <div slot="header">{{ canteen.canteenName }}</div>
                                <v-card>
                                    <v-flex xs12 sm12 d-flex>
                                        <v-select :items="Object.values(canteen).filter(store => store !== canteen.canteenName)" label="Food Store" outline item-text="storeName" item-value="storeName" @change="updateSelectedStore($event, canteen.canteenName)"></v-select>
                                    </v-flex>
                                    <v-flex xs12 sm12 d-flex>
                                        <v-data-table v-for="storee in canteen" :headers="headers" :items="conversionToArray(storee)" class="elevation-1" v-if="selected_store[canteen.canteenName] === storee.storeName" :rows-per-page-items="[4,8]" style="height: 5%; width: 70%;" id="food">
                                            <template slot="items" slot-scope="props">
                                                <td class="px-2">{{ props.item.name }}</td>
                                                <td class="px-2">
                                                    <v-layout>
                                                        <v-flex xs2 offset-xs2>
                                                            <v-text-field type="number" value="0" min="1" step="1" v-model="menu_quantity[props.item.name]"></v-text-field>
                                                        </v-flex>
                                                        <v-flex xs2>
                                                            <v-btn fab dark small color="indigo">
                                                                <v-icon dark small @click="increOne(props.item.name)">add</v-icon>
                                                            </v-btn>
                                                        </v-flex>
                                                        <v-flex xs2>
                                                            <v-btn fab dark small color="blue">
                                                                <v-icon dark small @click="decreOne(props.item.name)">remove</v-icon>
                                                            </v-btn>
                                                        </v-flex>
                                                        <v-flex xs2>
                                                            <v-btn fab color="#ffaa2c" dark small>
                                                                <v-icon small @click="addToCart(props.item.name, canteen.canteenName, storee.storeName, props.item.price)" center>fa-cart-plus</v-icon>
                                                            </v-btn>
                                                        </v-flex>
                                                    </v-layout>
                                                </td>
                                                <td class="text-xs-center" style="margin: 0; padding: 0;">{{props.item.price }}</td>
                                            </template>
                                        </v-data-table>
                                    </v-flex>
                                </v-card>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-card>
                </v-stepper-content>

                <v-stepper-content step="2" class="ma-0 pa-0">
                    <v-card class="mb-3" color="grey lighten-1" height="200px">
                        <v-flex xs12 sm12 d-flex>
                            <v-data-table :headers="headers_cart" :items="cart" class="elevation-1" :rows-per-page-items="[10,20]" style="height: 5%; width: 70%;">
                                <template slot="items" slot-scope="props">
                                    <td style="margin: 0; padding: 0;" class="px-2">{{ props.item.location }}</td>
                                    <td class="text-xs-center" style="margin: 0; padding: 0;">{{props.item.store }}</td>
                                    <td class="text-xs-center" style="margin: 0; padding: 0;">{{props.item.dish }}</td>
                                    <td class="text-xs-center" style="margin: 0; padding: 0;">{{props.item.price }}</td>
                                    <td class="text-xs-center" style="margin: 0; padding: 0;">
                                        <v-text-field type="number" min="1" step="1" v-model="props.item.qty"></v-text-field>
                                    </td>
                                    <td style="margin: 0; padding: 0; width: 7%;" class="mx-0 px-0">
                                        <v-btn fab dark small color="indigo">
                                            <v-icon dark small @click="removeFromCart(props.item)">close</v-icon>
                                        </v-btn>
                                    </td>
                                </template>
                            </v-data-table>
                        </v-flex>
                    </v-card>
                    <v-layout row wrap class="px-3 pt-3 pb-2">
                        <v-flex xs4>
                            <p style="line-height: 36px; padding-top: 6px; padding-bottom: 6px;">Total Cost: ${{ this.total_cost }}</p>
                        </v-flex>
                        <v-flex xs8>
                            <v-btn color="primary" @click="e1 = 3">Payment</v-btn>
                            <v-btn color="success" @click="e1 = 1">Back</v-btn>
                        </v-flex>
                    </v-layout>
                </v-stepper-content>

                <v-stepper-content step="3" class="ma-0 pa-0">
                    <!--v-card class="mb-5" color="grey lighten-1" height="200px"></v-card-->
                    <!--Login @loggedIn="loggingIn()" @signedUp2="signingUp()" v-if="!loggedin"></Login-->
                    <v-card class="mb-5 px-3">
                        <h1 class="subheading grey--text py-2">Select Payment Option:</h1>
                        <v-radio-group v-model="payment_type" :mandatory="false" class="py-2">
                            <v-radio label="Wallet" value="wallet_pay">Wallet</v-radio>
                        </v-radio-group>
                    </v-card>
                    <v-layout row wrap class="px-3 pt-3 pb-2">
                        <v-flex xs8 offset-xs4>
                            <v-btn color="primary" @click="submitOrder(); e1 = 4;">Confirm</v-btn>
                            <v-btn color="success" @click="e1 = 1">Cancel</v-btn>
                        </v-flex>
                    </v-layout>
                </v-stepper-content>

                <v-stepper-content step="4" class="ma-0 pa-0">
                    <v-card class="pa-3">
                        <p class="subheading grey--text">Your order have been processed.</p>
                        <p class="grey--text">You have ${{wallet.toFixed(2)}} left in your wallet.</p>
                    </v-card>
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
    import db from '@/fb.js';


    export default {
        name: "food",
        components: {
            Login,
        },
        mixins: [processFireBase, locationMethods],
        data() {
            return {
                payment_type: 'wallet_pay',
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
                //console.log(canteenName, storeName, ref, price, val);
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
                //console.log(user);
                if (user) {
                    this.loggedin = true;
                    this.user_id = user.uid;
                } else {
                    this.loggedin = false;
                }
                //console.log(this.loggedin);
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
                this.wallet -= this.total_cost;
                //console.log(this.wallet);
                /*
                const docRef = db.collection('users').doc('' + this.user_id).collection('orders').doc();
                const order_id = docRef.id;

                let all_orders = {};
                for (let [idx, order] of Object.entries(this.cart)) {
                    order.status = 'paid';
                    order.uid = order_id + '_' + idx;
                    order.payer = this.user_id;
                    let date = new Date();
                    order.time = date.getTime();
                    all_orders[order.uid] = order;

                    // need to filter and send to respective vendor here
                    let vendor_id = '';
                    db.collection("vendors").doc(order.location + '_' + order.store).get().then(function(res) {
                        console.log(res);
                        console.log(res.data());
                        vendor_id = res.data().uid;
                        const vendor_docRef = db.collection('users').doc('' + vendor_id).collection('orders').doc();
                        vendor_docRef.set(order).then(); // promise if successful
                    })
                }

                docRef.set(
                    all_orders
                ).then(); // promise if success
                */
            }
        },
        updated() {
        },
        computed: {
            total_cost: function() {
                let total = 0.;
                for (let order of this.cart) {
                    total += parseFloat((order.price + "").match(/[+-]?\d+(?:\.\d+)?/g)[0]) * parseInt(order.qty);
                    //console.log(order.price, order.qty);
                }
                return total;
            }
        }

    }
</script>

<style>

</style>
