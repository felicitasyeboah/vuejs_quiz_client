<template>
  <div v-show="!showStats">
    <div class="body-bg2  pt-12 md:pt-20 pb-6 px-2 md:px-0 flex justify-center">

      <div class="rounded-3xl overflow-hidden shadow-xl max-w-xs my-3 bg-white">

        <div class="flex justify-center -mt-8">
          <img :src="userImage" alt="userimage" class="rounded-full border-solid border-white scale-55 pt-10">
        </div>
        <div class="text-center px-3 pb-6 pt-2">
          <h3 class="text-black text-sm bold font-sans text-2xl">{{ userName }}</h3>


          <p class="mt-2 font-sans font-light text-black">Hello, i'm from another the other side!</p>
        </div>

        <div class="text-center">
          <h2>
            <button @click="changeStats"
                    class="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full mb-4 ">
              Show Stats
            </button>
          </h2>
          <p></p>
        </div>
      </div>
    </div>
  </div>


  <div v-show="showStats">
    <div class="body-bg2  pt-12 md:pt-20 pb-6 px-2 md:px-0 flex justify-center">
      <main class="bg-gray-900  mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl"><h1
          class="text-2xl text-white font-extrabold">Your stats:</h1>
        <section class="text-white ">
          <div class=" px-4 py-16 mx-auto sm:px-6 lg:px-8 ">
            <ul class="border border-white sm:grid sm:grid-cols-2 lg:grid-cols-3">
              <li class="le p-8 border border-white">
                <p class="text-3xl font-extrabold">50</p>
                <p class="mt-1 text-xl font-medium">Websites live</p>
              </li>
              <li class="le p-8 border border-white">
                <p class="text-3xl font-extrabold">190k+</p>
                <p class="mt-1 text-xl font-medium">Impressions</p>
              </li>
              <li class="le p-8 border border-white">
                <p class="text-3xl font-extrabold">$150k+</p>
                <p class="mt-1 text-xl font-medium">Client profits</p>
              </li>
              <li class="le p-8 border border-white">
                <p class="text-3xl font-extrabold">10</p>
                <p class="mt-1 text-xl font-medium">New staff</p>
              </li>
              <li class="le p-8 border border-white">
                <p class="text-3xl font-extrabold">1</p>
                <p class="mt-1 text-xl font-medium">New office</p>
              </li>
              <li class="le p-8 border border-white">
                <p class="text-3xl font-extrabold">6</p>
                <p class="mt-1 text-xl font-medium">New tech stacks</p>
              </li>
            </ul>
            <div class="flex justify-end">
              <button @click="changeStats"
                      class="max-w-md bg-green-700 hover:bg-green-900 text-white shadow-lg font-bold py-2 px-4 pb-2.5">
                Back to profile
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script>

import axios from "axios";
import {IMAGE_ROOT} from "@/assets/constants";

export default {
  name: "Profil",

  data() {
    return {
      userName: this.$store.state.username,
      showStats: false,
      userImage: this.$store.state.image,
    }
  },
  mounted() {
    this.userName = localStorage.getItem('userName')
    // Checks if theres a current Profil-Image saved in localStorage - if not, gets a random pic (bis wir eine Schnittstelle zum Abfragen haben)
    if ('currentImage' in localStorage) {
      this.userImage = IMAGE_ROOT + localStorage.getItem('currentImage');
      console.log("bild aus localstorage" + this.userImage)
    } else {
      this.randomNumber = Math.floor(Math.random() * (13 - 1 + 1)) + 1;
      this.currentImage = "default" + this.randomNumber + ".png"
      localStorage.setItem('currentImage', this.currentImage)
      this.userImage = IMAGE_ROOT + localStorage.getItem('currentImage');
      console.log(this.userImage)
    }

    console.log(this.userImage)
    axios.get('http://localhost:8080/playedGames').then(resp => {
      console.log((resp.data))
      // const obj =;
    }).catch(e => {
      console.log('Error', e);
    });

  },
  methods: {
    // Change from profile to gamestats
    changeStats() {
      this.showStats = !this.showStats;
      console.log("stats " + this.showStats)
    },
  }
}
</script>
