<template>
    <div class="pa-0 ma-0">
        <v-container id="dashboard_main" class="ma-0 px-0">
            <h1 class="subheading grey--text" style="padding-left: 16px">Opening Hours</h1>
            <v-layout row class="mb-3">
                <v-tooltip top v-if="allowedLocation">
                    <v-btn small flat class="mr-0" color="grey" @click="sortBy('distance')" slot="activator">
                        <v-icon left small style="margin-right: 4px !important;">directions_walk</v-icon>
                        <span class="caption text-lowercase">By distance</span>
                    </v-btn>
                    <span>Sort outlets by nearest distance</span>
                </v-tooltip>
                <v-tooltip top>
                    <v-btn small flat class="mr-0" color="grey" @click="sortBy('rating')" slot="activator">
                        <v-icon left small style="margin-right: 4px !important;">rate_review</v-icon>
                        <span class="caption text-lowercase">By rating</span>
                    </v-btn>
                    <span>Sort outlets by highest rating</span>
                </v-tooltip>
            </v-layout>
            <v-container class="ma-0 pa-0">
                <!--<v-container fluid class="my-5">-->
                <!--fluid for smaller margin-->
                <v-expansion-panel>
                    <v-expansion-panel-content v-for="canteen in canteen_info" :key="canteen.canteenName">
                        <div slot="header">{{ canteen.canteenName }}</div>
                        <v-card>
                            <v-card-text class="px-4 grey--text">
                                <!--<div class="font-weight-bold">due by {{ project.due }}</div>-->
                                <div>
                                    <pre>{{ canteen.hours }}
                                    </pre>
                                    Address: <span>{{ canteen.info.address }}</span>
                                    <br>
                                    <span v-if="canteen.info.rating">Rating: {{ canteen.info.rating }}
                                    <br></span>
                                    <span v-if="canteen.info.international_phone_number">Number: {{ canteen.info.international_phone_number }}</span>
                                    <div v-if="canteen.hasOwnProperty('popular')">
                                        <bars transform="translate(0, 15)"
                                                :data="canteen.popular"
                                                :barWidth="10"
                                                :gradient="['#6fa8dc', '#42b983']">
                                        </bars>
                                        <v-layout class="caption pt-0 mt-0" style="width: 100%;">
                                            <v-flex xs3>12a</v-flex>
                                            <v-flex xs3>&nbsp;6a</v-flex>
                                            <v-flex xs3>12p</v-flex>
                                            <v-flex xs3>&nbsp;6p</v-flex>
                                        </v-layout>
                                        <span>Current Crowd Level:
                                            <v-chip v-if="canteen.popular2[(new Date()).getHours()]/Math.max(...canteen.popular2) > 0.7" color="#D81B60" class="white--text py-0 my-0 v-chip--small">High</v-chip>
                                            <v-chip v-else-if="canteen.popular2[(new Date()).getHours()]/Math.max(...canteen.popular2) > 0.4" color="#ffaa2c" class="white--text py-0 my-0 v-chip--small">Mid</v-chip>
                                            <v-chip v-else-if="canteen.popular2[(new Date()).getHours()]/Math.max(...canteen.popular2) > 0.1" color="#008B00" class="white--text py-0 my-0 v-chip--small">Low</v-chip>
                                            <v-chip v-else color="#3cd1c2" class="white--text py-0 my-0 v-chip--small">None</v-chip>
                                        </span>
                                        <!--p class="caption text-sm-center">Crowd Level for Different Times of Day</p-->
                                    </div>

                                </div>
                            </v-card-text>
                        </v-card>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-container>

        </v-container>
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
                canteen_info: [],
                allowedLocation: false
            }
        },
        mounted() {
            this.getCurrentPosWithCallback(this.loadCanteensAndDistanceFromFirebase);
            // this.geolocate();
        },
        methods: {
            sortBy(prop) {
                if (prop === 'distance') {
                    this.canteen_info.sort((a, b) => a[prop] < b[prop] ? -1 : 1)
                } else {
                    this.canteen_info.sort((a, b) => a[prop] > b[prop] ? -1 : 1)
                }
            },
            loadCanteensAndDistanceFromFirebase: function (pos) {
                let self = this;
                this.allowedLocation = (pos !== null);
                this.getDocs("can_info").then(
                    function (res) {
                        for (let doc of res.docs) {
                            // console.log(doc.id);
                            let data = doc.data();
                            data.canteenName = doc.id;
                            data.hours = data.hours.replace(/\\n/g, '\n');
                            if (self.allowedLocation) {
                                data.distance = self.distance(pos.lat, pos.lng, data.lat, data.long)
                            }
                            data.rating = data.info.rating;
                            if (data.info.hasOwnProperty('populartimes')) {
                                let popular_data = [];
                                let popular_data2 = [];
                                let i = 0;
                                for (let height of data.info.populartimes[(new Date()).getDay()].data) {
                                    // console.log(height);
                                    popular_data.push({value: height, title: self.indexToTime(i)});
                                    popular_data2.push(height);
                                    i++;
                                }
                                data.popular = popular_data;
                                data.popular2 = popular_data2;
                            }

                            self.canteen_info.push(data);
                        }

                        // console.log(self.canteen_info);
                    }
                )
            },
            indexToTime(idx) {
                let suffix = "AM";
                if (idx >= 12) {
                    suffix = "PM";
                    idx = idx - 12;
                }
                if (idx === 0) {
                    idx = 12;
                }

                return idx + ' ' + suffix;
            }
        },
        updated() {
        },
        computed: {}
    }

</script>

<style scoped>


</style>
