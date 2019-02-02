<template>
    <div class="test">
        <v-container>
            <v-flex xs4 offset-xs4 style="background-color: white" class="pa-5">
                <h1 class="subheading mb-3">Explore Academic Services</h1>
                <v-layout row wrap>
                    <v-flex xs4 v-for="nav_icon in nav_icons" :key="nav_icon.title">
                        <v-card flat class="text-xs-center" style="background-color: transparent">
                            <v-responsive>
                                <v-avatar class="mt-1 pa-0 mb-2">
                                    <v-btn fab flat outline class="pa-0" router :to="nav_icon.route">
                                        <v-icon>{{ nav_icon.icon }}</v-icon>
                                    </v-btn>
                                </v-avatar>
                            </v-responsive>
                            <v-card-text class="pa-0 mt-1">
                                <p>{{ nav_icon.title }}</p>
                            </v-card-text>
                        </v-card>
                    </v-flex>
                </v-layout>

                <h1 class="subheading my-2">Live Campus Webcam</h1>
                    <v-carousel class="mb-1" hide-controls hide-delimiters height="auto">
                        <v-carousel-item v-for="(item,i) in items" :key="i" :src="item.src" contain></v-carousel-item>
                    </v-carousel>

                <p class="my-2">Random Information On Crowd</p>
            </v-flex>
        </v-container>


    </div>
</template>

<script>
    export default {
        name: "Test",
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
                    {title: 'STARS Planner', icon: 'fa-calendar-times', route:'/stars'},
                    {title: 'Timetable', icon: 'fa-calendar-alt', route:'/timetable'},
                    {title: 'Module Information', icon: 'fa-question-circle', route:'/modinfo'},
                    {title: 'Exam Timing', icon: 'fa-clock', route:'/examtime'},
                    {title: 'Exam Seating', icon: 'fa-compass', route:'/examseat'}
                ]
            }
        }
    }
</script>

<style scoped>

</style>