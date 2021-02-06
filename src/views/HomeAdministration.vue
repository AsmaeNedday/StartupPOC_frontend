<template>
  <div class="users">
    <UsersList :users="users"></UsersList>
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
      getUsers: "user/getUsers"
    }),
  },
  created(){
    this.getUsers();
  }
}
</script>

<style scoped>

</style>