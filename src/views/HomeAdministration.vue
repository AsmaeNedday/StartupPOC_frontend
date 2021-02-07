<template>
  <v-row class="pa-md-4">
    <v-col  cols="12" sm="6"  mt-16 md="8">
      <UsersList :users="users" @delete="delete_user" @edit="edit_user"/>
    </v-col>

    <v-col  cols="6"  mt-16 md="4">
        <UserInfoCard v-if="operation=='add'" @cancel="cancel" @update="update" ></UserInfoCard>
    </v-col>
  </v-row>
</template>
<script>
import UsersList from "@/components/user/UsersList";
import { mapActions, mapGetters } from "vuex";
import UserInfoCard from "@/components/user/UserInfoCard";
export default {
name: "HomeAdministration",
  data() {
    return{
      operation:""
    }
  },
  components: {UserInfoCard, UsersList},
  computed: {
    ...mapGetters({
      users: "user/GET_USERS",
      currentUser: "user/GET_CURRENT_USER",
      roles: "role/GET_ROLES",
    }),
  },
  methods: {
    ...mapActions({
      getUsers: "user/getUsers",
      deleteUser: "user/deleteUser",
      getCurrentUser: "user/getCurrentUser",
      getRoles: "role/getRoles",
    }),
    delete_user(id,index){
      this.$swal({
        title: 'Are you sure?',
        text: 'The user wont have access to his account',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes Delete it!',
        cancelButtonText: 'No, Keep it!',
        showCloseButton: true,
        showLoaderOnConfirm: true
      }).then((result) => {
        if(result.value) {
          this.deleteUser(id);
          this.users.splice(index, 1);
          this.$swal('Deleted', 'You successfully deleted this file', 'success')
        }
      })
    },

    edit_user(id){
      this.operation="add";
      console.log(id);
      this.getCurrentUser(id);
  },
    cancel(){
      this.operation="";
    },
    update(user){
      this.$swal({
        title: 'Are you sure you  ?',
        text: 'your inputs will be saved',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes update it!',
        cancelButtonText: 'No, Keep it!',
        showCloseButton: true,
        showLoaderOnConfirm: true
      }).then((result) => {
        if(result.value) {
          this.updateUser(user);
          this.$swal('Deleted', 'You successfully deleted this file', 'success')
        }
      })

    }
 },
  created(){
    this.getUsers();
    this.getRoles();
  }
}
</script>

<style scoped>

</style>