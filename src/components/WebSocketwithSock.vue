<template>
  <!--  <a class="block overflow-hidden shadow-xl rounded-3xl" href="">-->
  <!--    <img-->
  <!--        class="object-cover w-full h-64"-->
  <!--        src="../assets/question1.jpg"-->
  <!--        alt="fragenbild"-->
  <!--    />-->
  <!--Connected: {{$store.state.isConnected}}-->
  <!--  Ready to play {{$store.state.isReady}} {{readyToPlay}}-->
  <!--  OppFound: {{$store.state.oppfound}} {{oppfound}}-->
  <div class="w-full body-bg2 min-h-screen bg-gray-50 flex flex-col sm:justify-center items-center pt-6 sm:pt-0">
    <div class="w-full p-5 mx-auto">
      User: {{ this.$store.getters.getUserScore }}
      Opponent: {{ this.$store.getters.getOpponentScore }}

      <!--        PlayButton-->

      <div v-if="!$store.getters.getIsConnected">
        <h2 class="mb-6 text-center text-5xl font-extrabold pt-10">Welcome.</h2>

        <div class="wrapper" @click="connect">
          <a class="cta" href="#">
            <span>PLAY</span><span>
      <svg width="66px" height="43px" viewBox="0 0 66 43" version="1.1" xmlns="http://www.w3.org/2000/svg"
           xmlns:xlink="http://www.w3.org/1999/xlink">
        <g id="arrow" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <path class="one"
                d="M40.1543933,3.89485454 L43.9763149,0.139296592 C44.1708311,-0.0518420739 44.4826329,-0.0518571125 44.6771675,0.139262789 L65.6916134,20.7848311 C66.0855801,21.1718824 66.0911863,21.8050225 65.704135,22.1989893 C65.7000188,22.2031791 65.6958657,22.2073326 65.6916762,22.2114492 L44.677098,42.8607841 C44.4825957,43.0519059 44.1708242,43.0519358 43.9762853,42.8608513 L40.1545186,39.1069479 C39.9575152,38.9134427 39.9546793,38.5968729 40.1481845,38.3998695 C40.1502893,38.3977268 40.1524132,38.395603 40.1545562,38.3934985 L56.9937789,21.8567812 C57.1908028,21.6632968 57.193672,21.3467273 57.0001876,21.1497035 C56.9980647,21.1475418 56.9959223,21.1453995 56.9937605,21.1432767 L40.1545208,4.60825197 C39.9574869,4.41477773 39.9546013,4.09820839 40.1480756,3.90117456 C40.1501626,3.89904911 40.1522686,3.89694235 40.1543933,3.89485454 Z"
                fill="#FFFFFF"></path>
          <path class="two"
                d="M20.1543933,3.89485454 L23.9763149,0.139296592 C24.1708311,-0.0518420739 24.4826329,-0.0518571125 24.6771675,0.139262789 L45.6916134,20.7848311 C46.0855801,21.1718824 46.0911863,21.8050225 45.704135,22.1989893 C45.7000188,22.2031791 45.6958657,22.2073326 45.6916762,22.2114492 L24.677098,42.8607841 C24.4825957,43.0519059 24.1708242,43.0519358 23.9762853,42.8608513 L20.1545186,39.1069479 C19.9575152,38.9134427 19.9546793,38.5968729 20.1481845,38.3998695 C20.1502893,38.3977268 20.1524132,38.395603 20.1545562,38.3934985 L36.9937789,21.8567812 C37.1908028,21.6632968 37.193672,21.3467273 37.0001876,21.1497035 C36.9980647,21.1475418 36.9959223,21.1453995 36.9937605,21.1432767 L20.1545208,4.60825197 C19.9574869,4.41477773 19.9546013,4.09820839 20.1480756,3.90117456 C20.1501626,3.89904911 20.1522686,3.89694235 20.1543933,3.89485454 Z"
                fill="#FFFFFF"></path>
          <path class="three"
                d="M0.154393339,3.89485454 L3.97631488,0.139296592 C4.17083111,-0.0518420739 4.48263286,-0.0518571125 4.67716753,0.139262789 L25.6916134,20.7848311 C26.0855801,21.1718824 26.0911863,21.8050225 25.704135,22.1989893 C25.7000188,22.2031791 25.6958657,22.2073326 25.6916762,22.2114492 L4.67709797,42.8607841 C4.48259567,43.0519059 4.17082418,43.0519358 3.97628526,42.8608513 L0.154518591,39.1069479 C-0.0424848215,38.9134427 -0.0453206733,38.5968729 0.148184538,38.3998695 C0.150289256,38.3977268 0.152413239,38.395603 0.154556228,38.3934985 L16.9937789,21.8567812 C17.1908028,21.6632968 17.193672,21.3467273 17.0001876,21.1497035 C16.9980647,21.1475418 16.9959223,21.1453995 16.9937605,21.1432767 L0.15452076,4.60825197 C-0.0425130651,4.41477773 -0.0453986756,4.09820839 0.148075568,3.90117456 C0.150162624,3.89904911 0.152268631,3.89694235 0.154393339,3.89485454 Z"
                fill="#FFFFFF"></path>
        </g></svg></span>
          </a>
        </div>
      </div>


      <!--      Looking for other players-->
      <div v-if="$store.getters.getIsConnected&&!this.readyToPlay" class="container">

        <h2 class="mb-6 text-center text-5xl font-extrabold pt-52">{{ this.step2msg }}</h2>
        <div class="between">
          <button
              class="bg-green-600 hover:bg-green-800 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
              @click="sendToken">Yes, please
          </button>


          <button
                class="bg-red-600 hover:bg-red-800 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
                @click="disconnect"> No way
            </button>
            <div v-show="loading"
                 class="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
              <div class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
              <div v-show="!oppfound">
                <h2 class="text-center text-white text-3xl font-semibold">Looking for another player..</h2>
                <p class=" text-center text-white">Please wait</p></div>
              <div v-show="oppfound">
                <h2 class="text-center text-white text-3xl font-semibold">Match found! Get ready!</h2>
                <p class=" text-center text-white center text-3xl">{{ this.startTimer }}</p>
              </div>
            </div>

          </div>

      </div>
    </div>
    <!--      Main game-->
    <div v-if="$store.getters.getIsConnected && this.readyToPlay">


      <div class="score text-xl text-gray-700 text-right pr-3.5">Your score: {{
          this.$store.getters.getUserScore
                                                                 }}
      </div>
      <div class="score text-xl text-gray-700 text-right pr-3.5">{{ this.$store.getters.getOpponentName }}:
                                                                 {{ this.$store.getters.getOpponentScore }}
      </div>
      <div class="flex items-center justify-center">
        <div class="bg-slate-800 flex flex-col items-center pb-3.5">
          <div class="italic">
            {{ this.$store.state.question.category }}
          </div>
        </div>
      </div>
      <!--<img src="../assets/question2.jpg" class="object-cover h-48 w-96">-->
      <!--            <img src="../assets/logowbg.png" class="w-1/4"></div>-->
      <div id="question" class="mb-12 text-center text-5xl">
        {{ this.$store.state.question.text }}
      </div>

      <div id="questionsandanswers">

        <div class="time pb-3.5 center border-0" id="clock">{{ timer }}</div>
        <div id="answer1" :class="{ activ: isActive1 }"
             class="answer mb-6 p-3 mr-3 ml-3 text-center font-thin text-4xl  h-2/3 text-gray-700 hover:bg-gray-300 shadow-xl bg-gray-100 hover:text-gray-500 select-all cursor-pointer"
             v-on:click="sendAnswerText(this.$store.getters.getAnswer1),isActive1=true">A. {{
            this.$store.getters.getAnswer1
                                                                                        }}
        </div>
        <div id="answer2" :class="{ activ: isActive2 }"
             class="answer mb-6 p-3 mr-3 ml-3 text-center font-thin text-4xl  h-2/3 text-gray-700 hover:bg-gray-300 shadow-xl bg-gray-100 hover:text-gray-500 select-all cursor-pointer"
             v-on:click="sendAnswerText(this.$store.getters.getAnswer2),isActive2=true">B. {{
            this.$store.getters.getAnswer2
                                                                                        }}
        </div>
        <div id="answer3" :class="{ activ: isActive3 }"
             class="answer mb-6 p-3 mr-3 ml-3 text-center font-thin text-4xl  h-2/3 text-gray-700 hover:bg-gray-300 shadow-xl bg-gray-100 hover:text-gray-500 select-all cursor-pointer"
             v-on:click="sendAnswerText(this.$store.getters.getAnswer3),isActive3=true">C. {{
            this.$store.getters.getAnswer3
                                                                                        }}
        </div>
        <div id="answer4" :class="{ activ: isActive4 }"
             class="answer mb-6 p-3 mr-3 ml-3 text-center font-thin text-4xl  h-2/3 text-gray-700 hover:bg-gray-300 shadow-xl bg-gray-100 hover:text-gray-500 select-all cursor-pointer"
             v-on:click="sendAnswerText(this.$store.getters.getAnswer4),isActive4=true">D. {{
            this.$store.getters.getAnswer4
                                                                                        }}
        </div>
        <div class="center">
          <button
              class="text-right bg-red-600 hover:bg-red-800 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
              @click="checkWinner"> Leave game
          </button>
        </div>
      </div>
    </div>
  </div>

</template>


<script>

import Stomp from "stompjs";

import SockJS from 'sockjs-client';
import store from "../vuex/store";


import {
  CONNECTED,
  DISCONNECT,
  GAME_MESSAGE,
  MESSAGE,
  QUESTION_TIMER_MESSAGE,
  RESULT_MESSAGE,
  SCORE_MESSAGE,
  SCORE_TIMER_MESSAGE,
  START_TIMER_MESSAGE,
  STOMP_ENDPOINT,
  WEBSOCKET_IP,
  WS_URL
} from "@/assets/constants";


// import {messageUtils} from "@/utils";


export default {
  computed: {
    question() {
      return this.$store.state.question;
    }
  },
  name: "WebSocketwithSock",
  data() {
    return {
      // question: {
      //   category: this.$store.state.question.category,
      //   text: this.$store.getters.getQuestionText,
      //   answer1: null,
      //   answer2: null,
      //   answer3: null,
      //   answer4: null,
      //   correctAnswer: null,
      // },
      step: 0,
      readyToPlay: false,
      loading: false,
      step2msg: "Ready to look for another player?",
      received_messages: [],
      token: localStorage.getItem('token'),
      setConnected: false,
      ws_url: WEBSOCKET_IP,
      ws_ip: WS_URL + STOMP_ENDPOINT,
      msg: "token:" + this.token,
      stompClient: null,
      header: {token: localStorage.getItem('token')},
      connection: null,
      status: "Wird gesucht",
      oppfound: false,
      connected: this.$store.state.isConnected,
      timer: this.$store.getters.getTimer,
      list2: [],
      messages: [],
      givenAnswer: "",
      currentUser: this.$store.state.user,
      resultMsg: null,
      startTimer: 3,
      isActive1: false,
      isActive2: false,
      isActive3: false,
      isActive4: false,
    }
  },

  // this.stompClient.onmessage = function (message) {
  //   this.messageHandler(message);
  //   afterOnMessage(message);
  // };
  /* eslint-disable */



  created() {

    // {"category":"Wissenschaft","question":"Wie viel Meter legt man zurück, während man im Auto bei 120 km/h für drei " +
    // "Sekunden auf sein Handy schaut?","answer1":"knapp 30 Meter","answer2":"ungefähr 15 Meter",
    //     "answer3":"etwa 50 Meter","answer4":"rund 100 Meter","correctAnswer":4,
    //     "user":{"userName":"Martine","profileImage":"default10.png"},
    //   "opponent":{"userName":"CandyMountain","profileImage":"default3.png"},"userScore":0,
    //     "opponentScore":0,"type":"GAME_MESSAGE"}


    // onmessage = function (message) {
    //   this.stompClient.onmessage = this.handleMessage


  },


  methods: {
    stepsau() {
      this.step = this.step + 1;
      console.log(this.step);
    },
    connect() {
      this.socket = new SockJS("http://localhost:8080/websocket");
      this.stepsau()
      this.stompClient = Stomp.over(this.socket);
      this.stompClient.connect(
          {},
          frame => {

            console.log(frame);
            this.$store.commit('setSocketIsConnected', true);

            console.log("store" + this.$store.getters.getIsConnected)
            console.log("Status:" + this.connected)
            this.updateSocketStatus(true)
            this.stompClient.subscribe('/user/topic/game', this.msgHandler);
          },
          error => {
            console.log(error);
            this.connected = false;
          }
      );
    },
    checkWinner() {
      console.log("current User:" + this.currentUser)
      console.log("winner" + this.$store.getters.getWinner)
      console.log(this.$store.getters.getOpponentName)
      if (this.$store.getters.getWinner === this.$store.getters.getOpponentName) {
        this.resultMsg = "You lost";
        this.$store.commit('setResult', 2);
        this.goToResult();
      } else if (this.$store.getters.getWinner === this.currentUser) {
        this.resultMsg = "You have won";
        this.$store.commit('setResult', 1);
        this.goToResult();
      } else {
        this.resultMsg = "Draw";
        this.$store.commit('setResult', 3);
        this.goToResult();
      }
    },

    msgHandler(message) {
      const messageCommand = message.command;
      const messageType = message.headers.type;
      if (messageCommand === MESSAGE) {

        const msg = JSON.parse(message.body);
        switch (messageType) {
          case START_TIMER_MESSAGE:
            this.oppfound = true;

            // {"timeLeft":2,"type":"START_TIMER_MESSAGE"}
            // this.$store.commit('setStartTimer', msg.timeLeft);
            this.startTimer = msg.timeLeft;

            // if (this.startTimer === 0) {
            //   this.oppfound = true;
            //   this.readyToPlay = true;
            // }
            break;
          case QUESTION_TIMER_MESSAGE:
            // {"timeLeft":1,"type":"QUESTION_TIMER_MESSAGE"}
            this.readyToPlay = true
            console.log("QUESTION_TIMER_MESSAGE erhalten")
            console.log("timeleft:" + msg.timeLeft);
            this.$store.commit('setTimer', msg.timeLeft);
            this.setTimer(msg.timeLeft)

            break
          case GAME_MESSAGE:
            this.gamestart = true;
            this.loading = false;
            this.resetSelectedAnswer();
            // {"category":"Wissenschaft","question":"Von wem stammt die Relativitätstheorie?",
            //     "answer1":"Stephen Hawking","answer2":"Nikola Tesla","answer3":"Albert Einstein",
            //     "answer4":"Marie Curie","correctAnswer":3,"user":{"userName":"Martine",
            //     "profileImage":"default10.png"},
            //   "opponent":{"userName":"CandyMountain","profileImage":"default3.png"},
            //   "userScore":0,"opponentScore":0,"type":"GAME_MESSAGE"}
            console.log("GAME_MESSAGE erhalten")
            this.$store.commit('setUserName', msg.user.userName);
            this.$store.commit('setOpponentImage', msg.opponent.profileImage);
            this.$store.commit('setOpponentName', msg.opponent.userName);
            this.$store.commit('setOpponentScore', msg.opponentScore);
            this.$store.commit('setUserScore', msg.userScore);
            this.$store.commit('setQuestionText', msg.question);
            this.$store.commit('setCategory', msg.category);
            this.$store.commit('setAnswer1', msg.answer1);
            this.$store.commit('setAnswer2', msg.answer2);
            this.$store.commit('setAnswer3', msg.answer3);
            this.$store.commit('setAnswer4', msg.answer4);
            this.$store.commit('setCorrectAnswer', msg.correctAnswer);


            //
            // this.question.category = msg.category;
            // this.question.answer1= msg.answer1;
            // console.log("HERE "+msg.category, msg.answer1, this.question.text, this.$store.getQuestion)

            // alert("Spiel zu ENDE")
            break
          case SCORE_MESSAGE:

            // {"user":{"userName":"Martine","profileImage":"default10.png"},
            // "opponent":{"userName":"CandyMountain","profileImage":"default3.png"},
            // "userScore":0,"opponentScore":0,"type":"SCORE_MESSAGE"}
            console.log("SCORE_MESSAGE")
            break
          case SCORE_TIMER_MESSAGE:
            // {"timeLeft":1,"type":"SCORE_TIMER_MESSAGE"}
            console.log("SCORE_TIMER_MESSAGE")
            break
          case RESULT_MESSAGE:
            console.log("winner is" + msg.winner.userName);
            console.log("highscore" + msg.isHighScore)
            // Messagebody:{"isHighScore":false,"winner":{"userName":"CandyMountain","profileImage":"50fa2d0c-70ed-4839-89c3-de5dfe246ff4.jpg"},
            //   "user":{"userName":"Martine","profileImage":"default10.png"},
            //   "opponent":{"userName":"CandyMountain","profileImage":"50fa2d0c-70ed-4839-89c3-de5dfe246ff4.jpg"},"" +
            //   "userScore":745,"opponentScore":919,"type":"RESULT_MESSAGE"}
            try {
              this.$store.commit('setWinner', msg.winner.userName);
            } catch (error) {
              this.$store.commit('setWinner', "none");
            }
            this.$store.commit('setOpponentScore', msg.opponentScore);
            this.$store.commit('setUserScore', msg.userScore);
            this.$store.commit('setHighscore', msg.isHighScore);
            this.checkWinner();
            this.goToResult();
            console.log("RESULT_MESSAGE erhalten")
            break
        }
        if (messageCommand === CONNECTED) {
          console.log("CONNECTED NOW")

        }
        if (messageCommand === DISCONNECT) {
          console.log("DISCONNECTED NOW")

        }
        if (message.body) {
          console.log("Messagebody:" + message.body)
          console.log("Time left:" + message.body.timeLeft)
        }
        console.log(message.command)//MESSAGE
      }
    },
    sendAnswer: function (event) {

      var clicked = event.target;
      var currentID = clicked.id
      alert(currentID);

    },
    sendAnswerText(value) {
      this.givenAnswer = value;
      console.log(this.givenAnswer)
      const body = {
        'answer': this.givenAnswer,
        "time needed": this.timer
      };
      console.log(JSON.stringify(body))
      this.stompClient.send("/app/game", {}, JSON.stringify(body));
    },
    sendToken() {
      const body = {
        'token': localStorage.getItem('token')
      };
      alert("send token")
      this.stompClient.send("/app/game", {}, JSON.stringify(body));

      this.loading = true;
      console.log(body)
    },
    disconnect() {
      this.stompClient.disconnect();
      this.updateSocketStatus(false)
    },
    updateSocketStatus: function (value) {
      this.$store.commit('setSocketIsConnected', value);
      this.connected = this.$store.getters.getIsConnected
    },

    setTimer: function (value) {
      this.$store.commit('setTimer', value);
      this.timer = this.$store.getters.getTimer
    },
    setQuestionText: function (value) {
      this.$store.commit('setQuestion', value);
      this.question.text = this.$store.getters.getQuestionText()
    },
    goToResult() {
      this.$router.push('/result');
      this.disconnect();
    },
    resetSelectedAnswer() {
      this.isActive1 = false;
      this.isActive2 = false;
      this.isActive3 = false;
      this.isActive4 = false;

    }
  }
}
</script>
<style scoped>

#clock {
  font-family : "Orbitron", sans-serif;


  color       : black;
  text-shadow : 0 0 20px rgba(3, 201, 169, 1), 0 0 20px rgba(22, 160, 133, 1);
  }

.time {
  letter-spacing : 0.05em;
  font-size      : 80px;

  }

.score {
  font-family : "Orbitron", sans-serif;
  }

.answer {
  font-family : "Oswald", sans-serif;
  }

#question {
  font-family : "Oxygen", sans-serif;
  }

.center {
  border : none
  }

* {
  box-sizing : border-box;
  }

body {
  height          : 100vh;
  display         : flex;
  justify-content : center;
  align-items     : center;
  }

.wrapper {
  display         : flex;
  justify-content : center;
  }

.cta {
  display         : flex;
  padding         : 10px 45px;
  text-decoration : none;
  font-family     : "Poppins", sans-serif;
  font-size       : 40px;
  color           : white;
  background      : darkgreen;
  transition      : 1s;
  box-shadow      : 6px 6px 0 black;
  transform       : skewX(-15deg);
  }

.cta:focus {
  outline : none;
  }

.cta:hover {
  transition : 0.5s;
  box-shadow : 10px 10px 0 #FBC638;
  }

.cta span:nth-child(2) {
  transition   : 0.5s;
  }

.cta:hover span:nth-child(2) {
  transition   : 0.5s;
  margin-right : 45px;
  }

span {
  transform : skewX(15deg)
  }

span:nth-child(2) {
  width       : 20px;
  margin-left : 30px;
  position    : relative;
  top         : 12%;
  }

/**************SVG****************/

path.one {
  transition : 0.4s;
  transform  : translateX(-60%);
  }

path.two {
  transition : 0.5s;
  transform  : translateX(-30%);
  }

.cta:hover path.three {
  animation : color_anim 1s infinite 0.2s;
  }

.cta:hover path.one {
  transform : translateX(0%);
  animation : color_anim 1s infinite 0.6s;
  }

.cta:hover path.two {
  transform : translateX(0%);
  animation : color_anim 1s infinite 0.4s;
  }

/* SVG animations */

@keyframes color_anim {
  0% {
    fill : white;
    }
  50% {
    fill : #FBC638;
    }
  100% {
    fill : white;
    }
  }

.loader {
  border-top-color  : #3498db;
  -webkit-animation : spinner 1.5s linear infinite;
  animation         : spinner 1.5s linear infinite;
  }

@-webkit-keyframes spinner {
  0% {
    -webkit-transform : rotate(0deg);
    }
  100% {
    -webkit-transform : rotate(360deg);
    }
  }

@keyframes spinner {
  0% {
    transform : rotate(0deg);
    }
  100% {
    transform : rotate(360deg);
    }
  }

.activ {
  background : var(--yellow);
  color      : #fff;
  font-size  : 30px;
  }
</style>

