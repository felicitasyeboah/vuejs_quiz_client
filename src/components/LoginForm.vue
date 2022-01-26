<template>
  <body class="body-bg2 min-h-screen pt-12 md:pt-20 pb-6 px-2 md:px-0" style="font-family:'Lato',sans-serif;">
  <Header></Header>
  <main class="bg-white max-w-2xl mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
    <div class="alert text-3xl" role="alert" v-show="waitingForAnswer">
      Waiting for an answer.. please wait
    </div>
    <div class="alert error-message text-white" v-show="showError&&!waitingForAnswer">
      {{ errorMessage }}
    </div>

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

    <div v-show="!isLoggedIn">
      <div class="max-w-lg mx-auto text-center mt-12 mb-6 ">
        <p class="text-black">Don't have an account?
          <router-link to="/register" class="font-bold hover:underline">Sign
                                                                        up
          </router-link>
        </p>
      </div>
    </div>
  </main>
  </body>
</template>

<script>

import axios from 'axios';
import {LOGIN_URL} from '@/assets/constants';
import Header from "@/components/Header";

export default {
  components: {Header},
  data() {
    return {
      userName: '',
      user: this.$store.user,
      password: '',
      token: null,
      logSuccess: false,
      isLoggedIn: this.$store.isLoggedIn,
      isAuthenticated: this.$store.state.isAuthenticated,
      errorMessage: 'Something didn\'t work quite right',
      showError: false,
      waitingForAnswer: false,
    }
  },
  watch() {
    this.logSuccess = this.isLoggedIn;
  },


  methods: {
    // Sends data with axios, saves token and username in localstorage
    login() {
      console.log(this.userName, this.password, LOGIN_URL)
      this.waitingForAnswer = true;
      let postData = {
        userName: this.userName,
        password: this.password
      };
      let axiosConfiguration = {
        headers: {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*",
        }
      };
      axios.post(LOGIN_URL, postData, axiosConfiguration)
          .then((response) => {
            console.log("RESPONSE RECEIVED: ", response);
            const obj = JSON.parse(response.config.data);
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('userName', obj.userName)
            this.waitingForAnswer = false;
            location.reload();

          }).catch((error) => {
        this.waitingForAnswer = false;
        this.showError = true;
        this.errorMessage = error;
      })
    }
  }
}
</script>

<style>


</style>
