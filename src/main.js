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
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        Promise.reject(error)
    });


//Add a response interceptor
axios.interceptors.response.use((response) => {
    return response
}, function (error) {

    alert("oh no, ein technik-problem und jetzt sollte ausgeloggt werden")

    this.$store.dispatch('unAuth')
    alert("axios " + error)
});


// // If there is a token in local storage, it adds it to every request
// axios.interceptors.request.use(req => {
//     // `req` is the Axios request config, so you can modify
//     // the `headers`.
//     req.headers = {'Authorization': 'Bearer ' + localStorage.getItem('token')}
//     return req;
// });
