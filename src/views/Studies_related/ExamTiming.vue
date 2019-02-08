<template>
  <div>
    <v-app id="inspire">
      <v-form>
        <v-container fluid>
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
            <v-flex>
              <v-card class="mx-auto" color="#f83e7a" dark>
                <v-card-text class="font-weight-normal">Course Code: {{ courseCode }}</v-card-text>
              </v-card>

              <v-card class="mx-auto" color="#f83e7a" dark>
                <v-card-text class="font-weight-normal">Course Name: {{ courseName }}</v-card-text>
              </v-card>

              <v-card class="mx-auto" color="#f83e7a" dark>
                <v-card-text class="font-weight-normal">Exam Date: {{ date }}</v-card-text>
              </v-card>

              <v-card class="mx-auto" color="#f83e7a" dark>
                <v-card-text class="font-weight-normal">Day: {{ day }}</v-card-text>
              </v-card>

              <v-card class="mx-auto" color="#f83e7a" dark>
                <v-card-text class="font-weight-normal">Start Time: {{ startTime }}</v-card-text>
              </v-card>

              <v-card class="mx-auto" color="#f83e7a" dark>
                <v-card-text class="font-weight-normal">Duration: {{duration}} Hour(s)</v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>
    </v-app>
  </div>
</template>

<script>
import axios from "axios";
const IP_ADDRESS = '172.22.152.115';

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
        "http://" + IP_ADDRESS + "/scheduling/" + this.courseCode + "/exam";
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
</style>
