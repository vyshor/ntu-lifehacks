<template>
    <div>
        <div id="dashboard_main">
            <div id="google_map_container" class="col l6 push-l1">
                <gmap-map
                        :center="center"
                        :zoom="zoom"
                        style="width:100%;  height: 400px;"
                        ref="myMap"
                >
                    <gmap-marker
                            :key="index"
                            v-for="(m, index) in markers"
                            :position="m.position"
                            :clickable="true"
                            @click="toggleInfo(m, index)"
                    ></gmap-marker>
                    <gmap-info-window :options="infoOptions" :position="infoPosition" :opened="infoOpened"
                                      @closeclick="infoOpened=false">
                        <p class="infoWindow_title"></p>
                        <div class="input-field browser-default row">
                        </div>
                    </gmap-info-window>

                    <gmap-marker v-for="(item, key) in coordinates" :key="key" :position="getPosition(item)"
                                 :clickable="true"
                                 @click="toggleInfo(item, key)"/>
                    <!--<gmap-custom-marker v-for="(item, key) in coordinates" :key="key" :marker="getPosition(item)"-->
                                        <!--:clickable="true"-->
                                        <!--@click="toggleInfo(item, key)"-->
                                        <!--alignment="bottomright">-->
                        testtest
                    </gmap-custom-marker>

                </gmap-map>
            </div>
        </div>
    </div>
</template>

<script>
    import firebase from 'firebase';
    import Vue from 'vue';
    import GmapCustomMarker from 'vue2-gmap-custom-marker';



    export default {
        components: {
            'gmap-custom-marker': GmapCustomMarker
        },
        mixins: [],
        data() {
            return {
                // All the data need for GoogleMaps
                center: {lat: 1.290270, lng: 103.851959}, // init centre of singapore
                zoom: 11, // init zoom
                markers: [],
                map: null,
                kml: null,
                infoOptions: {
                    pixelOffset: {
                        width: 0,
                        height: -35
                    }
                },
                infoPosition: null,
                infoOpened: false,
                infoCurrentKey: null,
                coordinates:
                    [
                        {
                            lat: 1.290270,
                            lng: 103.851959
                        }
                    ]
            }
        },
        mounted() {
            this.geolocate();
        },
        methods: {
            getPosition: function (marker) {
                return {
                    lat: parseFloat(marker.lat),
                    lng: parseFloat(marker.lng)
                }
            },
            addMarker(lat, lng, place_name) {
                const marker = {
                    lat: lat,
                    lng: lng
                };
                this.markers.push({
                    position: marker,
                    infoText: place_name
                });
                this.center = marker;
            },
            geolocate: function () {
                navigator.geolocation.getCurrentPosition(position => {
                    this.center = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                });
            },
            toggleInfo: function (marker, idx) {
                this.infoPosition = this.getPosition(marker.position);
                this.location_selected = marker.infoText;
                if (this.infoCurrentKey === idx) {
                    this.infoOpened = !this.infoOpened;
                } else {
                    this.infoOpened = true;
                    this.infoCurrentKey = idx;
                }
            }
        },
        updated() {
        },
        computed: {}
    }

</script>

<style scoped>

    div.input-field {
        margin: 0;
    }

    .input-field > select {
        font-family: 'Calibri';
        font-weight: bold;
    }

    .infoWindow_title {
        font-family: 'Helvetica Rounded';
        font-weight: bold;
        font-size: 1.2rem;
        margin: 3%;
    }


</style>
