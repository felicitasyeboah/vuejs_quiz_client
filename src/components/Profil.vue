<template>

  <div class="body-bg2 min-h-screen  pt-12 md:pt-20 pb-6 px-2 md:px-0">
    <div class="alert text-3xl" role="alert" v-show="isLoading">
      Loading data, please wait..
    </div>

    <div v-show="!isLoading&&!showStats">

      <!--Userprofile-->
      <div class="container flex bg-white flex-wrap  mx-auto md:max-w  justify-center rounded card max-w-lg p-5 m-3">
        <img :src="this.imageRoot+this.userImage" alt="userimage"
             class="rounded-full border-solid border-white  pt-10 h-1/2">

        <div class="text-center px-3 pb-6 pt-2 p-10">
          <h3 class="text-black text-sm bold font-sans text-2xl">{{ userName }}</h3>
          <p class="mt-2 font-sans font-light text-black bg:bg-green-600"> Zu allem bereit, zu nichts zu
                                                                           gebrauchen..</p>
        </div>
      </div>

      <!--LineChart-->

      <div class="container flex bg-white flex-wrap  mx-auto md:max-w  justify-center rounded card max-w-lg p-5 m-3">
        <h1 class="text-3xl submit object-center pt-20">{{ userName }} stats:</h1>
        <h1 class="bg-white">Last 5 games:</h1>
        <line-chart class="bg-white" empty="No data" loading="Loading..." id="lastgames-chart"
                    :data="{5:[this.userScores[0]],4:[this.userScores[1]],3:[this.userScores[2]],2:[this.userScores[3]], 1:[this.userScores[4]]  }"></line-chart>
        <div v-show="showError">{{ errorMessage }}</div>
      </div>

      <!--Pie-Chart-->

      <div class="container flex bg-white flex-wrap  mx-auto md:max-w  justify-center rounded card max-w-lg p-5 m-3">
        <h1 class="text-3xl submit object-center pt-20">{{ userName }} stats:</h1>
        <pie-chart empty="No data" loading="Loading..."
                   :data="[['Won', this.wonGames],['Lost', this.lostGames], ['Draw', this.drawGames]]"></pie-chart>
        <div class="text-xl p-6 font-mono">Average Score: {{ averageScore }} (last 20 games)</div>
        <div class="text-xl p-6 font-mono">Lost: {{ lostGames }}/20</div>
        <div class="text-xl p-6 font-mono">Won: {{ wonGames }}/20</div>
        <div class="text-xl p-6 font-mono ">Draw: {{ drawGames }}/20</div>

        <h2>
          <button @click="changeStats"
                  class="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full mb-4 ">
            Game history
          </button>
        </h2>
      </div>
    </div>


    <!--  Second page with played games-->
    <div v-show="showStats">

      <div class="text-7xl mx-auto font-thin text-center p-5">Last 20 games:</div>
      <div class="container flex flex-wrap md:max-w p-4 justify-center rounded card">

        <div class="bg-white p-8 m-1 bg-white shadow-2xl hover:bg-gray-300" v-for="(game, index) in playedgamelist">

          <p class="text-center font-thin text-4xl text-grey-darker text-xl font-mono font-bold">
            {{ (this.formatDate(game.timeStamp)) }}</p>
          <div class="text-black font-bold text-xl italic text-right pb-3">You vs. {{ game.opponent.userName }}</div>


          <img class="max-h-36  rounded-full   block mx-auto " v-bind:src="this.imageRoot+game.opponent.profileImage">

          <p class="text-grey-darker text-xl font-mono font-bold mt-5">Opponents Score: {{ game.opponentScore }}</p>
          <p class="text-grey-darker text-xl font-mono font-bold">Your score: {{ game.userScore }}</p>

        </div>

      </div>

      <div class="flex pb-5">
        <button @click="changeStats"
                class="mx-auto max-w-md bg-green-700 hover:bg-green-900 text-white shadow-lg font-bold py-2 px-4 pb-2.5">
          Back to stats
        </button>
      </div>
    </div>
  </div><!-- show-stats-->

</template>


<script>

import axios from "axios";
import {IMAGE_ROOT} from "@/assets/constants";
import 'chartkick/chart.js'
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
      averageScore: 0,
      lostGames: 5,
      wonGames: 5,
      gamedata: [],
      drawGames: 0,
      userScores: [],
      showError: false,

      errorMessage: "Something didnt work.."

    }
  },
  mounted() {
    //Gets the current User-Picture
    this.userName = localStorage.getItem('userName')
    axios.get('http://localhost:8080/user').then(resp => {
      console.log(resp.data)
      this.isLoading = false;
      this.$store.commit('setUserImage', resp.data.profileImage);
      this.userImage = resp.data.profileImage
    }).catch((error) => {
      if (error.response) {
        // client received an error response (5xx, 4xx)
        console.log(error.response.data);
        this.showError = true
        this.errorMessage = error
      } else if (error.request) {
        // client never received a response, or request never left
        console.log(error.request)
        this.showError = true
      } else {
        // anything else
        this.showError = true
      }
    })

//Get played-games data for second page
    axios.get('http://localhost:8080/playedGames').then(resp => {
      console.log(resp.data)
      this.wonGames = resp.data.wonGames;
      this.lostGames = resp.data.lostGames;
      this.averageScore = resp.data.averageScore;
      this.drawGames = resp.data.drawGames;
      this.showError = false;

      for (let i = 0; i < resp.data.playedGames.length; i++) {
        //push the values into separate arrays

        this.userScores.push(resp.data.playedGames[i].userScore);
      }

      this.playedgamelist = resp.data.playedGames;
      // const obj =;
    }).catch((error) => {
      if (error.response) {
        // client received an error response (5xx, 4xx)
        console.log(error.response.data);
        this.showError = true
        this.errorMessage = error
      } else if (error.request) {
        // client never received a response, or request never left
        console.log(error.request)
        this.showError = true
      } else {
        // anything else
        this.showError = true
      }
    })
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
