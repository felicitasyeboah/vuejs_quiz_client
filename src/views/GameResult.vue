<template>
  <div v-if="this.$store.state.isAuthenticated">
    <Result />
  </div>
  <div v-else>
    <Login />
  </div>
</template>

<script>
import Result from "@/components/Result";
import Login from "@/views/Login";

export default {
  name: "GameResult",
  components: {Result, Login}
}
</script>

<style scoped>

</style>
