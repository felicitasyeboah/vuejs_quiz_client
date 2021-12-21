<template>
  <body className="body-bg min-h-screen pt-12 md:pt-20 pb-6 px-2 md:px-0" style="font-family:'Lato',sans-serif;">
  <Header></Header>
  <main className="bg-white max-w-2xl mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
    <form @submit.prevent="handleSubmit" v-show="!regSuccess">
      <section>
        <h3 class="font-bold text-2xl">Welcome to Quizzler</h3>
        <p class="text-gray-600 pt-2">Create your account!</p>
      </section>
      <label class="text-green-800">Username</label>
      <input type="text" v-model="userName" required>
      <label class="text-green-800">Password</label>
      <input type="password" v-model="password" required>
      <div v-if="passwordError" class="error">{{ passwordError }}</div>
      <div class="flex items-center justify-between">
        <input id="terms" name="terms" type="checkbox"
               class="h-4 w-4 text-green-300 focus:ring-green-500 border-green-200 rounded" v-model="terms"
               required>
        <label htmlFor="terms" class="ml-1 block text-sm text-gray-900">
          Accept terms and conditions
        </label>
      </div>
      <div class="submit">
        <button
            class="bg-green-600 hover:bg-green-800 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
            type="submit" v-show="terms">Create an Account
        </button>
      </div>
      <p>{{ info }}</p>
    </form>
    <div class="alert alert-success" role="alert" v-show="regSuccess">
      Thank you for registering. Your registration was successful. You may now login.
    </div>
    <div class="max-w-lg mx-auto text-center mt-12 mb-6 ">
      <p class="text-black">Already a user? <a href="/login" class="font-bold hover:underline">Log in</a>.</p>
    </div>
  </main>
  </body>
</template>

<script>
import axios from 'axios';
import {reg_url} from '@/assets/constants';
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
      regSuccess: false,
    }
  },
  methods: {
    //Registration - checks input and if valid, sends it to the registration server.
    handleSubmit() {
      // validate password
      this.passwordError = this.password.length > 5 ?
          '' : 'Password must be at least 6 characters long'
      if (!this.passwordError) {
        console.log(this.userName, this.password, reg_url)
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
        axios.post(reg_url, postData, axiosConfig)
            .then((res) => {
              console.log("RESPONSE RECEIVED: ", res);
              this.info = res;
              this.regSuccess = true;
            })
            .catch((err) => {
              console.log("AXIOS ERROR: ", err);
            })
      }
    }
  }
}
</script>
