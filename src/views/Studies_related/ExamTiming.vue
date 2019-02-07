<template>
<<<<<<< HEAD
  <div>
    <v-app id="inspire">
      <v-form>
        <v-container>
          <v-layout row wrap>
            <v-flex xs12 sm6 md3>
              <v-text-field
                label="Course Code"
                outline
                v-on:change="getExamDetails"
                v-model="courseCode"
              ></v-text-field>
            </v-flex>
          </v-layout>

          <v-layout column>
            <v-card class="mx-auto" color="#26c6da" dark min-width="350">
              <v-card-text class="font-weight-normal">Course Code: {{ courseCode }}</v-card-text>
            </v-card>

            <v-card class="mx-auto" color="#26c6da" dark min-width="350">
              <v-card-text class="font-weight-normal">Course Name: {{ courseName }}</v-card-text>
            </v-card>

            <v-card class="mx-auto" color="#26c6da" dark min-width="350">
              <v-card-text class="font-weight-normal">Exam Date: {{ date }}</v-card-text>
            </v-card>

            <v-card class="mx-auto" color="#26c6da" dark min-width="350">
              <v-card-text class="font-weight-normal">Day: {{ day }}</v-card-text>
            </v-card>

            <v-card class="mx-auto" color="#26c6da" dark min-width="350">
              <v-card-text class="font-weight-normal">Start Time: {{ startTime }}</v-card-text>
            </v-card>

            <v-card class="mx-auto" color="#26c6da" dark min-width="350">
              <v-card-text class="font-weight-normal">Duration: {{duration}} Hour(s)</v-card-text>
            </v-card>
          </v-layout>
        </v-container>
      </v-form>
    </v-app>
  </div>
=======
    <div class="examtime">
        <h5 class="subheading py-4">The Examination Timing Arrangements are not available yet !</h5>

        <h5 class="subheading">You will be able to view this 2 weeks before your examination starts !</h5>

    </div>
>>>>>>> 9ddb483e83308df98cc6a07b13f9314bbca914cd
</template>

<script>
import axios from "axios";

export default {
  name: "ExamTiming",
  data() {
    return {
      courseCode: "",
      courseName: " ",
      date: " ",
      day: " ",
      startTime: " ",
      duration: " "
    };
  },
  methods: {
    getExamDetails() {
      var examDetailURL =
        "http://172.20.112.181/scheduling/" + this.courseCode + "/exam";
      axios.get(examDetailURL).then(response => {
        console.log(response["data"]);
        console.log(response["data"]["name"]);
        this.courseName = response["data"]["name"];
        this.date = response["data"]["date"];
        this.day = response["data"]["day"];
        this.startTime = response["data"]["time"];
        this.duration = response["data"]["duration"];
      });
    }
  },
  computed: {
    changeCourseCode: function() {}
  }
};
</script>

<style scoped>
<<<<<<< HEAD
</style>
=======

</style>
>>>>>>> 9ddb483e83308df98cc6a07b13f9314bbca914cd
