<template>
    <nav>
        <v-toolbar flat app>
            <v-toolbar-title>
                <span class="font-weight-medium secondary--text text-uppercase">NTU</span>
                <span class="font-weight-light primary--text text-lowercase">lifehacks</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-side-icon class="secondary--text" @click="drawer = !drawer"></v-toolbar-side-icon>
        </v-toolbar>

        <v-navigation-drawer v-model="drawer" app light right>
            <v-layout column align-center>
                <v-flex class="mt-5">
                    <v-avatar size="100">
                        <v-icon class="secondary--text" light style="font-size: 100px;">fa-user-circle</v-icon>
                    </v-avatar>
                    <h2 class="mt-2 primary--text" align="center">Admin</h2>
                </v-flex>
                <v-flex class="my-2">
                    <v-icon light>account_balance_wallet</v-icon> Wallet: ${{wallet.toFixed(2)}}
                </v-flex>
            </v-layout>
            <v-list v-for="link in links" class="py-0 my-0">
                <v-list-tile :key="link.text" router :to="link.route">
                    <v-list-tile-action>
                        <v-icon light>{{ link.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title light>
                            {{ link.text }}
                        </v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-divider></v-divider>
            </v-list>
        </v-navigation-drawer>
    </nav>
</template>

<script>
    import firebase from 'firebase';

    export default {
        name: "Navbar",
        components: {},
        data() {
            return {
                drawer: false,
                links: [
                    {icon: 'dashboard', text: 'Profile', route: '/'},
                    {icon: 'fa-cog', text: 'Settings', route: '/projects'},
                    {icon: 'fa-sign-out-alt', text: 'Log Out', route: '/'}
                ]
            }
        },
        methods: {
            logout: function () {
                firebase.auth().signOut().then(() => {
                    this.$router.replace('/');
                    //console.log('loggedout');
                })
            }
        }
    }
</script>

<style scoped>

</style>