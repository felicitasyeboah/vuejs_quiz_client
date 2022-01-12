<template>
  <!--  &lt;!&ndash;<WebSock></WebSock>&ndash;&gt;-->
  <!--  <v-show="gameend">-->
  <WebSocketwithSock></WebSocketwithSock>
  <!-- <Result></Result>-->
</template>

<script>
// import Question from "@/components/Question";
// import GameContent from "@/components/GameContent";
//import WebSock from "@/components/WebSock";
//import WebSocketwithSock from "@/components/WebSock";
import WebSocketwithSock from "@/components/WebSocketwithSock";
//import Result from "@/components/Result";

//import WebSocket from "@/components/WebSocket";


export default {
  name: "Game",
  // components: {WebSocketwithSock, Result},
  components: {WebSocketwithSock},
  data() {
    return {
      gameend: false,
    }
  }
}
</script>


