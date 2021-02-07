<template>
<div>
    <div class="form-container">
    <v-row id="edit" align="center" >
        <v-btn x-large tile dark >
        <v-icon left>mdi-pencil</v-icon> Edit Your Times
        </v-btn>
      </v-row>
      <b-form @submit.prevent="onSubmit" novalidate>

        <b-form-group id="input-group-dateStart" label="Start Time:" label-align="left">
            <b-form-input type="datetime-local" id="input-dateStart" v-model="form.dateStart" required placeholder="Enter dateStart"></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-dateEnd" label="End Time:" label-align="left">
            <b-form-input type="datetime-local" id="input-dateEnd" v-model="form.dateEnd" required placeholder="Enter dateEnd"></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-projects" label="Projects:" label-align="left" >
          <b-form-select  required v-model="form.project"   id="input-projects" >
            <option v-for="prj in projects" :key="prj.id" :value="prj.id">{{ prj.title }} : {{ prj.description }}</option>
          </b-form-select>
        </b-form-group>

        <b-button block type="submit" class="btn btn-poc" variant="dark">Add time</b-button>

      </b-form>
      <div id="delete">
        <h6> Times list</h6>
        <p>Select a time and click on "delete time" to delete it </p>
        <v-card class="mx-auto" max-width="300" tile :key="componentKey">
            <v-list dense  style="max-height: 70%" class="overflow-y-auto">
            <v-subheader>Times</v-subheader>
            <v-list-item-group v-model="selectedTime" color="primary">
                <v-list-item v-for="(item, i) in events" :key="i">
                <v-list-item-content> 
                    <v-list-item-title>{{ item.data}} : <br>
                        {{item.from}} <br>
                        {{item.to}}</v-list-item-title>
                </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
             </v-list>
        </v-card>
        <b-button id="delbtn" block v-on:click="deleteTime(selectedTime)" class="btn btn-poc" variant="dark">Delete time</b-button>
      </div>
    </div>
    <div id= "mycalendar">
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
        },
        events:[],
        calendar_settings: {
        style: 'material_design',
        view_type: 'week',
        cell_height: 20,
        scrollToNow: true,
        start_day: new Date().toISOString(),
        read_only: false,
        day_starts_at: 8,
        day_ends_at: 24,
        overlap: true,
        hide_dates: ['2019-10-31'], // Spooky
        hide_days: [7],
        past_event_creation: true,
        },
        componentKey: 0
    }),
    computed: {
        ...mapGetters({
        projects: "project/GET_PROJECTS",
        times: "time/GET_TIMES"
        }),
    },
    mounted(){
        this.updateTimes();

    },
    methods: {
        ...mapActions({
        getProjects: "project/getProjects",
        getTimes: "time/getTimes",
        createTime: "time/createTime"
        }),

        async updateTimes(){
            this.getTimes();
            this.events = [];
            for(let time of this.times){
                this.events.push(
                {
                    from: new Date(time.dateStart),
                    to: time.dateEnd,
                    data: time.project.title
                },
            )
        }
        console.log(this.times)
        this.componentKey += 1
        },

        onSubmit: function() {
        
        this.timeRequest.dateStart = this.form.dateStart,
        this.timeRequest.dateEnd = this.form.dateEnd,
        this.timeRequest.projectId = this.form.project,
        console.log(this.timeRequest)
        this.createTime(this.timeRequest).catch((err) => {
                        this.Error.isError = true;
                        this.Error.Description = err.response.data;
                        });

            /*let event = {
                from: this.form.dateStart,
                to: this.form.dateEnd,
                data: this.projects[this.form.project - 1].title,
            },
            this.events.push(event)*/
        this.updateTimes();
        this.componentKey += 1
        },
        deleteTime(selected){
            this.events.splice(this.events.indexOf(selected), 1);
            this.componentKey += 1
        }
    },
    created(){
        this.getProjects();
        this.getTimes();
  }
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
#delete{
    margin-bottom: 3%;
    margin-top: 3%;
}
#delbtn{
    margin-bottom: 3%;
    margin-top: 3%;
}

</style>