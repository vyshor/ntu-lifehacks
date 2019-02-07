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
          <v-select
            :items="facilities"
            label="Facility"
            v-model="facility"
            @change="getBookings($event)"
          ></v-select>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs4>
          <v-select :items="days" label="Day" item-text="name" v-model="bookDay" item-value="id"></v-select>
        </v-flex>
        <v-flex xs4>
          <v-select
            :items="timeslots"
            label="Start"
            item-text="start"
            v-model="startTime"
            item-value="id"
          ></v-select>
        </v-flex>
        <v-flex xs4>
          <v-select
            :items="timeslots"
            label="End"
            item-text="end"
            v-model="endTime"
            item-value="id"
          ></v-select>
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
              <v-card-text
                class="px-0 empty blue darken-4"
                v-if="checkOccupied((day.id - 1) * 27 + timeslot.id)"
              >&nbsp;</v-card-text>
              <v-card-text class="px-0 empty" v-else>&nbsp;</v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-layout>
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
      occupiedidx: [],

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
      bookings: [],

      bookDay: null,
      startTime: null,
      endTime: null,
      facility: null
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
      .get("http://172.20.112.181/booking/library/facilities")
      .then(response => {
        this.facilitydata = response.data;
        for (var key in response.data) this.locations.push(key);
      });
  },
  methods: {
    getBookings(facility) {
      console.log(this.facilitydata[this.locationIn][facility]);
      axios
        .get(
          "http://172.20.112.181/booking/library/" +
            this.facilitydata[this.locationIn][facility]
        )
        .then(response => {
          this.bookingdata = response.data;
          console.log(response.data);
          this.operatingHours = this.bookingdata.operatingHours;
          for (let info in response.data) {
            const time_idx = response.data["Bookings"];
            console.log(time_idx);
            const coord = time_idx[0]["TimeCoordinate"];
            console.log(coord);
            const start_idx = (coord.Weekday - 1) * 27 + coord.StartTimeCoordinate;
            const end_idx = (coord.Weekday - 1) * 27 + coord.EndTimeCoordinate;
            for (let i = start_idx; i <= end_idx; i++) {
              this.occupiedidx.push(i);
            }
          }
        });
    },
    checkOccupied(idx) {
      return this.occupiedidx.includes(idx);
    },
    getFacilities(loc) {
      console.log(this.locationIn);
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
      alert(
        "You have successfully booked the facility. You will be notifed by an email soon to confirm the booking."
      );
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