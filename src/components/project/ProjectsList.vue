<template>
  <v-card>
      <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
      ></v-text-field>
        <v-card-title>List of projects</v-card-title>
        <v-data-table
            :headers="headers"
            :items="projects"
            :search="search"
        >
          <template v-slot:[`item.manager.fullname`]="{ item }">
            <td v-if ="item.manager"> {{ item.manager.fullname }} </td>
            <td v-else>NONE</td>
          </template>
          <template v-slot:[`item.role.label`]="{ item }">
            <v-chip  class="mr-2"> {{ item.role.label }} </v-chip>
          </template>
          <!-- <template v-slot:[`item.role.label`]="{ item }">
            <v-chip  class="mr-2"> {{ item.role.label }} </v-chip>
          </template> -->
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small  @click="edit_(item.userId)">mdi-pencil</v-icon>
            <v-icon small class="mr-2" @click="delete_(item.userId, items.indexOf(item))">mdi-delete</v-icon>
            <!-- <v-icon small class="mr-2">mdi-file-pdf</v-icon> -->
          </template>
        </v-data-table>
  </v-card>
</template>

<script>
export default {
  name: "ProjectsList",
  data() {
    return {
      search: '',
      headers: [
        {text: 'Title', align: 'start', sortable: false, value: 'title'},
        {text: 'Description', align: 'start', sortable: false, value: 'description'},
      ],
    }
  },
  props: ['projects'],

  computed: {
    items: function () {
      return this.projects;
    }
  },
  methods:{
    delete_(id,index){ this.$emit('delete', id,index);},
    edit_(id){this.$emit('edit', id);},
  }

};
</script>

<style>
.list {
  max-width: 750px;
}
</style>