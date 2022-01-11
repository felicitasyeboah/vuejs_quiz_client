<template>
  <div v-if="!this.$store.state.user">

    <span class="alert text-3xl" role="alert">
      Please login.
    </span></div>
  <div v-else>
    <div v-show="!showStats">
      <div class="body-bg2  pt-12 md:pt-20 pb-6 px-2 md:px-0 flex justify-center">

        <div class="rounded-3xl overflow-hidden shadow-xl max-w-xs my-3 bg-white">

          <div class="flex justify-center -mt-8">
            <img :src="this.imageRoot+this.userImage" alt="userimage"
                 class="rounded-full border-solid border-white scale-55 pt-10">
          </div>
          <div class="text-center px-3 pb-6 pt-2">
            <h3 class="text-black text-sm bold font-sans text-2xl">{{ userName }}</h3>
            <p class="mt-2 font-sans font-light text-black"> Zu allem bereit, zu nichts zu gebrauchen..</p>
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
        <main class="bg-white  p-8 md:p-12 my-10 rounded-lg shadow-2xl">
          <h1 class="text-3xl submit object-center">Last played games:</h1>
          <div class="border-2">
            <div class="pb-3.5 p-4 rounded submit content-center mb-20" v-for="(game, index) in playedgamelist">
              <h2 class="text-xl font-sans"> {{ dates[index] }}</h2>
              <h2 class="text-xl font-bold"> You vs. {{ game.opponent.userName }}</h2>

              <img v-bind:src="this.imageRoot+game.opponent.profileImage" alt="picture text" class="max-h-38">
              <h2 class="text-red-900">
                Opponents Score: {{ game.opponentScore }}</h2>

              Your score: {{ game.userScore }}
            </div>
          </div>

          <div class="flex justify-end">
            <button @click="changeStats"
                    class="max-w-md bg-green-700 hover:bg-green-900 text-white shadow-lg font-bold py-2 px-4 pb-2.5">
              Back to profile
            </button>
          </div>
        </main>
      </div>
    </div>
  </div>


</template>

<script>

import axios from "axios";
import {IMAGE_ROOT} from "@/assets/constants";

import {authComputed} from '@/vuex/helpers'
import moment from "moment";

export default {
  computed: {
    ...authComputed
  },

  name: "Profil",

  data() {
    return {
      userName: this.$store.state.username,
      showStats: false,
      userImage: this.$store.state.currentUserImage,
      isLoading: true,
      playedgamelist: [],
      imageRoot: IMAGE_ROOT,
      dates: [],

    }
  },
  mounted() {
    //Gets the current User-Picture
    this.userName = localStorage.getItem('userName')
    axios.get('http://localhost:8080/user').then(resp => {
      //console.log(resp.data)
      this.$store.commit('setUserImage', resp.data.profileImage);
      this.userImage = resp.data.profileImage
    }).catch(e => {
      console.log('Error', e);
    });


//Get played-games data for second page
    axios.get('http://localhost:8080/playedGames').then(resp => {
      console.log((resp.data))
      for (var i = 0; i < resp.data.length; i++) {

        //push the values into separate arrays
        this.dates.push(this.formatDate(resp.data[i].timeStamp));
      }

      this.playedgamelist = resp.data;
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
    formatDate(input) {
      moment.locale('de')
      return moment(input).format('LLL');
    }
  }
}
</script>
