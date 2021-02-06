<template>
  <v-row align="center" class="list px-3 mx-auto">
    <v-col cols="6" md="4">
      <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
      ></v-text-field>
    </v-col>
      <v-card>
        <v-card-title>List of users</v-card-title>
        <v-data-table
            :headers="headers"
            :items="users"
            :search="search"
        >
          <template v-slot:[`item.manager`]="{ item }">
            <v-item v-if ="item.manager"> {{ item.manager.firstname }} {{ item.manager.lastname }}</v-item>
            <v-item v-else>NONE</v-item>
          </template>
          <template v-slot:[`item.role.label`]="{ item }">
            <v-chip  class="ma-2"> {{ item.role.label }} </v-chip>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="edit_(item.userId)">mdi-pencil</v-icon>
            <v-icon small @click="delete_(item.userId, items.indexOf(item))">mdi-delete</v-icon>
          </template>
        </v-data-table>
      </v-card>
  </v-row>
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
        {text: 'Manager', align: 'start', sortable: false, value: 'manager'},
        { text: "Actions", value: "actions", sortable: false },
      ],
    }
  },
  props: ['users'],

  computed: {
    items: function () {
      return this.users;
    }
  },
  methods:{
    delete_(id,index){ this.$emit('delete', id,index);},
    edit_(id){this.$emit('edit', id);}
  }

};
</script>

<style>
.list {
  max-width: 750px;
}
</style>