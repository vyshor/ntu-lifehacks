<template>
  <v-container fluid>
    <v-app>
      <div class="examseat">
        <v-alert
          :value="true"
          type="error"
        >The Examination Seating Arrangements are not available yet!</v-alert>
        <v-alert
          :value="true"
          type="error"
        >You will be able to view the seating arrangements 2 weeks before your examination starts!</v-alert>
      </div>
    </v-app>
  </v-container>
</template>

<script>
export default {
  name: "ExamSeating"
};
</script>

<style scoped>
</style>
