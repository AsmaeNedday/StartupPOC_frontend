<template>

  <v-card>
    <v-form ref="form" class="pa-md-4" lazy-validation  >
      <v-layout justify-center>
      <v-date-picker
          popover-align="center"
          v-model="picker"
          type="month"
          color="black lighten-3"
          year-icon="mdi-calendar-blank"
          prev-icon="mdi-skip-previous"
          next-icon="mdi-skip-next"
      ></v-date-picker>
      </v-layout>
      </v-form>
    <v-container fluid>
      <v-btn color="success" class="ma-2" small @click="generate_">
        Generate Report
      </v-btn>
      <v-btn color="error" class="ma-2" small @click="cancel_">
        Cancel
      </v-btn>
    </v-container>
  </v-card>


</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "SelectTime",
  data(){
    return {
      picker:new Date().toISOString().substr(0, 7),
    }},
  props: ['currentUser'],
  computed: {
    ...mapGetters({
      user: "user/GET_CURRENT_USER",
      managers: "user/GET_MANAGERS",
      roles: "role/GET_ROLES",

    }),
  },
  methods: {
    ...mapActions({
    }),

    generate_(){
      this.$emit('generate',this.picker);
    },

    cancel_(){
      this.$emit('cancel');
    }

  },

}
</script>

<style scoped>

</style>