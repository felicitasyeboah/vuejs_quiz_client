<template>
  <body class="body-bg2 min-h-screen pt-12 md:pt-20 pb-6 px-2 md:px-0" style="font-family:'Lato',sans-serif;">
  <Header></Header>
  <main class="bg-white max-w-2xl mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
    <form @submit.prevent="login" v-show="!isLoggedIn">
      <section>
        <h3 class="font-bold text-2xl">Welcome to Superquiz!</h3>
        <p class="text-gray-600 pt-2">Sign into your account.</p>
      </section>
      <label class="text-green-800">Username</label>
      <input type="text" v-model="userName" required>
      <label class="text-green-800">Password</label>
      <input type="password" v-model="password" required>
      <div class="submit">
        <button
            class="bg-green-600 hover:bg-green-800 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
            type="submit">Sign In
        </button>
      </div>
    </form>
    <div v-show="isLoggedIn" class="alert alert-success" role="alert">
      <h1 class="text-2xl">Login Successful.</h1>
    </div>
    Nur zu Testzwecken
    <p>{{ jwt }}</p>
    <button @click="getUser">Get User</button>
    <button @click="getToken">Get Token</button>
    <button @click="getName">Get Name</button>
    <button @click="logout">Delete Token</button>
    <button @click="name">Give Name</button>
    <div v-show="!isLoggedIn">
      <div class="max-w-lg mx-auto text-center mt-12 mb-6 ">
        <p class="text-black">Don't have an account?
          <router-link to="/register" class="font-bold hover:underline">Sign
                                                                        up
          </router-link>
        </p>
      </div>
      Is loggedin: {{ isLoggedIn }}
    </div>
  </main>
  </body>
</template>

<script>

import axios from 'axios';
import {login_url} from '@/assets/constants';
import Header from "@/components/Header";

export default {
  components: {Header},
  data() {
    return {
      userName: '',
      user: this.$store.user,
      password: '',
      jwt: null,
      token: null,
      logSuccess: false,
      isLoggedIn: this.$store.isLoggedIn,
    }
  },
  watch() {
    this.logSuccess = this.isLoggedIn;
  },
  methods: {
    // Sends data with axios, saves token and username in localstorage
    login() {
      console.log(this.userName, this.password, login_url)
      var postData = {
        userName: this.userName,
        password: this.password
      };
      let axiosConfig = {
        headers: {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*",
        }
      };
      axios.post(login_url, postData, axiosConfig)
          .then((res) => {
            console.log("RESPONSE RECEIVED: ", res);
            this.jwt = res.data.token;
            this.$store.commit('changeStatus', true)
            const obj = JSON.parse(res.config.data);
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('userName', obj.userName)
            location.reload();
          })
          .catch((err) => {
            console.log("AXIOS ERROR: ", err);
          })
    },
    getUser() {
      const instance = axios.create({
        baseURL: 'http://localhost:8080/',
        timeout: 1000,
        headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
      });

      instance.get('/user')
          .then(response => {
            console.log(response);
            return response.data;
          })
    },
    getToken() {
      console.log(localStorage.getItem('token'));
    },
    getName() {
      console.log(localStorage.getItem('userName'));
    },
    name() {
      this.$store.dispatch('giveName');
      this.$store.getName();
    },
    logout() {
      this.$store.dispatch('logout')
      this.$router.push('/login')


    }

  }
}
</script>

<style>


</style>
