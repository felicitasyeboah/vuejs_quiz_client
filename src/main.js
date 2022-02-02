import {createApp} from 'vue'
import App from './App.vue'
import './index.css';
import router from './router'
import axios from "axios";
import {store} from './vuex/store'
import VueChartkick from 'vue-chartkick'
import 'chartkick/chart.js'

createApp(App).use(router).use(store).use(VueChartkick).mount('#app')

// Add a request interceptor, takes the JWT from Storage and adds it to every request made by axios
axios.interceptors.request.use(
    config => {
        const token = sessionStorage.getItem('token');
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

    //401 Unauthorized - occurs if the token is expired - user should be logged out
    if (error.response.status === 401) {
        alert("Sorry, there’s a problem with your credentials..")
        this.$store.commit('setImportantError', true);
        console.log(error.response.data);
        console.log(store.state.token)
        store.dispatch('logout')

        //400 Bad Request - can occur if user tries to register an username that already exists or if there a no records
        //for a username
    } else if (error.response.status === 400) {
        this.$store.commit('setImportantError', true);

        //417 Expectation Failed -error can occur if uploaded image is too big/wrong format
    } else if (error.response.status === 417) {
        alert("File too big or wrong format")
    } else {
        alert("Unkown technical problem")
        console.log("Technical problem")
    }
});


