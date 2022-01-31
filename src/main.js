import {createApp} from 'vue'
import App from './App.vue'
import './index.css';
import router from './router'
import axios from "axios";
import store from './vuex/store'
import VueChartkick from 'vue-chartkick'
import 'chartkick/chart.js'

createApp(App).use(router).use(store).use(VueChartkick).mount('#app')

// Add a request interceptor
axios.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        // config.headers['Content-Type'] = 'application/json';
        return config;
    },
    error => {
        Promise.reject(error)
    });


//Add a response interceptor
axios.interceptors.response.use((response) => {
    return response
}, function (error) {
    if (error.response.status === 401) {
        alert("Sorry, there’s a problem with the credentials you’re using to sign in")
        console.log(error.response.data);
    } else {
        console.log("Technical problem")
    }
});

