<template>
    <div class="makan ma-0 pa-0">
        <v-carousel flat class="mb-1" hide-controls hide-delimiters height="250px">
            <v-carousel-item v-for="(item,i) in items" :key="i">
                <v-img :src="item.src" ></v-img>
            </v-carousel-item>
        </v-carousel>
        <v-flex xs12 style="background-color: white" class="px-3 pt-3 pb-0">
            <h2 class="my-2 secondary--text">Food Services</h2>
            <v-layout row wrap>
                <v-flex xs6 v-for="nav_icon in nav_icons" :key="nav_icon.title">
                    <v-card flat class="text-xs-center" style="background-color: transparent">
                        <v-responsive>
                            <v-avatar class="mt-1 pa-0 mb-1">
                                <v-btn fab dark depressed class="pa-0" router :to="nav_icon.route" color="primary">
                                    <v-icon dark>{{ nav_icon.icon }}</v-icon>
                                </v-btn>
                            </v-avatar>
                        </v-responsive>
                        <v-card-text class="pa-0 mt-1 mb-2">
                            <h4 class="primary--text">{{ nav_icon.title }}</h4>
                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-flex>
        <v-layout row wrap style="background-color: white" class="px-3 pb-0 pt-2 mt-2">
            <v-flex xs12>
                <h2 class="my-2 secondary--text">North Spine</h2>
            </v-flex>
            <v-flex xs6 v-for="(foodplace,index) in northspine" v-if="index < 4" class="px-2 pb-4">
                <v-img :src="foodplace.src" ></v-img>
                <h4>{{foodplace.name}}</h4>
            </v-flex>
        </v-layout>
        <v-layout row wrap style="background-color: white" class="px-3 pb-0 pt-2 mt-2">
            <v-flex xs12>
                <h2 class="my-2 secondary--text">South Spine</h2>
            </v-flex>
            <v-flex xs6 v-for="(foodplace,index) in southspine" v-if="index < 4" class="px-2 pb-4">
                <v-img :src="foodplace.src" ></v-img>
                <h4>{{foodplace.name}}</h4>
            </v-flex>
        </v-layout>
        <v-layout row wrap style="background-color: white" class="px-3 pb-0 pt-2 mt-2">
            <v-flex xs12>
                <h2 class="my-2 secondary--text">Canteen</h2>
            </v-flex>
            <v-flex xs6 v-for="(foodplace,index) in canteen" v-if="index < 4" class="px-2 pb-4">
                <v-img :src="foodplace.src" ></v-img>
                <h4>{{foodplace.name}}</h4>
            </v-flex>
        </v-layout>
        <v-layout row wrap style="background-color: white" class="px-3 pb-0 py-2 mt-2">
            <v-flex xs12>
                <h2 class="my-2 secondary--text">Around Campus</h2>
            </v-flex>
            <v-flex xs6 v-for="(foodplace,index) in discover" v-if="index < 4" class="px-2">
                <v-img :src="foodplace.src" ></v-img>
                <h4>{{foodplace.name}}</h4>
            </v-flex>
        </v-layout>
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
                ],
                canteen: [
                    {src: "http://www.ntu.edu.sg/has/FnB/SiteAssets/Pages/HallCanteens/FC1_280x180).jpg", name: "Food Court 1​", operating: "​Daily: 7am to 9pm "},
                    {src: "http://www.ntu.edu.sg/has/FnB/PublishingImages/Canteen%202_280%20x%20180.png", name: "Food Court 2", operating: "Daily: 7am to 9pm "},
                    {src: "http://www.ntu.edu.sg/has/FnB/PublishingImages/Canteen%209_280x180.png", name: "Food Court 9", operating: "Daily: 7am to 9pm "},
                    {src: "http://www.ntu.edu.sg/has/FnB/PublishingImages/Canteen_11_280x180.png", name: "Food Court 11", operating: "Daily: 7am to 9pm "},
                    {src: "http://www.ntu.edu.sg/has/FnB/PublishingImages/Canteen_13-2_280x180.png", name: "Food Court 13", operating: "Daily: 7am to 9pm "},
                    {src: "http://www.ntu.edu.sg/has/FnB/PublishingImages/Canteen_14_1_280x180.png", name: "Food Court 14", operating: "Daily: 7am to 9pm "},
                    {src: "http://www.ntu.edu.sg/has/FnB/PublishingImages/Food%20Court%2016.png", name: "Food Court 16", operating: "Daily: 7am to 9pm "},
                    {src: "http://www.ntu.edu.sg/has/FnB/SiteAssets/Pages/HallCanteens/AnandaKitchen(280x180_UT).jpg", name: "Ananda Kitchen", operating: "Daily: 12noon to 10.30pm PH: Opened "},
                    {src: "http://www.ntu.edu.sg/has/FnB/SiteAssets/Pages/HallCanteens/FoodgleFoodCourt(280x180)(UT).jpg", name: "Foodgle Food Court", operating: ""},
                    {src: "http://www.ntu.edu.sg/has/FnB/SiteAssets/Pages/HallCanteens/NorthHIllFC_280x180.jpg", name: "North Hill Food Court", operating: "​Daily: 7am to 9pm "},
                    {src: "http://www.ntu.edu.sg/has/FnB/PublishingImages/Pioneer_Food_Court_280x180.png", name: "Pioneer Food Court", operating: "Daily: 7am to 9pm Mon to Fri: 7am to 9pm "},
                    {src: "http://www.ntu.edu.sg/has/FnB/SiteAssets/Pages/HallCanteens/QC(280x180_UT).jpg", name: "Quad Cafe", operating: "Mon to Fri: 7am to 9pm "}
                ],
                northspine: [
                    {src: "http://www.ntu.edu.sg/has/FnB/PublishingImages/BakeryCuisine(UT_280x180).jpg", name: "Bakery Cuisine", operating: "Mon to Fri: 7am to 9pm Sat, Sun & PH: 9am to 7pm​ "},
                    {src: "http://www.ntu.edu.sg/has/FnB/PublishingImages/Each-A-Cup(UT_280x180).jpg", name: "Each-A-Cup", operating: "Mon to Fri: 9am to 9pm Sat & Sun: 9am to 6​pm PH: Closed "},
                    {src: "http://www.ntu.edu.sg/has/FnB/PublishingImages/GrandeCibo_(280x180)(V2)(UT).jpg", name: "Grande Cibo", operating: "Mon to Sun: 11am to 8pm PH: Closed "},
                    {src: "http://www.ntu.edu.sg/has/FnB/SiteAssets/Pages/NorthSpine/kfc_280x180.jpg", name: "KFC​​", operating: "Mon to Fri: 7.30am to 10pm Sat & Sun: 11am to 8pm PH​: Closed "},
                    {src: "http://www.ntu.edu.sg/has/FnB/SiteAssets/Pages/NorthSpine/longjohnsilvers_(UT_280x180).jpg", name: "Long John Silver's", operating: "Mon to Sun: 7.30am to 10pm "},
                    {src: "http://www.ntu.edu.sg/has/FnB/PublishingImages/McDonalds_280x180.png", name: "McDonald's", operating: "Mon to Sat: 7am to 12am Sun & PH: 10am to 10pm Mon to Sat: 7am to 10pm Sun & PH: 10am to 10pm "},
                    {src: "http://www.ntu.edu.sg/has/FnB/PublishingImages/MrBean_(280x180)(UT).jpg", name: "Mr Bean", operating: "Mon to Fri: 7.30am to 8.30pm Sat: 7.30am to 5pm Sun & PH: Closed "},
                    {src: "http://www.ntu.edu.sg/has/FnB/PublishingImages/North_Spine_Food_Court_280x180.png", name: "North S​​pine Food Court", operating: "Mon to Fri: 7am to 9pm Sat: 7am to 3pm Sun & PH: Closed "},
                    {src: "http://www.ntu.edu.sg/has/FnB/PublishingImages/PaiksBibim_280x180.png", name: "Paik's Bibim", operating: "Mon to Fri: 10am to 9pm Sat: 10am to 3pm Sun & PH: Closed "},
                    {src: "http://www.ntu.edu.sg/has/FnB/PublishingImages/PeachGarden_280x180.png", name: "Peach Garden Chinese Restaurant​", operating: "​Daily: 11am to 2.30pm / 5pm to 10pm "},
                    {src: "http://www.ntu.edu.sg/has/FnB/SiteAssets/Pages/NorthSpine/penninc_dining_280x180.jpg", name: "PEN & INC", operating: "Mon, Tue, Wed & Fri: 11am t​o 11pm Sat: 11am to 5pm​ Sun & PH: Closed​ "},
                    {src: "http://www.ntu.edu.sg/has/FnB/PublishingImages/pizza_hut_280x180.png", name: "​Pizza Hut Express", operating: "Mon to Fri: 11am to 10pm Sat: 11am to 9pm Sun & PH:​ 11am to 8pm "},
                    {src: "http://www.ntu.edu.sg/has/FnB/PublishingImages/Starbucks_280x180.png", name: "Starbucks Coffee​", operating: ""},
                    {src: "http://www.ntu.edu.sg/has/FnB/PublishingImages/Subway.png", name: "Subway", operating: "Mon to Fri: 8am to 9pm Sat & Sun: 11am to 6pm PH: Closed Mon to Fri: 9am to 9pm Sat: 9am ​to 6​pm Sun: Closed PH: 10am - 4pm Mon to Fri: 10am to 8pm Sat : 10am to 3​pm Sun & PH: Closed​​ Mon to Fri: 11am to 9pm Sat: 11am to 3pm Sun & PH: Closed "},
                    {src: "http://www.ntu.edu.sg/has/FnB/PublishingImages/TheHouseSteamBoatRestaurant_(UT_280x180).jpg", name: "The House Steam Boat Restaurant", operating: "Mon to Fri: 9am to 9pm Sat: 9am ​to 6​pm Sun: Closed PH: 10am - 4pm "},
                    {src: "http://www.ntu.edu.sg/has/FnB/PublishingImages/The%20Sandwich%20Guys.png", name: "The Sandwich Guys", operating: "Mon to Fri: 10am to 8pm Sat : 10am to 3​pm Sun & PH: Closed​​ "},
                    {src: "http://www.ntu.edu.sg/has/FnB/PublishingImages/The%20Soup%20Spoon%20Union.png", name: "The Soup Spoon Union", operating: "Mon to Fri: 11am to 9pm Sat: 11am to 3pm Sun & PH: Closed "}
                ],
                southspine: [
                    {src: 'http://www.ntu.edu.sg/has/FnB/PublishingImages/koufu-1_280x180.png', name: 'Koufu @ the South Spine', operating: "Mon to Fri: 7am to 9pm Sat: 7am to 3pm PH: Open (except Sun)"}
                ],
                discover: [
                    {src: 'http://www.ntu.edu.sg/has/FnB/SiteAssets/Pages/AroundCampus/IMG_7518(Cosmo_UT).jpg', name: 'Cosmo Bar & Coffeeworks'},
                    {src: 'http://www.ntu.edu.sg/has/FnB/SiteAssets/Pages/AroundCampus/cbtl_280x180.jpg', name: 'The Coffee Bean & Tea Leaf'},
                    {src: 'http://www.ntu.edu.sg/has/FnB/SiteAssets/Pages/AroundCampus/LiHO(Aroundcampus)(280x180).jpg', name: 'LiHO'},
                    {src: 'http://www.ntu.edu.sg/has/FnB/PublishingImages/OBriens.jpg', name: "O' Briens Irish Sandwich Cafe​@ LKC Medicine"},
                    {src: 'http://www.ntu.edu.sg/has/FnB/SiteAssets/Pages/AroundCampus/coop_280x180.jpg', name: '​'},
                    {src: 'http://www.ntu.edu.sg/has/FnB/PublishingImages/CafeForYou(UT_280x180).jpg', name: 'Cafe4You @ SPMS'},
                    {src: 'http://www.ntu.edu.sg/has/FnB/PublishingImages/SukhoThai@WKWSCI(UT_280x180).jpg', name: 'Sukho Thai @ WKWSCI'}
                ]
            }
        }
    }
</script>

<style scoped>

</style>