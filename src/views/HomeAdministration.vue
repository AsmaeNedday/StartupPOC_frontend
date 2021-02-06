<template>
  <div class="users">
    <UsersList :users="users" @delete="delete_user" @edit="edit_user"></UsersList>
  </div>
</template>

<script>
import UsersList from "@/components/UsersList";
import { mapActions, mapGetters } from "vuex";
export default {
name: "HomeAdministration",
  components: {UsersList},
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
    delete_user(id,index){
      if(confirm("are you sure "))
      {
        this.deleteUser(id);
        console.log(index);
        this.users.splice(index, 1);
        }
    },
    edit_user(id){console.log(id);},
  },
  created(){
    this.getUsers();
  }
}
</script>

<style scoped>

</style>