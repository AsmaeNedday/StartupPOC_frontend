<template>
<div>
    <div class="form-container">
        <v-row id="edit" align="center" >
            <v-btn id="update" x-large tile dark block v-on:click="showCalendar()">
            <v-icon left large> mdi-calendar-multiselect</v-icon> Show  / Hide  my  calendar
            </v-btn>
        </v-row>
        <v-row id="edit" align="center" >
            <v-btn id="edit-btn" x-large tile block dark>
            <v-icon left large>mdi-pencil</v-icon>  Edit  my  times
            </v-btn>
        </v-row>
        <div id="editing">
            <b-form @submit.prevent="onSubmit" novalidate>
                <b-form-group id="input-group-dateStart" label="Start Date:" label-align="left">
                    <b-form-input type="datetime-local" id="input-dateStart" v-model="form.dateStart" required placeholder="Enter dateStart"></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-dateEnd" label="End Date:" label-align="left">
                    <b-form-input type="datetime-local" id="input-dateEnd" v-model="form.dateEnd" required placeholder="Enter dateEnd"></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-projects" label="Projects:" label-align="left" >
                <b-form-select  required v-model="form.project"   id="input-projects" >
                    <option v-for="prj in projects" :key="prj.id" :value="prj.id">{{ prj.title }} : {{ prj.description }}</option>
                </b-form-select>
                </b-form-group>

                <b-button block type="submit" class="btn btn-poc" variant="dark">Add time</b-button>
            </b-form><br>
            
            <b-form @submit.prevent="onSubmit" novalidate>

                <b-form-group id="input-group-times" label="Times list:" label-align="left" >
                <b-form-select  required v-model="toDelete"   id="input-times" >
                    <option v-for="t in times" :key="t.id" :value="t.id">{{ t.project.title }} ►  <br> {{ t.dateStart }} ► {{ t.dateEnd }} </option>
                </b-form-select>
                </b-form-group>
                <p>Select a time and click on 'Delete time' to delete it </p>
                <b-button id="delbtn" block v-on:click="deleteThisTime()" class="btn btn-poc" variant="dark">Delete time</b-button>
            
            </b-form>
        </div><br>
        <v-icon  x-large> mdi-lightbulb-on-outline</v-icon> Update Your Calendar After Editing It !
        <v-row id="edit" align="center" >
            <v-btn id="update" x-large tile block v-on:click="updateTimes()">
            <v-icon left large> mdi-autorenew</v-icon>  Update  my  calendar
            </v-btn>
        </v-row>
    </div>
    <div id= "mycalendar" v-if="seen_calendar" >
        <kalendar :configuration="calendar_settings" :events.sync="events" :key="componentKey">
        </kalendar>
    </div>
</div>
</template>

<script>
import Vue from "vue";
import { mapActions, mapGetters } from "vuex";
import { Kalendar } from 'kalendar-vue';
import PortalVue from 'portal-vue'
Vue.use(PortalVue);
Vue.use(Kalendar)
  export default {
    components: {
        Kalendar
    },
    data: () => ({
        selectedTime: '',
        form:{
            project:'',
            dateStart:'',
            dateEnd:'',
        },
        timeRequest:{
            dateStart:'',
            dateEnd:'',
            projectId:'',
            username:'',
        },
        toDelete: '',
        events:[],
        calendar_settings: {
        style: 'material_design',
        view_type: 'week',
        cell_height: 20,
        scrollToNow: false,
        start_day: new Date().toISOString(),
        read_only: false,
        day_starts_at: 0,
        day_ends_at: 24,
        overlap: true,
        hide_dates: ['2019-10-31'], // Spooky
        hide_days: [7],
        past_event_creation: true,
        },
        componentKey: 0,
        seen_calendar: false,
    }),
    created(){
        this.getProjects();
        this.getTimes();
        this.updateTimes();
    },
    computed: {
        ...mapGetters({
        projects: "project/GET_PROJECTS",
        times: "time/GET_TIMES",
        user: "auth/user",

        }),
    },
    methods: {
        ...mapActions({
        getProjects: "project/getProjects",
        getTimes: "time/getTimes",
        createTime: "time/createTime",
        deleteTime: "time/deleteTime",
        }),
        showCalendar(){
            this.updateTimes();
            this.seen_calendar=!this.seen_calendar;
        },

        updateTimes(){
            this.events = [];
            for(let time of this.times){
                this.events.push(
                {
                    from: time.dateStart,
                    to: time.dateEnd,
                    data: time.project.title
                },
            )
            }
            this.componentKey += 1
        },

        onSubmit: function() {
        this.timeRequest.dateStart = this.form.dateStart,
        this.timeRequest.dateEnd = this.form.dateEnd,
        this.timeRequest.projectId = this.form.project,
        this.timeRequest.username = this.user.username,
        this.createTime(this.timeRequest)
        this.$swal( 'Click on "Update My Calendar!"',
            'Time created!',
            'success');
        },

        deleteThisTime(){
            let idToDelete = this.toDelete
            this.deleteTime(idToDelete)           
            let index = this.times.findIndex(time => time.idToDelete == idToDelete)
            this.times.splice(index, 1)
            this.$swal( 'Click on "Update My Calendar!"',
            'Time deleted!',
            'success');
        }
    },
  }
</script>

<style scoped>

.form-container {
  margin-left: 3%;
  padding: auto;
  float: left;
  max-width: 60%;
}
#edit{
    margin-bottom: 3%;
    margin-top: 3%;
}
#update{
    margin-bottom: 3%;
    margin-top: 3%;
    color:white; 
    background-color: rgb(31, 118, 225);
}
#edit-btn{

    color: black;
    background-color: rgb(240, 240, 240);
}
#delete{
    margin-bottom: 3%;
    margin-top: 3%;
}
#delbtn{
    margin-bottom: 3%;
    margin-top: 3%;
}
#mycalendar{
    width : 70%;
    float: right;
}
#editing{
    background-color: rgb(240, 240, 240);
    padding: 5%;
}

</style>