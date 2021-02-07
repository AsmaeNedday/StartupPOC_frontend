import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import HomeAdministration from "@/views/HomeAdministration";
import AddUser from "@/components/user/AddUser";
import UserInfoCard from "@/components/user/UserInfoCard";


Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
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
        name: 'administration',
        component: HomeAdministration
    },
    {
        path: '/administration/add',
        name: 'add-user',
        component: AddUser
    },
    {
        path: "/administration/users/:id",
        name: "user-info-card",
        component: UserInfoCard
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router