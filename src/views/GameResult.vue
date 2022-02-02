<template>
  <div v-if="this.$store.state.isAuthenticated">
    <div v-show="this.$store.state.result===0">
      <div class="flex">
        <div class="text-3xl mx-auto pt-16">No result found - please start a new game!</div>
        <img src="../assets/sadowl.jpg">
      </div>
    </div>
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


