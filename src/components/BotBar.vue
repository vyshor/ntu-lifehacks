<template>
    <div>
        <v-card>
            <v-bottom-nav
                    :active.sync="bottomNav"
                    :color="color"
                    :value="true"
                    fixed
                    dark
                    shift
            >
                <v-btn dark router to="/makan">
                    <span>Makan</span>
                    <v-icon>local_dining</v-icon>
                </v-btn>

                <v-btn dark router to="/study">
                    <span>Study</span>
                    <v-icon>assignment</v-icon>
                </v-btn>

                <v-btn dark>
                    <span>Travel</span>
                    <v-icon>airport_shuttle</v-icon>
                </v-btn>

            </v-bottom-nav>
        </v-card>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                bottomNav: 3
            }
        },
        computed: {
            color () {
                switch (this.bottomNav) {
                    case 0: return 'blue-grey';
                    case 1: return 'teal';
                    case 2: return 'brown';
                }
            }
        }
    }
</script>

<style scoped>

</style>