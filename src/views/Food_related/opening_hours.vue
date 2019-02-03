<template>
    <div>
        <v-container id="dashboard_main">
            <h1 class="subheading grey--text">Opening Hours</h1>
            <v-layout row class="mb-3">
                <v-tooltip top v-if="allowedLocation">
                    <v-btn small flat color="grey" @click="sortBy('distance')" slot="activator">
                        <v-icon left small>folder</v-icon>
                        <span class="caption text-lowercase">By distance</span>
                    </v-btn>
                    <span>Sort outlets by nearest distance</span>
                </v-tooltip>
                <v-tooltip top>
                    <v-btn small flat color="grey" @click="sortBy('person')" slot="activator">
                        <v-icon left small>person</v-icon>
                        <span class="caption text-lowercase">By person</span>
                    </v-btn>
                    <span>Sort projects by person</span>
                </v-tooltip>
            </v-layout>
            <v-container>
                <!--<v-container fluid class="my-5">-->
                <!--fluid for smaller margin-->
                <v-expansion-panel>
                    <v-expansion-panel-content v-for="canteen in canteen_info" :key="canteen.canteenName">
                        <div slot="header">{{ canteen.canteenName }}</div>
                        <v-card>
                            <v-card-text class="px-4 grey--text">
                                <!--<div class="font-weight-bold">due by {{ project.due }}</div>-->
                                <div><pre>{{ canteen.hours }}
                                </pre>
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
                this.canteen_info.sort((a, b) => a[prop] < b[prop] ? -1 : 1)
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
                            self.canteen_info.push(data);
                        }

                        // console.log(self.canteen_info);
                    }
                )
            }
        },
        updated() {
        },
        computed: {}
    }

</script>

<style scoped>


</style>
