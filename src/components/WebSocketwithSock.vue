<template>

  <div>
    <div class="flex justify-center">
      <div class=" relative justify-center mt-6">
        <!--        <div v-if="!this.$store.state.isConnected">-->
        <div v-if="!this.gamestart">
        </div>
        <div v-else class="absolute flex top-0 right-0 p-3 space-x-1">
          {{ this.$store.state.question.category }}
        </div>
        <p class="bg-white px-12 py-8 rounded-lg w-80"> {{ this.$store.state.question.text }}
        </p>
        <button
            class="bg-green-600 hover:bg-green-800 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
            @click="connect">READY
        </button>
        <button
            class="bg-green-600 hover:bg-green-800 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
            @click="sendToken">Send Token
        </button>
        <button
            class="bg-green-600 hover:bg-green-800 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
            @click="disconnect">Close connection
        </button>
      </div>
    </div>
  </div>
  <div v-show="gamestart">
    <h1 class="submit object-center text-8xl text-red-900 font-light p-4.5">{{ timer }}</h1>
    <div class="container container max-w-xl m-auto flex flex-wrap flex-col md:flex-row items-center justify-start">

      <div id="answer1" ref="answer1case" class="w-full lg:w-1/2 p-3"
           v-on:click="sendAnswerText(this.$store.getters.getAnswer1)">
        <div class="flex flex-col lg:flex-row rounded overflow-hidden h-auto lg:h-32 border shadow shadow-lg">

          <div
              class="bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
            <div class="text-black font-bold text-xl mb-2 leading-tight">{{ this.$store.getters.getAnswer1 }}</div>

          </div>
        </div>
      </div>
      <div id="answer2" class="w-full lg:w-1/2 p-3" v-on:click="sendAnswerText(this.$store.getters.getAnswer2)">
        <div class="flex flex-col lg:flex-row rounded overflow-hidden h-auto lg:h-32 border shadow shadow-lg">

          <div
              class="bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
            <div class="text-black font-bold text-xl mb-2 leading-tight">{{ this.$store.getters.getAnswer2 }}</div>

          </div>
        </div>
      </div>
      <div id="answer3" class="w-full lg:w-1/2 p-3" v-on:click="sendAnswerText(this.$store.getters.getAnswer3)">
        <div class="flex flex-col lg:flex-row rounded overflow-hidden h-auto lg:h-32 border shadow shadow-lg">

          <div
              class="bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
            <div class="text-black font-bold text-xl mb-2 leading-tight">{{ this.$store.getters.getAnswer3 }}</div>

          </div>
        </div>
      </div>
      <div id="answer4" ref="answer2case" class="w-full lg:w-1/2 p-3"
           v-on:click="sendAnswerText(this.$store.getters.getAnswer4)">
        <div class="flex flex-col lg:flex-row rounded overflow-hidden h-auto lg:h-32 border shadow shadow-lg">
          <div
              class="bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
            <div class="text-black font-bold text-xl mb-2 leading-tight">{{ this.$store.getters.getAnswer4 }}</div>

          </div>
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
      question: {
        category: this.$store.state.question.category,
        text: this.$store.getters.getQuestionText,
        answer1: null,
        answer2: null,
        answer3: null,
        answer4: null,
        correctAnswer: null,
      },
      gamestart: false,
      ganswer2: null,
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

    connect() {
      this.socket = new SockJS("http://localhost:8080/websocket");
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
    msgHandler(message) {
      const messageCommand = message.command;
      const messageType = message.headers.type;
      // if (messageUtils.isKnowMessageType(message.data)) {
      if (messageCommand === MESSAGE) {

        const msg = JSON.parse(message.body);
        switch (messageType) {
          case START_TIMER_MESSAGE:
            this.timer = msg.timeLeft
            // {"timeLeft":2,"type":"START_TIMER_MESSAGE"}
            this.$store.commit('setTimer', msg.timeLeft);
            break;
          case QUESTION_TIMER_MESSAGE:
            // {"timeLeft":1,"type":"QUESTION_TIMER_MESSAGE"}
            console.log("QUESTION_TIMER_MESSAGE erhalten")
            console.log("timeleft:" + msg.timeLeft);
            this.$store.commit('setTimer', msg.timeLeft);
            this.setTimer(msg.timeLeft)
            break
          case GAME_MESSAGE:
            this.gamestart = true;
            // {"category":"Wissenschaft","question":"Von wem stammt die Relativitätstheorie?",
            //     "answer1":"Stephen Hawking","answer2":"Nikola Tesla","answer3":"Albert Einstein",
            //     "answer4":"Marie Curie","correctAnswer":3,"user":{"userName":"Martine",
            //     "profileImage":"default10.png"},
            //   "opponent":{"userName":"CandyMountain","profileImage":"default3.png"},
            //   "userScore":0,"opponentScore":0,"type":"GAME_MESSAGE"}
            console.log("GAME_MESSAGE erhalten")

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
            // Messagebody:{"isHighScore":false,"user":{"userName":"Martine","profileImage":"default10.png"}
            // ,"opponent":{"userName":"CandyMountain","profileImage":"default3.png"},
            //  "userScore":0,"opponentScore":0,"type":"RESULT_MESSAGE"}
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


    changeQuestion() {
      this.$store.commit('setQuestionText', "Hier kommt die Frage..");
    },

    sendToken() {
      const body = {
        'token': localStorage.getItem('token')
      };
      alert("send token")
      this.stompClient.send("/app/game", {}, JSON.stringify(body));
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
  }
}
</script>

