<template>
  <!--Userprofile-->
  <div class="alert error-message text-white">
    No entries found
  </div>
  <div class="text-7xl mx-auto font-thin text-center p-5">{{ this.userName }}:</div>
  <div class="container flex bg-white flex-wrap  mx-auto md:max-w  justify-center rounded card max-w-lg p-5 m-3">

    <img v-bind:src="this.userImage" alt="userimage"
         class="rounded-full border-solid border-white  pt-10 h-1/2">

    <div class="text-center px-3 pb-6 pt-2 p-10">
      <h3 class="text-black text-sm bold font-sans text-2xl">{{ this.userName }}</h3>
      <p class="mt-2 font-sans font-light text-black bg:bg-green-600"> Zu allem bereit, zu nichts zu
                                                                       gebrauchen..</p></div>

  </div>
</template>

<script>
import {IMAGE_ROOT} from "@/assets/constants";

export default {
  computed: {
    userImage: function () {
      return IMAGE_ROOT + localStorage.getItem('userName')
    },
    errorText: function () {
      return this.$store.state.errorText
    },
    userName: function () {
      return localStorage.getItem('userName')
    }
  },
}

</script>

<style scoped>

</style>
