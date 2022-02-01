<template>
  <main className="bg-white max-w-2xl mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
    <div className="alert text-3xl" role="alert" v-show="waitingForAnswer">
      Waiting for an answer.. please wait
    </div>
    <div className="alert error-message text-white" v-show="showError&&!waitingForAnswer">
      {{ errorMessage }}
    </div>
    <form @submit.prevent="handleSubmit" v-show="!registrationSuccess">
      <section>
        <h3 className="font-bold text-2xl">Welcome to Superquiz..</h3>
        <p className="text-gray-600 pt-2">Create your account!</p>
      </section>
      <label className="text-green-800">Username</label>
      <input type="text" v-model="userName" required>
      <label className="text-green-800">Password</label>
      <input type="password" v-model="password" required>
      <div v-if="passwordError" className="error">{{ passwordError }}</div>
      <div className="flex items-center justify-between">
        <input id="terms" name="terms" type="checkbox"
               className="h-4 w-4 text-green-300 focus:ring-green-500 border-green-200 rounded" v-model="terms"
               required>
        <label htmlFor="terms" className="ml-1 block text-sm text-gray-900">
          Accept terms and conditions
        </label>
      </div>
      <div className="submit">
        <button
            className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
            type="submit" v-show="terms">Create an Account
        </button>
      </div>
      <p>{{ info }}</p>
    </form>

    <div className="alert alert-success" role="alert" v-show="registrationSuccess">
      Thank you for registering. Your registration was successful. You may now login.
    </div>
    {{ errorText }}
    <div className="max-w-lg mx-auto text-center mt-12 mb-6">
      <p className="text-black">Already a user?
        <router-link to="/login" className="font-bold hover:underline">Log in</router-link>
      </p>
    </div>
  </main>
</template>

<script>
import axios from 'axios';
import {REG_URL} from '@/assets/constants';
import Header from "@/components/Header";

export default {
  components: {Header},
  data() {
    return {
      userName: '',
      password: '',
      terms: false,
      passwordError: null,
      info: null,
      registrationSuccess: false,
      errorMessage: "Unknown Error",
      showError: false,
      waitingForAnswer: false,
      errorText: "User exists",
    }
  },
  methods: {
    //Registration - checks input and if valid, sends it to the registration server.
    handleSubmit() {
      // validate password
      this.passwordError = this.password.length > 5 ?
          '' : 'Password must be at least 6 characters long'
      if (!this.passwordError) {
        console.log(this.userName, this.password, REG_URL)
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
        axios.post(REG_URL, postData, axiosConfiguration)
            .then((response) => {
              this.waitingForAnswer = false;
              this.info = response;
              this.registrationSuccess = true;
            }).catch((error) => {
          this.waitingForAnswer = false;
          this.showError = true;
          const code = error.response.status;
          console.log(code)
          if (code === 400) {
            this.errorMessage = "A user with this username already exists"
          } else {
            this.errorMessage = error;
          }
        })
      }
    }
  }
}


</script>
