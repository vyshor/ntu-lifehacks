<template>
    <v-bottom-nav :active.sync="bottomNav" :value="true" fixed color="primary" dark app>
        <v-btn router to="/makan">
            <span>Makan</span>
            <v-icon>local_dining</v-icon>
        </v-btn>

        <v-btn router to="/study">
            <span>Study</span>
            <v-icon>assignment</v-icon>
        </v-btn>

        <v-btn router to="/bus">
            <span>Travel</span>
            <v-icon>airport_shuttle</v-icon>
        </v-btn>
    </v-bottom-nav>
</template>

<script>
    export default {
        data() {
            return {
                bottomNav: 3
            }
        },
        computed: {
        }
    }
</script>

<style scoped>

</style>