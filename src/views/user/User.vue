<template>
  <div v-if="this.$store.state.isAuthenticated">
    <Profil />
  </div>
  <div v-else>
    <Login />
  </div>
</template>

<script>

import Profil from "@/components/Profil";
import Login from "@/views/Login";

export default {
  components: {Profil, Login},
}
</script>

<style>

</style>
