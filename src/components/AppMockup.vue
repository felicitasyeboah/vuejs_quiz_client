<template>

  <div class="container flex flex-wrap md:max-w p-4 justify-center rounded mx-auto">
    <div class="bg-white p-8 m-1 bg-white shadow-2xl">

      <h1 class="text-black bg-text pb-10 text-3xl text-center font-thin">(Not) Available in many countries
                                                                          worldwide. </h1>
      <img src="../assets/android.jpg" alt="mockup" id="mockup" class="w-1/3 pt-10 mx-auto">
      <h1 class="text-black">token: {{ this.$store.getters.getToken }}</h1>
      name: {{ this.$store.getters.getName }}

      {{ this.$store.getters.getExpirationDate }}
      {{ this.dateNow }}
      <img src="../assets/google-play-badge.png" alt="mockup" id="playbadge" class="w-1/6 mx-auto">
      <img src="../assets/applestore.png" alt="mockup" id="applebadge" class="w-1/6 mx-auto">
    </div>
  </div>


</template>


<script>
import jwt_decode from "jwt-decode";

export default {
  name: "AppMockup",
  data() {
    return {
      token: localStorage.getItem('token'),
      decoded: null,
      expDate: localStorage.getItem('expirationDate'),
      dateNow: Date.now(),


    }
  },
  mounted() {
    this.decoded = jwt_decode(this.token);
    console.log(localStorage.getItem('expirationDate'))
    const moment = require('moment');

    const timestamp = 1643647682000;
    const formatted = moment(timestamp).format('LLLL');

    console.log(formatted); // "02/24/2018"

    //  29. January 2022 16:20:55 1643646055 Monday, 31. January 2022 16:20:55

    if (this.dateNow < localStorage.getItem('expirationDate')) {
      console.log("kleiner")
    } else {
      console.log("groesser")
    }


    console.log(this.$store.state.token)
    console.log(this.$store.state.isAuthenticated)

  },
  methods: {

    nameCheck() {
      this.$store.commit('tokenAndNameCheck');

    }
  }
}
</script>

<style scoped>
.flex {
  display         : flex;
  align-items     : center;
  justify-content : center;
  }

</style>
