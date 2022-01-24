<template>
  <div v-if="!this.$store.state.user">

    <span class="alert text-3xl" role="alert">
      Please login.
    </span></div>
  <div v-else>

    <div v-show="!showStats">



      <div class="body-bg2  flex justify-center p-32">


        <a href="#"
           class="block p-6 max-w-lg bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <div class="flex justify-center ">
            <img :src="this.imageRoot+this.userImage" alt="userimage"
                 class="rounded-full border-solid border-white  pt-10 h-1/2">
          </div>
          <div class="text-center px-3 pb-6 pt-2 p-10">
            <h3 class="text-black text-sm bold font-sans text-2xl">{{ userName }}</h3>
            <p class="mt-2 font-sans font-light text-black"> Zu allem bereit, zu nichts zu gebrauchen..</p></div>


          <h1>Last 5 games:</h1>
          <line-chart id="lastgames-chart"
                      :data="{5:[this.userScores[0]],4:[this.userScores[1]],3:[this.userScores[2]],2:[this.userScores[3]], 1:[this.userScores[4]]  }"></line-chart>
        </a>


        <a href="#"
           class="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

          <div class="text-center">
            <div class="error-message" v-if="showError">
              {{ errorMessage }}
            </div>
            <h1 class="text-3xl submit object-center pt-20">{{ userName }} stats:</h1>
            <pie-chart :data="[['Won', this.wonGames],['Lost', this.lostGames], ['Draw', this.drawGames]]"></pie-chart>
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
        </a>

        </div>
      </div>
    </div>


  <div v-show="showStats">
    <div class="body-bg3 bg-fixed">


      <!--              <a href="#" class="w-1/3 block bg-gray-200 p-6   rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700" v-for="(game, index) in playedgamelist">-->
      <!--                <div class="rounded-3xl overflow-hidden shadow-xl  my-3 bg-white ">-->
      <!--                <h2 class="text-xl font-sans"> {{ dates[index] }}</h2>-->
      <!--                <h2 class="text-xl font-bold"> You vs. {{ game.opponent.userName }}</h2>-->

      <!--                <img v-bind:src="this.imageRoot+game.opponent.profileImage" alt="picture text"-->
      <!--                   class="rounded-full border-solid border-white  pt-10 h-1/2">-->
      <!--              <h2 class="text-red-900">-->
      <!--                Opponents Score: {{ game.opponentScore }}</h2>-->

      <!--                Your score: {{ game.userScore }}-->
      <!--              </div>-->

      <!--  <div class="xl:flex mb-4 m-10 rounded    items-center justify-start" v-for="(game, index) in playedgamelist">-->

      <!--    <div class="w-full lg:w-1/3 rounded overflow-hidden shadow-lg m-10 relative flex flex-col">-->
      <!--        <img class="block h-auto   flex-none bg-white h-24" v-bind:src="this.imageRoot+game.opponent.profileImage">-->
      <!--        <div class="bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">-->
      <!--          <div class="text-black font-bold text-xl mb-2 leading-tight">You vs. {{ game.opponent.userName }}</div>-->
      <!--          <p class="text-grey-darker text-xl font-mono font-bold">{{ dates[index] }}</p>-->
      <!--          <p class="text-grey-darker text-xl font-mono font-bold">Opponents Score: {{ game.opponentScore }}</p>-->
      <!--          <p class="text-grey-darker text-xl font-mono font-bold">Your score: {{ game.userScore }}</p>-->
      <!--        </div>-->
      <!--      </div>-->

      <!--    </div>-->

      <div class="text-7xl mx-auto font-thin text-center p-5">Last 20 games:</div>
      <div class="container flex flex-wrap md:max-w p-4 justify-center rounded card">

        <div class="bg-white p-8 m-1 bg-white shadow-2xl hover:bg-gray-300" v-for="(game, index) in playedgamelist">

          <p class="text-center font-thin text-4xl text-grey-darker text-xl font-mono font-bold">{{ dates[index] }}</p>

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


    }
  },
  mounted() {
    //Gets the current User-Picture
    this.userName = localStorage.getItem('userName')
    axios.get('http://localhost:8080/user').then(resp => {
      console.log(resp.data)
      this.$store.commit('setUserImage', resp.data.profileImage);
      this.userImage = resp.data.profileImage
    }).catch(e => {
      console.log('Error', e);
      this.errorMessage = err.response.data.error
      this.showError = true
    });


//Get played-games data for second page
    axios.get('http://localhost:8080/playedGames').then(resp => {
      console.log(resp.data)
      this.wonGames = resp.data.wonGames;
      this.lostGames = resp.data.lostGames;
      this.averageScore = resp.data.averageScore;
      this.drawGames = resp.data.drawGames;


      for (var i = 0; i < resp.data.playedGames.length; i++) {

        //push the values into separate arrays
        this.dates.push(this.formatDate(resp.data.playedGames[i].timeStamp));
        this.userScores.push(resp.data.playedGames[i].userScore);

      }
      console.log(this.dates)
      console.log(this.userScores)
      this.playedgamelist = resp.data.playedGames;
      // const obj =;
    }).catch(e => {
      console.log('Error', e);
      this.errorMessage = err.response.data.error
      this.showError = true
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
