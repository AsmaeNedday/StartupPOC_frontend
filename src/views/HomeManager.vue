<template>
  <v-container fluid>
    <v-row class="pa-mb-2">
      <v-col>
        <v-btn class="ma-2" @click="section = 'list'" block
          ><v-icon>mdi-format-list-bulleted-square</v-icon></v-btn
        >
      </v-col>
      <v-col>
        <v-btn class="ma-2" @click="section = 'add'" block>
          <v-icon>mdi-plus</v-icon></v-btn
        >
      </v-col>
      <v-col>
        <v-btn class="ma-2" @click="section = 'addProject'" block>
          <v-icon>mdi-folder-plus</v-icon></v-btn
        >
      </v-col>
      <v-col>
        <v-btn class="ma-2" @click="section = 'list-project'" block>
          <v-icon>mdi-list-status</v-icon></v-btn
        >
      </v-col>
    </v-row>

    <v-row v-if="section == 'list'" class="pa-md-4">
      <v-col cols="12" sm="6" mt-16 md="8">
        <EmployeesList :users="users" @delete="delete_user" @edit="edit_user"  @selectTime="selectTime" />
      </v-col>
     
      <v-col cols="6" mt-16 md="4">
        <UserInfoCard
          v-if="operation == 'add'"
          @cancel="cancel"
          @update="update"
        ></UserInfoCard>
        <SelectTime
            v-if="operation == 'select_time'"
            @generate="generateReport"
            @cancel="cancel"
        ></SelectTime>
      </v-col>
    </v-row>
    <v-row v-if="section == 'list-project'" class="pa-md-4">
       <v-col cols="12" sm="6" mt-16 md="8">
        <ProjectsList
          :projects="projects"
          @delete="delete_user"
          @edit="edit_user"
        />
        <!-- <UsersList :users="users" @delete="delete_user" @edit="edit_user" /> -->
      </v-col>
    </v-row>
    <v-row v-if="section == 'add'" class="pa-md-4">
      <v-col cols="12" sm="6" mt-16 md="8">
        <AddEmployee @add="add_employee" :currentManager="this.manager" />
      </v-col>
    </v-row>
    <v-row v-if="section == 'addProject'" class="pa-md-4">
      <v-col cols="12" sm="6" mt-16 md="8">
        <AddProject
          @add="add_employee"
          @addProject="add_project"
          :currentManager="this.manager"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
// import UsersList from "@/components/user/UsersList";
import ProjectsList from "@/components/project/ProjectsList";
import EmployeesList from "@/components/user/EmployeesList";
import { mapActions, mapGetters } from "vuex";
import UserInfoCard from "@/components/user/UserInfoCard";
import AddEmployee from "@/components/user/AddEmployee";
import AddProject from "@/components/project/AddProject";
import SelectTime from "@/components/time/SelectTime";


export default {
name: "HomeManager",
  data() {
    return{
      operation:"",
      section:"list"
    }
  },
  components: {UserInfoCard, EmployeesList,AddEmployee,AddProject, SelectTime,ProjectsList},
  computed: {
    ...mapGetters({
      users: "user/GET_USERS_OF_MANAGER",
      currentUser: "user/GET_CURRENT_USER",
      roles: "role/GET_ROLES",
      manager:"auth/user",
      projects:"project/GET_PROJECTS"
    }),
  },
  methods: {
    ...mapActions({
      getUsers: "user/getUsers",
      deleteUser: "user/deleteUser",
      getCurrentUser: "user/getCurrentUser",
      getRoles: "role/getRoles",
      getManager:"auth/user",
      getUsersOfManager:"user/getUsersOfManager",
      updateUser: "user/updateUser",
      updateUserOfManager:"user/updateUserOfManager",
      addUser: "user/addUser",
      addProject:"project/addProject",
      getProjects:"project/getProjects",
      generateMonthlyReport: "time/generateMonthlyReport",
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
    add_employee(user,id){
      console.log("inside home");
      console.log(id);
      this.addUser(user,id);
      this.section="list";
      this.$swal("Saved", "user saved with success", "success");
    },
    add_project(project,username){
      
      this.addProject(project,username);
      this.section="list-project";
      this.$swal("Saved", "project saved with success", "success");
    }
    ,
    edit_user(id){
      this.operation="add";
      console.log(id);
      this.getCurrentUser(id);
  },
    selectTime(id){
      this.operation="select_time";
      this.getCurrentUser(id);
    },
    cancel(){
      this.operation="";
    },
    generateReport(date){
      console.log(date);
      console.log(this.currentUser.userId);
      let data = {"userId": this.currentUser.userId,"date": date}
      this.generateMonthlyReport(data);

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
          console.log(user);
          this.updateUserOfManager(user);
          this.$swal('Updated', 'You successfully updated the user', 'success')
          this.cancel();
        }
      })
    }
 },
  created(){
    this.getUsers();
    this.getRoles();
    this.getUsersOfManager(this.manager.userId);
    this.getProjects();
    // console.log(this.manager.role.id);
  }
}
</script>

<style scoped>
</style>