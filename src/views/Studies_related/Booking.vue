<template>
  <v-container grid-list-md text-xs-center>
    <v-form id="bookingForm">
      <v-layout row wrap>
        <v-flex xs6>
          <v-select
            :items="locations"
            label="Location"
            v-model="locationIn"
            v-on:change="getFacilities"
          ></v-select>
        </v-flex>
        <v-flex xs6>
          <v-select :items="facilities" label="Facility" v-on:change="getBookings"></v-select>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs4>
          <v-select :items="days" label="Day" item-text="name" item-value="id"></v-select>
        </v-flex>
        <v-flex xs4>
          <v-select :items="timeslots" label="Start" item-text="start" item-value="id"></v-select>
        </v-flex>
        <v-flex xs4>
          <v-select :items="timeslots" label="End" item-text="end" item-value="id"></v-select>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-spacer></v-spacer>
        <v-btn color="success" v-on:click="preview">Preview</v-btn>
        <v-btn color="warning" v-on:click="bookFacility">Book</v-btn>
      </v-layout>
    </v-form>
    <v-layout row wrap class="px-0 mx-0">
      <v-container grid-list-md text-xs-center class="px-0 mx-0">
        <v-layout row wrap class="px-0 mx-0">
          <v-flex xs2 class="px-0 mx-0">
            <v-card dark color="primary">
              <v-card-text class="px-0">Time</v-card-text>
            </v-card>
            <v-card v-for="timeslot in timeslots">
              <v-card-text class="px-0">{{ timeslot.start }}</v-card-text>
            </v-card>
          </v-flex>
          <v-flex v-for="day in days" :key="day.id" class="px-0 mx-0">
            <v-card dark color="primary">
              <v-card-text class="px-0">{{ day.name }}</v-card-text>
            </v-card>
            <v-card v-for="timeslot in timeslots">
              <v-card-text class="px-0 empty">&nbsp;</v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-layout>
    <p>{{bookingdata}}</p>
  </v-container>
</template>

<style scoped>
.empty {
  background-color: lightblue;
}

.booked {
  background-color: red;
}
</style>

<script>
import axios from "axios";

export default {
  data() {
    return {
      locationIn: null,

      booked: [],
      operatingHours: null,
      days: [
        {
          id: 1,
          name: "Mon"
        },
        {
          id: 2,
          name: "Tue"
        },
        {
          id: 3,
          name: "Wed"
        },
        {
          id: 4,
          name: "Thu"
        },
        {
          id: 5,
          name: "Fri"
        },
        {
          id: 6,
          name: "Sat"
        },
        {
          id: 7,
          name: "Sun"
        }
      ],

      facilitydata: null,
      bookingdata: null,

      timeslots: [],
      locations: [],
      facilities: [],
      bookings: []
    };
  },
  mounted() {
    //add timeslots
    var timeslot = new Date();
    timeslot.setHours(7, 30, 0);
    for (var i = 0; i < 27; i++) {
      timeslot = new Date(timeslot.getTime() + 30 * 60000);
      var hour = "0" + timeslot.getHours();
      var minute = "0" + timeslot.getMinutes();

      var timeslot1 = new Date(timeslot.getTime() + 30 * 60000);
      var hour1 = "0" + timeslot1.getHours();
      var minute1 = "0" + timeslot1.getMinutes();

      this.timeslots.push({
        id: i,
        start: hour.substr(-2) + ":" + minute.substr(-2),
        end: hour1.substr(-2) + ":" + minute1.substr(-2)
      });
    }

    //facilities data
    axios
      .get("http://192.168.31.167/booking/library/facilities")
      .then(response => {
        this.facilitydata = response.data;
        for (var key in response.data) this.locations.push(key);
      });
  },
  methods: {
    getBookings(facId) {
      console.log(this.locationIn);

      axios
        .get(
          "http://192.168.31.167/booking/library/" + this.facilitydata[facId]
        )
        .then(response => {
          this.bookingdata = response.data;
          this.operatingHours = this.bookingdata.operatingHours;
        });
    },
    getFacilities(loc) {
      this.facilities = [];
      for (var key in this.facilitydata[loc]) this.facilities.push(key);
    },
    unixToTime(uncleaned_unix) {
      var regExp = /\(([^)]+)\)/;
      var unix_timestamp = regExp.exec(uncleaned_unix);
      var date = new Date(unix_timestamp[1] * 1);
      var hours = "0" + date.getHours();
      var minutes = "0" + date.getMinutes();
      var seconds = "0" + date.getSeconds();
      var formattedTime =
        hours.substr(-2) + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);

      return date.getDay();
    },
    preview() {},
    bookFacility() {
      alert("test");
      bookingForm.submit();
    },
    content(day, timeslot) {
      const lesson = this.lessons.find(function(lesson) {
        return lesson.day === day.id && lesson.timeslot_id === timeslot.id;
      });
      return lesson ? lesson.name : "&nbsp;";
    }
  }
};
</script>