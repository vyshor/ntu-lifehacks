<template>
    <div class="test ma-0 pa-0">
        <v-flex xs12 style="background-color: white" class="pa-3">
            <h2 class="my-2 secondary--text">Academic Services</h2>
            <v-layout row wrap>
                <v-flex xs4 v-for="nav_icon in nav_icons" :key="nav_icon.title">
                    <v-card flat class="text-xs-center" style="background-color: transparent">
                        <v-responsive>
                            <v-avatar class="mt-1 pa-0 mb-2">
                                <v-btn fab dark depressed color="primary" class="pa-0" router :to="nav_icon.route">
                                    <v-icon>{{ nav_icon.icon }}</v-icon>
                                </v-btn>
                            </v-avatar>
                        </v-responsive>
                        <v-card-text class="pa-0 mb-2 mt-1">
                            <h4 class="primary--text">{{ nav_icon.title }}</h4>
                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-flex>
        <v-layout row wrap style="background-color: white" class="mt-2 pa-3">
            <h2 class="mb-2 px-0 mx-2 secondary--text">Live Campus Webcam</h2>
                <v-carousel class="mb-1 px-0 mx-2" hide-controls hide-delimiters height="auto">
                    <v-carousel-item v-for="(item,i) in items" :key="i" :src="item.src" contain class="pa-0">
                        <div class="green--text">{{ count[i] }} person identified</div>
                    </v-carousel-item>
                </v-carousel>

            <!--<h4 class="my-2">Less than 10 people are detected. <br>Place is empty. You will be able to find a seat.</h4>-->
        </v-layout>
    </div>
</template>

<script>
    import axios from 'axios';
    import Vue from 'vue';
    const PIC_UPDATE_INTERVAL = 10000; // 5minute
    const IP_ADDRESS = '172.22.152.115';
    export default {
        name: "Study",
        data () {
            return {
                items: [
                    {src: 'https://webcam.ntu.edu.sg/upload/intranet/WalkwaybetweenNorthAndSouthSpines.jpg'},
                    {src: 'https://webcam.ntu.edu.sg/upload/intranet/fastfood.jpg'},
                    {src: 'https://webcam.ntu.edu.sg/upload/intranet/foodcourt.jpg'},
                    {src: 'https://webcam.ntu.edu.sg/upload/intranet/lwn-inside.jpg'},
                    {src: 'https://webcam.ntu.edu.sg/upload/intranet/quad.jpg'},
                    {src: 'https://webcam.ntu.edu.sg/upload/intranet/onestop_sac.jpg'}
                ],
                nav_icons: [
                    {title: 'Booking', icon: 'fa-calendar-check', route: '/booking'},
                    {title: 'STARS Planner', icon: 'fa-calendar-times', route: '/stars'},
                    {title: 'Timetable', icon: 'fa-calendar-alt', route: '/timetable'},
                    {title: 'Module Information', icon: 'fa-question-circle', route: '/modinfo'},
                    {title: 'Exam Timing', icon: 'fa-clock', route: '/examtime'},
                    {title: 'Exam Seating', icon: 'fa-compass', route: '/examseat'}
                ],
                places: [
                    "Walkway", "Fastfood", "Foodcourt", "LWN", "Quad", "SAC"
                ],
                places2: {
                "Walkway": 0, "Fastfood":1, "Foodcourt":2, "LWN":3, "Quad":4, "SAC":5
            },
                count: {0:0,1:0,2:0,3:0,4:0,5:0, 6:0}
            }
        },
        methods: {
            refreshPersonCount() {
                let self = this;
                // let i = 0;
                for (let place of this.places) {
                    // console.log(place);
                    axios
                        .get("http://" + IP_ADDRESS + "/detection/"  + place)
                        .then(response => {
                            console.log(response.data);
                            let num = 0;
                            let data_array = response.data;
                            for (let item of data_array) {
                                console.log(item);
                                if (item[0] === 'person') {
                                    num++;
                                }
                            }
                            // console.log(num, i);
                            // self.count[i] = num;
                            Vue.delete(self.count, self.places2[place]);
                            Vue.set(self.count, self.places2[place], num);
                            // console.log(self.count);

                        });
                    // i++;
                }
            }
        },
        mounted() {
            let self = this;
            let interval = setInterval(() => {
                self.refreshPersonCount();
                // self.setBusPos(label, position);
            }, PIC_UPDATE_INTERVAL);
        }
    }
</script>

<style scoped>

</style>
