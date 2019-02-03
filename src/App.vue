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
<<<<<<< HEAD
  components: { Navbar, BotBar },
=======
  components: { Navbar, Botbar },
>>>>>>> 5cfb7543721919a93ce4836bf4b67e7328250105
  data() {
    return {
      //
    };
  }
};
</script>
