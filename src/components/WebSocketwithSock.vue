<template>

  <div class="content" id="websocket">
    <span v-if="this.$store.state.connected"> CONNECTED</span>
    <div>connected: {{ connected }}</div>
    {{ this.$store.getters.getIsConnected }}
    {{ this.$store.getIsConnected }}
    <div class="row">
      <div class="col">
        <div class="form-group">
          <label for="connect">WebSocket connection:</label>
          <button id="connect" class="btn btn-default" type="submit" :disabled="connected == true"
                  @click.prevent="connect">Connect
          </button>
          <button id="disconnect" class="btn btn-default" type="submit" :disabled="connected == false"
                  @click.prevent="disconnect">Disconnect
          </button>
        </div>
        {{ question }}
        <button
            class="bg-green-600 hover:bg-green-800 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
            @click="connect">Create connection
        </button>
        TIME {{ timer  }}
        <button
            class="bg-green-600 hover:bg-green-800 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
            @click="disconnect">Close connection
        </button>
        <button
            class="bg-green-600 hover:bg-green-800 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
            @click="sendToken">Send Token
        </button>
        <button
            class="bg-green-600 hover:bg-green-800 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
            @click="sendAnswer">Send Answer
        </button>
        WEBSOCKET WITH SOCK
      </div>
    </div>
    <h1>{{ timer }}</h1>
    <ul>
      <li v-for="message in messages" v-bind:key="message">{{ message }}</li>
    </ul>

  </div>
</template>

<script>

import Stomp from "stompjs";

import SockJS from 'sockjs-client';

import {
  CONNECTED,
  DISCONNECT,
  GAME_MESSAGE,
  MESSAGE,
  QUESTION_TIMER_MESSAGE,
  RESULT_MESSAGE,
  SCORE_TIMER_MESSAGE,
  START_TIMER_MESSAGE,
  STOMP_ENDPOINT,
  WEBSOCKET_IP,
  WS_URL
} from "@/assets/constants";
import store from "@/vuex/store";

// import {messageUtils} from "@/utils";


export default {
  computed: {},
  name: "WebSocketwithSock",
  data() {
    return {
      received_messages: [],
      send_message: null,
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
      timer: 10,
      list2: [],
      messages: [],
      question: null,
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


    onmessage = function (message) {


      const messageCommand = message.command;
      const messageType = message.headers.type;
      // if (messageUtils.isKnowMessageType(message.data)) {
      if (messageCommand === MESSAGE) {
        const msg = JSON.parse(message.body);
        switch (messageType) {
          case START_TIMER_MESSAGE:
            alert("ES GEHT LOS")
            this.$store.commit('setTimer', msg.timeLeft);
            break;
          case QUESTION_TIMER_MESSAGE:
            console.log("QUESTION_TIMER_MESSAGE erhalten")
            console.log("timeleft:" + msg.timeLeft);
            this.$store.setTimer(msg.timeLeft)
            this.setTimer(msg.timeLeft)
            break
          case GAME_MESSAGE:
            console.log("GAME_MESSAGE erhalten")
            alert("category:" + msg.category);
            alert("question:" + msg.question);
            this.question = msg.question
            // alert("Spiel zu ENDE")
            break
          case SCORE_TIMER_MESSAGE:
            console.log("SCORE_TIMER_MESSAGE")
            break
          case RESULT_MESSAGE:
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
    }
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
            // console.log("store"+ this.$store.getters.getTimer)
            // console.log("store"+ this.$store.setTimer(5))
            // console.log("store"+ this.$store.getters.getTimer)
            console.log("store" + this.$store.getters.getIsConnected)
            console.log("Status:" + this.connected)
            this.updateSocketStatus(true)
            this.stompClient.subscribe('/user/topic/game', onmessage);
          },
          error => {
            console.log(error);
            this.connected = false;
          }
      );
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
      this.timer = this.$store.getters.getTimer()
    },
  }
}
</script>

