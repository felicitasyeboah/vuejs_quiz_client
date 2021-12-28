<template>
  <body class="body-bg2 min-h-screen pt-12 md:pt-20 pb-6 px-2 md:px-0">
  <Header />
  <main class="bg-white max-w-2xl mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
    <h2 class="border-dashed">Highscore</h2>

    <div class="nav border-2" id="table">

      <li>
        <div class="mb-20" v-for="entry in scores" :key="entry">{{ entry }}</div>
      </li>
      <li>
        <div class="mb-20" v-for="entry in usernames" :key="entry">{{ entry }}</div>
      </li>
      <li>
        <div class="mb-20" v-for="entry in times" :key="entry">{{ entry }}</div>
      </li>
      <li>
        <div class="mb-10" v-for="entry in images" :key="entry"><img v-bind:src="entry" alt="picture"
                                                                     class="max-h-10 rounded"></div>
      </li>

    </div>


  </main>

  </body>
</template>

<script>
import axios from "axios";
import Header from "@/components/Header";
import {image_root} from "@/assets/constants";


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


    }
  },
  // Gets highscores for the table
  mounted() {
    axios.get('http://localhost:8080/highscore').then(resp => {
      console.log(resp)


      for (var i = 0; i < resp.data.length; i++) {

        // this.results.push(resp.data[i].userScore, resp.data[i].user.userName, image_root + resp.data[i].user.profileImage,  resp.data[i].timeStamp)
        this.usernames.push(resp.data[i].user.userName);
        this.images.push(image_root + resp.data[i].user.profileImage);
        this.scores.push(resp.data[i].userScore);

        var arr2 = resp.data[i].timeStamp.split("T");
        this.times.push(arr2[0])


      }
      console.log(this.usernames)
      var bspdatum = resp.data[1].timeStamp

      new Date(Date.parse(resp.data[1].timeStamp))

      console.log(bspdatum)


// -> Wed Jun 09 2010 14:12:01 GMT+0100 (BST)
      // Nur zur Kontrolle:
      /*      console.log(resp.data[0].user.userName);
            console.log(resp.data[0].user.profileImage);
            console.log(resp.data[0].userScore);*/

      /*     console.log("highscore:" + this.highscore[0].user.userName)
           console.log("images"+this.images)
           console.log("usernames"+this.usernames)*/


    }).catch(e => {
      console.log('Error', e);
    });

  },

  methods: {}


}
</script>
<style>
#table {
  display               : grid;
  grid-template-columns : repeat(4, 1fr);
  }

ul {
  list-style-type  : none;
  width            : max-content;
  background-color : #333333;
  }

li {

  list-style   : none;
  margin-right : 10px;
  padding      : 5px 10px;
  background   : #fff;
  }
</style>
