<template>
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
    <div v-show="!isLoggedIn">
      <div class="max-w-lg mx-auto text-center mt-12 mb-6 ">
        <p class="text-black">Don't have an account?
          <router-link to="/register" class="font-bold hover:underline">Sign
                                                                        up
          </router-link>
        </p>
      </div>
    </div>


    <div v-show="isLoggedIn" class="alert alert-success" role="alert">
      <h1 class="font-sans text-3xl">Welcome {{ userNameStorage }}</h1>
      <img v-bind:src="this.userImage" class="w-1/2 mx-auto" alt="currentUserImage">
      <h1 class="text-2xl">Login Successful.</h1>
    </div>


  </main>

</template>

<script>

import axios from 'axios';
import {LOGIN_URL} from '@/assets/constants';


export default {
  data() {
    return {
      userName: '',
      password: '',
      token: null,
      loginSuccess: false,
      isLoggedIn: this.$store.isLoggedIn,
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
  },

  watch() {
    this.loginSuccess = this.isLoggedIn;
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
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('userName', this.userName)
            this.waitingForAnswer = false;
            location.reload();
          }).catch((error) => {
        this.waitingForAnswer = false;
        this.showError = true;
        const code = error.response.status;
        // Wrong password
        if (code === 401) {
          this.errorMessage = "Error: No valid authentication credentials. Wrong password or username?"
        } else {
          this.errorMessage = error;
        }
      })
    }
  }
}
</script>

<style>


</style>
