import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import HomeEmployee from '../views/HomeEmployee.vue'
import TimesCalendar from '@/components/user/TimesCalendar.vue';



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/employee-page',
    name: 'HomeEmployee',
    component: HomeEmployee
  },
  {
    path: '/cal',
    name: 'TimesCalendar',
    component: TimesCalendar
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
