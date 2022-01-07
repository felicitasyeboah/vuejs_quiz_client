<template>

  <div class="content" id="websocket">
    <div>connected: {{ connected }}</div>
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
        <button
            class="bg-green-600 hover:bg-green-800 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
            @click="connect">Create connection
        </button>
        TIME {{ timer }}
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
    {{ status }}
    <div v-if="!oppfound">Gegner wird gesucht</div>
    <div v-else>Gegner GEFUNDEN!</div>
    {{ oppfound }}
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
  MESSAGE,
  RESULT_MESSAGE,
  START_TIMER_MESSAGE,
  STOMP_ENDPOINT,
  WEBSOCKET_IP,
  WS_URL
} from "@/assets/constants";

export default {
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
      connected: false,
      timer: 0,
      list2: [],
      messages: []
    }
  },
  created() {
    onmessage = function (message) {
      switch (message.command) {
        case CONNECTED:
          this.connected = true;
          break;
        case MESSAGE:
          if (message.headers.type === START_TIMER_MESSAGE) {
            alert("ES GEHT LOS")
          }
          if (message.headers.type === RESULT_MESSAGE)
            alert("Spiel zu ENDE")
          console.log(message.headers.type)
          break
        case DISCONNECT:
          this.connected = false;
          break
        default:
          break;
      }
      if (message.body) {
        console.log(message.body)
      }
      console.log(message.command)//MESSAGE
    }
  },
  methods: {
    connect() {
      this.socket = new SockJS("http://localhost:8080/websocket");
      this.stompClient = Stomp.over(this.socket);
      this.stompClient.connect(
          {},
          frame => {
            this.connected = true;
            console.log(frame);
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
      if (this.stompClient) {
        this.stompClient.disconnect();
      }
      this.connected = false;
    },

  }
}
</script>

