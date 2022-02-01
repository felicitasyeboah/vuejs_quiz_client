import {createApp} from 'vue'
import App from './App.vue'
import './index.css';
import router from './router'
import axios from "axios";
import {store} from './vuex/store'
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
        alert("Sorry, there’s a problem with your credentials..")
        console.log(error.response.data);
        console.log(store.state.token)
        store.dispatch('logout')
    } else if (error.response.status === 400) {
        alert("fehler immer noch")
        store.commit('setRecords')
        store.commit('setError', "error")
    } else {
        console.log("Technical problem")
        store.dispatch('logout')
    }
});

// axios.interceptors.response.use((response) => {
//     return response
// }, function (error) {
//     if (error.response) {
//         // client received an error response (5xx, 4xx)
//         this.errorMessage = error
//         console.log(error.response.data.status)
//         this.code= error.response.data.status
//         switch (error.response.data.status) {
//             case "400":
//                 alert("No valid token")
//                 store.dispatch('logout')
//                 break;
//             case "401":
//                 alert("No entries found")
//                 break;
//         }
//     } else if (error.request) {
//         // client never received a response, or request never left
//         console.log(error.request)
//         this.errorMessage = error
//         alert("servergedoens")
//     } else {
//         // anything else
//         this.errorMessage = "Unknown error"
//         console.log("Technical problem")
