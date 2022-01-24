import {createApp} from 'vue'
import App from './App.vue'
import './index.css';
import router from './router'
import axios from "axios";
import store from './vuex/store'
import VueChartkick from 'vue-chartkick'
import 'chartkick/chart.js'

createApp(App).use(router).use(store).use(VueChartkick).mount('#app')

// If there is a token in local storage, it adds it to every request
axios.interceptors.request.use(req => {
    // `req` is the Axios request config, so you can modify
    // the `headers`.
    req.headers = {'Authorization': 'Bearer ' + localStorage.getItem('token')}
    return req;
});
