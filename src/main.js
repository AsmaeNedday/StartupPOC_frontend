import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import Axios from "axios"
require('@/store/subscriber')

Vue.config.productionTip = false
Axios.defaults.baseURL = "http://localhost:8081/api"

store.dispatch('auth/attempt', localStorage.getItem('token'))
  .then(() => {
    new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount('#app')
  })
