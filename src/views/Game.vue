<template>
  <div v-if="this.$store.state.isAuthenticated">
    <WebSocketwithSock />
  </div>
  <div v-else>
    <Login />
  </div>
</template>

<script>
import WebSocketwithSock from "@/components/WebSocketwithSock";
import Login from "@/views/Login";

export default {
  name: "Game",
  components: {WebSocketwithSock, Login},
}
</script>


