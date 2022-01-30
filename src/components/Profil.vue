<template>

  <div class="body-bg2 min-h-screen  pt-12 md:pt-20 pb-6 px-2 md:px-0">
    <div class="alert text-3xl" role="alert" v-show="isLoading">
      Loading data, please wait..
    </div>
    <div class="alert error-message text-white" v-show="showError">
      {{ errorMessage }}
    </div>

    <div v-show="!isLoading&&!showStats&&!showError">

      <!--Userprofile-->
      <div class="text-7xl mx-auto font-thin text-center p-5">{{ this.$store.getters.getName }}:</div>
      <div class="container flex bg-white flex-wrap  mx-auto md:max-w  justify-center rounded card max-w-lg p-5 m-3">

        <img :src="this.$store.getters.getUserImage " alt="userimage"
             class="rounded-full border-solid border-white  pt-10 h-1/2">


        <div class="text-center px-3 pb-6 pt-2 p-10">
          <h3 class="text-black text-sm bold font-sans text-2xl">{{ this.$store.getters.getName }}</h3>
          <p class="mt-2 font-sans font-light text-black bg:bg-green-600"> Zu allem bereit, zu nichts zu
                                                                           gebrauchen..</p>
          <p class="italic underline mt-2 p-5 text-gray-700" @click="changePage" v-show="existingRecords">Show played
                                                                                                          games</p>
        </div>
      </div>
      <div class="alert error-message text-white" v-show="!existingRecords">
        {{ errorMessage }}
      </div>
      <!--LineChart-->
      <div class="container flex bg-white flex-wrap  mx-auto md:max-w  justify-center rounded card max-w-lg p-5 m-3"
           v-show="existingRecords">
        <h1 class="text-3xl submit object-center pb-5">Last 5 games:</h1>
        <line-chart class="bg-white" empty="No data" loading="Loading..." id="lastgames-chart"
                    :data="{5:[userScores[0]],4:[userScores[1]],3:[userScores[2]],2:[userScores[3]], 1:[userScores[4]]  }"></line-chart>
        <div v-show="showError">{{ errorMessage }}</div>
      </div>

      <!--Pie-Chart-->
      <div class="container flex bg-white flex-wrap  mx-auto md:max-w  justify-center rounded card max-w-lg p-5 m-3"
           v-show="existingRecords">
        <h1 class="text-3xl submit object-center pt-20">{{ this.$store.getters.getName }} stats:</h1>
        <pie-chart empty="No data" loading="Loading..."
                   :data="[['Won', wonGames],['Lost', lostGames], ['Draw', drawGames]]"></pie-chart>
        <div class="text-xl p-6 font-mono">Average Score: {{ averageScore }} (last {{ gamesTotal }} games)</div>
        <div class="text-xl p-6 font-mono">Lost: {{ lostGames }}/{{ gamesTotal }}</div>
        <div class="text-xl p-6 font-mono">Won: {{ wonGames }}/{{ gamesTotal }}</div>
        <div class="text-xl p-6 font-mono ">Draw: {{ drawGames }}/{{ gamesTotal }}</div>
        <h2 v-show="existingRecords">
          <button @click="changePage"
                  class="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full mb-4 ">
            Game history
          </button>
        </h2>
      </div>
    </div>


    <!--  Second page with played games-->
    <div v-show="showStats&&!showError">
      <div class="text-7xl mx-auto font-thin text-center p-5">Last {{ this.gamesTotal }} games:</div>
      <div class="container flex flex-wrap md:max-w p-4 justify-center rounded card">
        <div class="bg-white p-8 m-1 bg-white shadow-2xl hover:bg-gray-300" v-for="(game) in playedGamesList">
          <p class="text-center font-thin text-4xl text-grey-darker text-xl font-mono font-bold">
            {{ (this.formatDate(game.timeStamp)) }}</p>
          <div class="text-black font-bold text-xl italic text-right pb-3">You vs. {{ game.opponent.userName }}</div>
          <img class="max-h-36  rounded-full   block mx-auto " v-bind:src="this.imageRoot+game.opponent.userName"
               alt="opponentImage">
          <p class="text-grey-darker text-xl font-mono font-bold mt-5">Opponents Score: {{ game.opponentScore }}</p>
          <p class="text-grey-darker text-xl font-mono font-bold">Your score: {{ game.userScore }}</p>
        </div>
      </div>

      <div class="flex pb-5">
        <button @click="changePage"
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
import moment from "moment";

export default {
  computed: {
    // ...authComputed

  },
  name: "Profil",
  data() {
    return {
      userName: this.$store.state.username,
      showStats: false,
      userImage: this.$store.state.currentUserImage,
      isLoading: true,
      playedGamesList: [],
      imageRoot: IMAGE_ROOT,
      averageScore: 0,
      lostGames: 5,
      wonGames: 5,
      drawGames: 0,
      gamesTotal: 0,
      userScores: [],
      showError: false,
      errorMessage: "Something didnt work..",
      existingRecords: true,

    }
  },
  mounted() {
//Get played-games data for second page
    axios.get('http://localhost:8080/playedGames').then(response => {
      console.log(response.data)
      this.isLoading = false;
      this.wonGames = response.data.wonGames;
      this.lostGames = response.data.lostGames;
      this.averageScore = response.data.averageScore;
      this.drawGames = response.data.drawGames;
      this.gamesTotal = response.data.playedGames.length;
      this.showError = false;
      for (let i = 0; i < response.data.playedGames.length; i++) {
        //push the last 5 values into a separate array - to use them for the line chart
        this.userScores.push(response.data.playedGames[i].userScore);
      }
      this.playedGamesList = response.data.playedGames;
    }).catch((error) => {
      this.isLoading = false;
      this.showError = true;
      this.existingRecords = false;
      const code = error.response.status;
      if (code === 400) {
        this.errorMessage = "No records found"
      } else {
        this.errorMessage = error;
      }
    })
  },

  methods: {
    // Change from profile to gamestats and back
    changePage() {
      this.showStats = !this.showStats;
    },
    formatDate(input) {
      moment.locale('de')
      return moment(input).format('LLL');
    }
  }
}
</script>
