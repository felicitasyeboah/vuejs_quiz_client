<template>
  <body class="body-bg min-h-screen pt-12 md:pt-10 pb-6 px-2 md:px-0" style="font-family:'Lato',sans-serif;">
  <Header></Header>
  <main class="bg-white max-w-xl max-h-screen mx-auto  md:p-12 my-10 rounded-lg shadow-2xl">
    <form onsubmit="return false">
      <!--      Step 1 - Name and password-->
      <div v-if="step === 1">
        <section class="pb-2">
          <h3 class="font-bold text-2xl">Welcome to Superquiz</h3>
          <p class="text-gray-600 pt-2">Create your account!</p>
        </section>
        <h1 class="font-bold text-green-800 italic">Step One</h1>
        <label class="text-green-800">Username</label>
        <input type="text" v-model="userName" required>
        <label class="text-green-800">Password</label>
        <input type="password" v-model="password" required>
        <div v-if="passwordError" class="error">{{ passwordError }}</div>
        <div class="submit" v-show="userName">
          <button
              class="bg-green-600 hover:bg-green-800 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
              type="submit" @click.prevent="next()">Next
          </button>
          <div class="max-w-lg mx-auto text-center mt-12 mb-6 ">
            <p class="text-black">Already a user?
            <p class="text-black">Already a user?
              <router-link to="/login" class="font-bold hover:underline">Log in</router-link>
            </p>
          </div>
        </div>
      </div>

      <!--Step 2 - Choose user-image-->
      <div class="content-center" v-if="step === 2">
        <section class="pb-2">
          <h3 class="font-bold text-2xl">Welcome to Superquiz</h3>
          <p class="text-gray-600 pt-2">Create your account!</p>
        </section>
        <h1 class="font-bold text-green-800 italic">Step Two</h1>
        <h3 class="font-bold text-2xl">Choose your avatar</h3>
        <div class="flex items-center justify-between">
          <div class="avatar submit">
            <div class="mb-8 rounded-full w-34 h-34">
              <button
                  class="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadowtype"
                  @click="createImageSrc()">Another one please
              </button>

              <img :src="currentImage">

              <div class="between">
                <button
                    class="bg-green-400 hover:bg-green-600 text-white font-bold py-2 rounded  shadow-lg hover:shadow-xl transition duration-200"
                    type="submit" @click.prevent="prev()">Previous
                </button>
                <button
                    class="bg-green-600 hover:bg-green-800 text-white font-bold py-2 rounded  shadow-lg hover:shadow-xl transition duration-200"
                    type="submit" @click.prevent="next()">Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!--Step 3 - Confirm and submit-->
      <div v-if="step === 3">
        <section class="pb-2">
          <h3 class="font-bold text-2xl my-1">Welcome to Superquiz</h3>
          <p class="text-gray-600 pt-2 my-1">Create your account!</p>
        </section>
        <h1 class="font-bold text-green-800 italic pb-1">Step Three</h1>
        <div class="between">
          <p class="font-bold font-sans text-xl"> Username:</p> {{ userName }}
        </div>
        <div class="submit">
          <div class=" mb-4 submit bg-black">
            <img :src="currentImage" class="scale-55 visible group-hover:hidden submit" />
          </div>
        </div>
        <div class="even"> Accept terms and conditions
          <input id="terms" name="terms" type="checkbox"
                 class="h-4 w-4 text-green-300 focus:ring-green-500 border-green-200 rounded" v-model="terms"
                 required>
          <label For="terms" class="ml-1 block text-sm text-gray-900">
          </label></div>
        <div class="between">
          <button
              class="bg-green-600 hover:bg-green-800 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
              type="submit" @click.prevent="prev()">Previous
          </button>
          <div v-show="terms">
            <button
                class="bg-green-800 hover:bg-green-900 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
                type="submit" @click.prevent="handleSubmit()">Submit
            </button>
          </div>
        </div>
      </div>
    </form>
    <div class="alert alert-success" role="alert" v-show="regSuccess">
      Your registration was successful. You may now login.
    </div>
  </main>
  </body>

</template>

<script>
import axios from 'axios';
import {REG_URL} from '@/assets/constants';
import Header from "@/components/Header";


export default {
  components: {Header},
  data() {
    return {
      step: 1,
      userName: '',
      password: '',
      terms: false,
      passwordError: null,
      info: null,
      regSuccess: false,
      randomNumber: null,
      currentImage: null,
      step1: false,
      userImage: null,

    }
  },
  methods: {
    prev() {
      this.step--;
    },
    next() {
      this.passwordError = this.password.length > 5 ?
          '' : 'Password must be at least 6 characters long'
      if (!this.passwordError) {
        this.step++;
      }
    },
    createImageSrc() {
      this.randomNumber = Math.floor(Math.random() * (15 - 1 + 1)) + 1;
      this.currentImage = "http://localhost:8080/files/default" + this.randomNumber + ".png"
      console.log(this.currentImage)
    },
    //Registration - checks input and if valid, sends it to the registration server.
    handleSubmit() {
      console.log(this.userName, this.password, this.userImage, REG_URL)
      var postData = {
        userName: this.userName,
        password: this.password,
        profileImage: this.userImage,
      };
      let axiosConfig = {
        headers: {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*",
        }
      };
      axios.post(REG_URL, postData, axiosConfig)
          .then((res) => {
            console.log("RESPONSE RECEIVED: ", res);
            this.info = res;
            this.regSuccess = true;
          })
          .catch((err) => {
            console.log("AXIOS ERROR: ", err);
          })
    }
  },

  mounted() {
    this.createImageSrc()
  }
}
</script>
