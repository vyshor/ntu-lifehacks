<template>
        <div class="googleMap__container">
        <transition name="fade">
        <gmap-map :center="center" :zoom="zoom" class="google__map" v-if="isMounted"
                  :options="mapOptions">
        <gmap-polyline :path="path" :options="options">
        </gmap-polyline>
        <gmap-custom-marker v-for="(m, idx) in markers" :key="idx"
        :marker="m.position" class="mapMarker"
        :offsetX="-63"
        >
        <img :src="markercolour[color]">
        </gmap-custom-marker>
        <gmap-custom-marker v-for="(m, idx) in bus_stop_data" :key="idx"
        :marker="{lat: m.lat, lng: m.lng}" class="mapMarker"
        :offsetX="-63" :offsetY="10" @click.native="$emit('pick-stop', idx)"
        >
        <img :src="stopcolour['selected']" v-if="idx === selected">
        <img :src="stopcolour[color]" v-else>
        </gmap-custom-marker>
        </gmap-map>
        </transition>
        </div>
</template>

<script>
    import Vue from 'vue';
    import busRoutes from './bus.route';
    import GmapCustomMarker from 'vue2-gmap-custom-marker';
    import blue_marker from "@/static/bus_icon_blue.png";
    import red_marker from "@/static/bus_icon_red.png";
    import blue_busstop from "@/static/blue_busstop.png";
    import red_busstop from "@/static/red_busstop.png";
    import selected_busstop from "@/static/selected_busstop.png";

    const colors = {
        $blue: 'rgb(0,122,255)',
        $pink: 'rgb(255,45,85)',
        $red: 'rgb(255,59,48)',
        $purple: 'rgb(88,86,214)',
        $orange: 'rgb(255,149,0)',
    };

    const TIMEOUT_MOUNTED = 100;
    const BUS_UPDATE_INTERVAL = 1000;
    const NEXT_POS_DISTANCE_TRESHOLD = 0.00005;
    const SPEED_INACCURACY_FACTOR = 0.75; // Factor that times the provided speed by API
    const API_FETCH_INTERVAL = 6000; // 3 seconds

    // const mockBusStarts = [10, 50, 100];

    const calcDistance = (start, end) => 100 * Math.sqrt(
        ((start.lng - end.lng) ** 2)
        + ((start.lat - end.lat) ** 2));

    const getPosBetween = (start, end, frac) => ({
        lng: start.lng + ((end.lng - start.lng) * frac),
        lat: start.lat + ((end.lat - start.lat) * frac),
    });

    const mod = (num, div) => ((num % div) + div) % div;

    export default {
        components: {
            'gmap-custom-marker': GmapCustomMarker
        },
        props: {
            color: String,
            bus_stop_data: Array,
            selected: Number
        },
        data() {
            return {
                isMounted: false,
                path: busRoutes,
                center: {lat: 1.346, lng: 103.683},
                zoom: 15,
                options: {
                    strokeColor: colors[`$${this.color}`],
                },
                // markers: mockBusStarts.map(idx => ({position: busRoutes[mockBusStarts[idx]]})),
                markers: {},
                markercolour: {
                    blue: blue_marker,
                    red: red_marker
                },
                stopcolour: {
                    blue: blue_busstop,
                    red: red_busstop,
                    selected: selected_busstop
                },
                busrecords: {},
                mapOptions: {
                    disableDefaultUI: true,
                    clickableIcons: false
                },
            };
        },
        methods: {
            setBusPos(whichBus, position) {
                this.markers[whichBus].position = position;
                // console.log(this.markers[whichBus].position);
            },
            getBusLocation() {
                let self = this;
                const ajax_code = this.color === 'red' ? 44478 : 44479;
                $.ajax("https://baseride.com/routes/apigeo/routevariantvehicle/" + ajax_code + "/?format=json", {
                    async: true, success: function (res) {
                        console.log(res);
                        console.log(res.vehicles);
                        // console.log(self.busrecords);
                        if (res.vehicles.length > 0) {
                            for (let bus in self.busrecords) {
                                clearInterval(self.busrecords[bus].interval);
                                delete self.busrecords[bus];
                                delete self.markers[bus];
                            }
                            let i = 0;
                            for (let vehicle of res.vehicles) {
                                let label = vehicle.registration_code;
                                let lat = vehicle.lat;
                                let lng = vehicle.lon;

                                Vue.set(self.markers, label, {position: {
                                    lat: lat,
                                        lng: lng
                                    }
                                });
                                // self.markers[label] = {position: {lat: lat, lng: lng}};
                                let spd = vehicle.speed * SPEED_INACCURACY_FACTOR;
                                const direction = self.color === 'red' ? 1 : -1;
                                let time_updated = (new Date()).getTime();
                                let idx_pt = self.closestPointOnRoute({lat: lat, lng: lng});

                                // if (self.busrecords.hasOwnProperty(label)) {
                                //     clearInterval(self.busrecords[label].interval);
                                //     delete self.busrecords[label];
                                // }
                                let start = busRoutes[mod(idx_pt, busRoutes.length)];
                                let end = busRoutes[mod(idx_pt + direction, busRoutes.length)];
                                let interval = setInterval(() => {
                                    let position;
                                    let start_end = calcDistance(start, end);
                                    if (start_end > NEXT_POS_DISTANCE_TRESHOLD) {
                                        start = getPosBetween(start, end, self.convertKmH_to_KmTimeOut(spd) / start_end);
                                        position = start;
                                    } else {
                                        idx_pt += direction;
                                        position = busRoutes[mod(idx_pt, busRoutes.length)];
                                        start = position;
                                        end = busRoutes[mod(idx_pt + direction, busRoutes.length)];
                                    }
                                    // console.log(self.markers);
                                    self.setBusPos(label, position);
                                }, BUS_UPDATE_INTERVAL);
                                i++;
                                Vue.set(self.busrecords, label, {
                                    time_updated: time_updated,
                                    interval: interval
                                });
                            }
                        }
                    }
                });
            },
            closestPointOnRoute(curPt) {
                let min_idx = -1;
                let min_dist = 99999;
                for (let i = 0; i < busRoutes.length; i++) {
                    let pt = busRoutes[i];
                    let dist = calcDistance(pt, curPt);
                    if (dist < min_dist) {
                        min_dist = dist;
                        min_idx = i;
                    }
                }
                return min_idx;
            },
            convertKmH_to_KmTimeOut(KmH) {
                return KmH / 3600 * BUS_UPDATE_INTERVAL / 1000;
            }
        },
        mounted() {
            setTimeout(() => {
                this.isMounted = true;
            }, TIMEOUT_MOUNTED);
            setInterval(() => {
                this.getBusLocation();
            }, API_FETCH_INTERVAL);
        },
    };
</script>

<style lang="scss" scoped>
    @import '../colors.scss';

    .googleMap__container {
        width: 100%;
        height: 100%;

        .google__map {
            width: calc(100% + 20px);
            height: calc(100% + 40px);
            margin-top: -40px;
            margin-left: -10px;

            .mapMarker {
                width: 10px;
                transform: translateX(50px);
            }
        }
    }

    .fade-enter-active, .fade-leave-active {
        transition: all 1s;
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
    {
        opacity: 0;
        transform: scale(.95);
    }
</style>
