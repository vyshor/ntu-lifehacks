<template>
  <v-container grid-list-md text-xs-center>
    <v-snackbar v-model="snackbar" :timeout="4000" top color="success">
      <span>{{ snackbar_message }}</span>
      <v-btn flat color="white" @click="snackbar = false">Close</v-btn>
    </v-snackbar>
    <v-form id="bookingForm">
      <v-layout row wrap>
        <v-flex xs12>
          <v-select
            :items="locations"
            label="Location"
            v-model="locationIn"
            v-on:change="getFacilities"
          ></v-select>
        </v-flex>
        <v-flex xs12>
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
      <v-layout row justify-center>
        <v-btn color="primary" dark @click="dialog = true">Book</v-btn>
        <v-dialog v-model="dialog" max-width="290">
          <v-card>
            <v-card-title class="headline">Confirm your booking?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" flat="flat" @click="dialog = false">Nah</v-btn>
              <v-btn color="green darken-1" flat="flat" @click="dialog = false" v-on:click="bookFacility">Yeah</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
    </v-form>
    <v-layout row wrap class="px-0 mx-0">
      <v-container grid-list-md text-xs-center class="px-0 mx-0">
        <v-layout row wrap class="px-0 mx-0">
          <v-flex xs2 class="px-0 mx-0">
            <v-card dark color="primary">
              <v-card-text class="px-0">Time</v-card-text>
            </v-card>
            <v-card v-for="timeslot in timeslots" :key="timeslot.id">
              <v-card-text class="px-0">{{ timeslot.start }}</v-card-text>
            </v-card>
          </v-flex>
          <v-flex v-for="day in days" :key="day.id" class="px-0 mx-0">
            <v-card dark color="primary">
              <v-card-text class="px-0">{{ day.name }}</v-card-text>
            </v-card>
            <v-card v-for="timeslot in timeslots" :key="timeslot.id">
              <v-card-text
                class="px-0 empty blue darken-4"
                v-if="checkOccupied(day.id, timeslot.id)"
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
const IP_ADDRESS = '172.22.152.115';

export default {
  data() {
    return {
      dialog: false,
      locationIn: null,
      occupiedidx: {
        "1": [],
        "2": [],
        "3": [],
        "4": [],
        "5": [],
        "6": [],
        "7": []
      },

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
      facilityID: null,

      timeslots: [],
      locations: [],
      facilities: [],
      bookings: [],

      bookDay: null,
      startTime: null,
      endTime: null,
      facility: null,

      booked_starttime: null,
      booked_endtime: null,

      snackbar: false,
      snackbar_message: ''
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
      .get("http://" + IP_ADDRESS + "/booking/library/facilities")
      .then(response => {
        this.facilitydata = response.data;
        for (var key in response.data) this.locations.push(key);
      });
  },
  methods: {
    getBookings(facility) {
      // Clear data:
      this.occupiedidx = {
        "1": [],
        "2": [],
        "3": [],
        "4": [],
        "5": [],
        "6": [],
        "7": []
      };
      this.facilityID = this.facilitydata[this.locationIn][facility];
      axios
        .get("http://" + IP_ADDRESS + "/booking/library/" + this.facilityID)
        .then(response => {
          this.bookingdata = response.data;
          // console.log(response.data);
          this.operatingHours = this.bookingdata.operatingHours;
          var bookings = response.data["Bookings"];
          for (var i = 0; i < bookings.length; i++) {
            // console.log(bookings[i]);
            if (bookings[i]["CheckInStatus" == 3]) {
              continue;
            }
            console.log(bookings[i]["StartDateTime"]);
            var start_slot = this.convertTimeToTimeslot(
              this.unixToTime(bookings[i]["StartDateTime"])
            );
            var end_slot = this.convertTimeToTimeslot(
              this.unixToTime(bookings[i]["EndDateTime"])
            );
            for (var j = start_slot - 1; j <= end_slot - 1; j++) {
              this.occupiedidx[bookings[i]["TimeCoordinate"]["Weekday"]].push(
                j
              );
            }
          }
          // console.log(this.occupiedidx);
        });
    },
    checkOccupied(day, idx) {
      return this.occupiedidx[day].includes(idx);
    },
    getFacilities(loc) {
      console.log(this.locationIn);
      this.facilities = [];
      for (var key in this.facilitydata[loc]) this.facilities.push(key);
    },
    unixToTime(uncleaned_unix) {
      var cleanedTime = new Date(parseInt(uncleaned_unix.slice(6, 19)));
      console.log(cleanedTime);
      return cleanedTime;
    },
    convertTimeToTimeslot(date) {
      console.log(date);
      var slot = (date.getHours() - 8) * 2 + 1;
      if (date.getMinutes() < 15) {
        return slot;
      } else if (date.getMinutes() < 45) {
        return ++slot;
      } else {
        slot += 2;
        return slot;
      }
    },
    bookFacility() {
      // console.log(this.startTime);
      // console.log(this.convertTimeslotToTime(this.startTime));
      // console.log(this.endTime);
      // console.log(this.convertTimeslotToTime(this.endTime + 1));
      // console.log(this.bookDay);
      console.log(this.facilitydata);

      this.booked_starttime = this.convertTimeslotToTime(this.startTime);
      this.booked_endtime = this.convertTimeslotToTime(this.endTime + 1);

      axios
        .post(
          "http://" + IP_ADDRESS +"/booking/library/" + this.facilityID + "/book",
          {
            starttime: this.booked_starttime,
            endtime: this.booked_endtime,
            date: "08/02/2019"
          }
        )
        .then(response => {
          console.log(response.data);
          this.snackbar = true;
          if (response.data.success === 'False') {
            this.snackbar_message = "Booking failed. Demo state.";
          } else {
            this.snackbar_message = "You have booked successfully.";
          }
        });
    },
    convertTimeslotToTime(slot) {
      var start = null;
      if ((slot & 1) == 0) {
        start = 8 + slot / 2;
        console.log(start);
        start =
          start < 10 ? "0" + start + "00:00" : start.toString() + ":00:00";
      } else {
        start = 8 + (slot - 1) / 2;
        start =
          start < 10 ? "0" + start + "30:00" : start.toString() + ":30:00";
      }
      return start;
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
