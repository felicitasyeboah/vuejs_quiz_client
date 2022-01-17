<template>

  <div v-if="$store.state.result==1">

    <div id="bodywinner" class="wrapper p-40  d-flex flex-column justify-content-center w-100 h-100 ">

      <div
          class="d-flex flex-column justify-content-center align-items-center hover:shadow-2xl transition duration-500 transform hover:scale-105 cursor-pointer">


        <img src="../assets/winner.jpg" alt="winner image"
             class="w-full object-cover object-center rounded-lg shadow-md">

        <div class="relative px-4 -mt-16  ">
          <div class="bg-white p-6 rounded-lg shadow-lg">
            <div class="flex items-baseline ">
      <span
          class="bg-yellow-300 text-teal-800 text-xs px-2 inline-block rounded-full  uppercase font-semibold tracking-wide">
        Grats
      </span>
              <div v-show="this.$store.state.newhighscore" class="font-extrabold pl-6"><span
                  class="inline-block py-1.5 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-blue-600 text-white rounded">New</span>HIGHSCORE:

                                                                                                                                                                  {{
                  this.$store.getters.getUserScore
                                                                                                                                                                  }}

              </div>

              <div v-show="!this.$store.state.newhighscore"
                   class="ml-2 text-gray-600 uppercase text-xs font-semibold tracking-wider">
                Another great victory
              </div>
            </div>
            <p class="py-6 text-5xl text-red-900 uppercase tracking-wide font-extrabold">Okay, you won</p>
            <h4 class="mt-1 text-xl font-semibold uppercase leading-tight truncate">Best day ever..</h4>

            <div class="mt-1">
              Your score:
              <span class="text-gray-600 text-sm">  {{ this.$store.getters.getUserScore }}</span>
            </div>
            <div class="mt-1">
              {{ this.$store.getters.getOpponentName }}
              <span class="text-gray-600 text-sm">  {{ this.$store.getters.getOpponentScore }} </span>
            </div>
            <div class="mt-4">
              <span class="text-teal-600 text-md font-semibold"> <span class="text-sm text-gray-600"><button
                  class="bg-green-600 hover:bg-green-800 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
                  @click="playagain">Play again</button>
</span>

        </span>


            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="$store.state.result==2">
    <div id="bodyloser" class="wrapper p-60 d-flex flex-column justify-content-center w-100 h-100 ">

      <div
          class="d-flex flex-column justify-content-center align-items-center hover:shadow-2xl transition duration-500 transform hover:scale-105 cursor-pointer">


        <img src="../assets/loser.jpg" alt="random imgee"
             class="w-full object-cover object-center rounded-lg shadow-md">

        <div class="relative px-4 -mt-16  ">
          <div class="bg-white p-6 rounded-lg shadow-lg">
            <div class="flex items-baseline ">
      <span
          class="bg-red-500 text-teal-800 text-xs px-2 inline-block rounded-full  uppercase font-semibold tracking-wide">
        Ouch
      </span>
              <div class="ml-2 text-gray-600 uppercase text-xs font-semibold tracking-wider">
                I'm a loser baby, so why don't you kill me?
              </div>
            </div>
            <p class="py-6 text-5xl text-red-900 uppercase tracking-wide font-extrabold">You lost</p>
            <h4 class="mt-1 text-xl font-semibold uppercase leading-tight truncate">It wasn't even close</h4>

            <div class="mt-1">
              Your score:
              <span class="text-gray-600 text-sm">  {{ this.$store.getters.getUserScore }} </span>
            </div>
            <div class="mt-1">
              {{ this.$store.getters.getOpponent }} score:
              <span class="text-gray-600 text-sm">  {{ this.$store.getters.getOpponentScore }} </span>
            </div>
            <div class="mt-4">
              <span class="text-teal-600 text-md font-semibold"> <span class="text-sm text-gray-600"><button
                  class="bg-green-600 hover:bg-green-800 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
                  @click="playagain">Play again
        </button></span> </span>

            </div>
          </div>
        </div>

      </div>
    </div>


  </div>

  <div v-if="$store.state.result==3">
    <div id="bodydraw" class="wrapper p-40  d-flex flex-column justify-content-center w-100 h-100 ">

      <div
          class="d-flex flex-column justify-content-center align-items-center hover:shadow-2xl transition duration-500 transform hover:scale-105 cursor-pointer">


        <img src="../assets/draw.jpg" alt="random imgee" class="w-full object-cover object-center rounded-lg shadow-md">

        <div class="relative px-4 -mt-16  ">
          <div class="bg-white p-6 rounded-lg shadow-lg">
            <div class="flex items-baseline ">
      <span
          class="bg-red-500 text-teal-800 text-xs px-2 inline-block rounded-full  uppercase font-semibold tracking-wide">
        Zzz
      </span>
              <div class="ml-2 text-gray-600 uppercase text-xs font-semibold tracking-wider">
                The excitement never stops.. zzz
              </div>
            </div>
            <p class="py-6 text-5xl text-red-900 uppercase tracking-wide font-extrabold">No winner</p>
            <h4 class="mt-1 text-xl font-semibold uppercase leading-tight truncate">Boring..</h4>

            <div class="mt-1">
              Your score:
              <span class="text-gray-600 text-sm">  {{ this.$store.getters.getUserScore }} </span>
            </div>
            <div class="mt-1">
              {{ this.$store.getters.getOpponentName }}:
              <span class="text-gray-600 text-sm">  {{ this.$store.getters.getOpponentScore }} </span>
            </div>
            <div class="mt-4">
              <span class="text-teal-600 text-md font-semibold"> <span class="text-sm text-gray-600"><button
                  class="bg-green-600 hover:bg-green-800 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
                  @click="playagain">Play again
        </button></span> </span>

            </div>
          </div>
        </div>

      </div>
    </div>


  </div>


</template>
<script>


export default {


  name: "Result",

  data() {
    return {
      userName: this.$store.state.username,
      yourscore: 5432,
      oppscore: 2000,
      result: 0,
      newhighscore: true,
    }
  },
  methods: {
    resultau() {
      this.result = this.result + 1;
      console.log(this.result);
    },
    goToGame() {
      this.$router.push('/game');


    }

  }
}
</script>
<style>

.wrapper {
  display     : grid;
  height      : 100vh;
  place-items : center
  }


</style>
