<template>
    <div class="recommendations ma-0 pa-0">

        <h1 class="subheading grey--text display-2" style="padding-left: 16px">Best Sellers</h1>
        <v-carousel flat class="mb-1" hide-controls hide-delimiters height="250px">
            <v-carousel-item v-for="(item,i) in items" :key="i">
                <v-card flat class="text-xs-center ma-3" color="rgba(255, 255, 255, 0)">
                    <v-avatar size="150" class="lighten-2">
                        <img :src="item.src">
                    </v-avatar>
                    <v-card-text>
                        <div class="subheading black--text">{{ item.location }}</div>
                        <div class="subheading black--text">{{ item.Store }}</div>
                        <div class="green--text">{{ item.Menu }}</div>
                    </v-card-text>
                </v-card>
            </v-carousel-item>
        </v-carousel>
        <h1 class="subheading grey--text display-3 my-4" style="padding-left: 16px">You might also want try...</h1>
        <v-carousel flat class="mb-1" hide-controls hide-delimiters height="250px">
            <v-carousel-item v-for="(item,i) in items2" :key="i">
                <v-card flat class="text-xs-center ma-3" color="rgba(255, 255, 255, 0)">
                    <v-avatar size="150" class="lighten-2">
                        <img :src="item.src">
                    </v-avatar>
                    <v-card-text>
                        <div class="subheading black--text">{{ item.location }}</div>
                        <div class="subheading black--text">{{ item.Store }}</div>
                        <div class="green--text">{{ item.Menu }}</div>
                    </v-card-text>
                </v-card>
            </v-carousel-item>
        </v-carousel>
    </div>
</template>

<script>
    export default {
        name: "recommendations",
        data() {
            return {
                items: [
                    {location: 'Canteen 1', Store: 'Western Cuisine', Menu: 'Chicken Cutlet (L)',
                        src: 'https://farm5.staticflickr.com/4297/36127486035_a7476bc2bd_b.jpg'},
                    {location: 'Canteen 2', Store: 'Ayam Penyet', Menu: 'Ayam Penyet Set',
                        src: 'https://farm5.staticflickr.com/4305/35666987940_5c59da3ec9_b.jpg'},
                    {location: 'Canteen 2', Store: 'Xiao Long Bao', Menu: 'Shanghai Juicy Fresh Meat Xiao Long Bao (1 set 6 pieces)',
                        src: 'https://farm5.staticflickr.com/4300/35216448304_dacf43f3d7_h.jpg'}
                ],
                items2: [
                    {location: 'Canteen 2', Store: 'Chicken Rice', Menu: 'Lemon Chicken Rice',
                        src: 'https://farm5.staticflickr.com/4302/35246780723_b8d5346511_b.jpg'},
                    {location: 'Canteen 13', Store: 'Menya Takashi Japanese Cuisine', Menu: 'Japanese Chicken Katsu Original Curry Rice',
                        src: 'https://farm5.staticflickr.com/4306/35246780443_1057a2b68f_h.jpg'},
                    {location: 'Canteen 11', Store: 'Sichuan Fragrant Garden', Menu: 'Spicy Fragrant Pot',
                        src: 'https://farm5.staticflickr.com/4314/36085859276_d5ccd7ba88_b.jpg'}
                ]
            }
        }
    }
</script>

<style scoped>
    .rounded-card{
        border-radius:200px;
    }

    .v-sheet {
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        box-shadow: none;
    }
</style>
