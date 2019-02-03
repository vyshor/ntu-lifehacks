<template>
    <div>
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
                                                                        @click="addToCart(props.item.name, canteen.canteenName, storee.storeName)"
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
                    ></v-card>

                    <v-btn
                            color="primary"
                            @click="e1 = 3"
                    >
                        Continue
                    </v-btn>

                    <v-btn flat>Cancel</v-btn>
                </v-stepper-content>

                <v-stepper-content step="3">
                    <v-card
                            class="mb-5"
                            color="grey lighten-1"
                            height="200px"
                    ></v-card>

                    <v-btn
                            color="primary"
                            @click="e1 = 1"
                    >
                        Continue
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


    export default {
        components: {},
        mixins: [processFireBase, locationMethods],
        data() {
            return {
                canteen_info: {},
                e1: 0,
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
                cart: {}
            }
        },
        created() {
            this.preloadDishes();
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
            addToCart: function (ref, canteenName, storeName) {
                const val = this.menu_quantity[ref];
                console.log(canteenName, storeName, val);
            },
        },
        updated() {
        },
        computed: {}

    }
</script>

<style scoped>


</style>
