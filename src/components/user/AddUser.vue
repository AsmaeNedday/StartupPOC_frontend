<template>
  <div class="submit-form mt-4 mx-auto">
    <p class="headline">Add User</p>
    <div v-if="!submitted">
      <v-form ref="form" lazy-validation>
        <v-text-field
            v-model="user.firstname"
            :rules="[(v) => !!v || 'firstname is required']"
            label="firstname"
            required
        ></v-text-field>
        <v-text-field
            v-model="user.lastname"
            :rules="[(v) => !!v || 'lastname is required']"
            label="lastname"
            required
        ></v-text-field>
        <v-text-field
            v-model="user.email"
            :rules="[(v) => !!v || 'email is required']"
            label="email"
            required
        ></v-text-field>
        <v-text-field
            v-model="user.username"
            :rules="[(v) => !!v || 'username is required']"
            label="username"
            required
        ></v-text-field>
        <v-text-field
            v-model="user.password"
            :rules="[(v) => !!v || 'password is required']"
            label="password"
            required
        ></v-text-field>
        <v-select
            :items="roles"
            label="Standard"
        ></v-select>
        <v-select
            :items="managers"
            label="Standard"
        ></v-select>


      </v-form>

      <v-btn color="primary" class="mt-3" @click="saveUser">Submit</v-btn>
    </div>

    <div v-else>
      <v-card class="mx-auto">
        <v-card-title>
          Submitted successfully!
        </v-card-title>

        <v-card-subtitle>
          Click the button to add new Tutorial.
        </v-card-subtitle>

        <v-card-actions>
          <v-btn color="success" @click="newUser">Add</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>

</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "AddUser",
  data() {
    return {
      user: {
        id: null,
        username: "",
        lastname: "",
        email: "",
        password: "",
        firstname: "",
        roles: [],
        managers: []
      },
      submitted: false,
    };
  },
  computed: {
    ...mapGetters({
      users: "user/GET_USERS",
    }),
  },
  methods: {
    ...mapActions({
      getUsers: "user/getUsers",
      deleteUser: "user/deleteUser"
    }),
    saveUser() {
    },

    newUser() {
      //this.submitted = false;
      //this.tutorial = {};
    },
  },
};
</script>

<style>
.submit-form {
  max-width: 300px;
}
</style>