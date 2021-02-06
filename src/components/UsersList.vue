<template>
  <v-card>
    <v-card-title>
      List of users
      <v-spacer></v-spacer>
      <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
      ></v-text-field>
    </v-card-title>
    <!-- to change -->
    <v-data-table
        :headers="headers"
        :items="items"
        :search="search"
    >
    </v-data-table>
  </v-card>

</template>

<script>
export default {
  name: "UsersList",
  data() {
    return {
      search: '',
      headers: [
        {text: 'Lastname', align: 'start', sortable: false, value: 'lastname'},
        {text: 'Firstname', align: 'start', sortable: false, value: 'firstname'},
        {text: 'Email', align: 'start', sortable: false, value: 'email'},
        {text: 'Role', align: 'start', sortable: false, value: 'role.label'},
        {text: 'Manager', align: 'start', sortable: false, value: 'manager.lastname'},
      ],
    }
  },
  props: ['users'],

  computed: {
    items: function () {
      return this.users;
    }
  }
}
</script>

<style scoped>

</style>