import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import Axios from "axios"
require('@/store/subscriber')
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.config.productionTip = false
Axios.defaults.baseURL = "http://localhost:8081/api"
const options = {
  confirmButtonColor: '#41b882',
  cancelButtonColor: '#ff7674',
};
Vue.use(VueSweetalert2,options);
store.dispatch('auth/attempt', localStorage.getItem('token'))
  .then(() => {
    new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount('#app')
  })
