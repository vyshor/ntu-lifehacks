<template>
    <div class="makan ma-0 pa-0">
        <v-carousel flat class="mb-1" hide-controls hide-delimiters height="250px">
            <v-carousel-item v-for="(item,i) in items" :key="i">
                <v-img :src="item.src" ></v-img>
            </v-carousel-item>
        </v-carousel>
        <v-flex xs12 style="background-color: white" class="px-3 pt-3 pb-0">
            <h2 class="my-2">Explore Food Services</h2>
            <v-layout row wrap>
                <v-flex xs6 v-for="nav_icon in nav_icons" :key="nav_icon.title">
                    <v-card flat class="text-xs-center" style="background-color: transparent">
                        <v-responsive>
                            <v-avatar class="mt-1 pa-0 mb-1">
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
        </v-flex>
        <v-flex xs12 style="background-color: white" class="px-3 pb-3 pt-2 mt-2">
            <h2 class="my-2">Explore Food Services</h2>
            <v-layout row wrap>
                <v-flex xs6 v-for="nav_icon in nav_icons" :key="nav_icon.title">
                    <v-card flat class="text-xs-center" style="background-color: transparent">
                        <v-responsive>
                            <v-avatar class="mt-1 pa-0 mb-1">
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
        </v-flex>
    </div>
</template>

<script>
    export default {
        name: "Makan",
        data() {
            return {
                items: [
                    {src: 'https://farm5.staticflickr.com/4297/36127486035_a7476bc2bd_b.jpg'},
                    {src: 'https://farm5.staticflickr.com/4305/35666987940_5c59da3ec9_b.jpg'},
                    {src: 'https://farm5.staticflickr.com/4300/35216448304_dacf43f3d7_h.jpg'},
                    {src: 'https://farm5.staticflickr.com/4302/35246780723_b8d5346511_b.jpg'},
                    {src: 'https://farm5.staticflickr.com/4300/36127486805_a6bb45fe64_h.jpg'},
                    {src: 'https://farm5.staticflickr.com/4314/36085859276_d5ccd7ba88_b.jpg'}
                ],
                nav_icons: [
                    {title: 'Opening hours', icon: 'fa-clock', route: '/hours'},
                    {title: 'Order food', icon: 'fa-utensils', route: '/order'},
                    {title: 'Food Places', icon: 'fa-map', route: '/map'},
                    {title: 'Recommendations', icon: 'fa-comments', route: '/recommendations'}
                ]
            }
        }
    }
</script>

<style scoped>

</style>