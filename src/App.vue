<template>
    <v-app class="grey lighten-4">
        <Navbar></Navbar>
        <v-content class="ma-0">
            <router-view></router-view>
        </v-content>
        <BotBar></BotBar>
    </v-app>
</template>

<script>
    import BotBar from "@/components/BotBar"
    import Navbar from "@/components/Navbar";
    import Botbar from "@/components/BotBar";

    export default {
        name: "App",
        components: {Navbar, BotBar},
        data() {
            return {
                //
            };
        }
    };
</script>
