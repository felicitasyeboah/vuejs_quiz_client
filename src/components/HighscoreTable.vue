<template>

  <div class="body-bg2 min-h-screen  pt-12 md:pt-20 pb-6 px-2 md:px-0">
    <Header />
    <div class="max-w-lg mx-auto text-center mt-12 mb-6 ">
      <div class="alert text-3xl" role="alert" v-show="!isLoading">
        Loading data, please wait..
      </div>
      <div class="alert error-message text-white" v-show="showError">
        {{ errorMessage }}
      </div>
    </div>


    <div class="container  flex justify-center mx-auto pt-5" v-show="isLoading&&!showError">
      <div class="flex flex-col">
        <div class=" w-full">
          <div class="border-b border-gray-200 bg-gray-50 hover:bg-green-600 shadow">
            <table class="divide-y divide-gray-300 ">
              <div class="bg-gray-300 m-1 shadow-2xl hover:bg-gray-200">
                <h1 class="text-center text-3xl font-thin uppercase">
                  <svg class="h-20 w-20 mx-auto" width="24" height="24" viewBox="0 0 24 24" stroke-width="2"
                       stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                    <line x1="7" y1="4" x2="17" y2="4" />
                    <path d="M17 4v8a5 5 0 0 1 -10 0v-8" />
                    <circle cx="5" cy="9" r="2" />
                    <circle cx="19" cy="9" r="2" />
                  </svg>
                  Highscores:
                </h1>
                <tbody class="bg-white divide-y divide-gray-300" v-for="(highscore, index) in highscorelist">
                <tr class="whitespace-nowrap">
                  <td class="px-6 py-4 text-xl font-bold text-gray-500">
                    {{ ranks[index] }}
                  </td>
                  <td class="px-6 py-4">
                    <div class="text-xl uppercase text-gray-900">
                      {{ this.highscorelist[index].user.userName }}
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <div class=" text-black font-mono font-bold score hover:text-3xl"
                         :class="index > 0 ? 'otherranks' : 'firstrank'">{{ this.highscorelist[index].userScore }}
                    </div>
                  </td>
                  <td class="px-6 py-4  italic text-gray-500">
                    {{ (this.formatDate(this.highscorelist[index].timeStamp)) }}
                  </td>

                  <td class="px-6 py-4">
                    <div class="px-4 py-1 rounded-full"><img
                        v-bind:src="this.imageRoot+highscorelist[index].user.profileImage"
                        class="object-cover w-32 h-32 rounded-full mx-auto"

                        alt="Avatar"
                    /></div>
                  </td>

                </tr>

                </tbody>
              </div>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Header from "@/components/Header";
import {IMAGE_ROOT} from "@/assets/constants";
import moment from "moment";


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
      ranks: ["1.", "2.", "3.", "4.", "5."],
      isLoading: false,
      showError: false,
      errorMessage: "Oh no.. something didnt work",
      highscorelist: [],
      dates: [],
      imageRoot: IMAGE_ROOT,
    }
  },
  // Gets highscores for the table
  mounted() {
    axios.get('http://localhost:8080/highscore').then(resp => {
      console.log(resp)
      this.isLoading = true;
      this.showError = false;
      this.highscorelist = resp.data
      console.log(this.highscore)
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
    formatDate(input) {
      moment.locale('en')
      return moment(input).fromNow();
      // moment(input).format('LLL');
    }
  }
}
</script>
