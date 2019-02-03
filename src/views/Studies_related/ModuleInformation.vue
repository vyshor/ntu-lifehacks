<template>
  <div>
    <v-app id="inspire">
      <v-form>
        <v-container>
          <v-layout row wrap>
            <v-flex xs12 sm6 md3>
              <v-text-field
                label="Course Code"
                outline
                v-on:change="changeURL"
                v-model="courseCode"
              ></v-text-field>
            </v-flex>
          </v-layout>

          <v-layout class="resp-container">
            <h1>Module Information</h1>
            <iframe class="resp-iframe" :src="courseDescriptionURL" frameborder="0"></iframe>
          </v-layout>
        </v-container>
      </v-form>
    </v-app>
  </div>
</template>

<script>
export default {
  name: "ModuleInformation",
  data() {
    return {
      courseCode: "HY0001",
    };
  },
  computed: {
      courseDescriptionURL: function() {
          return "https://wish.wis.ntu.edu.sg/webexe/owa/AUS_SUBJ_CONT.main_display1?acadsem=2018_2&r_subj_code=" +
        this.courseCode +
        "&acad=2018&semester=2&boption=Search"
      }
    
  },
  methods: {
    changeURL() {
      courseCode;
    }
  }
};
</script>

<style scoped>
.resp-container {
  position: relative;
  overflow: hidden;
  padding-top: 100%;
}

.resp-iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
}
</style>