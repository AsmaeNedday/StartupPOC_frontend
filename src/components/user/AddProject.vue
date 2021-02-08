<template>
  <v-card>
    <v-card-title> Add Project </v-card-title>
    <v-form ref="form" class="pa-md-4" v-model="valid" lazy-validation>
      <!-- <v-form ref="form" lazy-validation> -->
      <v-text-field
        v-model="title"
        :rules="titleRules"
        label="title"
        required
      ></v-text-field>
      <v-text-field
        v-model="description"
        :rules="descriptionRules"
        label="description"
        required
      ></v-text-field>
     
      <!-- <v-select v-if="this.currentManager!=null"
        return-object
        v-model="this.currentManager"
        item-text="fullname"
        item-value="iduser"
        :items="managers"
        label="manager"
      ></v-select>
      <v-select v-else
        return-object
        v-model="manager"
        item-text="fullname"
        item-value="iduser"
        :items="managers"
        label="manager"
      ></v-select> -->
      <!-- </v-form> -->

      <v-btn color="success" :disabled="!valid" small @click="add_">
        Save
      </v-btn>
      <v-btn color="error" style="margin-left: 30px" small @click="cancel_">
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
      title:'',
      description:'',
      valid: true,
      descriptionRules: [
        v => !!v || 'Description is required',
        v => (v && v.length >= 3 ) || 'Description must more than 3 characters',
      ],
      titleRules: [
        v => !!v || 'Title is required',
        v => (v && v.length >= 3 ) || 'title must more than 3 characters',
      ],
      
    }},
  props: ['currentUser','currentManager'],
  computed: {
    ...mapGetters({
      managers: "user/GET_MANAGERS",
      roles: "role/GET_ROLES",
      loggedUser :"auth/user"

    }),
  },
  mounted(){
    console.log(this.currentManager);
  },
  methods: {
    ...mapActions({
    }),

    add_(){
      // console.log("wanna print")
      // console.log(this.loggedUser.userId);
      if(this.$refs.form.validate()){
      let project = {
        "title":this.title,
        "description":this.description,
        "managerId":''
      }
      if (this.manager!=null){project.managerId=this.manager.userId}
      this.$emit('add',project);   
      }
    },

    cancel_(){
      this.$emit('cancel');
    }

  },

}
</script>

<style scoped>
</style>