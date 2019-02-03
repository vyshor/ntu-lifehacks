<template>
    <v-app class="grey lighten-4">
        <Navbar></Navbar>
        <v-content class="mx-0 mb-5">
            <router-view></router-view>
        </v-content>
        <BotBar></BotBar>

    </v-app>
</template>

<script>
    import Navbar from '@/components/Navbar'
    import BotBar from '@/components/BotBar'

    export default {
        name: 'App',
        components: { Navbar, BotBar},
        data() {
            return {
                //
            }
        }
    }
</script>
