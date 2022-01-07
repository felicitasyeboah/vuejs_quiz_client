<template>

  <div class="content" id="websocket">
    <div>&nbsp;</div>
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

    <div v-for="item in received_messages" :key="item">
      {{ item }}
    </div>

  </div>

</template>

<script>

import Stomp from "stompjs";
//
import SockJS from 'sockjs-client';
import {STOMP_ENDPOINT, WEBSOCKET_IP, WS_URL} from "@/assets/constants";


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
      status: "disconnected",
      msg: "token:" + this.token,
      stompClient: null,
      header: {token: localStorage.getItem('token')},
      connection: null,
      connected: false
    }
  },
  created() {
    console.log("oncreated")
    onmessage = function (message) {
      alert("nachricht da" + message)
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

    handleNewMessage(event) {
      let data = event.data;
      data = data.split(/\r?\n/);
      for (let i = 0; i < data.length; i++) {
        let msg = JSON.parse(data[i]);
        this.messages.push(msg);
        console.log(this.messages)
      }
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

// callback: function(message) {
//   // called when the client receives a STOMP message from the server
//   if (message.body) {
//     alert("got message with body " + message.body)
//   } else {
//     alert("got empty message");
//   }
// },
// sendAnswer() {
//   var body = {
//     'answer': "answer"
//   }
//   this.stompClient.send("/app/game", {}, JSON.stringify(body));
// },
//

//   this.setConnected = false
//   console.log("Disconnected");
// },




</script>

