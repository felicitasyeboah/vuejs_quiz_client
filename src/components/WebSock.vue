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
            @click="sendT">Send Token
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


import {STOMP_ENDPOINT, WEBSOCKET_IP, WS_URL} from "@/assets/constants";
import * as StompJs from "@stomp/stompjs";


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
      client: null,

      header: {token: localStorage.getItem('token')},
    }
  },
  methods: {
    connect() {
      this.client = new StompJs.Client({
        brokerURL: this.ws_ip,
        debug: function (str) {
          console.log(str);
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
      });
      // Do something, all subscribes must be done is this callback
      // This is needed because this will be executed after a (re)connect
      this.client.onConnect = function (frame) {
        console.log(frame)
        this.subscribe('/user/topic/game', function (serverMessage) {
          console.log(serverMessage)

        });


      };

      this.client.onStompError = function (frame) {
        console.log(frame)
        // Will be invoked in case of error encountered at Broker
        // Bad login/passcode typically will cause an error
        // Complaint brokers will set `message` header with a brief message. Body may contain details.
        // Compliant brokers will terminate the connection after any error
        console.log('Broker reported error: ' + frame.headers['message']);
        console.log('Additional details: ' + frame.body);
      };

      this.client.activate();

    },
    stopClient() {
      this.client.deactivate();
    },
    sendT() {
      const body = {
        'token': localStorage.getItem('token')
      };
      this.client.publish({
        destination: '/app/game',
        body: JSON.stringify(body),
        skipContentLengthHeader: true,
      });
    },
    disconnect() {
      if (this.client != null) {
        this.disconnect();
      }
      this.handleMessageReceipt("Disconnected");
    },
    handleMessageReceipt: function (messageOutput) {
      console.log(messageOutput);
    }
  }

}

</script>

