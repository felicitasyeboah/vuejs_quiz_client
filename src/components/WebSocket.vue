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
      </div>
    </div>

  </div>

</template>

<script>
import Stomp from "webstomp-client";
import {STOMP_ENDPOINT, WS_URL} from "@/assets/constants";

export default {
  name: "WebSocket",
  data() {
    return {
      messages: [],
      stompClient: null,
      token: localStorage.getItem('token'),
      userName: localStorage.getItem('userName'),
      socket: null,
      setConnected: false,
      ws_url: WS_URL + STOMP_ENDPOINT,
      parseMessage: null,
      gameMessage: null,

    }
  },
  methods: {
    connect() {
      this.ws = Stomp.client(this.ws_url, "soap");
      console.log(this.userName)
      var thisheaders = {
        token: this.token
      };
      console.log(thisheaders)

      this.ws.connect(thisheaders, console.log("irgendwas"));
      this.setConnected = true
      console.log("connected")
      // this.ws.onmessage = (evt) => {
      //   console.log(evt);
      //   this.parseMessage(evt.data);
      //   console.log("onmessage")
      // };
      // this.ws.onopen = () => {
      //   const authentication = {
      //     msgType : 'Authenticate',
      //     data : {
      //       token : localStorage.getItem('token')
      //     }
      //   }
      //   this.ws.send(JSON.stringify(authentication));
      //   console.log("offen")
      //
      // };
      this.ws.subscribe("/topic/game",
          function (message) {
            message.ack();
            this.gameMessage = JSON.parse(message);
          },
          {ack: 'client'}
      );
    },
    disconnect() {
      if (this.ws !== null) {
        this.ws.disconnect();
      }
      this.setConnected = false,
          console.log("Disconnected");
    },

    questionRequest() {
      this.ws.send("/app/game");
    },

  }
}
</script>

