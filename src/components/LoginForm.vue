<template>
  <main class="bg-white max-w-2xl mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
    <div class="alert text-3xl" role="alert" v-show="waitingForAnswer">
      Waiting for an answer.. please wait
    </div>
    <div class="alert error-message text-white" v-show="showError&&!waitingForAnswer">
      {{ errorMessage }}
    </div>
<div v-show="!this.$store.state.isAuthenticated">
  <form @submit.prevent="login">
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

      <div class="max-w-lg mx-auto text-center mt-12 mb-6 ">
        <p class="text-black">Don't have an account?
          <router-link to="/register" class="font-bold hover:underline">Sign up
          </router-link>
        </p>
      </div>
    </div>
    <div v-show="isAuthenticated" class="alert alert-success" role="alert">
      <h1 class="font-sans text-3xl pb-5">Welcome {{ this.userNameStorage }}</h1>
      <img v-bind:src="this.userImage" class="w-1/2 mx-auto" alt="currentUserImage">
      <h1 class="text-2xl">Login was successful.</h1>

    </div>


  </main>

</template>

<script>

import axios from 'axios';
import {LOGIN_URL} from '@/assets/constants';
import jwt_decode from "jwt-decode";


export default {
  data() {
    return {
      userName: '',
      password: '',
      token: null,
      JWTExpirationDate: null,
      expDate: null,
      decoded: null,

      isAuthenticated: this.$store.state.isAuthenticated,
      errorMessage: 'Something didn\'t work quite right',
      showError: false,
      waitingForAnswer: false,
      userNameStorage: localStorage.getItem('userName'),
      imgRoot: "http://localhost:8080/profileImage/",

    }
  },

  computed: {
    // a computed getter
    userImage: function () {
      return this.imgRoot + localStorage.getItem('userName')
    },
    currentDate: function () {
      return Date.now();
    },
    isAuthenticated: function () {
      return this.$store.state.isAuthenticated
    },
    userNameStorage: function () {
      return localStorage.getItem('userName')
    }
  },
  methods: {
    // Sends data to server and waits for an answer
    login() {
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
            // Save received JWT Token and the entered Username to LocalStorage
            this.token = response.data.token
            localStorage.setItem('token', this.token)
            console.log("token from ls:" + localStorage.getItem('token'))
            localStorage.setItem('userName', this.userName)
            console.log("userName from ls:" + localStorage.getItem('userName'))

            //Decode the JWT-Token to get the expiration date
            this.decoded = jwt_decode(this.token);
            // Multiply to get value in milliseconds (and to match date.now) plus add a security-margin of 3 minutes (180000 milliseconds) and save
            // the value to localstorage
            this.expDate = ((this.decoded.exp * 1000) + 180000)
            console.log("berechn datum:" + this.expDate)
            localStorage.setItem('expirationDate', this.expDate)
            console.log("exp date from ls:" + localStorage.getItem('expirationDate'))
            this.$store.dispatch('tokenAndNameCheck');

            this.waitingForAnswer = false;
            location.reload()
          }).catch((error) => {
        this.waitingForAnswer = false;
        this.showError = true;
        this.errorMessage = error;
        // this.waitingForAnswer = false;
        // this.showError = true;
        // const code = error.response.status;
        // // Wrong password
        // if (code === 401) {
        //   this.errorMessage = "Error: No valid authentication credentials. Wrong password or username?"
        // } else {
        //   this.errorMessage = error;
        // }
      })
    },
  },
}
</script>

<style>


</style>
