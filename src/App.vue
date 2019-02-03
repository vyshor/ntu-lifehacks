<template>
  <v-app class="grey lighten-4">
    <Navbar></Navbar>
    <v-content class="mx-4 mb-4">
      <router-view></router-view>
    </v-content>
      <BotBar></BotBar>
    </v-app>
</template>

<script>
    import BotBar from "@/components/BotBar"
import Navbar from "@/components/Navbar";

export default {
  name: "App",
  components: { Navbar, BotBar },
  data() {
    return {
      //
    };
  }
};
</script>
