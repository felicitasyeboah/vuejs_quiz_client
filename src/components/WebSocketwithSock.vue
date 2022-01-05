<template>

  <div class="content" id="websocket">
    <div>&nbsp;</div>
    <div class="row">
      <div class="col">
        <button
            class="bg-green-600 hover:bg-green-800 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
            @click="connect">Create connection
        </button>

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

      </div>
    </div>

  </div>

</template>

<script>

import Stomp from "stompjs";

import SockJS from 'sockjs-client';
import {STOMP_ENDPOINT, WEBSOCKET_IP, WS_URL} from "@/assets/constants";


export default {
  name: "WebSocket",
  data() {
    return {
      token: localStorage.getItem('token'),
      setConnected: false,
      ws_url: WEBSOCKET_IP,
      ws_ip: WS_URL + STOMP_ENDPOINT,
      status: "disconnected",
      msg: "token:" + this.token,
      stompClient: null,
      header: {token: localStorage.getItem('token')},
    }
  },
  methods: {
    connect() {

      // TODO: Schauen, was das konkrete Problem mit der over-Syntax ist
      this.stompClient = Stomp.over(new SockJS(this.ws_url));
      console.log(this.stompClient)
      //Subscribe to the channel
      this.stompClient.subscribe('/user/topic/game', function (serverMessage) {
        this.showQuestion(serverMessage.body);
      });
    },

    sendAnswer() {
      var body = {
        'answer': "answer"
      }
      this.stompClient.send("/app/game", {}, JSON.stringify(body));
    },

    disconnect() {
      if (this.stompClient !== null) {
        this.stompClient.disconnect();
        this.stompClient.unsubscribe('/user/topic/game');
      }
      this.setConnected = false
      console.log("Disconnected");
    },

    sendToken() {
      const body = {
        'token': localStorage.getItem('token')
      };
      this.stompClient.send("/app/game", {}, JSON.stringify(body));
      console.log(body)
    },
    showQuestion(message) {
      console.log(message);
    }
  }
}

</script>

