import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import HomeAdministration from "@/views/HomeAdministration";
import store from '@/store';


Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home,

    },
    {
        path: '/about',
        name: 'About',
        component: About
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
        path: '/administration',
        name: 'Administration',
        component: HomeAdministration,
        beforeEnter: (to, from, next) => {
            if (store.getters['auth/getrole'] != "EMPLOYEE" && !store.getters['auth/authenticated']) {
                return next({
                    // will put a vue with You don't have the STUDENT ROLE to access
                    name: 'Forbidden'
                })
            }
            next();
        }
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router