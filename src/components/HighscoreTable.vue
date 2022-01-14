<template>
  <!--  https://tailwind-elements.com/docs/standard/components/charts/ nochmal anschauen-->
  <div class="body-bg2 min-h-screen pt-12 md:pt-20 pb-6 px-2 md:px-0">
    <Header />

    <template v-if="!isLoading">
      <main class="bg-white max-w-4xl mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
        <h2 class="border-dashed font-serif text-3xl submit">Highscore</h2>
        <div class="submit object-center">
          <img v-bind:src=images[0] alt="userimage" class="rounded max-h-20 rounded-full bg-yellow-200 text-red-50 m-3"
               id="number1">{{ usernames[0] }}
          <div class="nav border-2" id="table">
            <li>
              <div class="m-10 font-mono text-xl" v-for="entry in places" :key="entry">{{ entry }}</div>
            </li>
            <li>
              <div class="m-10 font-mono text-xl" v-for="entry in usernames" :key="entry">{{ entry }}</div>
            </li>
            <li>
              <div class="m-10 font-mono text-xl font-extrabold" v-for="entry in scores" :key="entry">{{ entry }}</div>
            </li>
            <li>
              <div class="m-10 font-mono text-xl" v-for="entry in times" :key="entry">{{ entry }}</div>
            </li>
            <!--      Userbilder passen von der Größe her nicht-->
            <!--      <li>-->
            <!--        <div class="mb-10" v-for="entry in images" :key="entry"><img v-bind:src="entry" alt="picture"-->
            <!--                                                                     class="max-h-10 rounded"></div>-->
            <!--      </li>-->
          </div>
        </div>
      </main>
    </template>
    <div class="max-w-lg mx-auto text-center mt-12 mb-6 ">
      <div class="alert text-3xl" role="alert" v-show="isLoading">
        Please login.
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Header from "@/components/Header";
import {IMAGE_ROOT} from "@/assets/constants";


export default {
  components: {Header},
  data() {
    return {
      highscore: [],
      data: [],
      results: [],
      usernames: [],
      images: [],
      scores: [],
      times: [],
      places: ["1.", "2.", "3.", "4.", "5."],
      isLoading: true,
    }
  },
  // Gets highscores for the table
  mounted() {
    axios.get('http://localhost:8080/highscore').then(resp => {
      console.log(resp)
      this.isLoading = false

      // Geht bestimmt alles besser und viel eleganter, weiß nur (bisher) nicht wie
      for (var i = 0; i < resp.data.length; i++) {

        //push the values into separate arrays
        this.usernames.push(resp.data[i].user.userName);
        this.images.push(IMAGE_ROOT + resp.data[i].user.profileImage);
        this.scores.push(resp.data[i].userScore);

        // Format date to day.month.year
        var dateObj = new Date(resp.data[i].timeStamp);
        var month = dateObj.getUTCMonth() + 1;
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();
        var finaleDate = day + "." + month + "." + year
        this.times.push(finaleDate)
      }
    }).catch(e => {
      console.log('Error', e);
    });
  },

}
</script>
