<template>
  <v-card>
    <v-card-title>
     Add user
    </v-card-title>
    <v-form ref="form" class="pa-md-4" lazy-validation>
      <v-form ref="form" lazy-validation>
        <v-text-field
            v-model="firstname"
            :rules="[(v) => !!v || 'firstname is required']"
            label="firstname"
            required
        ></v-text-field>
        <v-text-field
            v-model="lastname"
            :rules="[(v) => !!v || 'lastname is required']"
            label="lastname"
            required
        ></v-text-field>
        <v-text-field
            v-model="email"
            :rules="[(v) => !!v || 'email is required']"
            label="email"
            required
        ></v-text-field>
        <v-text-field
            v-model="username"
            :rules="[(v) => !!v || 'username is required']"
            label="username"
            required
        ></v-text-field>
        <v-text-field
            v-model="password"
            type="password"
            :rules="[(v) => !!v || 'password is required']"
            label="password"
            required
        ></v-text-field>
        <v-select
            return-object
            v-model="role"
            item-text="label"
            item-value="id"
            :items="roles"
            label="role"
        ></v-select>
        <v-select
            return-object
            v-model="manager"
            item-text="fullname"
            item-value="iduser"
            :items="managers"
            label="manager"
        ></v-select>

      </v-form>

      <v-btn color="success" small @click="add_">
        Save
      </v-btn>
      <v-btn color="error" small @click="cancel_">
        Cancel
      </v-btn>
    </v-form>

  </v-card>


</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "AddUser",
  data(){
    return {
      lastname:'',
      firstname:'',
      email:'',
      username:'',
      role:'',
      manager:'',
      password:''

    }},
  props: ['currentUser'],
  computed: {
    ...mapGetters({
      managers: "user/GET_MANAGERS",
      roles: "role/GET_ROLES",
      loggedUser :"auth/user"

    }),
  },
  methods: {
    ...mapActions({
    }),

    add_(){
      console.log("wanna print")
      console.log(this.loggedUser.userId);
      let user = {
        "lastname":this.lastname,
        "firstname":this.firstname,
        "email":this.email,
        "username":this.username,
        "password":this.password,
        "roleId":this.role.id,
        "managerId":''
      }
      if (this.manager!=null){user.managerId=this.manager.userId}
      this.$emit('add',user,this.loggedUser.userId);
    },

    cancel_(){
      this.$emit('cancel');
    }

  },

}
</script>

<style scoped>

</style>