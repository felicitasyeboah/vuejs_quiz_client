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
            @click="questionRequest">Question
        </button>
        <button v-on:click="sendMessage('hello')">Send Message</button>
        <button v-on:click="checkStatus()">Check Status</button>
      </div>
    </div>
    {{ token }}
    {{ this.jwttoken }}
    GANZ EGYAL
  </div>

</template>

<script>
import Stomp from "webstomp-client";
import {STOMP_ENDPOINT, WEBSOCKET_URL, WS_URL} from "@/assets/constants";

export default {
  name: "WebSocket",
  data() {
    return {
      jwttoken: localStorage.getItem('token'),
      setConnected: false,
      ws_url: WEBSOCKET_URL + STOMP_ENDPOINT,
      ws_ip: WS_URL + STOMP_ENDPOINT,
      status: "disconnected",
      msg: "token" + this.jwttoken,
    }
  },
  methods: {
    sendMessage: function (message) {
      console.log("Hello")


      console.log("jwttoken" + this.jwttoken)
      console.log("msg" + this.msg)
      console.log("thisheaders" + thisheaders)
      console.log(this.ws_url)
    },
    connect() {
      console.log("jwttoken" + this.jwttoken)
      console.log("msg" + this.msg)
      console.log("thisheaders" + thisheaders)
      console.log(this.ws_url)
      var thisheaders = {
        token: this.token
      };
      this.ws.connect(thisheaders, console.log("irgendwas"));
      this.setConnected = true
      console.log("connected")
      this.ws.subscribe("/topic/game",
          function (message) {
            message.ack();
            this.gameMessage = JSON.parse(message);
          },
          {ack: 'client'}
      );
    },

    checkStatus() {
      this.ws.onopen = () => {
        this.status = "connected check";
      }
    },
    sendMes(message) {
      console.log(this.ws);
      var msg = {
        type: 'authenticate',
        payload: {token: this.token}
      };
      this.ws.send(message, msg);
    },

    disconnect() {
      if (this.ws !== null) {
        this.ws.disconnect();
      }
      this.setConnected = false,
          console.log("Disconnected");
    },

    questionRequest() {
      var msg = {token: this.token}
      this.ws.send("/app/game", msg)
    }
  },
  created() {
    this.ws = Stomp.client(this.ws_url, this.msg)
    this.ws.onmessage = function (event) {
      console.log(event);
    }
    this.ws.onopen = function (event) {
      console.log(event)
      console.log("Successfully connected to the echo websocket server...")
    }
  }
}
</script>

