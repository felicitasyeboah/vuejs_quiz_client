import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import User from "@/views/user/User";
import Game from "@/views/Game";
import NotFound from "@/views/NotFound";
import Login from "@/views/Login";
import Highscore from "@/views/Highscore";
import Upload from "@/views/Upload";
import RegisterUser from "@/components/RegisterUser";


const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/register',
        name: 'Registration',
        component: RegisterUser
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/upload',
        name: 'Upload',
        component: Upload
    },
    {
        path: '/about',
        name: 'About',
        component: About
    },
    {
        path: '/user',
        name: 'User',
        component: User
    },
    {
        path: '/highscore',
        name: 'Highscore',
        component: Highscore
    },
    {
        path: '/game',
        name: 'Game',
        component: Game
    },
    {
        path: '/:catchAll(.*)',
        name: 'NotFound',
        component: NotFound
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
